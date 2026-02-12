import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'

function FinalFix() {
  const [code, setCode] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 사용자가 입력할 때마다 실시간으로 검사
  useEffect(() => {
    if (code === '1234') {
      setIsLoggedIn(true);
    }
  }, [code]);

  // 1. 로그인 성공 시 (보라색 테마로 변경 - 코드 업데이트 확인용)
  if (isLoggedIn) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#2e1065', color: 'white', padding: '50px', textAlign: 'center', fontFamily: 'sans-serif' }}>
        <h1 style={{ fontSize: '40px' }}>🚀 ERP 접속 성공!</h1>
        <p style={{ fontSize: '20px', color: '#d8b4fe' }}>이제 진짜 시스템 화면입니다.</p>
        <button onClick={() => { setIsLoggedIn(false); setCode(''); }} style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}>로그아웃</button>
      </div>
    );
  }

  // 2. 로그인 전 (배경을 어두운 보라색으로 변경)
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0f172a' }}>
      <div style={{ background: '#1e293b', padding: '40px', borderRadius: '20px', textAlign: 'center', color: 'white', border: '2px solid #7c3aed' }}>
        <h2 style={{ marginBottom: '10px' }}>FINAL CHECK</h2>
        <p style={{ color: '#a78bfa', fontSize: '14px', marginBottom: '20px' }}>아래 칸에 1234를 입력하면 즉시 접속됩니다.</p>
        
        <input 
          type="text" 
          value={code} 
          onChange={(e) => setCode(e.target.value)} 
          placeholder="번호입력"
          style={{ padding: '15px', borderRadius: '10px', border: 'none', width: '200px', textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}
          autoFocus
        />
        <div style={{ marginTop: '20px', fontSize: '12px', color: '#475569' }}>입력한 값: {code}</div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<FinalFix />);
