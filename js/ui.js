// js/ui.js 전체 코드 (수정된 버전)

import { Sidebar } from '../components/sidebar.js';

export const UI = {
    init() {
        document.body.className = "h-screen overflow-hidden bg-[#f1f3f6]";
        const root = document.getElementById('root');
        
        root.innerHTML = `
            <div class="flex flex-col h-full">
                <header class="h-[50px] bg-white border-b border-slate-200 flex items-center px-4 justify-between z-50">
                    <div class="flex items-center gap-3">
                        <span class="text-[9px] font-bold text-blue-500 border border-blue-200 px-1.5 rounded uppercase">Admin Mode</span>
                    </div>
                    <div class="flex items-center gap-4">
                        <button onclick="location.reload()" class="text-slate-400 hover:text-rose-500 font-bold text-[10px] flex items-center gap-1">
                            <i data-lucide="log-out" class="w-3 h-3"></i> 로그아웃
                        </button>
                    </div>
                </header>

                <div class="flex-1 flex overflow-hidden relative">
                    <nav id="sidebar-container" class="w-[75px] bg-white border-r border-slate-200 flex flex-col items-center py-6 gap-4 overflow-y-auto"></nav>
                    <main id="main-content" class="flex-1 relative overflow-hidden bg-[#f1f3f6] flex flex-col"></main>
                    <aside id="right-drawer" class="fixed top-[50px] right-0 bottom-0 w-[450px] bg-white border-l shadow-2xl translate-x-full z-40 transition-transform duration-300"></aside>
                </div>
            </div>
        `;

        Sidebar.render('admin');
        this.switchView('inventory');
        if (window.lucide) lucide.createIcons();
    },

    switchView(viewId) {
        const main = document.getElementById('main-content');
        document.querySelectorAll('.side-btn').forEach(btn => btn.classList.remove('active'));
        const targetBtn = document.getElementById(`side-btn-${viewId}`);
        if (targetBtn) targetBtn.classList.add('active');

        // 메인 화면 초기 구성
        main.innerHTML = `
            <div class="view-title flex items-center h-10 px-4 bg-white border-b border-slate-200 font-black text-slate-700">
                ${viewId.toUpperCase()} MANAGEMENT
            </div>
            <div class="flex-1 overflow-auto p-4" id="view-container">
                <p class="text-slate-400 font-bold text-center mt-20">${viewId} 화면을 준비 중입니다.</p>
            </div>
        `;
    }
};

window.switchView = (id) => UI.switchView(id);
