// src/components/molecules/ChatMessage.jsx

/**
 * [코딩 원칙]
 * 1. 마스터 트리 경로(src/components/molecules/)를 엄수합니다.
 * 2. 발신자(isMe) 여부에 따라 레이아웃 방향과 색상을 반전시킵니다.
 * 3. CHAT_LABELS 상수를 활용하여 읽음 상태 등을 표기합니다.
 */

import React from 'react';
import { PALETTE } from '../../styles/core/palette';
import { TYPOGRAPHY } from '../../styles/core/typography';
import { CHAT_LABELS } from '../../data/chat-labels';

const ChatMessage = ({ text, time, isMe, isRead }) => {
  const containerStyle = {
    display: 'flex',
    flexDirection: isMe ? 'row-reverse' : 'row',
    alignItems: 'flex-end',
    marginBottom: '12px',
    gap: '8px',
  };

  const bubbleStyle = {
    maxWidth: '70%',
    padding: '10px 14px',
    borderRadius: isMe ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
    backgroundColor: isMe ? PALETTE.POINT_BLUE : '#F0F0F0',
    color: isMe ? '#FFFFFF' : PALETTE.TEXT_STD,
    fontSize: TYPOGRAPHY.SIZE.MAIN,
    lineHeight: '1.4',
    wordBreak: 'break-all',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
  };

  const infoStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: isMe ? 'flex-end' : 'flex-start',
    fontSize: '10px',
    color: PALETTE.TEXT_MUTE,
    marginBottom: '2px',
  };

  return (
    <div style={containerStyle}>
      {/* 1. 말풍선 본체 */}
      <div style={bubbleStyle}>
        {text}
      </div>

      {/* 2. 메타 정보 (시간, 읽음 표시) */}
      <div style={infoStyle}>
        {isMe && !isRead && (
          <span style={{ color: PALETTE.WARNING, fontWeight: 'bold', marginBottom: '2px' }}>
            {CHAT_LABELS.TIME.UNREAD}
          </span>
        )}
        <span>{time}</span>
      </div>
    </div>
  );
};

export default ChatMessage;
