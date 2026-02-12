// src/components/templates/AdminLayout.jsx

/**
 * [코딩 원칙]
 * 1. 마스터 트리 경로(src/components/templates/)를 엄수합니다.
 * 2. SideNavigation, FilterStack 기관을 조합하여 표준 레이아웃을 생성합니다.
 * 3. children을 통해 페이지별 콘텐츠를 유연하게 수용합니다.
 */

import React from 'react';
import SideNavigation from '../organisms/SideNavigation';
import FilterStack from '../organisms/FilterStack';
import { SPECS } from '../../styles/core/specs';
import { useSidebar } from '../../hooks/ui/useSidebar';

const AdminLayout = ({ children }) => {
  const { isExpanded } = useSidebar();

  // 메인 콘텐츠 영역의 좌측 여백 계산
  // (1단 사이드바 너비 + 2단 필터스택 가변 너비)
  const mainOffset = isExpanded 
    ? SPECS.NAV_WIDTH + 200 
    : SPECS.NAV_WIDTH;

  const layoutStyle = {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#F3F4F6', // 배경은 약간 차분한 톤
  };

  const contentStyle = {
    flex: 1,
    marginLeft: `${mainOffset}px`,
    transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    padding: '40px',
    minWidth: '800px', // 최소 가독성 확보
  };

  return (
    <div style={layoutStyle}>
      {/* 1단: 메인 아이콘 메뉴 */}
      <SideNavigation />

      {/* 2단: 세부 필터 메뉴 */}
      <FilterStack />

      {/* 3단: 실제 페이지 콘텐츠 */}
      <main style={contentStyle}>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
