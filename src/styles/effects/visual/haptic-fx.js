// src/styles/effects/visual/haptic-fx.js

/**
 * [코딩 원칙]
 * 1. 마스터 트리 경로(src/styles/effects/visual/)를 엄수합니다.
 * 2. SPECS.PRESS_DEPTH와 연동하여 버튼의 물리적 이동량을 정의합니다.
 */

import { SPECS } from '../../core/specs';

export const HAPTIC_FX = {
  // 1. 누름 상태 (Pressed)
  // 버튼이 바닥으로 가라앉는 물리적 이동
  PUSH: `translateY(${SPECS.PRESS_DEPTH}px)`,
  
  // 2. 축소 효과 (Scale Down)
  // 클릭 시 살짝 작아지며 응축되는 느낌 (모바일/경쾌한 UI용)
  SHRINK: "scale(0.97)",
  
  // 3. 반동 효과 (Bounce)
  // 클릭 후 뗄 때 원래 위치보다 살짝 더 튀어오르는 탄성
  BOUNCE: "scale(1.03)",

  // 4. 복구 상태 (Reset)
  // 모든 물리적 변형을 초기화
  IDLE: "translateY(0) scale(1)",
};
