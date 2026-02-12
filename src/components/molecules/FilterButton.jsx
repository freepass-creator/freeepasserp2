// src/components/molecules/FilterButton.jsx

/**
 * [코딩 원칙]
 * 1. 메인 메뉴보다 작은 위계를 가지며, 텍스트 가독성에 최적화된 설계를 따릅니다.
 * 2. BaseTile 원자를 재사용하여 시스템 전체의 물리적 반응(타격감)을 계승합니다.
 */

import React from 'react';
import BaseTile from '../atoms/BaseTile';
import { TYPOGRAPHY } from '../../styles/core/typography';
import { PALETTE } from '../../styles/core/palette';
import { SPECS } from '../../styles/core/specs';

const FilterButton = ({ 
  label, 
  isActive = false, 
  onClick 
}) => {
  
  const labelStyle = {
    fontSize: TYPOGRAPHY.SIZE.FILTER_LABEL, // 10px
    fontWeight: isActive ? TYPOGRAPHY.WEIGHT.BOLD : TYPOGRAPHY.WEIGHT.MEDIUM,
    letterSpacing: TYPOGRAPHY.SPACING.TIGHT,
    color: isActive ? PALETTE.POINT_BLUE : PALETTE.TEXT_MAIN,
    textAlign: 'center',
    wordBreak: 'keep-all', // 단어 끊김 방지
    lineHeight: TYPOGRAPHY.LEADING.TIGHT
  };

  return (
    <BaseTile 
      isActive={isActive} 
      onClick={onClick}
      // 필터 버튼은 메인보다 살짝 작거나 동일한 규격을 SPECS에서 참조
      width={SPECS.TILE_SIZE} 
      height={SPECS.TILE_SIZE}
    >
      <div className="flex items-center justify-center px-1">
        <span style={labelStyle}>
          {label}
        </span>
      </div>
    </BaseTile>
  );
};

export default FilterButton;
