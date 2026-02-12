// src/components/atoms/IconFrame.jsx

/**
 * [코딩 원칙]
 * 1. Lucide 등의 외부 아이콘 라이브러리를 시스템 규격에 맞춰 래핑(Wrapping)합니다.
 * 2. 아이콘의 크기, 색상, 정렬을 중앙 집중 관리합니다.
 */

import React from 'react';
import * as LucideIcons from 'lucide-react';
import { SPECS } from '../../styles/core/specs';
import { PALETTE } from '../../styles/core/palette';

const IconFrame = ({ 
  name, 
  size = 20, 
  color = PALETTE.TEXT_MAIN, 
  isActive = false 
}) => {
  // 아이콘 이름에 해당하는 컴포넌트 추출
  const IconComponent = LucideIcons[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in Lucide library.`);
    return <div style={{ width: size, height: size }} />;
  }

  const frameStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    transition: 'color 0.2s ease',
  };

  return (
    <div style={frameStyle}>
      <IconComponent 
        size={size} 
        color={isActive ? PALETTE.POINT_BLUE : color} 
        strokeWidth={2.5} // 사용자님의 날렵한 디자인을 위한 굵기 고정
      />
    </div>
  );
};

export default IconFrame;
