export const Sidebar = {
    render(activeId) {
        const container = document.getElementById('sidebar-container');
        if (!container) return;

        const mainMenus = [
            { id: 'inquiry', name: '대화현황', icon: 'message-square' },
            { id: 'settlement', name: '정산관리', icon: 'bar-chart-3' },
            { id: 'approval', name: '승인관리', icon: 'shield-check' },
            { id: 'registration', name: '상품등록', icon: 'plus-square' },
            { id: 'inventory', name: '상품현황', icon: 'layout-grid' }
        ];

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
                                ${isActive ? '<div class="absolute left-0 top-0 bottom-0 w-[4px] bg-blue-600"></div>' : ''}
                                <i data-lucide="${menu.icon}" class="w-[19px] h-[19px] ${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-blue-600'} transition-all"></i>
                                <span class="text-[9.5px] font-black ${isActive ? 'text-blue-700' : 'text-slate-500 group-hover:text-slate-900'} tracking-tighter">${menu.name}</span>
                            </button>

                            ${isActive && isInventory ? `
                                <div class="bg-slate-100/50 grid grid-cols-2 gap-[1px] border-b border-slate-200">
                                    ${filters.map(f => `
                                        <button class="flex flex-col items-center justify-center py-2.5 bg-white hover:bg-indigo-50 transition-colors group">
                                            <i data-lucide="${f.icon}" class="w-[14px] h-[14px] text-slate-300 group-hover:text-indigo-500 mb-0.5"></i>
                                            <span class="text-[8px] font-bold text-slate-400 group-hover:text-indigo-700 tracking-tighter">${f.name}</span>
                                        </button>
                                    `).join('')}
                                </div>
                            ` : ''}
                        </div>
                    `;
                }).join('')}
            </div>

            <div class="w-full bg-emerald-600">
                <button onclick="alert('EXCEL 준비 중')" 
                        class="w-full flex flex-col items-center py-4 gap-1 hover:bg-emerald-700 transition-all">
                    <i data-lucide="download" class="w-[18px] h-[18px] text-white"></i>
                    <span class="text-[10px] font-black text-white tracking-widest uppercase">EXCEL</span>
                </button>
            </div>
        `;
        
        if (window.lucide) lucide.createIcons();
    }
};
