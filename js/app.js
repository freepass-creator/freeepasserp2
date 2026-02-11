import { loadView } from './router.js';

export async function initApp() {
  await loadView('./views/login.html');

  // 이벤트는 딱 한 번만 등록 (화면이 바뀌어도 유지됨)
  document.addEventListener('click', onClick);
  document.addEventListener('submit', onSubmit);
}

async function onClick(e) {
  if (e.target.id === 'go-register') {
    await loadView('./views/register.html');
  }

  if (e.target.id === 'go-login') {
    await loadView('./views/login.html');
  }
}

async function onSubmit(e) {
  if (e.target.id === 'login-form') {
    e.preventDefault();
    // TODO: 로그인 성공 시 workspace 로드
    // await loadView('./views/workspace.html');
  }

  if (e.target.id === 'register-form') {
    e.preventDefault();
    // TODO: 회원가입 처리 후 로그인 화면으로
    await loadView('./views/login.html');
  }
}
