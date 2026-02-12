// src/hooks/ui/useSidebar.js

/**
 * [코딩 원칙]
 * 1. UI의 상태(열림, 닫힘, 선택됨)와 로직을 컴포넌트에서 분리하여 관리합니다.
 * 2. 특정 메뉴 클릭 시 해당 메뉴에 종속된 필터 데이터를 반환하는 로직을 포함합니다.
 */

import { useState } from 'react';
import { NAV_CONTENT } from '../../data/nav-content';

export const useSidebar = () => {
  // 현재 활성화된 메인 메뉴 ID (초기값: 상품현황 'inventory')
  const [activeMenu, setActiveMenu] = useState('inventory');
  
  // 필터 영역 확장 여부 (메뉴 클릭 시 항상 확장되도록 설정 가능)
  const [isExpanded, setIsExpanded] = useState(true);

  // 메뉴 클릭 핸들러
  const handleMenuClick = (menuId) => {
    if (activeMenu === menuId) {
      // 이미 선택된 메뉴를 다시 누르면 확장/축소 토글
      setIsExpanded(!isExpanded);
    } else {
      // 새로운 메뉴를 누르면 활성화하고 확장
      setActiveMenu(menuId);
      setIsExpanded(true);
    }
  };

  // 현재 활성화된 메뉴에 맞는 필터 데이터 추출
  const getSubFilters = () => {
    if (!isExpanded) return [];
    
    switch (activeMenu) {
      case 'inventory':
        return NAV_CONTENT.INVENTORY_FILTERS;
      case 'settlement':
        return NAV_CONTENT.SETTLEMENT_FILTERS;
      default:
        return [];
    }
  };

  return {
    activeMenu,
    isExpanded,
    handleMenuClick,
    subFilters: getSubFilters()
  };
};
