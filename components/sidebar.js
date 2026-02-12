/**
 * Sidebar Component
 * 역할: 전체 ERP의 메뉴 구조를 정의하고, 클릭 시 UI.switchView를 호출하여 
 * 작업페이지의 내용물(Content)만 교체하도록 명령함.
 */
export const Sidebar = {
    render() {
        const container = document.getElementById('sidebar-container');
        if (!container) return;

        // [구조 고정] ERP 마스터 메뉴 리스트
        const menus = [
            { id: 'inquiry', name: '대화현황', icon: 'message-square' },
            { id: 'registration', name: '상품등록', icon: 'plus-square' },
            { id: 'inventory', name: '상품현황', icon: 'layout-grid' },
            { id: 'settlement', name: '정산관리', icon: 'bar-chart-3' },
            { id: 'approval', name: '승인관리', icon: 'shield-check' }
        ];

        // 하단부 고정 필터/설정형 메뉴 (필요 시 추가)
        const subMenus = [
            { id: 'period', name: '기간', icon: 'calendar' },
            { id: 'rent', name: '대여료', icon: 'banknote' }
        ];

        container.innerHTML = `
            <div class="w-full flex-1 flex flex-col">
                ${menus.map(menu => `
                    <button onclick="window.switchView('${menu.id}')" 
                            class="w-full flex flex-col items-center py-4 gap-1.5 hover:bg-slate-50 transition-all border-b border-slate-50 group">
                        <i data-lucide="${menu.icon}" 
                           class="w-[19px] h-[19px] text-slate-400 group-hover:text-blue-600 transition-colors"></i>
                        <span class="text-[9px] font-black text-slate-500 group-hover:text-slate-900 tracking-tighter">
                            ${menu.name}
                        </span>
                    </button>
                `).join('')}
            </div>

            <div class="w-full border-t border-slate-100 bg-slate-50/50">
                ${subMenus.map(menu => `
                    <button onclick="window.switchView('${menu.id}')" 
                            class="w-full flex flex-col items-center py-3 gap-1 hover:bg-white transition-all group opacity-60 hover:opacity-100">
                        <i data-lucide="${menu.icon}" class="w-4 h-4 text-slate-400 group-hover:text-slate-600"></i>
                        <span class="text-[8px] font-bold text-slate-400 group-hover:text-slate-600">${menu.name}</span>
                    </button>
                `).join('')}
            </div>
        `;
        
        // Lucide 아이콘 렌더링 실행
        if (window.lucide) {
            lucide.createIcons();
        }
    }
};
