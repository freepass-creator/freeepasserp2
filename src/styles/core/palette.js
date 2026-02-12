// src/styles/core/palette.js

/**
 * [코딩 원칙]
 * 1. 시스템에서 사용하는 모든 HEX 코드를 이 파일에서 관리합니다.
 * 2. 색상명은 용도(Functional Name) 중심으로 정의하여 직관성을 높입니다.
 */

export const PALETTE = {
  // Brand & Key Colors
  POINT_BLUE: "#3b82f6",     // 메인 포인트 (버튼 활성화, 강조)
  EXCEL_GREEN: "#1D6F42",    // 엑셀 다운로드 버튼 전용 색상
  
  // Backgrounds
  GATE_BG: "#0f172a",        // 보안 게이트 배경 (짙은 네이비)
  APP_BG: "#f1f3f6",         // 메인 앱 배경 (연한 그레이)
  TILE_BG: "#ffffff",        // 기본 타일/박스 배경 (화이트)
  ACTIVE_BG: "#eff6ff",      // 버튼 클릭/활성 시 배경 (연한 블루)
  
  // Grayscale & Borders
  TEXT_MAIN: "#1e293b",      // 기본 텍스트 색상
  TEXT_SUB: "#475569",       // 보조/헤더 텍스트 색상
  TEXT_MUTE: "#94a3b8",      // 비활성/안내 텍스트 색상
  BORDER_LIGHT: "#f1f5f9",   // 아주 연한 구분선
  BORDER_STD: "#e2e8f0",     // 표준 테두리/구분선
  
  // Status
  SUCCESS: "#10b981",        // 정상, 가능, 완료 (에메랄드)
  DANGER: "#e11d48",         // 불가, 종료, 매진 (로즈)
  WARNING: "#f59e0b",        // 확인필요, 대기 (앰버)
};
