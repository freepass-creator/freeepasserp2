// src/data/nav-content.js

/**
 * [코딩 원칙]
 * 1. UI 조립에 필요한 모든 정적 텍스트를 이 파일에서 관리합니다.
 * 2. 아이콘 이름은 Lucide 라이브러리 기준으로 정의합니다.
 */

export const NAV_CONTENT = {
  // 메인 사이드바 메뉴 (대분류)
  MAIN_MENU: [
    { id: "chat", label: "대화현황", icon: "MessageSquare" },
    { id: "inventory", label: "상품현황", icon: "LayoutGrid" },
    { id: "settlement", label: "정산관리", icon: "BarChart3" },
    { id: "registration", label: "상품등록", icon: "PlusSquare" },
  ],

  // 상품현황 클릭 시 확장될 필터 버튼들 (중분류)
  INVENTORY_FILTERS: [
    { id: "rent", label: "대여료", type: "range" },
    { id: "deposit", label: "보증금", type: "range" },
    { id: "year", label: "연식", type: "select" },
    { id: "mileage", label: "주행거리", type: "range" },
    { id: "insurance", label: "보험", type: "select" },
    { id: "brand", label: "제조사", type: "select" },
  ],

  // 정산관리 권한별 필터 (관리자/영업자 공용)
  SETTLEMENT_FILTERS: [
    { id: "period", label: "기간조회" },
    { id: "agent", label: "영업자선택" },
    { id: "status", label: "정산상태" },
  ]
};
