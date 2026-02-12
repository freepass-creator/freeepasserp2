// src/pages/SettlementPage.jsx

/**
 * [코딩 원칙]
 * 1. 마스터 트리 경로(src/pages/)를 엄수합니다.
 * 2. SETTLEMENT_SCHEMA를 참조하여 권한(Admin/Vendor/Agent)별 테이블을 구성합니다.
 * 3. EXCEL_EXPORTER를 호출하여 실무용 엑셀 다운로드 기능을 제공합니다.
 */

import React from 'react';
import AdminLayout from '../components/templates/AdminLayout';
import { SETTLEMENT_SCHEMA } from '../data/settlement-schema';
import { FORMATTER } from '../utils/formatter';
import { EXCEL_EXPORTER } from '../utils/excel-exporter';
import { PALETTE } from '../styles/core/palette';
import { TYPOGRAPHY } from '../styles/core/typography';
import { Download } from 'lucide-react';

const SettlementPage = () => {
  // 실제 구현 시 API를 통해 가져올 가상 데이터
  const dummySettlements = [
    { id: 1, settlementDate: '2026-02-12', carNumber: '12가 3456', clientName: '홍길동', supplyPrice: 1200000, agentFee: 150000, platformFee: 50000, totalMargin: 100000, status: '정산완료' },
  ];

  // 현재 사용자 권한 (예시: admin)
  const userRole = 'admin';
  const columns = [...SETTLEMENT_SCHEMA.COMMON, ...SETTLEMENT_SCHEMA.PERMISSIONS[userRole]];

  return (
    <AdminLayout>
      {/* 1. 상단 액션 바 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: TYPOGRAPHY.WEIGHT.BOLD }}>정산 내역 관리</h1>
          <p style={{ color: PALETTE.TEXT_MUTE }}>지급 상태 및 권한별 수수료 정산 내역을 확인합니다.</p>
        </div>
        
        <button 
          onClick={() => EXCEL_EXPORTER.exportToExcel(dummySettlements, 'settlement_report')}
          style={{ 
            display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px',
            backgroundColor: '#1D6F42', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer'
          }}
        >
          <Download size={18} />
          엑셀 추출
        </button>
      </div>

      {/* 2. 정산 테이블 리스트 */}
      <div style={{ backgroundColor: 'white', borderRadius: '8px', border: `1px solid ${PALETTE.BORDER_STD}`, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#F9FAFB' }}>
            <tr>
              {columns.map(col => (
                <th key={col.key} style={{ padding: '16px', fontSize: '12px', color: PALETTE.TEXT_MUTE, borderBottom: `2px solid ${PALETTE.BORDER_STD}` }}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dummySettlements.map(row => (
              <tr key={row.id} style={{ borderBottom: `1px solid ${PALETTE.BORDER_STD}` }}>
                {columns.map(col => (
                  <td key={col.key} style={{ padding: '16px', fontSize: '14px' }}>
                    {typeof row[col.key] === 'number' ? FORMATTER.currency(row[col.key]) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default SettlementPage;
