"use client";

import { createContext, useContext, useState } from "react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [msg, setMsg] = useState("");

  function showMessage(text) {
    setMsg(text);
    setTimeout(() => setMsg(""), 3000);
  }

  return (
    <ToastContext.Provider value={{ showMessage }}>
      {children}
      {msg && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded">
          {msg}
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
