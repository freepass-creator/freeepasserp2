// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// 페이지 컴포넌트 임포트
import SecurityGate from './pages/SecurityGate';
import InventoryPage from './pages/InventoryPage';
import SettlementPage from './pages/SettlementPage';

// 인증 상태 훅 (이전에 만든 것)
import { useAuth } from './hooks/api/useAuth';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* 1. 루트 경로(/) 처리: 로그인 여부에 따라 목적지 자동 배정 */}
          <Route 
            path="/" 
            element={<Navigate to={isAuthenticated ? "/inventory" : "/login"} replace />} 
          />

          {/* 2. 로그인 화면: 이미 로그인했다면 메인으로 튕겨냄 */}
          <Route 
            path="/login" 
            element={!isAuthenticated ? <SecurityGate /> : <Navigate to="/inventory" replace />} 
          />

          {/* 3. 인벤토리 메인: 로그인 안 했으면 로그인 창으로 쫓아냄 */}
          <Route 
            path="/inventory" 
            element={isAuthenticated ? <InventoryPage /> : <Navigate to="/login" replace />} 
          />
          
          {/* 4. 정산 관리: 로그인 안 했으면 로그인 창으로 쫓아냄 */}
          <Route 
            path="/settlement" 
            element={isAuthenticated ? <SettlementPage /> : <Navigate to="/login" replace />} 
          />

          {/* 5. 404 예방: 위 경로에 해당하지 않는 모든 접근을 로그인이나 메인으로 리다이렉트 */}
          <Route 
            path="*" 
            element={<Navigate to={isAuthenticated ? "/inventory" : "/login"} replace />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
