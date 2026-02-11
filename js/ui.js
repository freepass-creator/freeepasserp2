import { Sidebar } from '../components/sidebar.js';

export const UI = {
    init() {
        document.body.className = "h-screen overflow-hidden bg-[#f1f3f6]";
        const root = document.getElementById('root');
        
        root.innerHTML = `
            <div class="flex flex-col h-full">
                <header class="h-[50px] bg-white border-b border-slate-200 flex items-center px-4 justify-between z-50">
                    <div class="flex items-center gap-3">
                        <span class="text-[10px] font-bold text-blue-500 border border-blue-200 px-2 py-0.5 rounded uppercase tracking-wider bg-blue-50">Admin Mode</span>
                    </div>
                    <div class="flex items-center gap-4">
                        <div class="relative flex items-center group">
                            <i data-lucide="search" class="absolute left-3 w-3.5 h-3.5 text-slate-400 group-focus-within:text-blue-500 transition-colors"></i>
                            <input type="text" placeholder="통합 검색..." class="pl-9 pr-4 py-1.5 border border-slate-200 rounded-lg text-[11px] w-64 bg-slate-50 outline-none focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all font-medium">
                        </div>
                        <button onclick="location.reload()" class="text-slate-400 hover:text-rose-500 font-semibold text-[11px] flex items-center gap-1 transition-colors">
                            <i data-lucide="log-out" class="w-3.5 h-3.5"></i> 로그아웃
                        </button>
                    </div>
                </header>

                <div class="flex-1 flex overflow-hidden relative">
                    <nav id="sidebar-container" class="w-[75px] bg-white border-r border-slate-200 flex flex-col items-center py-4 gap-2 overflow-y-auto hide-scrollbar"></nav>
                    <main id="main-content" class="flex-1 relative overflow-hidden bg-[#f1f3f6] flex flex-col"></main>
                    <aside id="right-drawer" class="fixed top-[50px] right-0 bottom-0 w-[450px] bg-white border-l border-slate-200 shadow-2xl translate-x-full z-40 transition-transform duration-300"></aside>
                </div>
            </div>
        `;

        Sidebar.render('admin');
        this.switchView('inquiry'); 
        if (window.lucide) lucide.createIcons();
    },

    switchView(viewId) {
        const main = document.getElementById('main-content');
        
        const titleMap = {
            'inquiry': { title: '대화현황', icon: 'message-square', color: 'text-blue-600' },
            'registration': { title: '상품등록', icon: 'plus-square', color: 'text-emerald-600' },
            'inventory': { title: '상품현황', icon: 'layout-grid', color: 'text-indigo-600' },
            'settlement': { title: '정산관리', icon: 'bar-chart-3', color: 'text-amber-600' },
            'approval': { title: '승인관리', icon: 'shield-check', color: 'text-rose-600' }
        };

        const current = titleMap[viewId] || { title: viewId.toUpperCase(), icon: 'box', color: 'text-slate-700' };

        document.querySelectorAll('.side-btn').forEach(btn => btn.classList.remove('active'));
        const targetBtn = document.getElementById(`side-btn-${viewId}`);
        if (targetBtn) targetBtn.classList.add('active');

        // [변경 포인트] 제목 크기 확대(text-[15px]) 및 굵기 조정(font-bold)
        main.innerHTML = `
            <div class="view-header flex items-center h-[48px] px-6 bg-white border-b border-slate-200 shadow-sm justify-between">
                <div class="flex items-center gap-2.5">
                    <i data-lucide="${current.icon}" class="w-5 h-5 ${current.color}"></i>
                    <h2 class="text-[15px] font-bold text-slate-800 tracking-tight">${current.title}</h2>
                </div>
                <div id="view-actions" class="flex items-center gap-2"></div>
            </div>
            <div class="flex-1 overflow-auto p-6" id="view-body">
                <div class="h-full flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl bg-white/50">
                    <div class="p-5 bg-white rounded-full shadow-sm mb-4">
                        <i data-lucide="${current.icon}" class="w-10 h-10 text-slate-200"></i>
                    </div>
                    <p class="text-slate-400 font-medium text-[13px]">${current.title} 데이터를 준비 중입니다.</p>
                </div>
            </div>
        `;

        if (window.lucide) lucide.createIcons();
    }
};

window.switchView = (id) => UI.switchView(id);
