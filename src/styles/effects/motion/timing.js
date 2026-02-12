// src/styles/effects/motion/timing.js

/**
 * [코딩 원칙]
 * 1. 시스템 내 모든 애니메이션의 지속 시간(Duration)과 속도 곡선(Easing)을 표준화합니다.
 * 2. 사용자 경험의 즉각성을 위해 대부분의 반응을 0.3초 이내로 설계합니다.
 */

export const TIMING = {
  // 지속 시간 (Duration)
  INSTANT: "0.1s",      // 버튼 클릭 피드백 등 즉각적인 반응
  FAST: "0.2s",         // 툴팁, 호버 효과 등 가벼운 변화
  NORMAL: "0.3s",       // 사이드바 확장, 드로어 진입 등 주요 움직임
  SLOW: "0.5s",         // 보안 게이트 진입 등 감성적 전환

  // 속도 곡선 (Easing)
  EASE_IN_OUT: "cubic-bezier(0.4, 0, 0.2, 1)", // 가장 자연스러운 가속/감속
  EASE_OUT_EXPO: "cubic-bezier(0.16, 1, 0.3, 1)", // 드로어 진입 시 슉 하고 부드럽게 멈춤
  SHARP: "cubic-bezier(0.4, 0, 0.6, 1)",        // 닫기 등 단호한 동작
};
