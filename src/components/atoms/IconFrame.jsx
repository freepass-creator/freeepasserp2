// src/components/atoms/IconFrame.jsx

/**
 * [코딩 원칙]
 * 1. 마스터 트리 경로(src/components/atoms/)를 엄수합니다.
 * 2. 아이콘이 차지하는 물리적 면적을 규격화하여 시각적 정렬(Visual Alignment)을 보장합니다.
 */

import React from 'react';

const IconFrame = ({ 
  children, 
  size = 20, 
  color = 'currentColor', 
  style = {} 
}) => {
  
  const frameStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: color,
    flexShrink: 0, // 부모 컨테이너가 좁아져도 아이콘 크기 유지
    
    // 아이콘 내부 요소(SVG 등)가 프레임을 벗어나지 않도록 제어
    overflow: 'hidden', 
    
    ...style
  };

  return (
    <div style={frameStyle}>
      {/* 실제 구현 시 children으로 Lucide, Heroicons 등의 
        SVG 컴포넌트가 주입됩니다. 
      */}
      {React.cloneElement(children, {
        size: size,
        strokeWidth: 2, // 시스템 표준 선 굵기
      })}
    </div>
  );
};

export default IconFrame;
