// js/ui.js 내 switchView 부분 수정
switchView(viewId) {
    const main = document.getElementById('main-content');
    
    const titleMap = {
        'inquiry': { title: '대화현황', icon: 'message-square', color: 'text-blue-600' },
        'registration': { title: '상품등록', icon: 'plus-square', color: 'text-emerald-600' },
        'inventory': { title: '상품현황', icon: 'layout-grid', color: 'text-indigo-600' },
        'settlement': { title: '정산관리', icon: 'bar-chart-3', color: 'text-amber-600' },
        'approval': { title: '승인관리', icon: 'shield-check', color: 'text-rose-600' }
    };

    const current = titleMap[viewId] || { title: viewId.toUpperCase(), icon: 'box', color: 'text-slate-700' };

    // 사이드바 버튼 활성화 관리
    document.querySelectorAll('.side-btn').forEach(btn => btn.classList.remove('active', 'bg-blue-50', 'text-blue-600', 'border-blue-300'));
    const targetBtn = document.getElementById(`side-btn-${viewId}`);
    if (targetBtn) targetBtn.classList.add('active', 'bg-blue-50', 'text-blue-600', 'border-blue-300');

    // [변경] 아이콘(w-6->w-4.5), 텍스트(18px->14px), 헤더높이(56px->44px)
    main.innerHTML = `
        <div class="view-header flex items-center h-[44px] px-6 bg-white border-b border-slate-200 shadow-sm justify-between">
            <div class="flex items-center gap-2.5">
                <i data-lucide="${current.icon}" class="w-[18px] h-[18px] ${current.color}"></i>
                <h2 class="text-[14px] font-bold text-slate-800 tracking-tight">${current.title}</h2>
            </div>
            <div id="view-actions" class="flex items-center gap-2 text-[11px]">
                </div>
        </div>
        <div class="flex-1 overflow-auto p-5" id="view-body">
            </div>
    `;

    if (viewId === 'inventory') {
        InventoryView.render();
    }

    if (window.lucide) lucide.createIcons();
}
