import React, { useState } from 'react';

export default function App() {
  const [code, setCode] = useState('');

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh', 
      width: '100vw',
      backgroundColor: '#0f172a',
      position: 'fixed', // 화면에 강제 고정
      top: 0,
      left: 0
    }}>
      <div style={{ 
        backgroundColor: '#1e293b', 
        padding: '40px', 
        borderRadius: '20px', 
        border: '1px solid #334155',
        textAlign: 'center',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
      }}>
        <h1 style={{ color: 'white', fontSize: '24px', margin: '0 0 10px 0' }}>보안 시스템</h1>
        <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '30px' }}>보안 코드를 입력하세요 (1234)</p>
        
        <input
          type="password"
          style={{ 
            width: '200px', 
            padding: '15px', 
            borderRadius: '8px', 
            border: '2px solid #3b82f6',
            backgroundColor: '#0f172a',
            color: 'white',
            fontSize: '24px',
            textAlign: 'center',
            letterSpacing: '5px'
          }}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          autoFocus
        />
        
        <button 
          onClick={() => alert('입력값: ' + code)}
          style={{ 
            display: 'block',
            width: '100%',
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          진입하기
        </button>
      </div>
    </div>
  );
}
