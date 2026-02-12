import { Sidebar } from '../components/sidebar.js';
import { InventoryView } from '../views/inventory.js';
import { DetailView } from '../views/detailView.js';

export const UI = {
    init() {
        document.body.className = "h-screen overflow-hidden bg-[#f1f3f6] font-medium";
        const root = document.getElementById('root');
        
        root.innerHTML = `
            <div class="flex flex-col h-full">
                <header class="h-[40px] bg-white border-b border-slate-200 flex items-center px-4 justify-between z-50">
                    <div class="flex items-center gap-2">
                        <span class="text-[8px] font-bold text-blue-500 border border-blue-200 px-1.5 py-0.5 rounded uppercase tracking-wider bg-blue-50">Admin Mode</span>
                    </div>
                    <div class="flex items-center gap-4">
                        <button onclick="location.reload()" class="text-slate-400 hover:text-rose-500 font-bold text-[9.5px] flex items-center gap-1">
                            <i data-lucide="log-out" class="w-3 h-3"></i> 로그아웃
                        </button>
                    </div>
                </header>

                <div class="flex-1 flex overflow-hidden relative">
                    <nav id="sidebar-container" class="w-[68px] bg-white border-r border-slate-200 flex flex-col items-center py-2 gap-1 overflow-y-auto hide-scrollbar"></nav>
                    
                    <main id="main-content" class="flex-1 relative overflow-hidden bg-[#f1f3f6] flex flex-col"></main>
                    
                    <aside id="right-drawer" class="fixed top-[40px] right-0 bottom-0 w-[400px] bg-white border-l border-slate-200 shadow-2xl translate-x-full z-[100] transition-transform duration-300 flex flex-col"></aside>
                </div>
            </div>
        `;

        Sidebar.render('admin');
        this.switchView('inquiry'); // 기본 화면: 대화현황
    },

    switchView(viewId) {
        const main = document.getElementById('main-content');
        
        // 제목 및 아이콘 매핑 데이터 (한글 이름 고정)
        const titleMap = {
            'inquiry': { title: '대화현황', icon: 'message-square', color: 'text-blue-600' },
            'registration': { title: '상품등록', icon: 'plus-square', color: 'text-emerald-600' },
            'inventory': { title: '상품현황', icon: 'layout-grid', color: 'text-indigo-600' },
            'settlement': { title: '정산관리', icon: 'bar-chart-3', color: 'text-amber-600' },
            'approval': { title: '승인관리', icon: 'shield-check', color: 'text-rose-600' }
        };

        const current = titleMap[viewId] || { title: viewId.toUpperCase(), icon: 'box', color: 'text-slate-700' };

        // 사이드바 활성화 상태 표시
        document.querySelectorAll('.side-btn').forEach(btn => btn.classList.remove('active', 'bg-blue-50', 'text-blue-600', 'border-blue-200'));
        const targetBtn = document.getElementById(`side-btn-${viewId}`);
        if (targetBtn) targetBtn.classList.add('active', 'bg-blue-50', 'text-blue-600', 'border-blue-200');

        // [수정] 아이콘 태그(<i data-lucide...>)를 제목 옆에 다시 배치
        main.innerHTML = `
            <div class="view-header flex items-center h-[38px] px-5 bg-white border-b border-slate-200 shadow-sm">
                <div class="flex items-center gap-2">
                    <i data-lucide="${current.icon}" class="w-[14px] h-[14px] ${current.color}"></i>
                    <h2 class="text-[12.5px] font-bold text-slate-800 tracking-tight">${current.title}</h2>
                </div>
            </div>
            <div class="flex-1 overflow-auto p-4" id="view-body">
                </div>
        `;

        // 페이지별 렌더링 호출
        if (viewId === 'inventory') {
            InventoryView.render();
        } else {
            document.getElementById('view-body').innerHTML = `
                <div class="h-full flex flex-col items-center justify-center text-slate-300">
                    <i data-lucide="${current.icon}" class="w-10 h-10 mb-2 opacity-20"></i>
                    <p class="text-[12px] font-bold">${current.title} 데이터를 불러오는 중...</p>
                </div>
            `;
        }

        // 아이콘 다시 그리기
        if (window.lucide) lucide.createIcons();
    },

    openDetail(carData) {
        const drawer = document.getElementById('right-drawer');
        const managerInfo = { company: "(주)프리패스", nameTitle: "홍길동 팀장", phone: "010-1234-5678" };
        
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

// 전역 함수 연결
window.switchView = (id) => UI.switchView(id);
window.openDetail = (data) => UI.openDetail(data);
window.closeDetail = () => UI.closeDetail();
