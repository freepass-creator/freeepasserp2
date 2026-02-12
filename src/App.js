import React, { useState } from 'react';

export default function App() {
  const [code, setCode] = useState('');

  const handleEntry = (e) => {
    e.preventDefault();
    if (code === '1234') alert('인증되었습니다! 시스템을 불러옵니다.');
    else alert('보안코드가 틀렸습니다.');
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-[#0F172A]">
      <div className="w-full max-w-sm p-8 bg-[#1E293B] rounded-2xl shadow-2xl border border-slate-700">
        <div className="text-center mb-10">
          <div className="inline-block p-3 rounded-full bg-blue-500/10 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <h1 className="text-2xl font-bold text-white">보안 게이트</h1>
          <p className="text-slate-400 text-sm mt-2">쪼개진 폴더 엔진이 정상 작동 중입니다</p>
        </div>

        <form onSubmit={handleEntry} className="space-y-6">
          <input
            type="password"
            placeholder="SECURITY CODE"
            className="w-full p-4 bg-[#0F172A] border border-slate-600 rounded-xl text-white text-center text-2xl tracking-[8px] focus:border-blue-500 outline-none transition-all"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button className="w-full p-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-900/20 transition-all">
            로그인 및 진입
          </button>
        </form>
      </div>
    </div>
  );
}
