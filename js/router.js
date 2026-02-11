// /js/router.js
export async function loadView(viewPath) {
  const root = document.getElementById('app-root');
  if (!root) throw new Error('app-root_not_found');

  const res = await fetch(viewPath, { cache: 'no-store' });
  if (!res.ok) throw new Error(`view_load_failed: ${viewPath}`);

  const html = await res.text();
  root.innerHTML = html;

  // 새로 주입된 DOM에 lucide 아이콘 다시 적용
  if (window.lucide?.createIcons) window.lucide.createIcons();
}
