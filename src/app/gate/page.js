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

  const [role, setRole] = useState("sales"); // sales | supplier | admin
  const [phone, setPhone] = useState("");
  const [bizId, setBizId] = useState("");
  const [pw, setPw] = useState("1111");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (loading) return;

    const id = role === "sales" ? phone.trim() : bizId.trim();

    if (pw !== "1111") return showMessage("보안코드 오류 (1111)");
    if (!id) return showMessage("ID를 입력하세요.");

    try {
      setLoading(true);

      // 🔐 Firebase 익명 로그인 (여기 실패하면 이동 안 함)
      await loginAnon();

      // 세션 저장
      setMe({
        role,
        id,
        phone: role === "sales" ? id : ""
      });

      // 역할별 이동
      if (role === "sales") router.push("/inventory");
      else router.push("/registration");
    } catch (e) {
      console.error("Firebase login error:", e);
      showMessage("Firebase 접속 실패 (설정/권한 확인)");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl border border-gray-200 p-8 rounded-xl w-[420px] space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-black text-blue-600">FREEPASS ERP</h1>
          <p className="text-gray-500 text-sm">보안 접속 게이트</p>
        </div>

        {/* 역할 선택 */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { key: "sales", label: "영업자" },
            { key: "supplier", label: "공급사" },
            { key: "admin", label: "관리자" }
          ].map((r) => {
            const active = role === r.key;
            return (
              <button
                key={r.key}
                onClick={() => setRole(r.key)}
                className={[
                  "py-3 rounded-lg border text-sm font-bold transition",
                  active
                    ? "bg-blue-50 border-blue-300 text-blue-700"
                    : "bg-white border-gray-200 text-gray-500 hover:text-gray-800"
                ].join(" ")}
              >
                {r.label}
              </button>
            );
          })}
        </div>

        {/* ID 입력 */}
        {role === "sales" ? (
          <div className="space-y-1">
            <label className="text-xs text-gray-500 font-semibold">
              영업자 연락처(ID)
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="01012345678"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ) : (
          <div className="space-y-1">
            <label className="text-xs text-gray-500 font-semibold">
              사업자번호(ID)
            </label>
            <input
              value={bizId}
              onChange={(e) => setBizId(e.target.value)}
              placeholder="사업자번호 입력"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* 보안코드 */}
        <div className="space-y-1">
          <label className="text-xs text-gray-500 font-semibold">보안코드</label>
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="1111"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className={[
            "w-full py-3 rounded-lg font-semibold transition text-white",
            loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          ].join(" ")}
        >
          {loading ? "접속 중..." : "시스템 보안 접속"}
        </button>

        <div className="text-center text-xs text-gray-400">
          ※ 테스트 보안코드: 1111
        </div>
      </div>
    </div>
  );
}
