import React from 'react'
import ReactDOM from 'react-dom/client'
import SecurityGate from './src/pages/SecurityGate.jsx' // 🚩 방금 만든 파일을 부릅니다.

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SecurityGate />
  </React.StrictMode>
)
