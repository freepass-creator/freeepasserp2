// src/hooks/auth/useGate.js

/**
 * [코딩 원칙]
 * 1. 마스터 트리 경로(src/hooks/auth/)를 엄수합니다.
 * 2. 보안코드 검증 로직과 인증 세션(Auth Session)의 생명주기를 관리합니다.
 */

import { useState, useCallback } from 'react';

export const useGate = () => {
  // 1. 현재 보안 게이트 통과 여부
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // 2. 인증 시도 중 로딩 상태
  const [isVerifying, setIsVerifying] = useState(false);

  /**
   * 보안코드 검증 실행
   * @param {string} code - 사용자가 입력한 보안 숫자/문자
   */
  const verifyGateCode = useCallback(async (code) => {
    setIsVerifying(true);
    
    try {
      // 실제 환경에서는 서버 API 호출 또는 Firebase Auth와 연동
      // 예시: 고정 보안코드 '1234' (추후 환경변수 처리)
      const isValid = code === "1234"; 

      if (isValid) {
        setIsAuthenticated(true);
        // 세션 유지를 위해 로컬 스토리지 등에 기록 가능
        // sessionStorage.setItem('gate_auth', 'true');
        return { success: true };
      } else {
        throw new Error("보안코드가 일치하지 않습니다.");
      }
    } catch (err) {
      return { success: false, message: err.message };
    } finally {
      setIsVerifying(false);
    }
  }, []);

  /**
   * 게이트 잠금 (로그아웃)
   */
  const lockGate = useCallback(() => {
    setIsAuthenticated(false);
    // sessionStorage.removeItem('gate_auth');
  }, []);

  return {
    isAuthenticated,
    isVerifying,
    verifyGateCode,
    lockGate
  };
};
