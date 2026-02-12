import { Sidebar } from '../components/sidebar.js';
import { InventoryView } from '../views/inventory.js';
import { DetailView } from '../views/detailView.js';
import { ChatView } from '../views/chatView.js';

export const UI = {
    selectedCar: null,

    init() {
        const root = document.getElementById('root');
        root.innerHTML = `
            <div class="flex flex-col h-full bg-[#f1f3f6]">
                <header class="h-[40px] bg-white border-b border-slate-200 flex items-center px-4 justify-between z-50">
                    <span class="text-[8px] font-black text-blue-500 border border-blue-200 px-1.5 py-0.5 rounded bg-blue-50 uppercase">Admin Mode</span>
                    <button onclick="location.reload()" class="text-slate-400 font-bold text-[9.5px]">로그아웃</button>
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
        this.switchView('inquiry'); 
    },

    switchView(viewId) {
        this.closeDetail();
        const main = document.getElementById('main-content');
        main.innerHTML = `
            <div class="view-header flex items-center h-[38px] px-5 bg-white border-b border-slate-200 shadow-sm">
                <div class="flex items-center gap-2"><h2 class="text-[12.5px] font-bold text-slate-800 tracking-tight">${viewId === 'inventory' ? '상품현황' : '대화현황'}</h2></div>
            </div>
            <div class="flex-1 overflow-auto p-4" id="view-body"></div>
        `;
        if (viewId === 'inventory') InventoryView.render();
        if (window.lucide) lucide.createIcons();
    },

    openDetail(carData) {
        const drawer = document.getElementById('right-drawer');
        if (this.selectedCar?.차량_번호 === carData.차량_번호) { this.closeDetail(); return; }
        
        this.closeChat();
        this.selectedCar = carData;
        const managerInfo = { company: "프리패스모빌리티", nameTitle: "박영협 팀장", phone: "010-6393-0926" };

        drawer.innerHTML = DetailView.render(carData, managerInfo);
        drawer.classList.remove('hidden');
        drawer.classList.add('animate-drawer-reset'); // 등장할 때만 슬라이드
        if (window.lucide) lucide.createIcons();
    },

    openChat() {
        const chatDrawer = document.getElementById('chat-drawer');
        if (!this.selectedCar) return;
        chatDrawer.innerHTML = ChatView.render(this.selectedCar);
        chatDrawer.classList.remove('hidden');
        chatDrawer.classList.add('animate-drawer-reset');
        if (window.lucide) lucide.createIcons();
    },

    closeChat() {
        const chatDrawer = document.getElementById('chat-drawer');
        if (chatDrawer) { chatDrawer.classList.add('hidden'); chatDrawer.classList.remove('animate-drawer-reset'); }
    },

    closeDetail() {
        this.selectedCar = null;
        this.closeChat();
        const drawer = document.getElementById('right-drawer');
        if (drawer) { drawer.classList.add('hidden'); drawer.classList.remove('animate-drawer-reset'); }
    }
};

window.openDetail = (data) => UI.openDetail(data);
window.closeDetail = () => UI.closeDetail();
window.openChat = () => UI.openChat();
window.closeChat = () => UI.closeChat();
window.switchView = (id) => UI.switchView(id);
