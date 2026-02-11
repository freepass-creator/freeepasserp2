// /js/app.js
import { loadView } from './router.js';

export async function initApp() {
  await loadView('./views/login.html');

  document.addEventListener('click', async (e) => {
    const btn = e.target.closest('button');
    const id = btn?.id || e.target?.id;

    if (id === 'go-register') {
      await loadView('./views/register.html');
      return;
    }
    if (id === 'go-login') {
      await loadView('./views/login.html');
      return;
    }
  });
}
