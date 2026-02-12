// src/components/molecules/NavButton.jsx

/**
 * [코딩 원칙]
 * 1. 마스터 트리 경로(src/components/molecules/)를 엄수합니다.
 * 2. BaseTile(Atom)을 확장하여 기능을 가진 네비게이션 부품으로 조립합니다.
 */

import React from 'react';
import BaseTile from '../atoms/BaseTile';
import IconFrame from '../atoms/IconFrame';
import { TYPOGRAPHY } from '../../styles/core/typography';
import { PALETTE } from '../../styles/core/palette';

const NavButton = ({ 
  icon: IconComponent, 
  label, 
  isActive, 
  onClick 
}) => {
  return (
    <BaseTile 
      active={isActive} 
      onClick={onClick}
      style={{
        gap: '8px', // 아이콘과 텍스트 사이 간격
        transition: 'all 0.2s ease'
      }}
    >
      {/* 1. 아이콘 영역 */}
      <IconFrame 
        size={24} 
        color={isActive ? PALETTE.POINT_BLUE : PALETTE.TEXT_MUTE}
      >
        <IconComponent />
      </IconFrame>

      {/* 2. 텍스트 라벨 영역 */}
      <span style={{
        fontSize: TYPOGRAPHY.SIZE.SIDE_MAIN,
        fontWeight: isActive ? TYPOGRAPHY.WEIGHT.BOLD : TYPOGRAPHY.WEIGHT.REGULAR,
        color: isActive ? PALETTE.TEXT_STD : PALETTE.TEXT_MUTE,
        letterSpacing: TYPOGRAPHY.SPACING.TIGHT
      }}>
        {label}
      </span>
    </BaseTile>
  );
};

export default NavButton;
