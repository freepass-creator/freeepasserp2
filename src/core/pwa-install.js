/**
 * PWA 설치 프롬프트 관리
 *
 * 동작:
 *  - Chrome/Android: `beforeinstallprompt` 이벤트를 캡처해서 저장, UI 버튼에서 promptInstall() 호출
 *  - iOS Safari: 이벤트 미지원 — 수동 안내 문구 필요 (isIOS() 로 분기)
 *  - 이미 standalone(홈화면에서 실행) 상태면 버튼 숨김
 */

let deferredPrompt = null;
const listeners = new Set();

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  listeners.forEach(fn => { try { fn(); } catch {} });
});

window.addEventListener('appinstalled', () => {
  deferredPrompt = null;
  listeners.forEach(fn => { try { fn(); } catch {} });
});

export function isStandalone() {
  return window.matchMedia('(display-mode: standalone)').matches
      || window.navigator.standalone === true;
}

export function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

/** 설치 버튼을 띄울 수 있는 상태인지 */
export function canInstall() {
  if (isStandalone()) return false;
  return !!deferredPrompt || isIOS();
}

/** 실제 설치 프롬프트 띄우기 — Android/Chrome 만. iOS 는 안내 문구로 유도 */
export async function promptInstall() {
  if (!deferredPrompt) return { outcome: 'unavailable' };
  const prompt = deferredPrompt;
  deferredPrompt = null;
  try {
    await prompt.prompt();
    const choice = await prompt.userChoice;
    listeners.forEach(fn => { try { fn(); } catch {} });
    return choice; // { outcome: 'accepted' | 'dismissed' }
  } catch (e) {
    return { outcome: 'error', error: e };
  }
}

/** 상태 변경 구독 (설치 가능 → 불가 전환 시 UI 갱신용) */
export function onInstallStateChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
