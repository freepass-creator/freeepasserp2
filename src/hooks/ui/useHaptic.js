// src/hooks/ui/useHaptic.js

/**
 * [코딩 원칙]
 * 1. 마스터 트리 경로(src/hooks/ui/)를 엄수합니다.
 * 2. HAPTIC_FX와 TIMING 유전자를 결합하여 실제 물리적 반응을 반환합니다.
 */

import { useState, useCallback } from 'react';
import { HAPTIC_FX } from '../../styles/effects/visual/haptic-fx';
import { TIMING } from '../../styles/effects/motion/timing';

export const useHaptic = () => {
  // 현재 적용 중인 트랜스폼 스타일 상태
  const [hapticStyle, setHapticStyle] = useState({
    transform: HAPTIC_FX.IDLE,
    transition: `transform ${TIMING.INSTANT} ease-out`
  });

  // 눌렀을 때 (MouseDown / TouchStart)
  const onPress = useCallback(() => {
    setHapticStyle(prev => ({
      ...prev,
      transform: HAPTIC_FX.PUSH
    }));
  }, []);

  // 뗐을 때 (MouseUp / MouseLeave / TouchEnd)
  const onRelease = useCallback(() => {
    setHapticStyle(prev => ({
      ...prev,
      transform: HAPTIC_FX.IDLE
    }));
  }, []);

  return {
    hapticStyle,
    bindHaptic: {
      onMouseDown: onPress,
      onMouseUp: onRelease,
      onMouseLeave: onRelease,
      onTouchStart: onPress,
      onTouchEnd: onRelease,
    }
  };
};
