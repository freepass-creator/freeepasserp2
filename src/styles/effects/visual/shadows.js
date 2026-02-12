// src/styles/effects/visual/shadows.js

/**
 * [코딩 원칙]
 * 1. 마스터 트리 경로(src/styles/effects/visual/)를 엄수합니다.
 * 2. 레이아웃의 위상(Z-index)에 따른 입체감을 표준 상수로 관리합니다.
 */

export const SHADOWS = {
  // 1. 사이드바 전용 (Side Elevation)
  // 좌측에서 우측으로 흐르는 은은한 그림자
  SIDEBAR: "4px 0 10px rgba(0, 0, 0, 0.05), 1px 0 3px rgba(0, 0, 0, 0.08)",

  // 2. 기본 부품 (Base Level)
  // 일반 버튼, 타일 등에 적용되는 얇은 그림자
  STANDARD: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
  
  // 3. 부유 상태 (Floating / Hover)
  // 마우스 호버 시 더 높게 떠오르는 느낌
  HOVER: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  
  // 4. 침강 상태 (Pressed / Inset)
  // 버튼 클릭 시 안으로 쑥 들어간 느낌
  PRESSED: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",

  // 5. 최상위 레이어 (Overlay / Drawer)
  // 우측 드로어나 팝업 등 가장 위에 떠 있는 요소
  ELEVATION_HIGH: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
};
