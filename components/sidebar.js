export const Sidebar = {
    render(role = 'admin', activeFilters = {}) {
        const container = document.getElementById('sidebar-container');
        if (!container) return;

        const menus = [
            { id: 'inquiry', label: '대화현황', icon: 'message-square', roles: ['admin', 'sales', 'supplier'] },
            { id: 'registration', label: '상품등록', icon: 'plus-square', roles: ['admin', 'supplier'] },
            { id: 'inventory', label: '상품현황', icon: 'layout-grid', roles: ['admin', 'sales', 'supplier'] },
            { id: 'settlement', label: '정산관리', icon: 'bar-chart-3', roles: ['admin', 'sales', 'supplier'] },
            { id: 'approval', label: '승인관리', icon: 'shield-check', roles: ['admin'] }
        ];

        const filters = [
            { id: 'f-period', label: '기간', icon: 'calendar', key: 'period' },
            { id: 'f-rent', label: '대여료', icon: 'banknote', key: 'rent' },
            { id: 'f-deposit', label: '보증금', icon: 'coins', key: 'deposit' },
            { id: 'f-mileage', label: '주행거리', icon: 'gauge', key: 'mileage' },
            { id: 'f-year', label: '연식', icon: 'history', key: 'year' }
        ];

        // 사이드바 폭을 살짝 줄임 (75px -> 68px)
        container.className = "w-[68px] bg-white border-r border-slate-200 flex flex-col items-center py-3 gap-1 overflow-y-auto hide-scrollbar";

        // 주요 메뉴: 아이콘(w-4->w-3.5), 텍스트(10px->8.5px), 버튼높이(52px->44px)
        let html = menus.filter(m => m.roles.includes(role)).map(m => `
            <button onclick="switchView('${m.id}')" id="side-btn-${m.id}" 
                class="side-btn flex flex-col items-center justify-center w-[56px] h-[44px] rounded-[5px] border border-slate-200 bg-white text-slate-500 
                hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0.5 transition-all duration-200 mb-0.5">
                <i data-lucide="${m.icon}" class="w-[14px] h-[14px] mb-0.5"></i>
                <span class="text-[8.5px] font-bold tracking-tighter leading-none">${m.label}</span>
            </button>
        `).join('');

        html += `<div class="w-10 h-[1px] bg-slate-100 my-1"></div>`;

        // 필터 버튼: 높이(48px->40px)
        html += filters.map(f => {
            const isActive = activeFilters[f.key] && activeFilters[f.key].length > 0;
            const activeClass = isActive ? "bg-blue-50 border-blue-300 text-blue-600" : "bg-white border-slate-100 text-slate-400";

            return `
                <button onclick="toggleFilter('${f.key}')" id="side-btn-${f.id}" 
                    class="side-btn flex flex-col items-center justify-center w-[56px] h-[40px] rounded-[5px] border ${activeClass}
                    hover:border-slate-300 transition-all mb-0.5 relative">
                    <i data-lucide="${f.icon}" class="w-[13px] h-[13px] mb-0.5"></i>
                    <span class="text-[8.5px] font-bold">${f.label}</span>
                    ${isActive ? '<div class="absolute top-0.5 right-0.5 w-1 h-1 bg-blue-500 rounded-full"></div>' : ''}
                </button>
            `;
        }).join('');

        // 엑셀 버튼
        html += `
            <div class="mt-auto pt-2">
                <button class="side-btn flex flex-col items-center justify-center w-[56px] h-[46px] rounded-[5px] border border-emerald-100 bg-emerald-50 text-emerald-600 hover:shadow-sm transition-all">
                    <i data-lucide="download" class="w-[14px] h-[14px] mb-0.5"></i>
                    <span class="text-[8.5px] font-black uppercase">Excel</span>
                </button>
            </div>
        `;

        container.innerHTML = html;
        if (window.lucide) lucide.createIcons();
    }
};
