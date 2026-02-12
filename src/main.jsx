import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'

// HTML 방식처럼 직관적인 로그인 화면 컴포넌트
function SimpleLogin() {
  const [pw, setPw] = useState('');
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] font-sans">
      <div className="bg-[#1e293b] p-10 rounded-2xl border border-slate-700 shadow-2xl text-center w-[350px]">
        <h2 className="text-white text-2xl font-bold mb-2">보안 로그인</h2>
        <p className="text-slate-400 text-sm mb-8">리액트 엔진이 정상 가동 중입니다</p>
        
        <input 
          type="password" 
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="보안코드 입력"
          className="w-full p-4 bg-[#0f172a] text-white border border-slate-600 rounded-lg text-center text-xl outline-none focus:border-blue-500"
        />
        
        <button 
          onClick={() => alert('입력한 코드: ' + pw)}
          className="w-full mt-6 p-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all"
        >
          시스템 접속
        </button>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SimpleLogin />
  </React.StrictMode>
)
