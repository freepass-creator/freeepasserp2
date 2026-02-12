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
                    <button onclick="location.reload()" class="text-slate-400 font-bold text-[9px] hover:text-rose-500 transition-colors uppercase font-black">Logout</button>
                </header>
                
                <div class="flex-1 flex overflow-hidden relative">
                    <nav id="sidebar-container" class="w-[64px] bg-white border-r border-slate-200 flex flex-col items-center z-[105] flex-shrink-0"></nav>
                    
                    <main id="main-content" class="flex-1 relative overflow-hidden bg-white border border-slate-200 shadow-sm mt-2 ml-2 transition-all">
                        <div id="page-header" class="view-header flex items-center h-[45px] px-4 border-b border-slate-100 flex-shrink-0 bg-white"></div>
                        <div id="view-body" class="flex-1 overflow-auto bg-white p-1"></div>
                    </main>

                    <aside id="chat-drawer" style="will-change: transform;"
                        class="fixed top-[40px] right-[400px] bottom-0 w-[350px] z-[90] bg-white border-l border-slate-200 shadow-2xl translate-x-full transition-transform duration-300 ease-in-out"></aside>
                    
                    <aside id="right-drawer" style="will-change: transform;"
                        class="fixed top-[40px] right-0 bottom-0 w-[400px] z-[100] bg-white border-l border-slate-200 shadow-2xl translate-x-full transition-transform duration-300 ease-in-out flex flex-col"></aside>
                </div>
            </div>
        `;
        this.switchView(this.currentView); 
    },

    switchView(viewId) {
        this.currentView = viewId;
        this.forceCloseDrawers(); 
        Sidebar.render(viewId);
        const header = document.getElementById('page-header');
        const config = {
            'inquiry': { title: '대화현황', icon: 'message-square', color: 'text-blue-600', render: () => InquiryView.render() },
            'settlement': { title: '정산관리', icon: 'bar-chart-3', color: 'text-amber-600' },
            'approval': { title: '승인관리', icon: 'shield-check', color: 'text-rose-600' },
            'registration': { title: '상품등록', icon: 'plus-square', color: 'text-emerald-600' },
            'inventory': { title: '상품현황', icon: 'layout-grid', color: 'text-indigo-600', render: () => InventoryView.render() }
        };
        const cur = config[viewId] || { title: viewId, icon: 'box', color: 'text-slate-600' };
        header.innerHTML = `<div class="flex items-center gap-2 font-black"><i data-lucide="${cur.icon}" class="w-4 h-4 ${cur.color}"></i><h2 class="text-[12.5px] text-slate-800 uppercase tracking-tighter">${cur.title}</h2></div>`;
        if (cur.render) cur.render();
        if (window.lucide) lucide.createIcons();
    },

    openDetail(carData, autoChat = false) {
        const drawer = document.getElementById('right-drawer');
        if (!drawer) return;

        // [잔상 제거 로직]
        // 1. 일단 기존 애니메이션 끄고 내용 비우고 즉시 숨김
        drawer.style.transition = 'none';
        drawer.classList.add('translate-x-full');
        drawer.innerHTML = ''; 

        // 2. 브라우저가 '비어있는 상태'를 인지하게 한 뒤 새 데이터 삽입
        requestAnimationFrame(() => {
            this.selectedCarData = carData;
            drawer.innerHTML = DetailView.render(carData);
            
            // 3. 아주 짧은 찰나(50ms) 뒤에 애니메이션 켜면서 슬라이딩 시작
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
        if (!this.selectedCarData || !chat) return;

        if (chat.classList.contains('translate-x-full') || forceOpen) {
            chat.style.transition = 'none';
            chat.classList.add('translate-x-full');
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
        if (d) { d.style.transition = 'none'; d.classList.add('translate-x-full'); d.innerHTML = ''; }
        if (c) { c.style.transition = 'none'; c.classList.add('translate-x-full'); c.innerHTML = ''; }
        this.selectedCarData = null;
    },

    closeChat() {
        const c = document.getElementById('chat-drawer');
        if (c) c.classList.add('translate-x-full');
    },

    closeDetail() {
        this.closeChat();
        const d = document.getElementById('right-drawer');
        if (d) d.classList.add('translate-x-full');
        this.selectedCarData = null;
    }
};

window.toggleChat = () => UI.toggleChat();
window.closeChat = () => UI.closeChat();
window.closeDetail = () => UI.closeDetail();
window.switchView = (id) => UI.switchView(id);
