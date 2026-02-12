// [FILE: /actions/auth-handler.js]
import { AuthService } from '../services/auth-service.js';

export const AuthHandler = {
    init: () => {
        const loginForm = document.getElementById('login-form');
        if (!loginForm) return;

        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const uid = document.getElementById('uid').value;
            const upw = document.getElementById('upw').value;

            if (!uid || !upw) {
                alert('아이디와 비밀번호를 입력하세요.');
                return;
            }

            const user = await AuthService.login(uid, upw);
            if (user.isLoggedIn) {
                // 로그인 성공 시 통합 작업 페이지로 이동
                window.location.href = 'main.html';
            }
        });
    }
};
