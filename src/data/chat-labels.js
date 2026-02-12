// src/data/chat-labels.js

/**
 * [코딩 원칙]
 * 1. 마스터 트리 경로(src/data/)를 엄수합니다.
 * 2. 채팅 UI 내부에서 반복적으로 사용되는 안내 문구를 상수로 정의합니다.
 */

export const CHAT_LABELS = {
  // 1. 채팅방 상태 라벨
  STATUS: {
    ACTIVE: "실시간 상담 중",
    CLOSED: "상담 종료",
    AWAY: "담당자 부재 중",
  },

  // 2. 시스템 자동 메시지
  SYSTEM: {
    WELCOME: "안녕하세요. 상품 문의에 대해 담당자가 배정되었습니다. 잠시만 기다려 주세요.",
    OFF_HOURS: "현재는 상담 운영 시간이 아닙니다. 메시지를 남겨주시면 업무 복귀 후 순차적으로 답변 드리겠습니다.",
    CLOSED_INFO: "본 상담은 종료되었습니다. 추가 문의는 새로운 채팅을 이용해 주세요.",
    PHOTO_UPLOADED: "이미지가 업로드되었습니다.",
  },

  // 3. 인터랙션 요소 (Placeholders / Buttons)
  INPUT: {
    PLACEHOLDER: "메시지를 입력하세요...",
    SEND: "전송",
    ATTACH: "파일 첨부",
  },

  // 4. 시간 표시 규격 (가공 전 기준)
  TIME: {
    TODAY: "오늘",
    YESTERDAY: "어제",
    READ: "읽음",
    UNREAD: "1",
  }
};
