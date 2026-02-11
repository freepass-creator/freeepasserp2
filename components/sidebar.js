export const Sidebar = {
    render(role = 'admin') {
        const container = document.getElementById('sidebar-container');
        
        // 메뉴 데이터 정의
        const menus = [
            { id: 'inquiry', label: '대화현황', icon: 'message-square', roles: ['admin', 'sales', 'supplier'] },
            { id: 'registration', label: '상품등록', icon: 'plus-square', roles: ['admin', 'supplier'] },
            { id: 'inventory', label: '상품현황', icon: 'layout-grid', roles: ['admin', 'sales', 'supplier'] },
            { id: 'settlement', label: '정산관리', icon: 'bar-chart-3', roles: ['admin', 'sales', 'supplier'] },
            { id: 'approval', label: '승인관리', icon: 'shield-check', roles: ['admin'] }
        ];

        // 필터 5종 (공통)
        const filters = [
            { id: 'f-period', label: '기간', icon: 'calendar' },
            { id: 'f-rent', label: '대여료', icon: 'banknote' },
            { id: 'f-deposit', label: '보증금', icon: 'coins' },
            { id: 'f-mileage', label: '주행거리', icon: 'gauge' },
            { id: 'f-year', label: '연식', icon: 'history' }
        ];

        // 1. 메뉴 버튼 렌더링
        let html = menus.filter(m => m.roles.includes(role)).map(m => `
            <button onclick="switchView('${m.id}')" id="side-btn-${m.id}" class="side-btn flex flex-col items-center justify-center w-[54px] h-[54px] rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition-all shadow-sm">
                <i data-lucide="${m.icon}" class="w-5 h-5"></i>
                <span class="text-[8px] font-bold mt-1">${m.label}</span>
            </button>
        `).join('');

        html += `<div class="w-8 h-[1px] bg-slate-100 my-2"></div>`;

        // 2. 필터 버튼 렌더링
        html += filters.map(f => `
            <button class="side-btn flex flex-col items-center justify-center w-[54px] h-[54px] rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 shadow-sm transition-all">
                <i data-lucide="${f.icon}" class="w-4 h-4"></i>
                <span class="text-[8px] font-bold mt-1">${f.label}</span>
            </button>
        `).join('');

        // 3. 엑셀 버튼 (하단 고정용)
        html += `<div class="mt-auto"><button class="side-btn flex flex-col items-center justify-center w-[54px] h-[54px] rounded-lg border border-emerald-100 bg-emerald-50 text-emerald-600 shadow-sm"><i data-lucide="download" class="w-5 h-5"></i><span class="text-[8px] font-bold mt-1 uppercase">Excel</span></button></div>`;

        container.innerHTML = html;
        if(window.lucide) lucide.createIcons();
    }
};
