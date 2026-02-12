import { Sidebar } from '../components/sidebar.js';
import { InventoryView } from '../views/inventory.js';
import { DetailView } from '../views/detailView.js'; // 상세페이지 모듈 임포트

export const UI = {
    init() {
        const root = document.getElementById('root');
        root.innerHTML = `
            <header class="h-[40px] bg-white border-b border-slate-200 flex items-center px-4 justify-between z-50">
                <div class="flex items-center gap-2">
                    <span class="text-[8px] font-bold text-blue-500 border border-blue-200 px-1.5 py-0.5 rounded bg-blue-50 uppercase">Admin Mode</span>
                </div>
                <button onclick="location.reload()" class="text-slate-400 font-bold text-[10px]">로그아웃</button>
            </header>
            <div class="flex-1 flex overflow-hidden relative">
                <nav id="sidebar-container" class="w-[68px] bg-white border-r border-slate-200 flex flex-col items-center py-2 gap-1"></nav>
                <main id="main-content" class="flex-1 relative overflow-hidden bg-[#f1f3f6] flex flex-col"></main>
                <aside id="right-drawer" class="fixed top-[40px] right-0 bottom-0 w-[400px] bg-white border-l border-slate-200 shadow-2xl translate-x-full z-[100] transition-transform duration-300 flex flex-col"></aside>
            </div>
        `;
        Sidebar.render('admin');
        this.switchView('inquiry'); 
    },

    switchView(viewId) {
        const main = document.getElementById('main-content');
        // ... (제목/아이콘 매핑 로직) ...
        main.innerHTML = `
            <div class="view-header flex items-center h-[38px] px-5 bg-white border-b border-slate-200 shadow-sm">
                <h2 class="text-[12.5px] font-bold text-slate-800">${viewId.toUpperCase()}</h2>
            </div>
            <div class="flex-1 overflow-auto p-4" id="view-body"></div>
        `;

        if (viewId === 'inventory') {
            InventoryView.render(); // 상품현황 렌더링
        }
        if (window.lucide) lucide.createIcons();
    },

    // [핵심] 어느 뷰에서든 호출 가능한 상세페이지 오픈 함수
    openDetail(carData) {
        const drawer = document.getElementById('right-drawer');
        const managerInfo = { company: "(주)프리패스", nameTitle: "홍길동 팀장", phone: "010-1234-5678" }; // 임시 데이터
        
        // DetailView 모듈을 사용하여 HTML 주입
        drawer.innerHTML = DetailView.render(carData, managerInfo);
        
        drawer.classList.remove('translate-x-full');
        drawer.classList.add('animate-drawer-reset');
        if (window.lucide) lucide.createIcons();
    },

    closeDetail() {
        const drawer = document.getElementById('right-drawer');
        drawer.classList.add('translate-x-full');
        drawer.classList.remove('animate-drawer-reset');
    }
};

window.switchView = (id) => UI.switchView(id);
window.openDetail = (data) => UI.openDetail(data); // 전역 바인딩
window.closeDetail = () => UI.closeDetail();
