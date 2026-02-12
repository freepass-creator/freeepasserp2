// src/utils/formatter.js

/**
 * [코딩 원칙]
 * 1. 마스터 트리 경로(src/utils/)를 엄수합니다.
 * 2. React에 의존하지 않는 순수 자바스크립트 함수로 작성하여 재사용성을 극대화합니다.
 */

export const FORMATTER = {
  /**
   * 숫자를 통화 형식으로 변환 (예: 1500000 -> 1,500,000원)
   * @param {number|string} value 
   */
  currency: (value) => {
    if (!value) return "0원";
    const num = Number(value);
    return new Intl.NumberFormat('ko-KR').format(num) + "원";
  },

  /**
   * 날짜 객체 또는 문자열을 표준 규격으로 변환 (예: 20260212 -> 2026-02-12)
   * @param {string|Date} date 
   */
  date: (date) => {
    if (!date) return "-";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },

  /**
   * 차량 번호 사이 공백 추가 등 텍스트 정제
   * @param {string} carNum 
   */
  carNumber: (carNum) => {
    if (!carNum) return "-";
    return carNum.replace(/([0-9]{2,3})([가-힣]{1})([0-9]{4})/, '$1$2 $3');
  },

  /**
   * 퍼센트 표기 (예: 10 -> 10%)
   * @param {number|string} value 
   */
  percent: (value) => {
    if (value === undefined || value === null) return "0%";
    return `${value}%`;
  }
};
