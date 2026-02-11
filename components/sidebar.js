export const Sidebar = {
    render(role = 'admin') {
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
            { id: 'f-period', label: '기간', icon: 'calendar' },
            { id: 'f-rent', label: '대여료', icon: 'banknote' },
            { id: 'f-deposit', label: '보증금', icon: 'coins' },
            { id: 'f-mileage', label: '주행거리', icon: 'gauge' },
            { id: 'f-year', label: '연식', icon: 'history' }
        ];

        // 사이드바 컨테이너 스타일 유지
        container.className = "w-[75px] bg-white border-r border-slate-200 flex flex-col items-center py-4 gap-2 overflow-y-auto hide-scrollbar";

        // [핵심 변경] 버튼에 border-slate-200 추가 및 hover 시 shadow-md 적용
        let html = menus.filter(m => m.roles.includes(role)).map(m => `
            <button onclick="switchView('${m.id}')" id="side-btn-${m.id}" 
                class="side-btn flex flex-col items-center justify-center w-[58px] h-[52px] rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:border-slate-300 hover:shadow-md active:scale-95 transition-all mb-0.5">
                <i data-lucide="${m.icon}" class="w-4 h-4"></i>
                <span class="text-[8px] font-black mt-1">${m.label}</span>
            </button>
        `).join('');

        html += `<div class="w-8 h-[1px] bg-slate-100 my-1"></div>`;

        // 필터 버튼도 동일하게 테두리 적용
        html += filters.map(f => `
            <button class="side-btn flex flex-col items-center justify-center w-[58px] h-[50px] rounded-lg border border-slate-100 bg-white text-slate-400 hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm transition-all">
                <i data-lucide="${f.icon}" class="w-4 h-4"></i>
                <span class="text-[8px] font-bold mt-1">${f.label}</span>
            </button>
        `).join('');

        html += `
            <div class="mt-auto pt-2">
                <button class="side-btn flex flex-col items-center justify-center w-[58px] h-[54px] rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-600 shadow-sm hover:shadow-md hover:bg-emerald-100 transition-all">
                    <i data-lucide="download" class="w-4 h-4"></i>
                    <span class="text-[8px] font-black mt-1 uppercase">Excel</span>
                </button>
            </div>
        `;

        container.innerHTML = html;
        if (window.lucide) lucide.createIcons();
    }
};
