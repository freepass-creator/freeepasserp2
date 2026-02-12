import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'

function FinalApp() {
  const [code, setCode] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 버튼 클릭 시 실행될 함수
  const checkCode = () => {
    console.log("입력된 코드:", code); // 브라우저 F12 콘솔에서 확인용
    if (code === '1234') {
      alert('🔓 인증 성공!');
      setIsLoggedIn(true);
    } else {
      alert('❌ 보안 코드가 틀립니다. (입력값: ' + code + ')');
    }
  };

  if (isLoggedIn) {
    return (
      <div style={{ padding: '50px', color: 'white', textAlign: 'center', backgroundColor: '#0f172a', minHeight: '100vh' }}>
        <h1>📊 접속 성공: ERP 대시보드</h1>
        <button onClick={() => setIsLoggedIn(false)} style={{ padding: '10px', cursor: 'pointer' }}>로그아웃</button>
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0f172a' }}>
      <div style={{ background: '#1e293b', padding: '40px', borderRadius: '20px', textAlign: 'center', color: 'white' }}>
        <h2 style={{ marginBottom: '20px' }}>보안 게이트</h2>
        
        {/* 입력창: value와 onChange가 핵심입니다 */}
        <input 
          type="text" 
          value={code} 
          onChange={(e) => {
            console.log("타이핑 중...", e.target.value);
            setCode(e.target.value);
          }}
          placeholder="1234 입력"
          style={{ padding: '15px', borderRadius: '8px', border: 'none', width: '200px', textAlign: 'center', fontSize: '20px' }}
        />
        
        <br />

        {/* 버튼: onClick이 직접 실행되도록 설정 */}
        <button 
          onClick={checkCode}
          style={{ marginTop: '20px', padding: '15px 30px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          시스템 접속
        </button>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<FinalApp />);
