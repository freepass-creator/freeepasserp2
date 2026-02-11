// /js/app.js
import { loadView } from './router.js';

export async function initApp() {
  // ✅ 1단계: 무조건 로그인 화면부터
  await loadView('./views/login.html');

  // 다음 단계에서 여기서:
  // - 로그인 submit 핸들러 바인딩
  // - 토큰 있으면 workspace로 리다이렉트
  // - 회원가입 링크 누르면 register 로드
}
