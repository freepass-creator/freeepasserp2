// src/main.jsx

/**
 * [코딩 원칙]
 * 1. 마스터 트리 경로(src/)를 엄수합니다.
 * 2. 전역 스타일을 주입하고 React StrictMode를 통해 안정성을 확보합니다.
 * 3. App 컴포넌트를 브라우저의 'root' 엘리먼트에 마운트합니다.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// 전역 베이스 스타일 (브라우저 기본 마진 제거 등)
import './styles/global.css'; 

/**
 * [참고] global.css 내용 예시:
 * body { margin: 0; padding: 0; font-family: 'Pretendard', sans-serif; }
 * * { box-sizing: border-box; }
 */

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
