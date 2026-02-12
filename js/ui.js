import { Sidebar } from '../components/sidebar.js';
import { InventoryView } from '../views/inventory.js';
import { InquiryView } from '../views/inquiryView.js';
import { DetailView } from '../views/detailView.js';
import { ChatView } from '../views/chatView.js';

export const UI = {
    selectedCarData: null,

    init() {
        const root = document.getElementById('root');
        root.innerHTML = `
            <div class="flex flex-col h-full bg-[#f1f3f6] overflow-hidden font-sans">
                <header class="h-[40px] bg-white border-b border-slate-200 flex items-center px-4 justify-between z-[110] flex-shrink-0">
                    <div id="system-logo" class="font-black text-blue-500 text-[10px] uppercase">Admin System</div>
                    <button onclick="location.reload()" class="text-slate-400 font-bold text-[9px] uppercase hover:text-rose-500">Logout</button>
                </header>
                
                <div class="flex-1 flex overflow-hidden relative">
                    <nav id="sidebar-container" class="w-[64px] bg-white border-r border-slate-200 flex flex-col items-center z-[105] flex-shrink-0"></nav>
                    
                    <main id="main-content" class="flex-1 relative overflow-hidden bg-white border border-slate-200 shadow-sm mt-2 ml-2">
                        <div id="page-header" class="h-[45px] px-4 border-b border-slate-100 flex items-center bg-white"></div>
                        <div id="view-body" class="flex-1 overflow-auto bg-white p-1"></div>
                    </main>

                    <aside id="chat-drawer" style="will-change: transform, opacity;" 
                        class="fixed top-[40px] right-[400px] bottom-0 w-[350px] z-[90] bg-white border-l border-slate-200 shadow-2xl translate-x-full opacity-0 transition-all duration-300 ease-out"></aside>
                    
                    <aside id="right-drawer" style="will-change: transform, opacity;" 
                        class="fixed top-[40px] right-0 bottom-0 w-[400px] z-[100] bg-white border-l border-slate-200 shadow-2xl translate-x-full opacity-0 transition-all duration-300 ease-out flex flex-col"></aside>
                </div>
            </div>
        `;
        this.switchView('inquiry'); 
    },

    switchView(viewId) {
        this.closeDetail();
        Sidebar.render(viewId);
        // ... (생략: 메뉴별 제목 변경 로직)
        if (window.lucide) lucide.createIcons();
    },

    // 창을 여는 "동작"만 수행
    openDetail(carData, autoChat = false) {
        const drawer = document.getElementById('right-drawer');
        this.selectedCarData = carData;
        
        // [중요] 내용(HTML)은 DetailView에서 가져옵니다.
        drawer.innerHTML = DetailView.render(carData);
        
        drawer.classList.remove('translate-x-full', 'opacity-0');
        if (window.lucide) lucide.createIcons();
        if (autoChat) this.toggleChat(true);
    },

    toggleChat(forceOpen = false) {
        const chat = document.getElementById('chat-drawer');
        const isClosed = chat.classList.contains('translate-x-full');
        if (isClosed || forceOpen) {
            chat.innerHTML = ChatView.render(this.selectedCarData);
            chat.classList.remove('translate-x-full', 'opacity-0');
            if (window.lucide) lucide.createIcons();
        } else {
            chat.classList.add('translate-x-full', 'opacity-0');
        }
    },

    closeChat() { document.getElementById('chat-drawer').classList.add('translate-x-full', 'opacity-0'); },
    closeDetail() { 
        this.selectedCarData = null;
        this.closeChat();
        document.getElementById('right-drawer').classList.add('translate-x-full', 'opacity-0'); 
    }
};

window.toggleChat = () => UI.toggleChat();
window.closeChat = () => UI.closeChat();
window.closeDetail = () => UI.closeDetail();
window.switchView = (id) => UI.switchView(id);
