"use client";

import { createContext, useContext, useState } from "react";

const SessionContext = createContext(null);

export function SessionProvider({ children }) {
  const [me, setMe] = useState({ id: "", role: "sales" });
  return (
    <SessionContext.Provider value={{ me, setMe }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
