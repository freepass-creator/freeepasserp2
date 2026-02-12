// src/components/organisms/FilterStack.jsx

/**
 * [코딩 원칙]
 * 1. 마스터 트리 경로(src/components/organisms/)를 엄수합니다.
 * 2. NAV_CONTENT에서 현재 활성화된 메뉴의 filters 배열을 찾아 렌더링합니다.
 * 3. SideNavigation과 연동되어 레이아웃의 2단 구성을 완성합니다.
 */

import React from 'react';
import { NAV_CONTENT } from '../../data/nav-content';
import { useSidebar } from '../../hooks/ui/useSidebar';
import FilterItem from '../molecules/FilterItem';
import { SPECS } from '../../styles/core/specs';
import { PALETTE } from '../../styles/core/palette';
import { TYPOGRAPHY } from '../../styles/core/typography';

const FilterStack = () => {
  // 현재 활성화된 메뉴와 확장 상태를 가져옴
  const { activeMenu, isExpanded } = useSidebar();

  // 현재 메뉴에 해당하는 필터 데이터 추출
  const currentMenuData = NAV_CONTENT.find(item => item.id === activeMenu);
  const filters = currentMenuData ? currentMenuData.filters : [];

  const stackStyle = {
    position: 'fixed',
    left: `${SPECS.NAV_WIDTH}px`, // 메인 내비게이션 바로 옆
    top: 0,
    width: isExpanded ? '200px' : '0px', // 확장/축소 애니메이션
    height: '100vh',
    backgroundColor: '#FFFFFF',
    borderRight: isExpanded ? `1px solid ${PALETTE.BORDER_STD}` : 'none',
    transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 90,
  };

  const headerStyle = {
    padding: '32px 20px 20px 24px',
    fontSize: TYPOGRAPHY.SIZE.SIDE_MAIN,
    fontWeight: TYPOGRAPHY.WEIGHT.BOLD,
    color: PALETTE.TEXT_STD,
    whiteSpace: 'nowrap',
  };

  const listStyle = {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 8px',
    gap: '4px',
  };

  return (
    <aside style={stackStyle}>
      {/* 1. 필터 섹션 타이틀 */}
      <div style={headerStyle}>
        {currentMenuData?.label} 필터
      </div>

      {/* 2. 필터 리스트 렌더링 */}
      <div style={listStyle}>
        {filters.map((filter) => (
          <FilterItem
            key={filter.id}
            label={filter.label}
            isActive={false} // 추후 별도의 filterState와 연결
            onClick={() => console.log(`Filter selected: ${filter.id}`)}
          />
        ))}
      </div>
    </aside>
  );
};

export default FilterStack;
