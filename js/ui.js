import { Sidebar } from '../components/sidebar.js';
import { InventoryView } from '../views/inventory.js';

export const UI = {
    init() {
        document.body.className = "h-screen overflow-hidden bg-[#f1f3f6] font-medium";
        const root = document.getElementById('root');
        root.innerHTML = `
            <div class="flex flex-col h-full">
                <header class="h-[44px] bg-white border-b border-slate-200 flex items-center px-4 justify-between z-50">
                    <div class="flex items-center gap-2">
                        <span class="text-[8.5px] font-bold text-blue-500 border border-blue-200 px-1.5 py-0.5 rounded uppercase tracking-wider bg-blue-50">Admin Mode</span>
                    </div>
                    <button onclick="location.reload()" class="text-slate-400 hover:text-rose-500 font-bold text-[10px]">로그아웃</button>
                </header>
                <div class="flex-1 flex overflow-hidden">
                    <nav id="sidebar-container" class="w-[68px] bg-white border-r flex flex-col items-center py-3 gap-1"></nav>
                    <main id="main-content" class="flex-1 bg-[#f1f3f6] overflow-hidden flex flex-col"></main>
                </div>
            </div>
        `;
        Sidebar.render('admin');
        this.switchView('inventory'); // 초기 실행 시 인벤토리 호출
    },

    switchView(viewId) {
        const main = document.getElementById('main-content');
        
        // 제목 매핑 로직 (생략된 경우를 대비해 다시 작성)
        const titles = { 'inventory': '상품현황', 'inquiry': '대화현황', 'registration': '상품등록' };
        const title = titles[viewId] || viewId.toUpperCase();

        main.innerHTML = `
            <div class="view-header flex items-center h-[40px] px-5 bg-white border-b border-slate-200 shadow-sm">
                <h2 class="text-[13px] font-bold text-slate-800">${title}</h2>
            </div>
            <div class="flex-1 overflow-auto p-4" id="view-body"></div>
        `;

        if (viewId === 'inventory') {
            InventoryView.render(); // 여기서 인벤토리 뷰 호출!
        }

        if (window.lucide) lucide.createIcons();
    }
};

window.switchView = (id) => UI.switchView(id);
