// src/data/settlement-schema.js

/**
 * [코딩 원칙]
 * 1. 마스터 트리 경로(src/data/)를 엄수합니다.
 * 2. 사용자 권한(ADMIN, PROVIDER, AGENT)에 따라 노출할 컬럼을 차등 정의합니다.
 */

export const SETTLEMENT_SCHEMA = {
  // 1. 공통 노출 항목 (누구나 보는 정보)
  COMMON: [
    { key: "settlementDate", label: "정산기준일", width: "100px" },
    { key: "carNumber", label: "차량번호", width: "120px" },
    { key: "clientName", label: "고객명", width: "80px" },
  ],

  // 2. 권한별 확장 항목
  PERMISSIONS: {
    // 관리자: 모든 금액(원가, 수수료, 마진) 확인 가능
    admin: [
      { key: "supplyPrice", label: "공급원가", width: "100px" },
      { key: "agentFee", label: "영업수수료", width: "100px" },
      { key: "platformFee", label: "플랫폼수수료", width: "100px" },
      { key: "totalMargin", label: "최종마진", width: "100px" },
    ],
    // 공급사: 원가와 정산받을 금액만 확인 가능
    vendor: [
      { key: "supplyPrice", label: "공급가액", width: "100px" },
      { key: "vat", label: "부가세", width: "80px" },
      { key: "payoutStatus", label: "지급상태", width: "100px" },
    ],
    // 영업자: 본인 수수료와 계약 상태만 확인 가능
    agent: [
      { key: "rentalFee", label: "계약대여료", width: "100px" },
      { key: "agentFee", label: "확정수수료", width: "100px" },
      { key: "payoutDate", label: "지급예정일", width: "100px" },
    ]
  }
};
