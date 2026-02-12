import React, { useState } from 'react';

export default function App() {
  const [code, setCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code === '1234') alert('인증 성공!');
    else alert('보안 코드를 확인하세요.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A] font-sans">
      <div className="w-full max-w-sm p-8 bg-[#1E293B] rounded-2xl shadow-2xl border border-slate-700 text-center">
        <h1 className="text-2xl font-bold text-white mb-2">보안 게이트</h1>
        <p className="text-slate-400 text-sm mb-8">관리자 보안 코드를 입력하세요</p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            className="w-full p-4 bg-[#0F172A] border border-slate-600 rounded-lg text-white text-center text-2xl tracking-[10px] outline-none focus:border-blue-500"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            autoFocus
          />
          <button className="w-full mt-6 p-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors">
            시스템 진입
          </button>
        </form>
      </div>
    </div>
  );
}
