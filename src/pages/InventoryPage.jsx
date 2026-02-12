// src/pages/InventoryPage.jsx

/**
 * [코딩 원칙]
 * 1. 마스터 트리 경로(src/pages/)를 엄수합니다.
 * 2. AdminLayout 템플릿 내부에 실질적인 비즈니스 컴포넌트를 배치합니다.
 * 3. useInventory와 useDrawer 훅을 결합하여 데이터와 UI 상태를 제어합니다.
 */

import React from 'react';
import AdminLayout from '../components/templates/AdminLayout';
import DataTable from '../components/organisms/DataTable';
import DetailDrawer from '../components/organisms/DetailDrawer';
import { useInventory } from '../hooks/api/useInventory';
import { useDrawer } from '../hooks/ui/useDrawer';
import { TYPOGRAPHY } from '../styles/core/typography';
import { PALETTE } from '../styles/core/palette';

const InventoryPage = () => {
  // 1. 데이터 및 UI 상태 관리 훅 연결
  const { inventory, loading } = useInventory();
  const { isOpen, targetData, openDrawer, closeDrawer } = useDrawer();

  return (
    <AdminLayout>
      {/* A. 페이지 헤더 영역 */}
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ 
          fontSize: '24px', 
          fontWeight: TYPOGRAPHY.WEIGHT.BOLD, 
          color: PALETTE.TEXT_STD,
          marginBottom: '8px'
        }}>
          상품 현황 관리
        </h1>
        <p style={{ color: PALETTE.TEXT_MUTE, fontSize: TYPOGRAPHY.SIZE.MAIN }}>
          전체 가용 자산 및 실시간 상담 현황을 한눈에 파악합니다.
        </p>
      </header>

      {/* B. 메인 데이터 테이블 영역 */}
      <section>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '100px', color: PALETTE.TEXT_MUTE }}>
            데이터를 동기화 중입니다...
          </div>
        ) : (
          <DataTable 
            data={inventory} 
            onRowClick={(item) => openDrawer(item)} 
          />
        )}
      </section>

      {/* C. 상세 정보 드로어 (조건부 렌더링이 아닌 상태 제어) */}
      <DetailDrawer 
        isOpen={isOpen} 
        data={targetData} 
        onClose={closeDrawer} 
      />
    </AdminLayout>
  );
};

export default InventoryPage;
