import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'

// [통합 컴포넌트] 로그인과 메인 화면을 이 파일 하나에서 다 처리합니다.
function IntegratedApp() {
  const [code, setCode] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault(); // 페이지 새로고침 방지
    
    if (code === '1234') {
      alert('🔒 인증 성공! 관리자 시스템에 접속합니다.');
      setIsLoggedIn(true);
    } else {
      alert('❌ 보안 코드가 틀렸습니다. (힌트: 1234)');
      setCode('');
    }
  };

  // 1. 로그인 성공 시 보여줄 화면
  if (isLoggedIn) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: 'white', padding: '40px', fontFamily: 'sans-serif' }}>
        <h1 style={{ color: '#3b82f6' }}>📊 ERP 대시보드</h1>
        <hr style={{ borderColor: '#334155', margin: '20px 0' }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ padding: '20px', background: '#1e293b', borderRadius: '12px' }}>
            <p style={{ color: '#94a3b8' }}>실시간 재고</p>
            <h2 style={{ fontSize: '32px' }}>1,245개</h2>
          </div>
          <div style={{ padding: '20px', background: '#1e293b', borderRadius: '12px' }}>
            <p style={{ color: '#94a3b8' }}>오늘의 정산</p>
            <h2 style={{ fontSize: '32px' }}>₩ 450,000</h2>
          </div>
        </div>
        <button 
          onClick={() => setIsLoggedIn(false)}
          style={{ marginTop: '30px', padding: '10px 20px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          로그아웃
        </button>
      </div>
    );
  }

  // 2. 로그인 전 보여줄 보안 게이트
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0f172a', fontFamily: 'sans-serif' }}>
      <div style={{ background: '#1e293b', padding: '40px', borderRadius: '24px', textAlign: 'center', color: 'white', border: '1px solid #334155', width: '320px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>보안 게이트</h2>
        <form onSubmit={handleLogin}>
          <input 
            type="password" 
            value={code} 
            onChange={(e) => setCode(e.target.value)} 
            placeholder="보안코드 입력"
            style={{ 
              width: '100%', padding: '15px', borderRadius: '12px', border: 'none', 
              backgroundColor: '#0f172a', color: 'white', fontSize: '20px', textAlign: 'center', marginBottom: '20px' 
            }}
          />
          <button 
            type="submit"
            style={{ width: '100%', padding: '15px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            시스템 접속
          </button>
        </form>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <IntegratedApp />
  </React.StrictMode>
);
