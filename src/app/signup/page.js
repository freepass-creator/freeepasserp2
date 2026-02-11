"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAnon } from "../../lib/firebase";
import { useToast } from "../../components/Toast";

export default function SignupPage() {
  const router = useRouter();
  const { showMessage } = useToast();

  const [role, setRole] = useState("sales");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bizId, setBizId] = useState("");
  const [pw, setPw] = useState("1111");
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    if (loading) return;

    if (!name.trim()) return showMessage("이름을 입력하세요.");
    if (role === "sales" && !phone.trim())
      return showMessage("연락처를 입력하세요.");
    if (role !== "sales" && !bizId.trim())
      return showMessage("사업자번호를 입력하세요.");
    if (pw !== "1111")
      return showMessage("보안코드는 1111로 테스트 중입니다.");

    try {
      setLoading(true);

      // Firebase 연결 확인 (익명 로그인)
      await loginAnon();

      showMessage("회원가입 요청 완료 (현재는 저장 로직 없음)");

      // 로그인 페이지로 이동
      setTimeout(() => {
        router.push("/gate");
      }, 1000);
    } catch (e) {
      console.error("Signup Firebase error:", e);
      showMessage("Firebase 접속 실패 (설정 확인)");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl border border-gray-200 p-8 rounded-xl w-[460px] space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-black text-blue-600">
            신규 계정 등록
          </h1>
          <p className="text-gray-500 text-sm">
            FREEPASS ERP 회원가입
          </p>
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

        {/* 이름 */}
        <div className="space-y-1">
          <label className="text-xs text-gray-500 font-semibold">
            이름
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름 입력"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 조건부 입력 */}
        {role === "sales" ? (
          <div className="space-y-1">
            <label className="text-xs text-gray-500 font-semibold">
              영업자 연락처
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
              사업자번호
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
          <label className="text-xs text-gray-500 font-semibold">
            보안코드 (테스트용)
          </label>
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="1111"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 가입 버튼 */}
        <button
          onClick={handleSignup}
          disabled={loading}
          className={[
            "w-full py-3 rounded-lg font-semibold transition text-white",
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          ].join(" ")}
        >
          {loading ? "처리 중..." : "회원가입 요청"}
        </button>

        {/* 로그인으로 돌아가기 */}
        <div className="text-center">
          <button
            onClick={() => router.push("/gate")}
            className="text-sm text-blue-600 hover:underline font-semibold"
          >
            로그인 화면으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}
