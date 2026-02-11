import { UI } from './ui.js';

// 앱 시작 시 로그인 화면 로드
document.addEventListener('DOMContentLoaded', () => {
    renderLogin();
});

// [화면 1] 로그인 렌더링
function renderLogin() {
    document.body.className = "h-screen overflow-hidden bg-[#0f172a]";
    const root = document.getElementById('root');
    root.innerHTML = `
        <div class="flex items-center justify-center h-full p-6">
            <div class="w-full max-w-sm space-y-8">
                <div class="text-center">
                    <h1 class="text-3xl font-black text-blue-500 italic tracking-tighter">FREEPASS MOBILITY</h1>
                    <p class="text-slate-400 text-[10px] tracking-widest uppercase mt-2 opacity-70">Unified ERP System</p>
                </div>
                <div class="bg-white/5 p-8 border border-white/10 rounded-2xl backdrop-blur-md shadow-2xl">
                    <div class="space-y-4">
                        <div class="text-left">
                            <label class="text-[9px] text-white/30 ml-1 uppercase font-bold">보안코드 인증</label>
                            <input type="password" id="login-pw" placeholder="••••" class="w-full p-4 bg-slate-900 border border-slate-700 text-white text-center tracking-[1em] outline-none rounded-xl focus:border-blue-500 mt-1">
                        </div>
                        <button onclick="checkAuth()" class="w-full py-4 bg-blue-600 text-white font-black rounded-xl shadow-xl hover:bg-blue-500 transition-all">시스템 보안 접속</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// 인증 확인 함수
window.checkAuth = () => {
    const pw = document.getElementById('login-pw').value;
    if (pw === '7777') {
        // 로그인 성공 시 작업장으로 전환
        UI.init();
    } else {
        alert('보안코드가 일치하지 않습니다.');
    }
};
