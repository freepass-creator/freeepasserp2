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

                    <aside id="chat-drawer" style="will-change: transform, opacity;" 
                        class="fixed top-[40px] right-[400px] bottom-0 w-[350px] z-[90] bg-white border-l border-slate-200 shadow-2xl translate-x-full opacity-0 transition-all duration-300 ease-out"></aside>
                    
                    <aside id="right-drawer" style="will-change: transform, opacity;" 
                        class="fixed top-[40px] right-0 bottom-0 w-[400px] z-[100] bg-white border-l border-slate-200 shadow-2xl translate-x-full opacity-0 transition-all duration-300 ease-out flex flex-col"></aside>
                </div>
            </div>
        `;
        this.switchView(this.currentView); 
    },

    switchView(viewId) {
        this.currentView = viewId;
        this.closeDetail();
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
        header.innerHTML = `<div class="flex items-center gap-2"><i data-lucide="${cur.icon}" class="w-4 h-4 ${cur.color}"></i><h2 class="text-[12.5px] font-black text-slate-800 uppercase tracking-tighter">${cur.title}</h2></div>`;
        if (cur.render) cur.render();
        if (window.lucide) lucide.createIcons();
    },

    openDetail(carData, autoChat = false) {
        const drawer = document.getElementById('right-drawer');
        if (!drawer) return;

        // 토글 처리 (동일 상품 클릭 시 닫기)
        if (!autoChat && this.selectedCarData?.차량_번호 === carData.차량_번호) {
            const isOpened = !drawer.classList.contains('translate-x-full');
            if (isOpened) { this.closeDetail(); return; }
        }

        // 새 데이터를 넣기 전에 완전히 투명하게 초기화 (잔상 방지)
        drawer.style.transition = 'none';
        drawer.classList.add('translate-x-full', 'opacity-0');
        
        // 브라우저 리플로우 강제 유도 후 데이터 렌더링 및 애니메이션 시작
        requestAnimationFrame(() => {
            this.selectedCarData = carData;
            drawer.innerHTML = DetailView.render(carData, { company: "프리패스모빌리티", nameTitle: "박영협 팀장", phone: "010-6393-0926" });
            
            setTimeout(() => {
                drawer.style.transition = 'all 0.3s ease-out';
                drawer.classList.remove('translate-x-full', 'opacity-0');
                if (window.lucide) lucide.createIcons();
                if (autoChat) this.toggleChat(true);
            }, 50); // 약간의 렌더링 딜레이를 주어 안정성 확보
        });
    },

    toggleChat(forceOpen = false) {
        const chat = document.getElementById('chat-drawer');
        if (!this.selectedCarData || !chat) return;

        const isClosed = chat.classList.contains('translate-x-full');

        if (isClosed || forceOpen) {
            chat.innerHTML = ChatView.render(this.selectedCarData);
            chat.classList.remove('translate-x-full', 'opacity-0');
            if (window.lucide) lucide.createIcons();
        } else {
            chat.classList.add('translate-x-full', 'opacity-0');
        }
    },

    closeChat() {
        const c = document.getElementById('chat-drawer');
        if (c) c.classList.add('translate-x-full', 'opacity-0');
    },

    closeDetail() {
        this.selectedCarData = null;
        this.closeChat();
        const d = document.getElementById('right-drawer');
        if (d) d.classList.add('translate-x-full', 'opacity-0');
    }
};

window.toggleChat = () => UI.toggleChat();
window.closeChat = () => UI.closeChat();
window.closeDetail = () => UI.closeDetail();
window.openDetailByIndex = (idx) => { if (window.inventoryData?.[idx]) UI.openDetail(window.inventoryData[idx], false); };
window.openFullChatByIndex = (idx) => { if (window.inquiryData?.[idx]) UI.openDetail(window.inquiryData[idx].차량정보, true); };
window.switchView = (id) => UI.switchView(id);
