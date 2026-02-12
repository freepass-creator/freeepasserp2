// src/styles/core/palette.js

/**
 * [코딩 원칙]
 * 1. 시스템에서 사용하는 모든 HEX 코드를 이 파일에서 관리합니다.
 * 2. 색상명은 용도(Functional Name) 중심으로 정의합니다.
 */

export const PALETTE = {
  // 1. 핵심 포인트 컬러
  POINT_BLUE: "#3b82f6",     // 활성화 버튼, 강조 텍스트
  EXCEL_GREEN: "#1D6F42",    // 엑셀 다운로드 버튼 전용
  
  // 2. 배경색 (Backgrounds)
  GATE_BG: "#0f172a",        // 보안 게이트(로그인) 배경
  APP_BG: "#f1f3f6",         // 앱 전체 배경 (연그레이)
  TILE_BG: "#ffffff",        // 타일 및 컨텐츠 박스 배경
  ACTIVE_BG: "#eff6ff",      // 버튼 클릭/활성 상태 배경
  
  // 3. 텍스트 및 테두리 (Neutrals)
  TEXT_MAIN: "#1e293b",      // 기본 본문
  TEXT_SUB: "#475569",       // 보조 설명 및 헤더
  TEXT_MUTE: "#94a3b8",      // 비활성 텍스트
  BORDER_STD: "#e2e8f0",     // 표준 구분선 및 테두리
  BORDER_LIGHT: "#f1f5f9",   // 아주 연한 경계선
  
  // 4. 상태 표시 (Status)
  SUCCESS: "#10b981",        // 정상, 신차, 대여가능
  DANGER: "#e11d48",         // 불가, 종료, 매진
  WARNING: "#f59e0b",        // 대기, 확인필요
};
