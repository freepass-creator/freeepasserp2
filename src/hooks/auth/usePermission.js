// src/hooks/auth/usePermission.js

/**
 * [코딩 원칙]
 * 1. 마스터 트리 경로(src/hooks/auth/)를 엄수합니다.
 * 2. 권한 등급(Level)에 따른 기능 접근 제어 로직을 관리합니다.
 */

import { useState, useCallback } from 'react';

// 권한 등급 정의
const ROLES = {
  ADMIN: 'admin',     // 전체 관리
  PROVIDER: 'vendor', // 상품 공급사
  AGENT: 'agent'      // 현장 영업자
};

export const usePermission = () => {
  // 현재 로그인한 사용자의 역할 (실제로는 Auth 상태에서 가져옴)
  const [userRole, setUserRole] = useState(ROLES.AGENT);

  /**
   * 특정 기능 사용 가능 여부 확인
   * @param {string} feature - 체크할 기능 명칭
   */
  const canAccess = useCallback((feature) => {
    switch (feature) {
      case 'EDIT_PRICE': // 가격 수정은 관리자와 공급사만
        return [ROLES.ADMIN, ROLES.PROVIDER].includes(userRole);
      
      case 'DELETE_ITEM': // 삭제는 관리자만
        return userRole === ROLES.ADMIN;
      
      case 'VIEW_SETTLEMENT': // 정산 확인은 모두 가능 (데이터 범위는 다름)
        return true;
        
      default:
        return false;
    }
  }, [userRole]);

  /**
   * 사용자 역할에 따른 데이터 필터링 규칙 반환
   */
  const getFilterRule = useCallback(() => {
    if (userRole === ROLES.ADMIN) return { scope: 'ALL' };
    if (userRole === ROLES.PROVIDER) return { scope: 'OWN_PRODUCTS' };
    return { scope: 'ASSIGNED_ONLY' };
  }, [userRole]);

  return {
    userRole,
    ROLES,
    canAccess,
    getFilterRule
  };
};
