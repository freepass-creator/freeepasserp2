// src/styles/effects/motion/easing.js

/**
 * [코딩 원칙]
 * 1. 마스터 트리 경로(src/styles/effects/motion/)를 엄수합니다.
 * 2. 인터랙션의 "물리적 리듬"을 결정하는 CSS cubic-bezier 값을 정의합니다.
 */

export const EASING = {
  // 1. 표준 가속/감속 (Standard)
  // 가장 범용적으로 쓰이는 자연스러운 움직임
  IN_OUT: "cubic-bezier(0.4, 0, 0.2, 1)",
  
  // 2. 진입 리듬 (Deceleration)
  // 빠르게 튀어나와서 목적지 근처에서 부드럽게 멈춤 (드로어, 필터 확장)
  OUT: "cubic-bezier(0, 0, 0.2, 1)",
  
  // 3. 퇴장 리듬 (Acceleration)
  // 서서히 움직이기 시작해서 빠르게 사라짐 (창 닫기, 요소 삭제)
  IN: "cubic-bezier(0.4, 0, 1, 1)",
  
  // 4. 탄력적 리듬 (Elastic / Expo)
  // 매우 빠르고 경쾌하게 멈추는 느낌 (즉각적인 피드백)
  EXPO_OUT: "cubic-bezier(0.16, 1, 0.3, 1)"
};
