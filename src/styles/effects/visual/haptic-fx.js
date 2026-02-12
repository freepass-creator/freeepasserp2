// src/styles/effects/visual/haptic-fx.js

/**
 * [코딩 원칙]
 * 1. 사용자의 클릭 행위에 대한 물리적 피드백 수치를 정의합니다.
 * 2. SPECS.PRESS_DEPTH와 연동하여 버튼이 실제로 "눌리는" 이동량을 결정합니다.
 */

import { SPECS } from '../../core/specs';

export const HAPTIC_FX = {
  // 눌림 강도 (Y축 이동량)
  PUSH_Y: `translateY(${SPECS.PRESS_DEPTH}px)`, 
  
  // 크기 변화 (살짝 작아지며 묵직한 느낌을 줄 때)
  PUSH_SCALE: "scale(0.98)",
  
  // 반동 효과 (눌렀다 뗄 때의 탄성 수치)
  BOUNCE: "scale(1.02)",

  // 복구 상태 (원래 위치)
  RESET: "translateY(0) scale(1)",
};
