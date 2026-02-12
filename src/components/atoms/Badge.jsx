// src/components/atoms/Badge.jsx

/**
 * [코딩 원칙]
 * 1. 마스터 트리 경로(src/components/atoms/)를 엄수합니다.
 * 2. 텍스트와 타입에 따라 PALETTE의 상태 색상을 매칭합니다.
 * 3. 날렵한 디자인을 위해 9px 폰트와 최소한의 패딩을 적용합니다.
 */

import React from 'react';
import { PALETTE } from '../../styles/core/palette';
import { TYPOGRAPHY } from '../../styles/core/typography';

const Badge = ({ 
  text, 
  type = 'SUCCESS', // SUCCESS, DANGER, WARNING, POINT_BLUE 등
  fill = false 
}) => {
  
  // 타입에 맞는 색상 추출 (없을 경우 기본값 적용)
  const statusColor = PALETTE[type] || PALETTE.TEXT_MUTE;

  const badgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1px 5px',
    fontSize: TYPOGRAPHY.SIZE.SIDE_TINY, // 9px
    fontWeight: TYPOGRAPHY.WEIGHT.BOLD,
    letterSpacing: TYPOGRAPHY.SPACING.TIGHT,
    borderRadius: '2px', // 아주 미세한 곡률
    
    // fill 여부에 따른 스타일 분기 (색 채움 vs 테두리만)
    backgroundColor: fill ? statusColor : 'transparent',
    color: fill ? '#ffffff' : statusColor,
    border: `1px solid ${statusColor}`,
    
    lineHeight: 1,
    whiteSpace: 'nowrap',
    verticalAlign: 'middle'
  };

  return (
    <span style={badgeStyle}>
      {text}
    </span>
  );
};

export default Badge;
