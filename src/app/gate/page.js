"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAnon } from "../../lib/firebase";
import { useSession } from "../../store/session";
import { useToast } from "../../components/Toast";

export default function GatePage() {
  const router = useRouter();
  const { setMe } = useSession();
  const { showMessage } = useToast();

  const [role, setRole] = useState("sales");
  const [id, setId] = useState("");
  const [pw, setPw] = useState("7777");

  async function handleLogin() {
    if (pw !== "7777") return showMessage("보안코드 오류");
    if (!id) return showMessage("ID 입력");

    await loginAnon();
    setMe({ id, role });

    if (role === "sales") router.push("/inventory");
    else router.push("/registration");
  }

  return (
    <div className="h-screen flex items-center justify-center bg-slate-900 text-white">
      <div className="bg-slate-800 p-8 rounded-xl w-80 space-y-4">
        <h1 className="text-xl font-bold text-center">FREEPASS ERP 로그인</h1>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 text-black rounded"
        >
          <option value="sales">영업자</option>
          <option value="supplier">공급사</option>
          <option value="admin">관리자</option>
        </select>

        <input
          placeholder="ID 입력"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="w-full p-2 text-black rounded"
        />

        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          className="w-full p-2 text-black rounded"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 py-2 rounded"
        >
          접속
        </button>
      </div>
    </div>
  );
}
