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
  const [pw, setPw] = useState("1111");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    try {
      if (loading) return;
      setLoading(true);

      if (pw !== "1111") {
        showMessage("보안코드 오류 (1111)");
        return;
      }
      if (!id.trim()) {
        showMessage("ID 입력");
        return;
      }

      // Firebase 익명 로그인
      await loginAnon();

      // 세션 저장
      setMe({ id: id.trim(), role });

      // 이동
      if (role === "sales") router.push("/inventory");
      else router.push("/registration");
    } catch (e) {
      console.error(e);
      showMessage("로그인 실패 (콘솔 확인)");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl border border-gray-200 p-8 rounded-xl w-96 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-blue-600">FREEPASS ERP</h1>
          <p className="text-gray-500 text-sm">통합 관제 ERP 시스템</p>
        </div>

        <div className="space-y-4">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="sales">영업자</option>
            <option value="supplier">공급사</option>
            <option value="admin">관리자</option>
          </select>

          <input
            placeholder="접속 아이디 입력"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="보안 비밀번호 입력"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className={[
              "w-full py-3 rounded-lg font-semibold transition",
              loading ? "bg-blue-400 text-white cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
            ].join(" ")}
          >
            {loading ? "접속 중..." : "시스템 보안 접속"}
          </button>
        </div>

        <div className="text-center text-xs text-gray-400">※ 현재 테스트용 보안코드: 1111</div>
      </div>
    </div>
  );
}
