// src/hooks/api/useChat.js

/**
 * [코딩 원칙]
 * 1. 마스터 트리 경로(src/hooks/api/)를 엄수합니다.
 * 2. 실시간 데이터 스트림(Listener) 관리와 메시지 전송 로직을 결합합니다.
 */

import { useState, useEffect, useCallback } from 'react';
// import { db } from '../../main';

export const useChat = (roomId) => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  /**
   * 실시간 메시지 구독 (Listen)
   */
  useEffect(() => {
    if (!roomId) return;

    // console.log(`[Chat] Listening to room: ${roomId}`);
    // const unsubscribe = onSnapshot(query(collection(db, 'messages')), (snapshot) => { ... });
    
    // return () => unsubscribe(); // 클린업: 방 나갈 때 리스너 해제
  }, [roomId]);

  /**
   * 메시지 전송 (Send)
   */
  const sendMessage = useCallback(async (text, senderId) => {
    if (!text.trim()) return;

    const newMessage = {
      text,
      senderId,
      timestamp: Date.now(),
      isRead: false
    };

    try {
      // await addDoc(collection(db, 'messages'), newMessage);
      console.log(`[Chat] Message sent to ${roomId}:`, text);
    } catch (err) {
      console.error("[Chat] Send Error:", err);
    }
  }, [roomId]);

  /**
   * 읽음 처리 (Mark as Read)
   */
  const markAsRead = useCallback(async (messageId) => {
    // await updateDoc(doc(db, 'messages', messageId), { isRead: true });
    console.log(`[Chat] Message ${messageId} marked as read`);
  }, []);

  return {
    messages,
    isTyping,
    sendMessage,
    markAsRead
  };
};
