import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'

function App() {
  const [code, setCode] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

  const handleLogin = (e) => {
    e.preventDefault(); // 페이지 새로고침 방지
    
    // 🚩 여기서 1234인지 검사합니다!
    if (code === '1234') {
      setIsLoggedIn(true); // 코드가 맞으면 로그인 상태를 true로 변경
    } else {
      alert('보안 코드가 틀렸습니다. (힌트: 1234)');
      setCode('');
    }
  };

  // [1] 로그인 성공 시 보여줄 메인 대시보드 화면
  if (isLoggedIn) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: 'white', padding: '40px', fontFamily: 'sans-serif' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #334155', paddingBottom: '20px' }}>
          <h1 style={{ fontSize: '24px', color: '#3b82f6' }}>📊 ERP 실시간 관리 시스템</h1>
          <button 
            onClick={() => setIsLoggedIn(false)} 
            style={{ padding: '8px 16px', backgroundColor: '#ef4444', border: 'none', borderRadius: '6px', color: 'white', cursor: 'pointer' }}
          >
            로그아웃
          </button>
        </header>
        
        <main style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          <div style={{ padding: '24px', backgroundColor: '#1e293b', borderRadius: '12px', border: '1px solid #334155' }}>
            <p style={{ color: '#94a3b8', margin: '0 0 10px 0' }}>오늘의 방문자</p>
            <h2 style={{ fontSize: '32px', margin: 0 }}>1,240명</h2>
          </div>
          <div style={{ padding: '24px', backgroundColor: '#1e293b', borderRadius: '12px', border: '1px solid #334155' }}>
            <p style={{ color: '#94a3b8', margin: '0 0 10px 0' }}>재고 부족 품목</p>
            <h2 style={{ fontSize: '32px', margin: 0, color: '#f87171' }}>8건</h2>
          </div>
          <div style={{ padding: '24px', backgroundColor: '#1e293b', borderRadius: '12px', border: '1px solid #334155' }}>
            <p style={{ color: '#94a3b8', margin: '0 0 10px 0' }}>정산 대기 건수</p>
            <h2 style={{ fontSize: '32px', margin: 0, color: '#4ade80' }}>15건</h2>
          </div>
        </main>
      </div>
    );
  }

  // [2] 로그인 전 보여줄 보안 게이트 화면
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0f172a', fontFamily: 'sans-serif' }}>
      <div style={{ background: '#1e293b', padding: '40px', borderRadius: '24px', textAlign: 'center', color: 'white', border: '1px solid #334155', width: '320px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>보안 로그인</h2>
        <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '32px' }}>관리자 코드를 입력하세요</p>
        
        <form onSubmit={handleLogin}>
          <input 
            type="password" 
            value={code} 
            onChange={(e) => setCode(e.target.value)} 
            placeholder="••••"
            style={{ 
              width: '100%', padding: '15px', borderRadius: '12px', border: 'none', 
              backgroundColor: '#0f172a', color: 'white', fontSize: '28px', textAlign: 'center', 
              letterSpacing: '8px', marginBottom: '20px', outline: 'none', boxSizing: 'border-box'
            }}
            autoFocus
          />
          <button 
            type="submit"
            style={{ 
              width: '100%', padding: '16px', backgroundColor: '#3b82f6', color: 'white', 
              border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' 
            }}
          >
            시스템 접속
          </button>
        </form>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
