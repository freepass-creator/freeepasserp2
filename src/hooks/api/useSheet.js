// src/hooks/api/useSheet.js

/**
 * [코딩 원칙]
 * 1. 마스터 트리 경로(src/hooks/api/)를 엄수합니다.
 * 2. 외부 시트 데이터(Array of Arrays)를 시스템 표준 객체(JSON)로 변환합니다.
 */

import { useState, useCallback } from 'react';

export const useSheet = () => {
  const [isParsing, setIsParsing] = useState(false);

  /**
   * 시트 데이터를 시스템 스키마에 맞게 변환
   * @param {Array} rawRows - 구글 시트에서 가져온 순수 행 데이터
   * @param {Object} schema - 데이터를 매핑할 기준 (inventory-schema 등)
   */
  const parseSheetData = useCallback((rawRows, schema) => {
    setIsParsing(true);
    
    try {
      // 첫 줄(헤더)을 제외한 데이터 가공
      const headers = rawRows[0];
      const dataRows = rawRows.slice(1);

      const formattedData = dataRows.map((row) => {
        const entry = {};
        headers.forEach((header, index) => {
          // 스키마에 정의된 키값이 있다면 매핑, 없으면 원본 헤더 사용
          const key = schema[header] || header;
          entry[key] = row[index];
        });
        return entry;
      });

      return formattedData;
    } catch (err) {
      console.error("[Sheet] Parsing Error:", err);
      return [];
    } finally {
      setIsParsing(false);
    }
  }, []);

  return {
    isParsing,
    parseSheetData
  };
};
