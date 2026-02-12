import React, { useState } from 'react';

export default function App() {
  const [code, setCode] = useState('');
  // 로그인 성공 여부를 저장하는 상태 (나중에 페이지 이동 대신 사용)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (code === '1234') {
      alert('🔒 인증 성공! 관리자 모드로 진입합니다.');
      setIsLoggedIn(true); // 로그인 성공 상태로 변경
    } else {
      alert('❌ 보안 코드가 틀렸습니다.');
      setCode(''); // 입력칸 초기화
    }
  };

  // 1. 로그인 성공 시 보여줄 메인 화면
  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-10 font-sans">
        <h1 className="text-3xl font-bold mb-6 text-blue-400">📊 ERP 관리 시스템</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h3 className="text-slate-400 mb-2">오늘의 매출</h3>
            <p className="text-2xl font-bold">₩ 2,450,000</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h3 className="text-slate-400 mb-2">재고 부족</h3>
            <p className="text-2xl font-bold text-red-400">12건</p>
          </div>
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="bg-red-500/10 text-red-400 p-4 rounded-xl border border-red-500/20 hover:bg-red-500/20 transition-all"
          >
            시스템 로그아웃
          </button>
        </div>
      </div>
    );
  }

  // 2. 로그인 전 보여줄 보안 게이트 (현재 화면)
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
      <div className="bg-[#1e293b] p-10 rounded-2xl border border-slate-700 shadow-2xl text-center w-[350px]">
        <h2 className="text-white text-2xl font-bold mb-2">보안 로그인</h2>
        <p className="text-slate-400 text-sm mb-8">보안코드 1234를 입력하세요</p>
        
        <form onSubmit={handleLogin}>
          <input 
            type="password" 
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="••••"
            className="w-full p-4 bg-[#0f172a] text-white border border-slate-600 rounded-lg text-center text-2xl tracking-[10px] outline-none focus:border-blue-500"
          />
          <button 
            type="submit"
            className="w-full mt-6 p-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all"
          >
            시스템 접속
          </button>
        </form>
      </div>
    </div>
  );
}
