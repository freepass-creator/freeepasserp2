// src/components/organisms/SideNavigation.jsx

/**
 * [코딩 원칙]
 * 1. 마스터 트리 경로(src/components/organisms/)를 엄수합니다.
 * 2. NAV_CONTENT 데이터를 기반으로 NavButton을 동적 생성합니다.
 * 3. useSidebar 훅을 사용하여 시스템의 현재 위치(State)를 제어합니다.
 */

import React from 'react';
import { NAV_CONTENT } from '../../data/nav-content';
import { useSidebar } from '../../hooks/ui/useSidebar';
import NavButton from '../molecules/NavButton';
import { SPECS } from '../../styles/core/specs';
import { PALETTE } from '../../styles/core/palette';

// 아이콘 매핑용 (실제 프로젝트에서는 Lucide-react 등 라이브러리 사용)
import * as Icons from 'lucide-react';

const SideNavigation = () => {
  const { activeMenu, handleMenuClick } = useSidebar('inventory');

  const navContainerStyle = {
    width: `${SPECS.NAV_WIDTH}px`,
    height: '100vh',
    backgroundColor: PALETTE.SIDEBAR_BG,
    borderRight: `1px solid ${PALETTE.BORDER_STD}`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '24px 0',
    gap: '12px',
    position: 'fixed',
    left: 0,
    top: 0,
    zIndex: 100,
  };

  const logoStyle = {
    marginBottom: '20px',
    fontWeight: '900',
    fontSize: '12px',
    color: PALETTE.POINT_BLUE,
    letterSpacing: '2px',
  };

  return (
    <nav style={navContainerStyle}>
      {/* 시스템 로고 영역 */}
      <div style={logoStyle}>B2B CMS</div>

      {/* 메뉴 리스트 렌더링 */}
      {NAV_CONTENT.map((menu) => {
        // 데이터에 정의된 아이콘 컴포넌트 동적 할당
        const Icon = Icons[menu.icon] || Icons.HelpCircle;

        return (
          <NavButton
            key={menu.id}
            icon={Icon}
            label={menu.label}
            isActive={activeMenu === menu.id}
            onClick={() => handleMenuClick(menu.id)}
          />
        );
      })}
    </nav>
  );
};

export default SideNavigation;
