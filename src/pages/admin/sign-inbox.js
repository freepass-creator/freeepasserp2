/**
 * 계약서 발송 inbox (관리자 전용)
 * - 요청 목록 / 계약 정보 / 계약서 미리보기 3패널
 * - sign_token 발급 → 고객에게 링크 전달
 */
import { store } from '../../core/store.js';
import { watchCollection, setRecord, updateRecord } from '../../firebase/db.js';
import { showToast } from '../../core/toast.js';
import { fieldView as ffv } from '../../core/form-fields.js';
import { initWs4Resize } from '../../core/resize.js';

let unsubs = [];
let signActiveKey = null;

export function mount(main) {
  unsubs.forEach(u => u?.());
  unsubs = [];
  signActiveKey = null;

  main.innerHTML = `
    <div class="ws4">
      <div class="ws4-panel" data-panel="list">
        <div class="ws4-head">
          <span>요청 목록</span>
          <span class="sign-inbox-badge" id="signPendCount" style="font-size:var(--fs-2xs);color:var(--c-err);"></span>
        </div>
        <div class="ws4-search">
          <input class="input input-sm" id="signSearch" placeholder="차량번호·고객명 검색...">
          <div class="ws4-search-chips">
            <button class="chip is-active" data-f="pending">발송대기</button>
            <button class="chip" data-f="sent">발송됨</button>
            <button class="chip" data-f="all">전체</button>
          </div>
        </div>
        <div class="ws4-body" id="signList"></div>
      </div>
      <div class="ws4-resize" data-idx="0"></div>

      <div class="ws4-panel" data-panel="detail">
        <div class="ws4-head">계약 정보</div>
        <div class="ws4-body" id="signDetail">
          <div class="srch-empty"><i class="ph ph-paper-plane-tilt"></i><p>요청을 선택하세요</p></div>
        </div>
      </div>
      <div class="ws4-resize" data-idx="1"></div>

      <div class="ws4-panel" data-panel="preview" style="flex:2 1 50%;">
        <div class="ws4-head">
          <i class="ph ph-file-text"></i>
          <span>계약서 미리보기</span>
          <span id="signPreviewSub" style="margin-left:var(--sp-2);color:var(--c-text-muted);font-size:var(--fs-xs);font-weight:normal;"></span>
        </div>
        <div class="ws4-body" id="signPreview" style="padding:0;background:var(--c-bg-sub);">
          <div class="srch-empty"><i class="ph ph-file-text"></i><p>계약을 선택하면 미리보기가 나타납니다</p></div>
        </div>
      </div>
    </div>
  `;
  initWs4Resize('fp.admin.sign.widths');

  unsubs.push(watchCollection('contracts', (data) => {
    store.contracts = data;
    renderSignList();
  }));

  const search = document.getElementById('signSearch');
  search?.addEventListener('input', renderSignList);
  document.getElementById('signList')?.parentElement?.querySelectorAll('.chip[data-f]').forEach(c => {
    c.addEventListener('click', () => {
      document.querySelectorAll('.chip[data-f]').forEach(x => x.classList.remove('is-active'));
      c.classList.add('is-active');
      renderSignList();
    });
  });
}

export function unmount() {
  unsubs.forEach(u => u?.());
  unsubs = [];
  signActiveKey = null;
}

function renderSignList() {
  const el = document.getElementById('signList');
  if (!el) return;
  const q = (document.getElementById('signSearch')?.value || '').toLowerCase();
  const f = document.querySelector('.chip[data-f].is-active')?.dataset.f || 'pending';
  const contracts = store.contracts || [];

  let list = contracts.filter(c => c.sign_requested);
  if (f === 'pending') list = list.filter(c => !c.sign_token);
  else if (f === 'sent')    list = list.filter(c => c.sign_token && !c.signed_at);
  // all: 전체 요청 (발송대기 + 발송됨 + 완료)

  if (q) list = list.filter(c => [
    c.car_number_snapshot, c.customer_name, c.contract_code,
    c.vehicle_name_snapshot, c.agent_code, c.provider_company_code,
  ].some(v => v && String(v).toLowerCase().includes(q)));
  list.sort((a, b) => (b.sign_requested_at||0) - (a.sign_requested_at||0));

  const pendCount = contracts.filter(c => c.sign_requested && !c.sign_token).length;
  const badge = document.getElementById('signPendCount');
  if (badge) badge.textContent = pendCount ? `${pendCount}건 대기` : '';

  if (!list.length) {
    el.innerHTML = `<div class="srch-empty"><i class="ph ph-check-circle"></i><p>발송 요청이 없습니다</p></div>`;
    return;
  }

  el.innerHTML = list.map(c => {
    const state = c.signed_at ? 'done' : (c.sign_token ? 'sent' : 'pending');
    const stateLabel = { pending: '발송대기', sent: '발송됨·서명대기', done: '서명완료' }[state];
    const stateTone  = { pending: 'warn',   sent: 'accent',         done: 'ok' }[state];
    const when = c.sign_requested_at ? new Date(c.sign_requested_at).toLocaleString('ko-KR', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }) : '';
    return `
      <div class="room-item ${signActiveKey === c.contract_code ? 'is-active' : ''}" data-key="${c.contract_code}">
        <div class="room-item-avatar is-${stateTone}"><i class="ph ph-paper-plane-tilt"></i></div>
        <div class="room-item-body">
          <div class="room-item-top">
            <span class="room-item-name">${c.car_number_snapshot || c.contract_code || ''} · ${c.customer_name || ''}</span>
            <span class="badge badge-${stateTone}">${stateLabel}</span>
          </div>
          <div class="room-item-msg">${c.contract_code || ''} · 요청: ${c.sign_requested_by || '-'} · ${when}</div>
        </div>
      </div>`;
  }).join('');

  el.querySelectorAll('.room-item').forEach(item => {
    item.addEventListener('click', () => {
      signActiveKey = item.dataset.key;
      renderSignList();
      renderSignDetail(item.dataset.key);
    });
  });
}

function renderSignDetail(code) {
  const el = document.getElementById('signDetail');
  const c = (store.contracts || []).find(x => x.contract_code === code);
  if (!el || !c) return;

  const state = c.signed_at ? 'done' : (c.sign_token ? 'sent' : 'pending');
  const url = c.sign_token ? `${location.origin}/sign.html?t=${c.sign_token}` : '';

  el.innerHTML = `
    <div style="padding:var(--sp-3);display:flex;flex-direction:column;gap:var(--sp-3);">
      <div class="form-section">
        <div class="form-section-title">계약 정보</div>
        <div class="form-section-body">
          ${ffv('계약번호', c.contract_code)}
          ${ffv('차량', c.car_number_snapshot)}
          ${ffv('차량명', c.vehicle_name_snapshot)}
          ${ffv('고객', c.customer_name)}
          ${ffv('월 대여료', c.rent_amount_snapshot ? Number(c.rent_amount_snapshot).toLocaleString('ko-KR') + '원' : '-')}
          ${ffv('기간', c.rent_month_snapshot ? c.rent_month_snapshot + '개월' : '-')}
        </div>
      </div>

      <div class="form-section">
        <div class="form-section-title">발송 요청</div>
        <div class="form-section-body">
          ${ffv('요청자', c.sign_requested_by || '-')}
          ${ffv('요청일시', c.sign_requested_at ? new Date(c.sign_requested_at).toLocaleString('ko-KR') : '-')}
          ${ffv('발송일시', c.sign_token && c.sign_requested_at ? new Date(c.sign_requested_at).toLocaleString('ko-KR') : '-')}
          ${ffv('서명일시', c.signed_at ? new Date(c.signed_at).toLocaleString('ko-KR') : '-')}
        </div>
      </div>

      ${state === 'pending' ? `
        <button class="btn btn-primary" id="signSendBtn" style="width:100%;">
          <i class="ph ph-paper-plane-tilt"></i> 서명 링크 발송
        </button>
      ` : state === 'sent' ? `
        <div style="padding:var(--sp-2);background:var(--c-bg-sub);border-radius:var(--ctrl-r);font-size:var(--fs-xs);">
          <div style="color:var(--c-text-muted);margin-bottom:4px;">발송된 링크</div>
          <div style="word-break:break-all;font-family:monospace;margin-bottom:var(--sp-2);">${url}</div>
          <button class="btn btn-outline btn-sm" id="signCopyBtn" style="width:100%;">
            <i class="ph ph-copy"></i> 링크 다시 복사
          </button>
          <button class="btn btn-outline btn-sm" id="signResendBtn" style="width:100%;margin-top:var(--sp-1);color:var(--c-err);">
            <i class="ph ph-arrow-clockwise"></i> 링크 재발급 (기존 무효화)
          </button>
        </div>
      ` : `
        <div style="padding:var(--sp-2);background:var(--c-ok-bg, #e6f9ed);border-radius:var(--ctrl-r);color:var(--c-ok);font-size:var(--fs-xs);text-align:center;">
          <i class="ph ph-check-circle"></i> 서명 완료 · ${c.contract_status === '계약완료' ? '계약 체결' : '계약 상태 확인 필요'}
        </div>
      `}
    </div>
  `;

  document.getElementById('signSendBtn')?.addEventListener('click', () => sendSignLink(c));
  document.getElementById('signCopyBtn')?.addEventListener('click', async () => {
    await navigator.clipboard?.writeText(url).catch(() => {});
    showToast('링크 복사됨');
  });
  document.getElementById('signResendBtn')?.addEventListener('click', async () => {
    if (!confirm('기존 서명 링크를 무효화하고 새 링크를 발급합니다.\n진행하시겠습니까?')) return;
    await sendSignLink(c);
  });

  renderSignPreview(c, state, url);
}

/** Panel 3 — 계약서 미리보기. 항상 로컬 템플릿을 iframe 로드하고 데이터만 postMessage 주입 */
function renderSignPreview(c, state, _url) {
  const el = document.getElementById('signPreview');
  const sub = document.getElementById('signPreviewSub');
  if (!el) return;

  const stateLabel = state === 'done' ? '서명 완료' : state === 'sent' ? '발송됨' : '발송 대기';
  sub && (sub.textContent = `${stateLabel} · 개인 계약서 양식`);

  el.innerHTML = `<iframe id="signPreviewFrame" src="/contract-template/contract-individual.html" style="width:100%;height:100%;border:0;background:#fff;"></iframe>`;
  const frame = document.getElementById('signPreviewFrame');
  const payload = {
    type: 'contract-data',
    data: {
      contract_code: c.contract_code,
      car_number: c.car_number_snapshot,
      vehicle_name: c.vehicle_name_snapshot,
      customer_name: c.customer_name,
      rent_amount: c.rent_amount_snapshot,
      rent_month: c.rent_month_snapshot,
      deposit_amount: c.deposit_amount_snapshot,
      signed_at: c.signed_at,
      state,
    },
  };
  frame?.addEventListener('load', () => {
    try { frame.contentWindow?.postMessage(payload, '*'); } catch {}
  });
}

async function sendSignLink(c) {
  const token = 'sign_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 10);
  const expires_at = Date.now() + 7 * 24 * 60 * 60 * 1000;
  try {
    await setRecord(`contract_sign/${token}`, {
      contract_code: c.contract_code,
      car_number: c.car_number_snapshot || '',
      model_name: c.vehicle_name_snapshot || '',
      customer_name: c.customer_name || '',
      rent_amount: c.rent_amount_snapshot || 0,
      rent_month: c.rent_month_snapshot || 0,
      agent_uid: c.agent_uid || '',
      created_at: Date.now(),
      expires_at,
    });
    await updateRecord(`contracts/${c.contract_code}`, {
      sign_token: token,
      sign_sent_at: Date.now(),
      sign_sent_by: store.currentUser?.user_code || store.currentUser?.uid || '',
    });
    const url = `${location.origin}/sign.html?t=${token}`;
    await navigator.clipboard?.writeText(url).catch(() => {});
    showToast('링크 발송 완료 — 복사됨');
    prompt('아래 링크를 고객에게 전달하세요 (카톡·SMS·이메일):', url);
    renderSignDetail(c.contract_code);
  } catch (e) {
    console.error(e);
    showToast('발송 실패', 'error');
  }
}
