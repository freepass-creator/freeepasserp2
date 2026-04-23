/**
 * 공용 컨텍스트 메뉴 (우클릭 팝업) — 서브메뉴·구분선·활성표시 지원
 *
 * 사용:
 *   openContextMenu(e, [
 *     { icon, label, action },
 *     { divider: true },
 *     { icon, label, submenu: [{ label, action, active? }, ...] },
 *     { icon, label, action, danger: true, disabled: true }
 *   ])
 */

let menuStack = [];  // 열려있는 메뉴들 [root, sub1, sub2, ...]
let rootAC = null;   // 루트 이벤트 cleanup

function renderMenu(items, position) {
  const menu = document.createElement('div');
  menu.className = 'ctx-menu';
  menu.setAttribute('role', 'menu');
  menu.innerHTML = items.map((it, i) => {
    if (!it || it.divider) return `<div class="ctx-divider" role="separator"></div>`;
    const cls = [
      'ctx-item',
      it.danger ? 'is-danger' : '',
      it.active ? 'is-active' : '',
      it.disabled ? 'is-disabled' : '',
      it.submenu ? 'has-submenu' : '',
    ].filter(Boolean).join(' ');
    return `
      <button class="${cls}" role="menuitem" data-i="${i}" ${it.disabled ? 'disabled' : ''}>
        ${it.icon ? `<i class="${it.icon}" aria-hidden="true"></i>` : ''}
        <span>${it.label}</span>
        ${it.active ? '<i class="ph ph-check ctx-check" aria-hidden="true"></i>' : ''}
        ${it.submenu ? '<i class="ph ph-caret-right ctx-caret" aria-hidden="true"></i>' : ''}
      </button>
    `;
  }).join('');
  document.body.appendChild(menu);

  const w = menu.offsetWidth;
  const h = menu.offsetHeight;
  let px, py;
  if (position.type === 'submenu') {
    // 오른쪽으로 펴기, 공간 부족하면 왼쪽으로
    px = position.right + w > window.innerWidth - 8
      ? Math.max(8, position.left - w)
      : position.right;
    py = Math.min(position.top, window.innerHeight - h - 8);
  } else {
    px = Math.min(position.clientX, window.innerWidth - w - 8);
    py = Math.min(position.clientY, window.innerHeight - h - 8);
  }
  menu.style.left = `${px}px`;
  menu.style.top  = `${py}px`;

  menu._items = items;
  return menu;
}

function closeFrom(depth) {
  while (menuStack.length > depth) {
    const m = menuStack.pop();
    m.remove();
  }
}

function openSubmenuAt(parentMenu, items, anchorEl) {
  // 같은 parent 에서 다른 서브 열려있으면 닫기
  const parentDepth = menuStack.indexOf(parentMenu);
  closeFrom(parentDepth + 1);

  const rect = anchorEl.getBoundingClientRect();
  const sub = renderMenu(items, {
    type: 'submenu',
    right: rect.right,
    left: rect.left,
    top: rect.top - 4,
  });
  bindMenu(sub);
  menuStack.push(sub);
}

function bindMenu(menu) {
  const items = menu._items;

  menu.addEventListener('click', (e) => {
    const btn = e.target.closest('.ctx-item');
    if (!btn || btn.disabled) return;
    const i = Number(btn.dataset.i);
    const item = items[i];
    if (item.submenu) {
      openSubmenuAt(menu, item.submenu, btn);
      return;
    }
    closeContextMenu();
    item.action?.();
  });

  // hover → submenu 자동 열림 (같은 레벨의 다른 서브는 닫힘)
  menu.addEventListener('mouseover', (e) => {
    const btn = e.target.closest('.ctx-item');
    if (!btn || btn.disabled) return;
    const i = Number(btn.dataset.i);
    const item = items[i];
    const depth = menuStack.indexOf(menu);
    closeFrom(depth + 1);
    if (item?.submenu) openSubmenuAt(menu, item.submenu, btn);
  });
}

export function openContextMenu(event, items) {
  event.preventDefault();
  closeContextMenu();

  const root = renderMenu(items, { clientX: event.clientX, clientY: event.clientY });
  bindMenu(root);
  menuStack.push(root);
  root.querySelector('.ctx-item:not([disabled])')?.focus();

  rootAC = new AbortController();
  setTimeout(() => {
    document.addEventListener('click', (ev) => {
      if (!menuStack.some(m => m.contains(ev.target))) closeContextMenu();
    }, { signal: rootAC.signal });
    document.addEventListener('contextmenu', (ev) => {
      if (!menuStack.some(m => m.contains(ev.target))) closeContextMenu();
    }, { signal: rootAC.signal });
    document.addEventListener('keydown', onKey, { signal: rootAC.signal });
  }, 0);
}

function onKey(e) {
  if (!menuStack.length) return;
  const top = menuStack[menuStack.length - 1];
  if (e.key === 'Escape') {
    e.preventDefault();
    if (menuStack.length > 1) {
      closeFrom(menuStack.length - 1);
      menuStack[menuStack.length - 1].querySelector('.ctx-item:not([disabled])')?.focus();
    } else {
      closeContextMenu();
    }
    return;
  }
  const itemEls = Array.from(top.querySelectorAll('.ctx-item:not([disabled])'));
  const idx = itemEls.indexOf(document.activeElement);
  if (e.key === 'ArrowDown') { e.preventDefault(); itemEls[(idx + 1) % itemEls.length]?.focus(); }
  else if (e.key === 'ArrowUp') { e.preventDefault(); itemEls[(idx - 1 + itemEls.length) % itemEls.length]?.focus(); }
  else if (e.key === 'ArrowRight' && idx >= 0 && itemEls[idx].classList.contains('has-submenu')) {
    e.preventDefault();
    itemEls[idx].click();
    setTimeout(() => menuStack[menuStack.length - 1]?.querySelector('.ctx-item:not([disabled])')?.focus(), 0);
  }
  else if (e.key === 'ArrowLeft' && menuStack.length > 1) {
    e.preventDefault();
    closeFrom(menuStack.length - 1);
    menuStack[menuStack.length - 1].querySelector('.ctx-item:not([disabled])')?.focus();
  }
  else if (e.key === 'Enter' && idx >= 0) { e.preventDefault(); itemEls[idx].click(); }
}

export function closeContextMenu() {
  closeFrom(0);
  rootAC?.abort();
  rootAC = null;
}
