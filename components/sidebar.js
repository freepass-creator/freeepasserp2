export const Sidebar = {
    render() {
        const container = document.getElementById('sidebar-container');
        if (!container) return;

        // 1. 상단 메인 메뉴 (페이지 전환용)
        const mainMenus = [
            { id: 'inquiry', name: '대화현황', icon: 'message-square' },
            { id: 'registration', name: '상품등록', icon: 'plus-square' },
            { id: 'inventory', name: '상품현황', icon: 'layout-grid' },
            { id: 'settlement', name: '정산관리', icon: 'bar-chart-3' },
            { id: 'approval', name: '승인관리', icon: 'shield-check' }
        ];

        // 2. 하단 필터 메뉴 (이미지 하단부 재현)
        const filterMenus = [
            { id: 'period', name: '기간', icon: 'calendar' },
            { id: 'rent', name: '대여료', icon: 'banknote' },
            { id: 'deposit', name: '보증금', icon: 'coins' },
            { id: 'mileage', name: '주행거리', icon: 'gauge' },
            { id: 'year', name: '연식', icon: 'history' }
        ];

        container.innerHTML = `
            <div class="w-full flex-1 flex flex-col">
                ${mainMenus.map(menu => `
                    <button onclick="window.switchView('${menu.id}')" 
                            class="w-full flex flex-col items-center py-4 gap-1.5 hover:bg-slate-50 transition-all border-b border-slate-50 group">
                        <i data-lucide="${menu.icon}" class="w-[18px] h-[18px] text-slate-400 group-hover:text-blue-600 transition-colors"></i>
                        <span class="text-[9px] font-black text-slate-500 group-hover:text-slate-900 tracking-tighter">${menu.name}</span>
                    </button>
                `).join('')}
            </div>

            <div class="w-full border-t border-slate-100 bg-slate-50/30">
                ${filterMenus.map(menu => `
                    <button onclick="console.log('${menu.name} 필터 클릭')" 
                            class="w-full flex flex-col items-center py-3 gap-1 hover:bg-white transition-all group border-b border-slate-50">
                        <i data-lucide="${menu.icon}" class="w-[16px] h-[16px] text-slate-300 group-hover:text-slate-500 transition-colors"></i>
                        <span class="text-[8px] font-bold text-slate-400 group-hover:text-slate-600 tracking-tighter">${menu.name}</span>
                    </button>
                `).join('')}
            </div>
        `;
        
        if (window.lucide) lucide.createIcons();
    }
};
