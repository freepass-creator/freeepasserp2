export const Sidebar = {
    render(activeId) {
        const container = document.getElementById('sidebar-container');
        if (!container) return;

        // 메인 메뉴 설정 (관리자 업무 순서)
        const mainMenus = [
            { id: 'inquiry', name: '대화현황', icon: 'message-square' },
            { id: 'settlement', name: '정산관리', icon: 'bar-chart-3' },
            { id: 'approval', name: '승인관리', icon: 'shield-check' },
            { id: 'registration', name: '상품등록', icon: 'plus-square' },
            { id: 'inventory', name: '상품현황', icon: 'layout-grid' }
        ];

        // 상품현황 하위 필터 (세로 정렬 디자인용)
        const filters = [
            { name: '기간', icon: 'calendar' },
            { name: '대여료', icon: 'banknote' },
            { name: '보증금', icon: 'coins' },
            { name: '주행거리', icon: 'gauge' },
            { name: '연식', icon: 'history' }
        ];

        container.innerHTML = `
            <div class="w-full flex-1 flex flex-col">
                ${mainMenus.map(menu => {
                    const isActive = activeId === menu.id;
                    const isInventory = menu.id === 'inventory';

                    return `
                        <div class="w-full">
                            <button onclick="window.switchView('${menu.id}')" 
                                    class="relative w-full flex flex-col items-center py-4 gap-1 transition-all border-b border-slate-50 group ${isActive ? 'bg-blue-50/50' : 'hover:bg-slate-50'}">
                                
                                ${isActive ? '<div class="absolute left-0 top-0 bottom-0 w-[4px] bg-blue-600 shadow-[2px_0_10px_rgba(37,99,235,0.2)]"></div>' : ''}
                                
                                <i data-lucide="${menu.icon}" 
                                   class="w-[19px] h-[19px] ${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-blue-600'} transition-all"></i>
                                <span class="text-[9.5px] font-black ${isActive ? 'text-blue-700' : 'text-slate-500 group-hover:text-slate-900'} tracking-tighter">
                                    ${menu.name}
                                </span>
                            </button>

                            ${isActive && isInventory ? `
                                <div class="bg-slate-50/80 border-b border-slate-100 flex flex-col py-2 px-1 gap-1">
                                    ${filters.map(f => `
                                        <button class="w-full flex items-center px-3 py-2 gap-2.5 hover:bg-white rounded-sm group transition-all">
                                            <i data-lucide="${f.icon}" class="w-[13px] h-[13px] text-slate-300 group-hover:text-indigo-500"></i>
                                            <span class="text-[9px] font-bold text-slate-400 group-hover:text-indigo-700 tracking-tighter">${f.name}</span>
                                        </button>
                                    `).join('')}
                                </div>
                            ` : ''}
                        </div>
                    `;
                }).join('')}
            </div>

            <div class="w-full bg-emerald-50/20 border-t border-emerald-50">
                <button onclick="alert('EXCEL 준비 중')" 
                        class="w-full flex flex-col items-center py-4 gap-1 hover:bg-emerald-50 transition-all">
                    <i data-lucide="download" class="w-[18px] h-[18px] text-emerald-500"></i>
                    <span class="text-[9px] font-black text-emerald-600 tracking-tighter italic uppercase">Excel</span>
                </button>
            </div>
        `;
        
        if (window.lucide) lucide.createIcons();
    }
};
