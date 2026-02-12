// src/data/nav-content.js

/**
 * [코딩 원칙]
 * 1. 마스터 트리 경로(src/data/)를 엄수합니다.
 * 2. 사이드바와 필터 스택의 구조를 선언적 객체로 정의합니다.
 */

export const NAV_CONTENT = [
  {
    id: "inventory",
    label: "상품현황",
    icon: "CubeIcon", // 추후 Icon 부품에서 매핑
    filters: [
      { id: "all", label: "전체보기" },
      { id: "new", label: "신차" },
      { id: "used", label: "중고" },
      { id: "reserved", label: "상담중" }
    ]
  },
  {
    id: "registration",
    label: "상품등록",
    icon: "PlusCircleIcon",
    filters: [
      { id: "manual", label: "직접등록" },
      { id: "excel", label: "대량등록(XLS)" }
    ]
  },
  {
    id: "settlement",
    label: "정산관리",
    icon: "ReceiptRefundIcon",
    filters: [
      { id: "pending", label: "정산대기" },
      { id: "completed", label: "정산완료" },
      { id: "tax", label: "계산서발행" }
    ]
  },
  {
    id: "chat",
    label: "실시간채팅",
    icon: "ChatBubbleLeftRightIcon",
    filters: [
      { id: "active", label: "진행중" },
      { id: "closed", label: "종료됨" }
    ]
  }
];
