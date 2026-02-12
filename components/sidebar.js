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
                                    class="relative w-full flex flex-col items-center py-1.5 gap-0.5 transition-all border-b border-slate-50 group ${isActive ? 'bg-blue-50/50' : 'hover:bg-slate-50'}">
                                
                                ${isActive ? '<div class="absolute left-0 top-0 bottom-0 w-[3px] bg-blue-600"></div>' : ''}
                                
                                <i data-lucide="${menu.icon}" 
                                   class="w-[18px] h-[18px] ${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-blue-600'} transition-colors"></i>
                                <span class="text-[9.5px] font-black ${isActive ? 'text-blue-700' : 'text-slate-500 group-hover:text-slate-900'} tracking-tighter leading-none">
                                    ${menu.name}
                                </span>
                            </button>

                            ${isActive && isInventory ? `
                                <div class="bg-slate-50/50 border-b border-slate-100">
                                    ${filters.map(f => `
                                        <button class="w-full flex flex-col items-center py-1 gap-0.5 hover:bg-white transition-all group border-b border-slate-50/30 last:border-0">
                                            <i data-lucide="${f.icon}" class="w-[14px] h-[14px] text-slate-300 group-hover:text-indigo-500"></i>
                                            <span class="text-[8px] font-bold text-slate-400 group-hover:text-indigo-700 tracking-tighter leading-none">${f.name}</span>
                                        </button>
                                    `).join('')}
                                </div>
                            ` : ''}
                        </div>
                    `;
                }).join('')}
            </div>

            <div class="w-full bg-white border-t border-slate-100">
                <button onclick="alert('EXCEL 준비 중')" 
                        class="w-full flex flex-col items-center py-2 gap-0.5 hover:bg-emerald-50 transition-all group">
                    <i data-lucide="download" class="w-[18px] h-[18px] text-emerald-500"></i>
                    <span class="text-[9px] font-black text-emerald-600 tracking-widest uppercase leading-none">Excel</span>
                </button>
            </div>
        `;
        
        if (window.lucide) lucide.createIcons();
    }
};
