"use client";

import { createContext, useContext, useState } from "react";

const ToastContext = createContext({ showMessage: () => {} });

export function ToastProvider({ children }) {
  const [msg, setMsg] = useState("");

  function showMessage(text) {
    setMsg(String(text || ""));
    setTimeout(() => setMsg(""), 3000);
  }

  return (
    <ToastContext.Provider value={{ showMessage }}>
      {children}
      {msg && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-4 py-2 rounded shadow">
          {msg}
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
