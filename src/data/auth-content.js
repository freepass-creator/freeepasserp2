// src/data/auth-content.js

/**
 * [코딩 원칙]
 * 1. 마스터 트리 경로(src/data/)를 엄수합니다.
 * 2. 보안 게이트 화면에서 사용되는 모든 국문 텍스트를 상수로 관리합니다.
 */

export const AUTH_CONTENT = {
  // 1. 헤더 및 타이틀
  TITLE: "SECURITY GATE",
  SUB_TITLE: "인가된 사용자만 접근 가능합니다.",
  
  // 2. 입력 영역 안내
  INPUT_PLACEHOLDER: "보안코드를 입력하세요",
  SUBMIT_BUTTON: "ENTER SYSTEM",
  
  // 3. 상태 메시지
  MESSAGES: {
    WAITING: "인증 정보를 확인 중입니다...",
    SUCCESS: "인증에 성공했습니다. 잠시 후 대시보드로 이동합니다.",
    FAILURE: "보안코드가 일치하지 않습니다. 다시 시도해 주세요.",
    LOCKED: "5회 이상 오류 발생 시 접근이 일시적으로 차단됩니다.",
  },
  
  // 4. 하단 카피라이트 및 정보
  FOOTER: "© 2026 INTERNAL MANAGEMENT SYSTEM. ALL RIGHTS RESERVED."
};
