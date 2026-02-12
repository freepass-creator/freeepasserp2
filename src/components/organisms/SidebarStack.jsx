// src/components/organisms/SidebarStack.jsx

/**
 * [코딩 원칙]
 * 1. 분자(Molecules)들을 로직(Hook)에 따라 배치하여 하나의 기능적 덩어리를 만듭니다.
 * 2. SPECS.TILE_GAP을 사용하여 버튼 간의 간격을 정밀하게 유지합니다.
 */

import React from 'react';
import NavButton from '../molecules/NavButton';
import FilterButton from '../molecules/FilterButton';
import { useSidebar } from '../../hooks/ui/useSidebar';
import { NAV_CONTENT } from '../../data/nav-content';
import { SPECS } from '../../styles/core/specs';

const SidebarStack = () => {
  const { activeMenu, handleMenuClick, subFilters } = useSidebar();

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: `${SPECS.TILE_GAP}px`, // 8px 간격
    padding: `${SPECS.TILE_GAP}px`,
    width: `${SPECS.SIDEBAR_WIDTH}px`, // 72px
    height: '100%',
    backgroundColor: 'transparent',
    overflowY: 'auto',
    overflowX: 'hidden'
  };

  return (
    <div className="sidebar-stack" style={containerStyle}>
      {/* 1. 메인 메뉴 영역 */}
      {NAV_CONTENT.MAIN_MENU.map((menu) => (
        <NavButton
          key={menu.id}
          id={menu.id}
          label={menu.label}
          iconName={menu.icon}
          isActive={activeMenu === menu.id}
          onClick={handleMenuClick}
        />
      ))}

      {/* 2. 구분선 (선택 사항) */}
      <div style={{ height: '1px', backgroundColor: '#e2e8f0', margin: '4px 0' }} />

      {/* 3. 활성화된 메뉴에 따른 서브 필터 영역 */}
      <div className="filter-group" style={{ display: 'flex', flexDirection: 'column', gap: `${SPECS.TILE_GAP}px` }}>
        {subFilters.map((filter) => (
          <FilterButton
            key={filter.id}
            label={filter.label}
            isActive={false} // 필터의 개별 활성화 로직은 추후 확장
            onClick={() => console.log(`${filter.label} 클릭`)}
          />
        ))}
      </div>
    </div>
  );
};

export default SidebarStack;
