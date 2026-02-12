// src/components/organisms/DetailDrawer.jsx

/**
 * [코딩 원칙]
 * 1. 마스터 트리 경로(src/components/organisms/)를 엄수합니다.
 * 2. DETAIL_FIELDS 스키마를 기반으로 섹션별 상세 데이터를 렌더링합니다.
 * 3. isOpen 상태에 따른 CSS Transition 애니메이션을 적용합니다.
 */

import React from 'react';
import { DETAIL_FIELDS } from '../../data/inventory-schema';
import { PALETTE } from '../../styles/core/palette';
import { TYPOGRAPHY } from '../../styles/core/typography';
import { FORMATTER } from '../../utils/formatter';
import { X } from 'lucide-react'; // 아이콘 라이브러리 가정

const DetailDrawer = ({ isOpen, data, onClose }) => {
  if (!data) return null;

  const drawerStyle = {
    position: 'fixed',
    top: 0,
    right: isOpen ? 0 : '-500px', // 슬라이딩 효과
    width: '450px',
    height: '100vh',
    backgroundColor: '#FFFFFF',
    boxShadow: '-4px 0 20px rgba(0,0,0,0.1)',
    transition: 'right 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto'
  };

  const sectionStyle = {
    padding: '24px',
    borderBottom: `1px solid ${PALETTE.BORDER_STD}`
  };

  const fieldRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px',
    fontSize: TYPOGRAPHY.SIZE.MAIN
  };

  return (
    <aside style={drawerStyle}>
      {/* 1. 헤더 영역 */}
      <div style={{ ...sectionStyle, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F8F9FA' }}>
        <h2 style={{ fontSize: '18px', fontWeight: TYPOGRAPHY.WEIGHT.BOLD }}>차량 상세 정보</h2>
        <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
          <X size={24} color={PALETTE.TEXT_MUTE} />
        </button>
      </div>

      {/* 2. 상세 데이터 섹션 (스키마 기반 렌더링) */}
      {Object.entries(DETAIL_FIELDS).map(([sectionKey, fields]) => (
        <div key={sectionKey} style={sectionStyle}>
          <h3 style={{ fontSize: '12px', color: PALETTE.POINT_BLUE, marginBottom: '16px', fontWeight: TYPOGRAPHY.WEIGHT.BOLD }}>
            {sectionKey.replace('_', ' ')}
          </h3>
          {fields.map(field => (
            <div key={field.key} style={fieldRowStyle}>
              <span style={{ color: PALETTE.TEXT_MUTE }}>{field.label}</span>
              <span style={{ fontWeight: TYPOGRAPHY.WEIGHT.MEDIUM }}>
                {/* 가격 관련 키값은 포맷터 적용 */}
                {field.key.includes('Fee') || field.key.includes('Price') 
                  ? FORMATTER.currency(data[field.key]) 
                  : data[field.key] || '-'}
              </span>
            </div>
          ))}
        </div>
      ))}
    </aside>
  );
};

export default DetailDrawer;
