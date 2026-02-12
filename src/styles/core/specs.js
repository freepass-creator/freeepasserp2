// src/styles/core/specs.js

/**
 * [코딩 원칙] 
 * 1. 이 파일은 오직 물리적 "수치"만 정의합니다.
 * 2. 임의 개선 없이 사용자님의 기존 레이아웃 규격을 준수합니다.
 */

export const SPECS = {
  // 사이드바 & 메뉴 타일 규격
  SIDEBAR_WIDTH: 72,       // 좌측 사이드바 전체 너비
  TILE_SIZE: 64,           // 사이드바 메인/필터 버튼 (64x64)
  TILE_GAP: 8,             // 버튼 간 간격
  
  // 헤더 & 드로어 규격
  HEADER_HEIGHT: 50,       // 상단 바 높이
  DRAWER_WIDTH: 440,       // 우측 상세/채팅창 너비
  
  // 공통 수치
  BORDER_WIDTH: 1,         // 표준 테두리 두께
  RADIUS: 0,               // 사용자님의 "직각형" 디자인 원칙 준수
  
  // 인터랙션 수치
  PRESS_DEPTH: 1.5,        // 클릭 시 내려가는 깊이 (px)
};
