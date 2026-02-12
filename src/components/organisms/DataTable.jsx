// src/components/organisms/DataTable.jsx

/**
 * [코딩 원칙]
 * 1. 마스터 트리 경로(src/components/organisms/)를 엄수합니다.
 * 2. TABLE_HEADERS 스키마를 순회하여 헤더 UI를 자동 생성합니다.
 * 3. 데이터가 없을 경우의 빈 상태(Empty State)를 포함합니다.
 */

import React from 'react';
import { TABLE_HEADERS } from '../../data/inventory-schema';
import { PALETTE } from '../../styles/core/palette';
import { TYPOGRAPHY } from '../../styles/core/typography';
import InventoryRow from '../molecules/InventoryRow';

const DataTable = ({ data = [], onRowClick }) => {
  
  const containerStyle = {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    border: `1px solid ${PALETTE.BORDER_STD}`,
    overflow: 'hidden',
  };

  const headerRowStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '0 16px',
    height: '48px',
    backgroundColor: '#F9FAFB',
    borderBottom: `2px solid ${PALETTE.BORDER_STD}`,
  };

  const headerCellStyle = (width) => ({
    width: width === 'auto' ? 'auto' : width,
    flex: width === 'auto' ? 1 : 'none',
    fontSize: '12px',
    fontWeight: TYPOGRAPHY.WEIGHT.BOLD,
    color: PALETTE.TEXT_MUTE,
    padding: '0 8px',
  });

  return (
    <div style={containerStyle}>
      {/* 1. 테이블 헤더 영역 */}
      <div style={headerRowStyle}>
        {TABLE_HEADERS.map((header) => (
          <div key={header.key} style={headerCellStyle(header.width)}>
            {header.label}
          </div>
        ))}
      </div>

      {/* 2. 데이터 리스트 영역 */}
      <div style={{ maxHeight: 'calc(100vh - 250px)', overflowY: 'auto' }}>
        {data.length > 0 ? (
          data.map((item, index) => (
            <InventoryRow 
              key={item.id || index} 
              data={item} 
              onClick={onRowClick} 
            />
          ))
        ) : (
          <div style={{ 
            padding: '60px', 
            textAlign: 'center', 
            color: PALETTE.TEXT_MUTE,
            fontSize: TYPOGRAPHY.SIZE.MAIN 
          }}>
            검색 결과가 없거나 데이터를 불러오는 중입니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default DataTable;
