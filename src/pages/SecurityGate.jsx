import React, { useState } from 'react';

export default function SecurityGate() {
  const [code, setPw] = useState('');
  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#1e293b', padding: '40px', borderRadius: '20px', textAlign: 'center', color: 'white', border: '1px solid #334155' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>보안 게이트</h2>
        <input 
          type="password" 
          value={code} 
          onChange={(e) => setPw(e.target.value)} 
          placeholder="코드 입력"
          style={{ padding: '10px', borderRadius: '5px', border: 'none', textAlign: 'center' }}
        />
        <button onClick={() => alert('인증 시도: ' + code)} style={{ marginLeft: '10px', padding: '10px 20px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          입력
        </button>
      </div>
    </div>
  );
}
