// src/hooks/ui/useDrawer.js

/**
 * [코딩 원칙]
 * 1. 마스터 트리 경로(src/hooks/ui/)를 엄수합니다.
 * 2. 상세 정보(Data)와 인터랙션 상태(Visibility)를 연결하여 관리합니다.
 */

import { useState, useCallback } from 'react';

export const useDrawer = () => {
  // 1. 드로어의 시각적 열림 상태
  const [isOpen, setIsOpen] = useState(false);
  
  // 2. 드로어 내부에 표시할 데이터 (차량 상세 정보 등)
  const [drawerData, setDrawerData] = useState(null);

  // 드로어 열기 (데이터 주입과 동시에 실행)
  const openDrawer = useCallback((data) => {
    setDrawerData(data);
    setIsOpen(true);
  }, []);

  // 드로어 닫기
  const closeDrawer = useCallback(() => {
    setIsOpen(false);
    // 애니메이션이 끝난 후 데이터를 비우고 싶다면 setTimeout 활용 가능 (TIMING.NORMAL 참조)
  }, []);

  // 데이터만 업데이트 (열린 상태 유지)
  const updateDrawerData = useCallback((newData) => {
    setDrawerData(newData);
  }, []);

  return {
    isOpen,
    drawerData,
    openDrawer,
    closeDrawer,
    updateDrawerData,
  };
};
