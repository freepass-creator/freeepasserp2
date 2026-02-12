import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// 🚩 경로 수정됨: 루트에서 src 폴더 안을 바라봅니다.
import SecurityGate from './src/pages/SecurityGate';
import InventoryPage from './src/pages/InventoryPage';
import SettlementPage from './src/pages/SettlementPage';

// 인증 상태 훅 (경로 주의)
import { useAuth } from './src/hooks/api/useAuth';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={isAuthenticated ? "/inventory" : "/login"} replace />} />
        <Route path="/login" element={!isAuthenticated ? <SecurityGate /> : <Navigate to="/inventory" replace />} />
        <Route path="/inventory" element={isAuthenticated ? <InventoryPage /> : <Navigate to="/login" replace />} />
        <Route path="/settlement" element={isAuthenticated ? <SettlementPage /> : <Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to={isAuthenticated ? "/inventory" : "/login"} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
