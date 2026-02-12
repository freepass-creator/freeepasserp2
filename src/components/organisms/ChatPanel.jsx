// src/components/organisms/ChatPanel.jsx

/**
 * [코딩 원칙]
 * 1. 마스터 트리 경로(src/components/organisms/)를 엄수합니다.
 * 2. useChat 훅을 사용하여 실시간 데이터 흐름을 UI와 동기화합니다.
 * 3. 스크롤 위치 강제 제어(Ref)를 통해 최신 메시지 가독성을 확보합니다.
 */

import React, { useState, useEffect, useRef } from 'react';
import { useChat } from '../../hooks/api/useChat';
import ChatMessage from '../molecules/ChatMessage';
import { PALETTE } from '../../styles/core/palette';
import { CHAT_LABELS } from '../../data/chat-labels';
import { Send } from 'lucide-react';

const ChatPanel = ({ roomId, currentUserId }) => {
  const { messages, sendMessage } = useChat(roomId);
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef(null);

  // 메시지 추가 시 하단 자동 스크롤
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    sendMessage(inputText, currentUserId);
    setInputText('');
  };

  return (
    <div style={{ 
      display: 'flex', flexDirection: 'column', height: '100%', 
      backgroundColor: '#FFFFFF', borderLeft: `1px solid ${PALETTE.BORDER_STD}` 
    }}>
      {/* 1. 상단 상태 헤더 */}
      <div style={{ padding: '16px', borderBottom: `1px solid ${PALETTE.BORDER_STD}`, fontWeight: 'bold' }}>
        {CHAT_LABELS.STATUS.ACTIVE}
      </div>

      {/* 2. 메시지 리스트 영역 */}
      <div 
        ref={scrollRef}
        style={{ flex: 1, overflowY: 'auto', padding: '20px', backgroundColor: '#F9FAFB' }}
      >
        {messages.map((msg, idx) => (
          <ChatMessage 
            key={idx}
            text={msg.text}
            time={msg.timestamp}
            isMe={msg.senderId === currentUserId}
            isRead={msg.isRead}
          />
        ))}
      </div>

      {/* 3. 메시지 입력 영역 */}
      <div style={{ padding: '16px', borderTop: `1px solid ${PALETTE.BORDER_STD}` }}>
        <div style={{ display: 'flex', gap: '8px', backgroundColor: '#F0F2F5', padding: '8px', borderRadius: '12px' }}>
          <input 
            style={{ 
              flex: 1, border: 'none', background: 'none', outline: 'none', 
              fontSize: '14px', paddingLeft: '8px' 
            }}
            placeholder={CHAT_LABELS.INPUT.PLACEHOLDER}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            style={{ 
              border: 'none', background: PALETTE.POINT_BLUE, color: '#white', 
              borderRadius: '8px', padding: '6px', cursor: 'pointer' 
            }}
          >
            <Send size={18} color="white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
