// src/components/molecules/FilterItem.jsx

/**
 * [코딩 원칙]
 * 1. 마스터 트리 경로(src/components/molecules/)를 엄수합니다.
 * 2. 좁은 공간에서도 가독성을 유지하도록 텍스트 정렬과 인디케이터를 결합합니다.
 */

import React from 'react';
import { TYPOGRAPHY } from '../../styles/core/typography';
import { PALETTE } from '../../styles/core/palette';
import { useHaptic } from '../../hooks/ui/useHaptic';

const FilterItem = ({ label, isActive, onClick }) => {
  const { hapticStyle, bindHaptic } = useHaptic();

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 16px',
    cursor: 'pointer',
    backgroundColor: isActive ? 'rgba(0, 102, 255, 0.05)' : 'transparent',
    borderRadius: '6px',
    transition: 'background-color 0.2s ease',
    ...hapticStyle,
  };

  const indicatorStyle = {
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    backgroundColor: isActive ? PALETTE.POINT_BLUE : 'transparent',
    marginRight: '10px',
  };

  const textStyle = {
    fontSize: TYPOGRAPHY.SIZE.SIDE_MAIN,
    fontWeight: isActive ? TYPOGRAPHY.WEIGHT.BOLD : TYPOGRAPHY.WEIGHT.REGULAR,
    color: isActive ? PALETTE.POINT_BLUE : PALETTE.TEXT_MUTE,
    letterSpacing: TYPOGRAPHY.SPACING.TIGHT,
  };

  return (
    <div 
      style={containerStyle} 
      onClick={onClick}
      {...bindHaptic}
    >
      {/* 활성화 상태를 나타내는 점 */}
      <div style={indicatorStyle} />
      
      {/* 필터 명칭 */}
      <span style={textStyle}>{label}</span>
    </div>
  );
};

export default FilterItem;
