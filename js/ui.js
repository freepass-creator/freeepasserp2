import { Sidebar } from '../components/sidebar.js';
import { InventoryView } from '../views/inventory.js';
import { InquiryView } from '../views/inquiryView.js';
import { DetailView } from '../views/detailView.js';
import { ChatView } from '../views/chatView.js';

export const UI = {
    currentView: 'inquiry',
    selectedCarData: null,

    init() {
        const root = document.getElementById('root');
        root.innerHTML = `
            <div class="flex flex-col h-full bg-[#f1f3f6] overflow-hidden font-sans">
                <header class="h-[40px] bg-white border-b border-slate-200 flex items-center px-4 justify-between z-[110] flex-shrink-0">
                    <div class="flex items-center gap-2 font-black text-blue-500 text-[10px] tracking-tighter uppercase">Admin System</div>
                    <button onclick="location.reload()" class="text-slate-400 font-bold text-[9px] hover:text-rose-500 transition-colors uppercase">Logout</button>
                </header>
                
                <div class="flex-1 flex overflow-hidden relative">
                    <nav id="sidebar-container" class="w-[64px] bg-white border-r border-slate-200 flex flex-col items-center z-[105] flex-shrink-0"></nav>
                    
                    <main id="main-content" class="flex-1 relative overflow-hidden bg-white border border-slate-200 shadow-sm mt-2 ml-2 transition-all">
                        <div id="page-header" class="view-header flex items-center h-[45px] px-4 border-b border-slate-100 flex-shrink-0 bg-white"></div>
                        <div id="view-body" class="flex-1 overflow-auto bg-white p-1"></div>
                    </main>

                    <aside id="chat-drawer" 
                        class="fixed top-[40px] right-[400px] bottom-0 w-[350px] z-[90] bg-white border-l border-slate-200 shadow-2xl translate-x-full transition-transform duration-300 ease-in-out"></aside>
                    
                    <aside id="right-drawer" 
                        class="fixed top-[40px] right-0 bottom-0 w-[400px] z-[100] bg-white border-l border-slate-200 shadow-2xl translate-x-full transition-transform duration-300 ease-in-out flex flex-col"></aside>
                </div>
            </div>
        `;
        this.switchView(this.currentView); 
    },

    switchView(viewId) {
        this.currentView = viewId;
        this.forceCloseDrawers(); // 메뉴 이동 시 모든 창 즉시 닫기
        Sidebar.render(viewId);
        // ... 생략 ...
    },

    openDetail(carData, autoChat = false) {
        const drawer = document.getElementById('right-drawer');
        if (!drawer) return;

        // 동일 데이터 클릭 시 슬라이딩 클로즈
        if (!autoChat && this.selectedCarData?.차량_번호 === carData.차량_번호) {
            this.closeDetail();
            return;
        }

        // [잔상 제거 핵심] 1. 즉시 숨기기 (애니메이션 끔)
        drawer.style.transition = 'none';
        drawer.classList.add('translate-x-full');

        // 2. 데이터 렌더링
        this.selectedCarData = carData;
        drawer.innerHTML = DetailView.render(carData);

        // 3. 렌더링이 완료된 후 애니메이션 켜고 슬라이딩 시작
        requestAnimationFrame(() => {
            setTimeout(() => {
                drawer.style.transition = 'transform 0.3s ease-in-out';
                drawer.classList.remove('translate-x-full');
                if (window.lucide) lucide.createIcons();
                if (autoChat) this.toggleChat(true);
            }, 50);
        });
    },

    toggleChat(forceOpen = false) {
        const chat = document.getElementById('chat-drawer');
        const isClosed = chat.classList.contains('translate-x-full');

        if (isClosed || forceOpen) {
            chat.style.transition = 'none'; // 렌더링 전 애니메이션 끔
            chat.innerHTML = ChatView.render(this.selectedCarData);
            setTimeout(() => {
                chat.style.transition = 'transform 0.3s ease-in-out';
                chat.classList.remove('translate-x-full');
                if (window.lucide) lucide.createIcons();
            }, 50);
        } else {
            this.closeChat();
        }
    },

    forceCloseDrawers() {
        const d = document.getElementById('right-drawer');
        const c = document.getElementById('chat-drawer');
        if (d) { d.style.transition = 'none'; d.classList.add('translate-x-full'); }
        if (c) { c.style.transition = 'none'; c.classList.add('translate-x-full'); }
        this.selectedCarData = null;
    },

    closeChat() { document.getElementById('chat-drawer').classList.add('translate-x-full'); },
    closeDetail() { 
        this.closeChat(); 
        document.getElementById('right-drawer').classList.add('translate-x-full');
        this.selectedCarData = null;
    }
};

window.toggleChat = () => UI.toggleChat();
window.closeChat = () => UI.closeChat();
window.closeDetail = () => UI.closeDetail();
window.switchView = (id) => UI.switchView(id);
