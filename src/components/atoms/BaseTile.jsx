// src/components/atoms/BaseTile.jsx

/**
 * [코딩 원칙]
 * 1. 마스터 트리 경로(src/components/atoms/)를 엄수합니다.
 * 2. 모든 타일형 부품의 기초가 되는 '원자' 컴포넌트입니다.
 * 3. Haptic 효과와 Shadow 유전자를 결합하여 물리적 실체감을 부여합니다.
 */

import React from 'react';
import { SPECS } from '../../styles/core/specs';
import { PALETTE } from '../../styles/core/palette';
import { SHADOWS } from '../../styles/effects/visual/shadows';
import { useHaptic } from '../../hooks/ui/useHaptic';

const BaseTile = ({ 
  children, 
  onClick, 
  width = SPECS.TILE_SIZE, 
  height = SPECS.TILE_SIZE,
  active = false,
  style = {} 
}) => {
  const { hapticStyle, bindHaptic } = useHaptic();

  const baseStyle = {
    // 1. 물리적 규격
    width: `${width}px`,
    height: `${height}px`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    userSelect: 'none',
    backgroundColor: active ? PALETTE.ACTIVE_BG : PALETTE.TILE_BG,
    border: `1px solid ${active ? PALETTE.POINT_BLUE : PALETTE.BORDER_STD}`,
    borderRadius: `${SPECS.RADIUS}px`,
    
    // 2. 시각/물리 효과 결합
    boxShadow: active ? 'none' : SHADOWS.STANDARD,
    ...hapticStyle, // useHaptic에서 계산된 transform/transition 반영
    
    // 3. 외부 주입 스타일
    ...style
  };

  return (
    <div 
      style={baseStyle} 
      onClick={onClick}
      {...bindHaptic}
    >
      {children}
    </div>
  );
};

export default BaseTile;
