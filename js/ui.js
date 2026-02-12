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
                    <div class="flex items-center gap-2">
                        <span class="text-[8px] font-bold text-blue-500 border border-blue-200 px-1.5 py-0.5 rounded bg-blue-50 uppercase font-black">Admin Mode</span>
                    </div>
                    <button onclick="location.reload()" class="text-slate-400 hover:text-rose-500 font-bold text-[9.5px] flex items-center gap-1">
                        <i data-lucide="log-out" class="w-3 h-3"></i> 로그아웃
                    </button>
                </header>
                <div class="flex-1 flex overflow-hidden relative">
                    <nav id="sidebar-container" class="w-[68px] bg-white border-r border-slate-200 flex flex-col items-center py-2 gap-1 overflow-y-auto hide-scrollbar"></nav>
                    
                    <main id="main-content" class="flex-1 relative overflow-hidden bg-[#f1f3f6] flex flex-col"></main>
                    
                    <aside id="chat-drawer" class="fixed top-[40px] right-[400px] bottom-0 w-[350px] z-[90] bg-white border-l border-slate-200 transition-transform duration-200 translate-x-full"></aside>
                    <aside id="right-drawer" class="fixed top-[40px] right-0 bottom-0 w-[400px] z-[100] bg-white border-l border-slate-200 transition-transform duration-200 translate-x-full flex flex-col"></aside>
                </div>
            </div>
        `;
        Sidebar.render('admin');
        
        // [요청사항] 로그인 시 대화현황이 메인페이지로 노출
        this.switchView('inquiry'); 
    },

    switchView(viewId) {
        this.closeDetail(); 
        const main = document.getElementById('main-content');
        
        // [요청사항] 상단 제목 한글 유지 및 아이콘 배치
        const titleMap = {
            'inquiry': { title: '대화현황', icon: 'message-square', color: 'text-blue-600' },
            'registration': { title: '상품등록', icon: 'plus-square', color: 'text-emerald-600' },
            'inventory': { title: '상품현황', icon: 'layout-grid', color: 'text-indigo-600' },
            'settlement': { title: '정산관리', icon: 'bar-chart-3', color: 'text-amber-600' },
            'approval': { title: '승인관리', icon: 'shield-check', color: 'text-rose-600' }
        };

        const current = titleMap[viewId] || { title: viewId, icon: 'box', color: 'text-slate-700' };

        // 사이드바 버튼 활성화
        document.querySelectorAll('.side-btn').forEach(btn => btn.classList.remove('active', 'bg-blue-50', 'text-blue-600', 'border-blue-200'));
        const targetBtn = document.getElementById(`side-btn-${viewId}`);
        if (targetBtn) targetBtn.classList.add('active', 'bg-blue-50', 'text-blue-600', 'border-blue-200');

        main.innerHTML = `
            <div class="view-header flex items-center h-[38px] px-5 bg-white border-b border-slate-200 shadow-sm">
                <div class="flex items-center gap-2">
                    <i data-lucide="${current.icon}" class="w-[14px] h-[14px] ${current.color}"></i>
                    <h2 class="text-[12.5px] font-bold text-slate-800 tracking-tight">${current.title}</h2>
                </div>
            </div>
            <div class="flex-1 overflow-auto p-4" id="view-body"></div>
        `;

        if (viewId === 'inventory') {
            InventoryView.render();
        } else {
            document.getElementById('view-body').innerHTML = `
                <div class="h-full flex flex-col items-center justify-center text-slate-300 font-bold">
                    <i data-lucide="${current.icon}" class="w-8 h-8 mb-2 opacity-20"></i>
                    ${current.title} 데이터를 불러오는 중
                </div>`;
        }
        if (window.lucide) lucide.createIcons();
    },

    openDetail(carData) {
        this.closeChat(); 
        const drawer = document.getElementById('right-drawer');
        const managerInfo = { company: "프리패스모빌리티", nameTitle: "박영협 팀장", phone: "010-6393-0926" };

        // [잔상 제거] 불필요한 shadow 클래스 제거 및 즉시 갱신
        drawer.innerHTML = '';
        this.selectedCarData = carData;
        drawer.innerHTML = DetailView.render(carData, managerInfo);
        
        drawer.classList.remove('translate-x-full');
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
        if (chatDrawer) chatDrawer.classList.add('translate-x-full');
    },

    closeDetail() {
        this.closeChat();
        const drawer = document.getElementById('right-drawer');
        if (drawer) drawer.classList.add('translate-x-full');
    }
};

window.switchView = (id) => UI.switchView(id);
window.openDetail = (data) => UI.openDetail(data);
window.closeDetail = () => UI.closeDetail();
window.openChat = () => UI.openChat();
window.closeChat = () => UI.closeChat();
