import { Sidebar } from '../components/sidebar.js';
import { InventoryView } from '../views/inventory.js';
import { DetailView } from '../views/detailView.js';
import { ChatView } from '../views/chatView.js';

export const UI = {
    selectedCarData: null,

    init() {
        const root = document.getElementById('root');
        root.innerHTML = `
            <div class="flex flex-col h-full bg-[#f1f3f6]">
                <header class="h-[40px] bg-white border-b border-slate-200 flex items-center px-4 justify-between z-50">
                    <span class="text-[8px] font-black text-blue-500 border border-blue-200 px-1.5 py-0.5 rounded bg-blue-50">ADMIN MODE</span>
                    <button onclick="location.reload()" class="text-slate-400 font-bold text-[9px]">LOGOUT</button>
                </header>
                <div class="flex-1 flex overflow-hidden relative">
                    <nav id="sidebar-container" class="w-[68px] bg-white border-r border-slate-200 flex flex-col items-center py-2 gap-1 overflow-y-auto hide-scrollbar"></nav>
                    <main id="main-content" class="flex-1 relative overflow-hidden bg-[#f1f3f6] flex flex-col"></main>
                    <aside id="chat-drawer" class="fixed top-[40px] right-[400px] bottom-0 w-[350px] z-[90] bg-white border-l border-slate-200 hidden"></aside>
                    <aside id="right-drawer" class="fixed top-[40px] right-0 bottom-0 w-[400px] z-[100] bg-white border-l border-slate-200 hidden flex flex-col"></aside>
                </div>
            </div>
        `;
        Sidebar.render('admin');
        this.switchView('inquiry'); // 초기화면
    },

    switchView(viewId) {
        this.closeDetail();
        const main = document.getElementById('main-content');
        
        // [고정] 각 페이지별 타이틀과 매칭되는 아이콘 설정
        const pageConfig = {
            'inquiry': { title: '대화현황', icon: 'message-square', color: 'text-blue-600' },
            'registration': { title: '상품등록', icon: 'plus-square', color: 'text-emerald-600' },
            'inventory': { title: '상품현황', icon: 'layout-grid', color: 'text-indigo-600' },
            'settlement': { title: '정산관리', icon: 'bar-chart-3', color: 'text-amber-600' },
            'approval': { title: '승인관리', icon: 'shield-check', color: 'text-rose-600' }
        };

        const current = pageConfig[viewId] || { title: viewId, icon: 'box', color: 'text-slate-600' };

        main.innerHTML = `
            <div class="view-header flex items-center h-[45px] px-5 bg-white border-b border-slate-200 shadow-sm">
                <div class="flex items-center gap-2.5">
                    <i data-lucide="${current.icon}" class="w-4 h-4 ${current.color}"></i>
                    <h2 class="text-[13px] font-black text-slate-800 tracking-tighter">${current.title}</h2>
                </div>
            </div>
            <div class="flex-1 overflow-auto p-4" id="view-body">
                ${['settlement', 'approval', 'registration'].includes(viewId) ? 
                    `<div class="h-full flex flex-col items-center justify-center text-slate-400 gap-2">
                        <i data-lucide="construct" class="w-8 h-8 opacity-20"></i>
                        <p class="text-[11px] font-bold uppercase tracking-widest">${current.title} 모듈 준비 중</p>
                    </div>` : ''}
            </div>
        `;

        if (viewId === 'inventory') InventoryView.render();
        
        // 아이콘 렌더링
        if (window.lucide) lucide.createIcons();
    },

    openDetail(carData) {
        const drawer = document.getElementById('right-drawer');
        if (!drawer) return;
        if (this.selectedCarData?.차량_번호 === carData.차량_번호) { this.closeDetail(); return; }
        this.closeChat();
        this.selectedCarData = carData;
        const managerInfo = { company: "프리패스모빌리티", nameTitle: "박영협 팀장", phone: "010-6393-0926" };
        drawer.innerHTML = DetailView.render(carData, managerInfo);
        drawer.classList.remove('hidden');
        drawer.classList.add('animate-drawer-reset');
        if (window.lucide) lucide.createIcons();
    },

    openChat() {
        const chatDrawer = document.getElementById('chat-drawer');
        if (!this.selectedCarData || !chatDrawer) return;
        chatDrawer.innerHTML = ChatView.render(this.selectedCarData);
        chatDrawer.classList.remove('hidden');
        chatDrawer.classList.add('animate-drawer-reset');
        if (window.lucide) lucide.createIcons();
    },

    closeChat() {
        const chatDrawer = document.getElementById('chat-drawer');
        if (chatDrawer) { chatDrawer.classList.add('hidden'); chatDrawer.classList.remove('animate-drawer-reset'); }
    },

    closeDetail() {
        this.selectedCarData = null;
        this.closeChat();
        const drawer = document.getElementById('right-drawer');
        if (drawer) { drawer.classList.add('hidden'); drawer.classList.remove('animate-drawer-reset'); }
    }
};

window.openDetailByIndex = (index) => {
    if (window.inventoryData && window.inventoryData[index]) UI.openDetail(window.inventoryData[index]);
};
window.closeDetail = () => UI.closeDetail();
window.openChat = () => UI.openChat();
window.closeChat = () => UI.closeChat();
window.switchView = (id) => UI.switchView(id);
