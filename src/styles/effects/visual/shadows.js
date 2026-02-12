// src/styles/effects/visual/shadows.js

/**
 * [코딩 원칙]
 * 1. 시스템 내 모든 그림자와 입체감 수치를 표준화합니다.
 * 2. 레이아웃의 깊이(Z-index적 위상)에 따라 그림자를 세분화합니다.
 */

export const SHADOWS = {
  // 사이드바 전용 (좌측에서 우측으로 은은하게 퍼지는 그림자)
  SIDEBAR: "4px 0 15px rgba(0, 0, 0, 0.08), 1px 0 3px rgba(0, 0, 0, 0.1)",

  // 버튼 기본 (떠 있는 느낌)
  BUTTON: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
  
  // 버튼 호버 (더 높이 떠오르는 느낌)
  BUTTON_HOVER: "0 4px 6px -1px rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.08)",
  
  // 버튼 클릭/활성 (안으로 눌린 느낌 - Inset)
  BUTTON_ACTIVE: "inset 0 2px 4px rgba(0, 0, 0, 0.05)",

  // 상세창/팝업 (공중에 높이 뜬 느낌)
  ELEVATION_LARGE: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
  
  // 필터 팝업/툴팁
  POPUP: "0 4px 12px rgba(0, 0, 0, 0.2)"
};
