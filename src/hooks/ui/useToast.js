// src/hooks/ui/useToast.js

/**
 * [코딩 원칙]
 * 1. 마스터 트리 경로(src/hooks/ui/)를 엄수합니다.
 * 2. 알림의 생성, 유지, 자동 소멸 로직을 관리합니다.
 */

import { useState, useCallback, useRef } from 'react';

export const useToast = () => {
  // 1. 알림 메시지 및 활성화 상태
  const [toast, setToast] = useState({
    isVisible: false,
    message: '',
    type: 'SUCCESS' // SUCCESS, DANGER, WARNING
  });

  // 타이머 참조 (중복 실행 방지)
  const timerRef = useRef(null);

  /**
   * 알림 실행 함수
   * @param {string} message - 표시할 문구
   * @param {string} type - 알림 종류 (PALETTE 키값 연동)
   * @param {number} duration - 유지 시간 (기본 3초)
   */
  const showToast = useCallback((message, type = 'SUCCESS', duration = 3000) => {
    // 기존 타이머가 있다면 제거
    if (timerRef.current) clearTimeout(timerRef.current);

    setToast({
      isVisible: true,
      message,
      type
    });

    // 지정된 시간 후 자동으로 닫기
    timerRef.current = setTimeout(() => {
      setToast(prev => ({ ...prev, isVisible: false }));
    }, duration);
  }, []);

  const hideToast = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast(prev => ({ ...prev, isVisible: false }));
  }, []);

  return {
    toast,
    showToast,
    hideToast
  };
};
