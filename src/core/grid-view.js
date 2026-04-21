/**
 * grid-view.js — 공용 엑셀뷰 컴포넌트
 *
 * 사용법:
 *   import { renderGrid, bindGridFilter } from '../core/grid-view.js';
 *
 *   // 컬럼 정의
 *   const cols = [
 *     { key: 'car_number', label: '차량번호', type: 'search' },
 *     { key: 'maker', label: '제조사', type: 'check' },
 *     { key: 'mileage', label: '주행', type: 'sort', num: true },
 *     { key: 'rent_36', label: '36개월', type: 'sort', num: true, getter: p => Number(p.price?.['36']?.rent || 0) },
 *   ];
 *
 *   // 렌더
 *   headEl.innerHTML = renderGridHead(cols);
 *   bodyEl.innerHTML = renderGridBody(cols, data, selectedKey);
 *   bindGridFilter(headEl, bodyEl, cols, data, { onSort, onClick });
 */

import { fmtMoney } from './format.js';

/**
 * 그리드 헤더 (패널헤드에 삽입)
 */
export function renderGridHead(cols) {
  return `<table class="grid-table" style="margin:0;"><tr>${cols.map(c =>
    `<th class="grid-th" data-col="${c.key}">${c.label}</th>`
  ).join('')}</tr></table>`;
}

/**
 * 그리드 바디 (목록 영역에 삽입)
 */
export function renderGridBody(cols, data, selectedKey) {
  if (!data.length) return '<div class="srch-empty"><i class="ph ph-magnifying-glass"></i><p>데이터 없음</p></div>';
  return `<table class="grid-table"><tbody>${data.map(item => {
    const key = item._key || item.contract_code || item.settlement_code || item.policy_code || '';
    return `<tr class="grid-row ${selectedKey === key ? 'is-active' : ''}" data-key="${key}">${cols.map(c => {
      const val = c.getter ? c.getter(item) : (item[c.key] ?? '');
      const display = c.format ? c.format(val, item) : (c.num && val ? (typeof val === 'number' ? fmtMoney(val) : val) : String(val || ''));
      return `<td class="${c.num ? 'grid-price' : ''}">${display || '-'}</td>`;
    }).join('')}</tr>`;
  }).join('')}</tbody></table>`;
}

/**
 * 그리드 바디 — 대여료 셀 (대여료 + 보증금)
 */
export function rentCell(item, month) {
  const v = item.price?.[month] || {};
  const rent = Number(v.rent) || 0;
  const dep = Number(v.deposit) || 0;
  return rent ? `${fmtMoney(rent)}${dep ? `<div class="grid-dep">${fmtMoney(dep)}</div>` : ''}` : '-';
}

/**
 * 필터/정렬 바인딩
 * @param {HTMLElement} headEl - 헤더 컨테이너
 * @param {HTMLElement} bodyEl - 바디 컨테이너
 * @param {Array} cols - 컬럼 정의
 * @param {Array} data - 전체 데이터
 * @param {object} opts - { sortField, sortDir, onSort(field, dir), onClick(key) }
 */
export function bindGridFilter(headEl, bodyEl, cols, data, opts = {}) {
  let { sortField, sortDir } = opts;

  headEl.querySelectorAll('.grid-th').forEach((th, i) => {
    const def = cols[i];

    th.addEventListener('click', (e) => {
      // 기존 드롭다운 닫기
      document.querySelector('.grid-filter-popup')?.remove();

      if (def.type === 'sort') {
        // 숫자: 정렬 토글
        if (sortField === def.key) {
          if (sortDir === 'asc') sortDir = 'desc';
          else { sortField = null; sortDir = null; }
        } else { sortField = def.key; sortDir = 'asc'; }
        // 정렬 표시
        headEl.querySelectorAll('.grid-th').forEach(h => h.classList.remove('is-sort-asc', 'is-sort-desc'));
        if (sortField === def.key && sortDir) th.classList.add(sortDir === 'asc' ? 'is-sort-asc' : 'is-sort-desc');
        if (opts.onSort) opts.onSort(sortField, sortDir);
        return;
      }

      // 드롭다운 팝업
      const rect = th.getBoundingClientRect();
      const parentRect = headEl.closest('.srch-list-wrap, .ws4-panel, .ws4')?.getBoundingClientRect() || { left: 0, top: 0 };
      const popup = document.createElement('div');
      popup.className = 'grid-filter-popup';
      popup.style.left = `${rect.left - parentRect.left}px`;
      popup.style.top = `${rect.bottom - parentRect.top}px`;

      if (def.type === 'search') {
        popup.innerHTML = `<input class="input input-sm" placeholder="${def.label} 검색..." autofocus>`;
        (headEl.closest('.srch-list-wrap, .ws4-panel, .ws4') || document.body).appendChild(popup);
        popup.querySelector('input')?.addEventListener('input', (ev) => {
          const q = ev.target.value.toLowerCase();
          bodyEl.querySelectorAll('.grid-row').forEach(row => {
            const cell = row.children[i]?.textContent?.toLowerCase() || '';
            row.style.display = !q || cell.includes(q) ? '' : 'none';
          });
        });
      } else if (def.type === 'check') {
        const vals = {};
        data.forEach(item => {
          const v = String(def.getter ? def.getter(item) : (item[def.key] || '')).trim();
          if (v) vals[v] = (vals[v] || 0) + 1;
        });
        const sorted = Object.entries(vals).sort((a, b) => b[1] - a[1]);
        popup.innerHTML = `
          <div style="max-height:200px;overflow-y:auto;">
            ${sorted.map(([v, cnt]) => `<label class="grid-filter-check"><input type="checkbox" value="${v}" checked> ${v} (${cnt})</label>`).join('')}
          </div>
          <div style="display:flex;gap:var(--sp-1);padding-top:var(--sp-1);">
            <button class="btn btn-xs btn-outline grid-filter-all">전체</button>
            <button class="btn btn-xs btn-outline grid-filter-none">해제</button>
            <button class="btn btn-xs btn-outline grid-filter-close">닫기</button>
          </div>`;
        (headEl.closest('.srch-list-wrap, .ws4-panel, .ws4') || document.body).appendChild(popup);
        const update = () => {
          const checked = new Set([...popup.querySelectorAll('input:checked')].map(c => c.value));
          bodyEl.querySelectorAll('.grid-row').forEach(row => {
            const cell = row.children[i]?.textContent?.trim() || '';
            row.style.display = checked.has(cell) || checked.size === sorted.length ? '' : 'none';
          });
        };
        popup.querySelectorAll('input[type=checkbox]').forEach(cb => cb.addEventListener('change', update));
        popup.querySelector('.grid-filter-all')?.addEventListener('click', () => { popup.querySelectorAll('input').forEach(c => c.checked = true); update(); });
        popup.querySelector('.grid-filter-none')?.addEventListener('click', () => { popup.querySelectorAll('input').forEach(c => c.checked = false); update(); });
        popup.querySelector('.grid-filter-close')?.addEventListener('click', () => popup.remove());
      }

      // 바깥 클릭 닫기
      setTimeout(() => {
        const close = (ev) => { if (!popup.contains(ev.target) && ev.target !== th) { popup.remove(); document.removeEventListener('click', close); } };
        document.addEventListener('click', close);
      });
    });

    // 정렬 표시 초기화
    th.classList.remove('is-sort-asc', 'is-sort-desc');
    if (def.type === 'sort' && sortField === def.key && sortDir) {
      th.classList.add(sortDir === 'asc' ? 'is-sort-asc' : 'is-sort-desc');
    }
  });

  // 행 클릭
  bodyEl.querySelectorAll('.grid-row').forEach(row => {
    row.addEventListener('click', () => {
      if (opts.onClick) opts.onClick(row.dataset.key);
    });
  });
}
