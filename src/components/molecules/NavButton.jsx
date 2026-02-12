// src/components/molecules/NavButton.jsx

/**
 * [코딩 원칙]
 * 1. 원자(Atoms) 조각들을 결합하여 하나의 완성된 기능을 가진 부품을 만듭니다.
 * 2. 텍스트는 TYPOGRAPHY 유전자를 따르며, 아이콘과 수직으로 배치합니다.
 */

import React from 'react';
import BaseTile from '../atoms/BaseTile';
import IconFrame from '../atoms/IconFrame';
import { TYPOGRAPHY } from '../../styles/core/typography';
import { PALETTE } from '../../styles/core/palette';

const NavButton = ({ 
  id, 
  label, 
  iconName, 
  isActive = false, 
  onClick 
}) => {
  
  const labelStyle = {
    fontSize: TYPOGRAPHY.SIZE.SIDE_TINY, // 9px
    fontWeight: TYPOGRAPHY.WEIGHT.BLACK,  // 700
    letterSpacing: TYPOGRAPHY.SPACING.TIGHT,
    color: isActive ? PALETTE.POINT_BLUE : PALETTE.TEXT_SUB,
    marginTop: '4px',
    textAlign: 'center'
  };

  return (
    <BaseTile isActive={isActive} onClick={() => onClick(id)}>
      <div className="flex flex-col items-center justify-center">
        {/* 아이콘 원자 */}
        <IconFrame 
          name={iconName} 
          isActive={isActive} 
        />
        {/* 라벨 텍스트 */}
        <span style={labelStyle}>
          {label}
        </span>
      </div>
    </BaseTile>
  );
};

export default NavButton;
