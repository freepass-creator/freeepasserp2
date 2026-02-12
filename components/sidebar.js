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

        container.className = "w-[80px] bg-white border-r border-slate-200 flex flex-col items-center py-5 gap-3 overflow-y-auto hide-scrollbar";

        // [변경 포인트] rounded-2xl (곡선형) 적용, 텍스트 크기 확대(text-[10px]), 입체감 추가
        let html = menus.filter(m => m.roles.includes(role)).map(m => `
            <button onclick="switchView('${m.id}')" id="side-btn-${m.id}" 
                class="side-btn flex flex-col items-center justify-center w-[62px] h-[62px] rounded-[18px] border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:border-blue-300 hover:shadow-lg active:scale-95 transition-all mb-1">
                <i data-lucide="${m.icon}" class="w-5 h-5 mb-0.5"></i>
                <span class="text-[10px] font-bold tracking-tighter">${m.label}</span>
            </button>
        `).join('');

        html += `<div class="w-10 h-[1.5px] bg-slate-100 my-2"></div>`;

        // 필터 버튼도 루비 스타일 적용 (살짝 작게)
        html += filters.map(f => `
            <button class="side-btn flex flex-col items-center justify-center w-[60px] h-[58px] rounded-[16px] border border-slate-100 bg-white text-slate-400 hover:bg-slate-50 hover:border-slate-300 transition-all mb-1">
                <i data-lucide="${f.icon}" class="w-4 h-4 mb-0.5"></i>
                <span class="text-[10px] font-semibold">${f.label}</span>
            </button>
        `).join('');

        html += `
            <div class="mt-auto pt-4">
                <button class="side-btn flex flex-col items-center justify-center w-[62px] h-[64px] rounded-[20px] border border-emerald-200 bg-emerald-50 text-emerald-600 shadow-sm hover:shadow-md hover:bg-emerald-100 transition-all">
                    <i data-lucide="download" class="w-5 h-5"></i>
                    <span class="text-[10px] font-black mt-1 uppercase">Excel</span>
                </button>
            </div>
        `;

        container.innerHTML = html;
        if (window.lucide) lucide.createIcons();
    }
};
