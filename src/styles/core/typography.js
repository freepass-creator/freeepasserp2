// src/styles/core/typography.js

/**
 * [코딩 원칙]
 * 1. 시스템 내 모든 텍스트의 폰트 패밀리, 크기, 두께, 자간을 정의합니다.
 * 2. 사용자님의 "날렵하고 얍실한" 디자인 철학을 자간(Letter Spacing) 수치에 반영합니다.
 */

export const TYPOGRAPHY = {
  // 1. 기본 폰트 패밀리
  FAMILY: "'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif",
  
  // 2. 폰트 크기 (Size) - 11px를 기준으로 미세하게 나눔
  SIZE: {
    SIDE_TINY: "9px",     // 사이드바 아이콘 밑 텍스트
    FILTER_LABEL: "10px",  // 필터 버튼 내부 텍스트
    MAIN: "11px",          // 일반 데이터 및 리스트 텍스트
    TITLE: "12px",         // 섹션 제목 및 테이블 헤더
    GATE_LARGE: "24px",    // 보안 게이트 숫자 입력용
  },

  // 3. 폰트 두께 (Weight) - 700/600/500/400
  WEIGHT: {
    BLACK: "700",          // 가장 강한 강조
    BOLD: "600",           // 일반적인 제목/강조
    MEDIUM: "500",         // 본문 가독성용
    NORMAL: "400",         // 보조 텍스트
  },

  // 4. 자간 (Letter Spacing) - 날렵한 디자인의 핵심
  SPACING: {
    TIGHT: "-0.02em",      // 기본 자간 (사용자 지정)
    TIGHTER: "-0.03em",    // 제목용 좁은 자간
    GATE: "0.4em",         // 보안코드 입력용 넓은 자간
  },

  // 5. 행간 (Line Height)
  LEADING: {
    NONE: "1",             // 타이트한 버튼용
    TIGHT: "1.25",         // 제목용
    NORMAL: "1.5",         // 본문 읽기용
  }
};
