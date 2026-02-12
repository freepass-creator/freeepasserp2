// src/hooks/ui/useSidebar.js

/**
 * [코딩 원칙]
 * 1. 마스터 트리 경로(src/hooks/ui/)를 엄수합니다.
 * 2. 화면의 확장/축소 상태와 메뉴 활성화 로직을 캡슐화합니다.
 */

import { useState } from 'react';

export const useSidebar = (initialMenu = 'inventory') => {
  // 1. 현재 선택된 메인 메뉴 ID
  const [activeMenu, setActiveMenu] = useState(initialMenu);
  
  // 2. 사이드바(또는 하위 필터 영역)의 확장 여부
  const [isExpanded, setIsExpanded] = useState(true);

  /**
   * 메뉴 클릭 시 처리 로직
   * - 이미 활성화된 메뉴를 누르면: 확장/축소 토글
   * - 새로운 메뉴를 누르면: 메뉴 변경 및 무조건 확장
   */
  const handleMenuClick = (menuId) => {
    if (activeMenu === menuId) {
      setIsExpanded((prev) => !prev);
    } else {
      setActiveMenu(menuId);
      setIsExpanded(true);
    }
  };

  // 3. 상태 강제 제어 (필요 시)
  const expand = () => setIsExpanded(true);
  const collapse = () => setIsExpanded(false);

  return {
    activeMenu,
    isExpanded,
    handleMenuClick,
    expand,
    collapse,
  };
};
