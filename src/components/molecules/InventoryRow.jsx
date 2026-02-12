// src/components/molecules/InventoryRow.jsx

/**
 * [코딩 원칙]
 * 1. 마스터 트리 경로(src/components/molecules/)를 엄수합니다.
 * 2. TABLE_HEADERS 규격에 맞춰 셀 너비를 동기화합니다.
 * 3. FORMATTER를 통해 원천 데이터를 사용자 친화적 문구로 변환합니다.
 */

import React from 'react';
import { PALETTE } from '../../styles/core/palette';
import { TYPOGRAPHY } from '../../styles/core/typography';
import { FORMATTER } from '../../utils/formatter';
import Badge from '../atoms/Badge';

const InventoryRow = ({ data, onClick }) => {
  // 행 전체 스타일
  const rowStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    borderBottom: `1px solid ${PALETTE.BORDER_STD}`,
    cursor: 'pointer',
    backgroundColor: '#ffffff',
    transition: 'background-color 0.15s ease',
  };

  // 공통 셀 스타일 (텍스트 생략 처리 등)
  const cellBaseStyle = {
    fontSize: TYPOGRAPHY.SIZE.MAIN,
    color: PALETTE.TEXT_STD,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    padding: '0 8px',
  };

  return (
    <div 
      style={rowStyle} 
      onClick={() => onClick(data)}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = PALETTE.HOVER_BG}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
    >
      {/* 1. 상태 배지 (너비 80px 고정) */}
      <div style={{ ...cellBaseStyle, width: '80px', textAlign: 'center' }}>
        <Badge 
          text={data.status} 
          type={data.status === '상담중' ? 'WARNING' : 'SUCCESS'} 
          fill={data.status === '상담중'}
        />
      </div>

      {/* 2. 차량번호 (너비 120px) */}
      <div style={{ ...cellBaseStyle, width: '120px', fontWeight: TYPOGRAPHY.WEIGHT.BOLD }}>
        {FORMATTER.carNumber(data.carNumber)}
      </div>

      {/* 3. 모델명 (유연한 너비) */}
      <div style={{ ...cellBaseStyle, flex: 1 }}>
        {data.modelName}
      </div>

      {/* 4. 월 대여료 (너비 120px) */}
      <div style={{ ...cellBaseStyle, width: '120px', textAlign: 'right', color: PALETTE.POINT_BLUE }}>
        {FORMATTER.currency(data.rentalFee)}
      </div>

      {/* 5. 공급사 (너비 100px) */}
      <div style={{ ...cellBaseStyle, width: '100px', fontSize: '12px', color: PALETTE.TEXT_MUTE }}>
        {data.provider}
      </div>
    </div>
  );
};

export default InventoryRow;
