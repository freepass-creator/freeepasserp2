// ... 상단 import 부분 동일 ...

export const UI = {
    // ... init 생략 ...

    switchView(viewId) {
        // [중요] 다른 메뉴 클릭 시 상세페이지 즉시 종료
        this.closeDetail();

        const main = document.getElementById('main-content');
        const titleMap = {
            'inquiry': { title: '대화현황', icon: 'message-square', color: 'text-blue-600' },
            'registration': { title: '상품등록', icon: 'plus-square', color: 'text-emerald-600' },
            'inventory': { title: '상품현황', icon: 'layout-grid', color: 'text-indigo-600' },
            'settlement': { title: '정산관리', icon: 'bar-chart-3', color: 'text-amber-600' },
            'approval': { title: '승인관리', icon: 'shield-check', color: 'text-rose-600' }
        };

        const current = titleMap[viewId] || { title: viewId.toUpperCase(), icon: 'box', color: 'text-slate-700' };

        // 메인 렌더링
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
            document.getElementById('view-body').innerHTML = `<div class="h-full flex flex-col items-center justify-center text-slate-300 font-bold">${current.title} 준비 중</div>`;
        }

        if (window.lucide) lucide.createIcons();
    },

    openDetail(carData) {
        const drawer = document.getElementById('right-drawer');
        const managerInfo = { company: "(주)프리패스", nameTitle: "홍길동 팀장", phone: "010-1234-5678" };
        
        drawer.innerHTML = DetailView.render(carData, managerInfo);
        
        // 드로어 노출
        drawer.classList.remove('translate-x-full');
        drawer.classList.add('animate-drawer-reset', 'shadow-[-10px_0_30px_rgba(0,0,0,0.05)]');
        if (window.lucide) lucide.createIcons();
    },

    closeDetail() {
        const drawer = document.getElementById('right-drawer');
        // X 클릭 혹은 메뉴 이동 시 즉시 사라짐 처리
        drawer.classList.add('translate-x-full');
        drawer.classList.remove('animate-drawer-reset', 'shadow-[-10px_0_30px_rgba(0,0,0,0.05)]');
    }
};

// 전역 바인딩
window.closeDetail = () => UI.closeDetail();
window.openDetail = (data) => UI.openDetail(data);
window.switchView = (id) => UI.switchView(id);
