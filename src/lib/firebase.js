"use client";

import { initializeApp, getApps } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

function mustEnv(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

const firebaseConfig = {
  apiKey: mustEnv("NEXT_PUBLIC_FIREBASE_API_KEY"),
  authDomain: mustEnv("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"),
  projectId: mustEnv("NEXT_PUBLIC_FIREBASE_PROJECT_ID"),
  storageBucket: mustEnv("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: mustEnv("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"),
  appId: mustEnv("NEXT_PUBLIC_FIREBASE_APP_ID"),
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export async function loginAnon() {
  try {
    const cred = await signInAnonymously(auth);
    return cred.user;
  } catch (e) {
    // 브라우저에서 원인 바로 보이게
    console.error("loginAnon error:", e);
    alert(
      `Firebase 로그인 실패\n\ncode: ${e?.code || "unknown"}\nmessage: ${
        (e?.message || "").slice(0, 160)
      }`
    );
    throw e;
  }
}
