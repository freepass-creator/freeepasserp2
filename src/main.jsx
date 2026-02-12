import React from 'react'
import ReactDOM from 'react-dom/client'

// 100% 자립형 코드 (아무것도 임포트 안 함)
const RootPage = () => (
  <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0f172a', color: 'white', fontFamily: 'sans-serif' }}>
    <div style={{ padding: '40px', backgroundColor: '#1e293b', borderRadius: '20px', textAlign: 'center', border: '1px solid #334155' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>축하합니다!</h1>
      <p style={{ color: '#94a3b8', marginTop: '10px' }}>드디어 엔진 연결에 성공했습니다.</p>
      <button 
        onClick={() => alert('작동 확인!')}
        style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#3b82f6', border: 'none', borderRadius: '8px', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
      >
        연결 테스트 버튼
      </button>
    </div>
  </div>
);

ReactDOM.createRoot(document.getElementById('root')).render(<RootPage />);
