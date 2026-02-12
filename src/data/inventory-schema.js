// src/data/inventory-schema.js

/**
 * [코딩 원칙]
 * 1. 마스터 트리 경로(src/data/)를 엄수합니다.
 * 2. 테이블 헤더(TABLE_HEADERS)와 상세 정보(DETAIL_FIELDS)의 순서와 라벨을 정의합니다.
 */

// 1. 메인 리스트 테이블 헤더 규격
export const TABLE_HEADERS = [
  { key: "status", label: "상태", width: "80px" },
  { key: "carNumber", label: "차량번호", width: "120px" },
  { key: "modelName", label: "모델명", width: "auto" },
  { key: "rentalFee", label: "월 대여료", width: "100px" },
  { key: "contractTerm", label: "약정기간", width: "80px" },
  { key: "provider", label: "공급사", width: "100px" },
];

// 2. 우측 드로어 상세 정보 필드 규격
export const DETAIL_FIELDS = {
  BASIC_INFO: [
    { key: "carNumber", label: "차량번호" },
    { key: "vin", label: "차대번호" },
    { key: "modelYear", label: "연식" },
    { key: "fuelType", label: "유종" },
    { key: "mileage", label: "주행거리" },
  ],
  CONTRACT_INFO: [
    { key: "rentalFee", label: "표준 대여료" },
    { key: "deposit", label: "보증금/선납금" },
    { key: "insurance", label: "보험조건" },
    { key: "penalty", label: "중도해지 위약금" },
  ],
  OPTIONS: [
    { key: "exteriorColor", label: "외장색상" },
    { key: "interiorColor", label: "내장색상" },
    { key: "features", label: "주요옵션" },
  ]
};
