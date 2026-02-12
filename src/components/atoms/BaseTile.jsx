// src/components/atoms/BaseTile.jsx

/**
 * [코딩 원칙]
 * 1. 이 컴포넌트는 오직 "껍데기"와 "물리적 반응"만 담당합니다.
 * 2. 내부 내용(Children)은 무엇이든 받아들일 수 있는 유연한 구조로 만듭니다.
 * 3. 앞서 정의한 모든 유전자(Styles)를 결합합니다.
 */

import React from 'react';
import { SPECS } from '../../styles/core/specs';
import { PALETTE } from '../../styles/core/palette';
import { SHADOWS } from '../../styles/effects/visual/shadows';
import { TIMING } from '../../styles/effects/motion/timing';
import { HAPTIC_FX } from '../../styles/effects/visual/haptic-fx';

const BaseTile = ({ 
  children, 
  onClick, 
  isActive = false, 
  width = SPECS.TILE_SIZE, 
  height = SPECS.TILE_SIZE 
}) => {
  
  const baseStyle = {
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: isActive ? PALETTE.ACTIVE_BG : PALETTE.TILE_BG,
    border: `${SPECS.BORDER_WIDTH}px solid ${isActive ? PALETTE.POINT_BLUE : PALETTE.BORDER_STD}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: `all ${TIMING.INSTANT} ${TIMING.EASE_IN_OUT}`,
    boxShadow: SHADOWS.BUTTON,
    overflow: 'hidden',
    userSelect: 'none', // 텍스트 드래그 방지 (타격감 집중)
  };

  // 인라인 스타일로 타격감 구현 (active 시 변형)
  const activeTransform = isActive ? 'none' : HAPTIC_FX.PUSH_Y;

  return (
    <div 
      className="base-tile-container"
      style={baseStyle}
      onClick={onClick}
      onMouseDown={(e) => {
        if (!isActive) e.currentTarget.style.transform = HAPTIC_FX.PUSH_Y;
      }}
      onMouseUp={(e) => {
        if (!isActive) e.currentTarget.style.transform = HAPTIC_FX.RESET;
      }}
      onMouseLeave={(e) => {
        if (!isActive) e.currentTarget.style.transform = HAPTIC_FX.RESET;
      }}
    >
      {children}
    </div>
  );
};

export default BaseTile;
