import { Sidebar } from '../components/sidebar.js';
import { InventoryView } from '../views/inventory.js';
import { DetailView } from '../views/detailView.js';
import { ChatView } from '../views/chatView.js';

export const UI = {
    selectedCarData: null,

    init() {
        const root = document.getElementById('root');
        root.innerHTML = `
            <header class="h-[40px] bg-white border-b border-slate-200 flex items-center px-4 justify-between z-50">
                <div class="flex items-center gap-2">
                    <span class="text-[8px] font-bold text-blue-500 border border-blue-200 px-1.5 py-0.5 rounded bg-blue-50 uppercase">Admin Mode</span>
                </div>
                <button onclick="location.reload()" class="text-slate-400 font-bold text-[9.5px]">로그아웃</button>
            </header>
            <div class="flex-1 flex overflow-hidden relative">
                <nav id="sidebar-container" class="w-[68px] bg-white border-r border-slate-200 flex flex-col items-center py-2 gap-1 overflow-y-auto hide-scrollbar"></nav>
                <main id="main-content" class="flex-1 relative overflow-hidden bg-[#f1f3f6] flex flex-col"></main>
                
                <aside id="chat-drawer" class="fixed top-[40px] right-[400px] bottom-0 w-[350px] z-[90] transition-transform duration-300 translate-x-full shadow-2xl"></aside>
                
                <aside id="right-drawer" class="fixed top-[40px] right-0 bottom-0 w-[400px] z-[100] transition-transform duration-300 translate-x-full shadow-2xl flex flex-col"></aside>
            </div>
        `;
        Sidebar.render('admin');
        this.switchView('inventory'); 
    },

    switchView(viewId) {
        this.closeDetail(); // 메뉴 이동 시 즉시 종료
        const main = document.getElementById('main-content');
        main.innerHTML = `
            <div class="view-header flex items-center h-[38px] px-5 bg-white border-b border-slate-200 shadow-sm">
                <h2 class="text-[12.5px] font-bold text-slate-800">${viewId.toUpperCase()}</h2>
            </div>
            <div class="flex-1 overflow-auto p-4" id="view-body"></div>
        `;
        if (viewId === 'inventory') InventoryView.render();
        if (window.lucide) lucide.createIcons();
    },

    openDetail(carData) {
        this.closeChat(); // 새 상품 클릭 시 채팅창 닫기
        const drawer = document.getElementById('right-drawer');
        const managerInfo = { company: "(주)프리패스", nameTitle: "박영협 팀장", phone: "010-6393-0926" };

        // 즉시 교체 로직: 애니메이션 초기화 후 재생
        drawer.innerHTML = '';
        drawer.classList.remove('animate-drawer-reset');
        void drawer.offsetWidth; 

        this.selectedCarData = carData;
        drawer.innerHTML = DetailView.render(carData, managerInfo);
        drawer.classList.remove('translate-x-full');
        drawer.classList.add('animate-drawer-reset');
        if (window.lucide) lucide.createIcons();
    },

    openChat() {
        const chatDrawer = document.getElementById('chat-drawer');
        if (!this.selectedCarData) return;

        chatDrawer.innerHTML = ChatView.render(this.selectedCarData);
        chatDrawer.classList.remove('translate-x-full');
        if (window.lucide) lucide.createIcons();
    },

    closeChat() {
        const chatDrawer = document.getElementById('chat-drawer');
        chatDrawer.classList.add('translate-x-full');
    },

    closeDetail() {
        this.closeChat();
        const drawer = document.getElementById('right-drawer');
        drawer.classList.add('translate-x-full');
        drawer.classList.remove('animate-drawer-reset');
    }
};

window.switchView = (id) => UI.switchView(id);
window.openDetail = (data) => UI.openDetail(data);
window.closeDetail = () => UI.closeDetail();
window.openChat = () => UI.openChat();
window.closeChat = () => UI.closeChat();
