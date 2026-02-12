// src/pages/SecurityGate.jsx

/**
 * [코딩 원칙]
 * 1. 마스터 트리 경로(src/pages/)를 엄수합니다.
 * 2. AUTH_CONTENT 데이터를 사용하여 모든 문구를 렌더링합니다.
 * 3. 인증 상태(loading, error)에 따라 동적인 시각 피드백을 제공합니다.
 */

import React, { useState } from 'react';
import { AUTH_CONTENT } from '../data/auth-content';
import { useAuth } from '../hooks/api/useAuth';
import { PALETTE } from '../styles/core/palette';
import { TYPOGRAPHY } from '../styles/core/typography';
import { SHADOWS } from '../styles/effects/visual/shadows';
import { ShieldCheck, Lock } from 'lucide-react';

const SecurityGate = () => {
  const [code, setCode] = useState('');
  const { login, loading, error } = useAuth();

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#0F172A', // 다크 테마 보안 배경
    color: '#FFFFFF',
  };

  const cardStyle = {
    width: '360px',
    padding: '40px',
    backgroundColor: '#1E293B',
    borderRadius: '16px',
    boxShadow: SHADOWS.STANDARD,
    textAlign: 'center',
    border: `1px solid ${error ? PALETTE.DANGER : '#334155'}`,
  };

  const inputStyle = {
    width: '100%',
    padding: '16px',
    marginTop: '24px',
    backgroundColor: '#0F172A',
    border: `1px solid ${error ? PALETTE.DANGER : '#475569'}`,
    borderRadius: '8px',
    color: '#FFFFFF',
    fontSize: '18px',
    textAlign: 'center',
    letterSpacing: '8px',
    outline: 'none',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(code);
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {/* 1. 상단 아이콘 및 타이틀 */}
        <div style={{ marginBottom: '24px' }}>
          <ShieldCheck size={48} color={PALETTE.POINT_BLUE} style={{ marginBottom: '16px' }} />
          <h1 style={{ fontSize: '20px', fontWeight: TYPOGRAPHY.WEIGHT.BOLD }}>{AUTH_CONTENT.TITLE}</h1>
          <p style={{ fontSize: '12px', color: '#94A3B8', marginTop: '8px' }}>{AUTH_CONTENT.SUB_TITLE}</p>
        </div>

        {/* 2. 보안코드 입력 폼 */}
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder={AUTH_CONTENT.INPUT_PLACEHOLDER}
            style={inputStyle}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            disabled={loading}
          />
          
          {/* 상태 메시지 */}
          <p style={{ 
            fontSize: '12px', 
            marginTop: '16px', 
            color: error ? PALETTE.DANGER : (loading ? PALETTE.POINT_BLUE : '#64748B') 
          }}>
            {error ? AUTH_CONTENT.MESSAGES.FAILURE : (loading ? AUTH_CONTENT.MESSAGES.WAITING : AUTH_CONTENT.MESSAGES.LOCKED)}
          </p>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '16px',
              marginTop: '24px',
              backgroundColor: PALETTE.POINT_BLUE,
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? "AUTHENTICATING..." : AUTH_CONTENT.SUB_BUTTON}
          </button>
        </form>
      </div>

      {/* 3. 하단 카피라이트 */}
      <footer style={{ marginTop: '32px', fontSize: '10px', color: '#475569' }}>
        {AUTH_CONTENT.FOOTER}
      </footer>
    </div>
  );
};

export default SecurityGate;
