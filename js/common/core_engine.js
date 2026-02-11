/* ■ PREPASS MOBILITY 통합 관제 엔진 v1.0 ■ */

const PrepassCore = {
    // 1. 시스템 표준 설정
    VERSION: "1.0.0",
    COMPANY: "PREPASS MOBILITY",

    // 2. 5단계 섹션 데이터 구조 (모든 등록/상세 페이지 공용)
    SYSTEM_SECTIONS: [
        { id: "car", title: "1. 차량 정보" },
        { id: "rent", title: "2. 대여료" },
        { id: "insure", title: "3. 보험 사양" },
        { id: "contract", title: "4. 계약 조건" },
        { id: "manager", title: "5. 담당자 정보" }
    ],

    // 3. 권한별 관제 로직
    init: function(userRole) {
        console.log(`[ERP 엔진] 권한 감지: ${userRole}`);
        this.applyPermissions(userRole);
        this.renderCommonUI();
    },

    // 4. 권한에 따른 기능 노출/차단 제어
    applyPermissions: function(role) {
        const targets = document.querySelectorAll('[data-role-limit]');
        targets.forEach(el => {
            const allowedRoles = el.getAttribute('data-role-limit').split(',');
            // 관리자(ADMIN)는 모든 기능을 프리패스, 그 외에는 허용된 권한만 노출
            if (role === 'ADMIN' || allowedRoles.includes(role)) {
                el.style.display = 'block';
            } else {
                el.remove(); // 권한 없으면 아예 DOM에서 제거 (보안)
            }
        });
    },

    // 5. 공통 UI 렌더링 (4px 라운드 및 아이콘 자동화)
    renderCommonUI: function() {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    },

    // 6. 통합 알림 시스템 (토스트)
    notify: function(msg) {
        const t = document.getElementById("toast");
        if (t) {
            t.innerText = msg;
            t.classList.add('show');
            t.style.visibility = "visible";
            setTimeout(() => {
                t.classList.remove('show');
                t.style.visibility = "hidden";
            }, 3000);
        }
    }
};

// 페이지 로드 시 기본 엔진 대기
window.addEventListener('DOMContentLoaded', () => {
    console.log("■ PREPASS 통합 엔진 로드 완료");
});
