// src/App.js

/**
 * [코딩 원칙]
 * 1. 마스터 트리 경로(src/)를 엄수합니다.
 * 2. 모든 페이지와 전역 훅을 결합하여 구동 가능한 최종 애플리케이션을 완성합니다.
 * 3. 인증 상태(isAuthenticated)에 따라 보안 게이트와 내부 시스템을 분리합니다.
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// 1. 페이지 조립품 임포트
import SecurityGate from './pages/SecurityGate';
import InventoryPage from './pages/InventoryPage';
import SettlementPage from './pages/SettlementPage';

// 2. 인증 엔진 임포트
import { useAuth } from './hooks/api/useAuth';

function App() {
  const { user, isAuthenticated } = useAuth();

  return (
    <Router>
      <div className="app-container" style={{ fontStyle: 'sans-serif' }}>
        <Routes>
          {/* A. 보안 게이트: 인증되지 않은 사용자가 마주하는 첫 화면 */}
          <Route 
            path="/login" 
            element={!isAuthenticated ? <SecurityGate /> : <Navigate to="/inventory" />} 
          />

          {/* B. 보호된 경로: 인증된 관리자만 접근 가능 */}
          <Route 
            path="/inventory" 
            element={isAuthenticated ? <InventoryPage /> : <Navigate to="/login" />} 
          />
          
          <Route 
            path="/settlement" 
            element={isAuthenticated ? <SettlementPage /> : <Navigate to="/login" />} 
          />

          {/* C. 폴백 경로: 알 수 없는 주소 접근 시 메인으로 리다이렉트 */}
          <Route 
            path="*" 
            element={<Navigate to={isAuthenticated ? "/inventory" : "/login"} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
