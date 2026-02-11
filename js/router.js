// /js/router.js
export async function loadView(viewPath) {
  const root = document.getElementById('app-root');
  if (!root) throw new Error('app-root_not_found');

  const res = await fetch(viewPath, { cache: 'no-store' });
  if (!res.ok) throw new Error(`view_load_failed: ${viewPath}`);

  root.innerHTML = await res.text();

  if (window.lucide?.createIcons) window.lucide.createIcons();
}
