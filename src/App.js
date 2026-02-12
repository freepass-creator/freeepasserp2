import React, { useState } from 'react';

export default function App() {
  const [code, setCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code === '1234') alert('인증되었습니다!');
    else alert('보안 코드가 틀립니다.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A]">
      <div className="w-full max-w-sm p-8 bg-[#1E293B] rounded-2xl shadow-2xl border border-slate-700 text-center">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">시스템 보안</h1>
          <p className="text-slate-400 text-sm">관리자 코드를 입력하고 진입하세요</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            className="w-full p-4 bg-[#0F172A] border border-slate-600 rounded-lg text-white text-center text-2xl tracking-[10px] outline-none focus:border-blue-500 transition-all"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            autoFocus
          />
          <button className="w-full mt-6 p-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors">
            인증 및 로그인
          </button>
        </form>
        <p className="mt-8 text-[10px] text-slate-500">© 2026 ERP SYSTEM SECURE GATE</p>
      </div>
    </div>
  );
}
