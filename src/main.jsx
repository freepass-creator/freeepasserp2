import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'

function RealFinalCheck() {
  const [input, setInput] = useState('');
  const [isLogged, setIsLogged] = useState(false);

  // 버튼을 누를 때 실행되는 함수
  const goGo = () => {
    console.log("현재 입력된 값:", input); // F12 콘솔에서 확인용
    if (input === '1234') {
      setIsLogged(true); // 성공하면 상태 변경
    } else {
      alert("코드가 틀렸습니다! (입력값: " + input + ")");
    }
  };

  // [성공 화면] - 배경을 빨간색으로 바꿔서 성공했음을 확실히 보여줍니다.
  if (isLogged) {
    return (
      <div style={{ backgroundColor: 'red', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexDirection: 'column' }}>
        <h1 style={{ fontSize: '50px' }}>💥 접속 성공!!! 💥</h1>
        <p>이제 로그인이 된 것입니다!</p>
        <button onClick={() => setIsLogged(false)} style={{ padding: '20px', fontSize: '20px' }}>다시 나가기</button>
      </div>
    );
  }

  // [로그인 화면]
  return (
    <div style={{ backgroundColor: '#0f172a', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
      <div style={{ border: '5px solid yellow', padding: '50px', textAlign: 'center' }}>
        <h2 style={{ color: 'yellow' }}>⚠️ 긴급 점검 모드 ⚠️</h2>
        <p>노란 테두리가 보이나요? 안 보이면 새로고침 하세요!</p>
        
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="1234 입력"
          style={{ padding: '15px', fontSize: '20px', textAlign: 'center', width: '200px', color: 'black' }}
        />
        <br /><br />
        
        <button 
          onClick={goGo}
          style={{ padding: '15px 30px', fontSize: '20px', backgroundColor: 'yellow', color: 'black', fontWeight: 'bold', cursor: 'pointer' }}
        >
          이 버튼을 눌러보세요!
        </button>
        
        <div style={{ marginTop: '20px' }}>현재 타이핑 중인 값: <span style={{ color: 'yellow' }}>{input}</span></div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<RealFinalCheck />);
