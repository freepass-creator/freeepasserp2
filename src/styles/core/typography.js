// src/styles/core/typography.js

/**
 * [코딩 원칙]
 * 1. 시스템 내 모든 텍스트의 폰트, 크기, 자간, 행간을 표준화합니다.
 * 2. 사용자님의 "얍실하고 정밀한" 느낌을 위해 자간(Letter Spacing)을 미세 조정합니다.
 */

export const TYPOGRAPHY = {
  FAMILY: "'Pretendard', -apple-system, sans-serif",
  
  // Font Sizes (사용자님 기준 11px 중심)
  SIZE: {
    SIDE_TINY: "9px",    // 사이드바 아이콘 밑 아주 작은 텍스트
    FILTER_LABEL: "10px", // 필터 버튼 내 텍스트
    MAIN: "11px",         // 기본 본문 및 리스트 텍스트
    TITLE: "12px",        // 섹션 제목 및 강조 텍스트
    GATE_LARGE: "24px",   // 보안 게이트 숫자 입력용
  },

  // Font Weights (700/600/500으로 정밀 세분화)
  WEIGHT: {
    BLACK: "700",         // 가장 두꺼운 강조 (기존 font-black 대응)
    BOLD: "600",          // 중간 강조 (기존 font-bold 대응)
    MEDIUM: "500",        // 일반 본문 두께
    NORMAL: "400",        // 설명문 및 보조 텍스트
  },

  // Letter Spacing (날렵한 느낌의 핵심)
  SPACING: {
    TIGHT: "-0.02em",     // 기본 적용 자간
    TIGHTER: "-0.03em",   // 제목줄 전용 자간
    GATE: "0.5em",        // 보안코드 입력용 넓은 자간
  },

  // Line Heights
  LEADING: {
    NONE: "1",            // 아이콘 버튼 등 좁은 공간용
    TIGHT: "1.2",         // 제목 및 요약용
    NORMAL: "1.5",        // 일반 가독성용
  }
};
