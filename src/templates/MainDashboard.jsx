// src/templates/MainDashboard.jsx

/**
 * [코딩 원칙]
 * 1. 시스템의 전체적인 공간 분할(Layout)을 담당하며, 실제 내용은 children으로 받습니다.
 * 2. SPECS에 정의된 SIDEBAR_WIDTH, HEADER_HEIGHT 수치를 엄격히 준수합니다.
 */

import React from 'react';
import SidebarStack from '../organisms/SidebarStack';
import { SPECS } from '../styles/core/specs';
import { PALETTE } from '../styles/core/palette';

const MainDashboard = ({ children }) => {
  
  // 전체 화면 컨테이너 스타일
  const containerStyle = {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    backgroundColor: PALETTE.APP_BG,
    overflow: 'hidden',
  };

  // 왼쪽 고정 사이드바 영역
  const sidebarAreaStyle = {
    width: `${SPECS.SIDEBAR_WIDTH}px`,
    height: '100%',
    backgroundColor: PALETTE.TILE_BG,
    borderRight: `${SPECS.BORDER_WIDTH}px solid ${PALETTE.BORDER_STD}`,
    zIndex: 50,
  };

  // 오른쪽 전체 (헤더 + 메인 컨텐츠) 영역
  const mainAreaStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  };

  // 상단 헤더 영역
  const headerAreaStyle = {
    height: `${SPECS.HEADER_HEIGHT}px`,
    width: '100%',
    backgroundColor: PALETTE.TILE_BG,
    borderBottom: `${SPECS.BORDER_WIDTH}px solid ${PALETTE.BORDER_STD}`,
    display: 'flex',
    alignItems: 'center',
    padding: '0 20px',
  };

  // 실제 데이터가 뿌려질 컨텐츠 영역
  const contentAreaStyle = {
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
  };

  return (
    <div style={containerStyle}>
      {/* 1. 사이드바 조립 */}
      <aside style={sidebarAreaStyle}>
        <SidebarStack />
      </aside>

      {/* 2. 메인 영역 조립 */}
      <main style={mainAreaStyle}>
        {/* 상단 바 (추후 컴포넌트화 가능) */}
        <header style={headerAreaStyle}>
          <span style={{ fontSize: '12px', fontWeight: 'bold' }}>SYSTEM DASHBOARD</span>
        </header>

        {/* 페이지별 컨텐츠 */}
        <section style={contentAreaStyle}>
          {children}
        </section>
      </main>
    </div>
  );
};

export default MainDashboard;
