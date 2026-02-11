import { Sidebar } from '../components/sidebar.js';

export const UI = {
    init() {
        Sidebar.render('admin'); // 초기 사이드바 (관리자 기준)
        this.switchView('inventory'); // 초기 화면: 상품현황
    },

    switchView(viewId) {
        console.log(`${viewId} 화면으로 전환합니다.`);
        // 버튼 활성화 표시
        document.querySelectorAll('.side-btn').forEach(btn => btn.classList.remove('bg-blue-50', 'text-blue-600', 'border-blue-200'));
        const activeBtn = document.getElementById(`side-btn-${viewId}`);
        if(activeBtn) activeBtn.classList.add('bg-blue-50', 'text-blue-600', 'border-blue-200', 'border-2');

        // 메인 컨텐츠 영역 교체 (실제 views/ 폴더의 js 파일들과 연동)
        const main = document.getElementById('main-content');
        main.innerHTML = `<div class="p-10 text-slate-400 font-bold">${viewId} 화면을 준비 중입니다...</div>`;
    },

    openDrawer() {
        document.getElementById('right-drawer').classList.remove('translate-x-full');
    },

    closeDrawer() {
        document.getElementById('right-drawer').classList.add('translate-x-full');
    }
};

window.switchView = (viewId) => UI.switchView(viewId);
window.openDrawer = () => UI.openDrawer();
window.closeDrawer = () => UI.closeDrawer();
