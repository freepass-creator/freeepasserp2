import { Sidebar } from '../components/sidebar.js';
import { InventoryView } from '../views/inventory.js';
import { DetailView } from '../views/detailView.js';
import { ChatView } from '../views/chatView.js';

export const UI = {
    selectedCarId: null,

    init() {
        const root = document.getElementById('root');
        root.innerHTML = `
            <div class="flex flex-col h-full bg-[#f1f3f6]">
                <header class="h-[40px] bg-white border-b border-slate-200 flex items-center px-4 justify-between z-50">
                    <div class="flex items-center gap-2">
                        <span class="text-[8px] font-bold text-blue-500 border border-blue-200 px-1.5 py-0.5 rounded bg-blue-50 uppercase font-black">Admin Mode</span>
                    </div>
                    <button onclick="location.reload()" class="text-slate-400 hover:text-rose-500 font-bold text-[9.5px]">로그아웃</button>
                </header>
                <div class="flex-1 flex overflow-hidden relative">
                    <nav id="sidebar-container" class="w-[68px] bg-white border-r border-slate-200 flex flex-col items-center py-2 gap-1 overflow-y-auto hide-scrollbar"></nav>
                    <main id="main-content" class="flex-1 relative overflow-hidden bg-[#f1f3f6] flex flex-col"></main>
                    
                    <aside id="chat-drawer" class="fixed top-[40px] right-[400px] bottom-0 w-[350px] z-[90] bg-white border-l border-slate-200 hidden shadow-none"></aside>
                    <aside id="right-drawer" class="fixed top-[40px] right-0 bottom-0 w-[400px] z-[100] bg-white border-l border-slate-200 hidden flex flex-col shadow-none"></aside>
                </div>
            </div>
        `;
        Sidebar.render('admin');
        this.switchView('inquiry'); 
    },

    switchView(viewId) {
        this.closeDetail(); 
        const main = document.getElementById('main-content');
        const titleMap = {
            'inquiry': { title: '대화현황', icon: 'message-square', color: 'text-blue-600' },
            'registration': { title: '상품등록', icon: 'plus-square', color: 'text-emerald-600' },
            'inventory': { title: '상품현황', icon: 'layout-grid', color: 'text-indigo-600' },
            'settlement': { title: '정산관리', icon: 'bar-chart-3', color: 'text-amber-600' },
            'approval': { title: '승인관리', icon: 'shield-check', color: 'text-rose-600' }
        };

        const current = titleMap[viewId] || { title: viewId, icon: 'box', color: 'text-slate-700' };

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
        }
        if (window.lucide) lucide.createIcons();
    },

    openDetail(carData) {
        const drawer = document.getElementById('right-drawer');

        // 토글: 동일 상품 클릭 시 애니메이션 없이 즉시 닫기
        if (this.selectedCarId === carData.id) {
            this.closeDetail();
            return;
        }

        this.closeChat(); 
        this.selectedCarId = carData.id;
        const managerInfo = { company: "프리패스모빌리티", nameTitle: "박영협 팀장", phone: "010-6393-0926" };

        // [핵심] 나타날 때만 슬라이드 애니메이션 적용
        drawer.innerHTML = DetailView.render(carData, managerInfo);
        drawer.classList.remove('hidden');
        drawer.classList.add('animate-drawer-reset'); // CSS 애니메이션 실행

        if (window.lucide) lucide.createIcons();
    },

    openChat() {
        const chatDrawer = document.getElementById('chat-drawer');
        const car = API.getSampleCars().find(c => c.id === this.selectedCarId);
        if (!car) return;

        chatDrawer.innerHTML = ChatView.render(car);
        chatDrawer.classList.remove('hidden');
        chatDrawer.classList.add('animate-drawer-reset'); // 나타날 때 슬라이드
        
        if (window.lucide) lucide.createIcons();
    },

    closeChat() {
        const chatDrawer = document.getElementById('chat-drawer');
        // [핵심] 닫을 때는 애니메이션 없이 즉시 사라짐
        if (chatDrawer) {
            chatDrawer.classList.add('hidden');
            chatDrawer.classList.remove('animate-drawer-reset');
        }
    },

    closeDetail() {
        this.selectedCarId = null;
        this.closeChat(); 
        const drawer = document.getElementById('right-drawer');
        // [핵심] 상세페이지 닫을 때도 즉시 사라짐 (잔상 방지)
        if (drawer) {
            drawer.classList.add('hidden');
            drawer.classList.remove('animate-drawer-reset');
        }
    }
};

window.switchView = (id) => UI.switchView(id);
window.openDetail = (data) => UI.openDetail(data);
window.closeDetail = () => UI.closeDetail();
window.openChat = () => UI.openChat();
window.closeChat = () => UI.closeChat();
