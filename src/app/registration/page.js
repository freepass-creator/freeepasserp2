"use client";

import { useRouter } from "next/navigation";
import { useSession } from "../../store/session";

export default function RegistrationPage() {
  const router = useRouter();
  const { me, setMe } = useSession();

  // 로그인 안 했으면 gate로
  if (!me?.id) {
    router.push("/gate");
    return null;
  }

  function logout() {
    setMe({ id: "", role: "sales" });
    router.push("/gate");
  }

  // ✅ 관리자 전용 화면
  if (me.role === "admin") {
    return (
      <div className="h-screen bg-[#f1f3f6] text-slate-800 flex flex-col">
        {/* 상단바 */}
        <header className="h-[56px] bg-white border-b border-slate-200 flex items-center justify-between px-4 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-blue-600 border border-blue-200 px-2 py-1 rounded">
              ADMIN
            </span>
            <span className="font-bold">{me.id}</span>
            <span className="text-slate-400 text-[12px]">| 관리자 메인</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push("/inventory")}
              className="px-3 py-2 rounded bg-white border text-[12px]"
            >
              상품현황
            </button>
            <button
              onClick={() => router.push("/chats")}
              className="px-3 py-2 rounded bg-white border text-[12px]"
            >
              문의관리
            </button>
            <button
              onClick={logout}
              className="px-3 py-2 rounded bg-rose-50 text-rose-600 border border-rose-200 text-[12px]"
            >
              로그아웃
            </button>
          </div>
        </header>

        {/* 본문 */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-5xl mx-auto space-y-4">
            <div className="bg-white border rounded-lg shadow-sm p-5">
              <div className="text-[14px] font-black">관리자 대시보드 (1차 구현)</div>
              <div className="text-[12px] text-slate-500 mt-1">
                여기서부터 관리자 전용 기능(승인/권한/전체조회)을 하나씩 붙입니다.
              </div>
            </div>

            {/* 관리자 메뉴 카드 */}
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => alert("다음 단계: 가입 승인 리스트 페이지를 만들 예정")}
                className="bg-white border rounded-lg shadow-sm p-5 text-left hover:bg-slate-50 transition"
              >
                <div className="text-[12px] font-black text-slate-900">신규 가입 승인</div>
                <div className="text-[11px] text-slate-500 mt-1">
                  회원가입 요청을 승인/반려
                </div>
              </button>

              <button
                onClick={() => alert("다음 단계: 계정/권한 관리 페이지를 만들 예정")}
                className="bg-white border rounded-lg shadow-sm p-5 text-left hover:bg-slate-50 transition"
              >
                <div className="text-[12px] font-black text-slate-900">계정/권한 관리</div>
                <div className="text-[11px] text-slate-500 mt-1">
                  영업자/공급사/관리자 권한 설정
                </div>
              </button>

              <button
                onClick={() => alert("다음 단계: 전체 데이터 모니터링 페이지를 만들 예정")}
                className="bg-white border rounded-lg shadow-sm p-5 text-left hover:bg-slate-50 transition"
              >
                <div className="text-[12px] font-black text-slate-900">전체 모니터링</div>
                <div className="text-[11px] text-slate-500 mt-1">
                  전체 차량/문의 현황 조회
                </div>
              </button>
            </div>

            {/* 상태 요약(더미) */}
            <div className="grid grid-cols-4 gap-4">
              {[
                { title: "가입요청", value: "0" },
                { title: "승인완료", value: "0" },
                { title: "대기문의", value: "0" },
                { title: "등록차량", value: "0" }
              ].map((x) => (
                <div key={x.title} className="bg-white border rounded-lg shadow-sm p-5">
                  <div className="text-[11px] text-slate-500">{x.title}</div>
                  <div className="text-[18px] font-black text-slate-900 mt-1">{x.value}</div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ✅ 공급사(또는 영업자가 들어온 경우) 화면: 임시
  return (
    <div className="h-screen bg-[#f1f3f6] text-slate-800 flex flex-col">
      <header className="h-[56px] bg-white border-b border-slate-200 flex items-center justify-between px-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black text-blue-600 border border-blue-200 px-2 py-1 rounded">
            {String(me.role || "").toUpperCase()}
          </span>
          <span className="font-bold">{me.id}</span>
          <span className="text-slate-400 text-[12px]">| 상품등록</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push("/inventory")}
            className="px-3 py-2 rounded bg-white border text-[12px]"
          >
            상품현황
          </button>
          <button
            onClick={logout}
            className="px-3 py-2 rounded bg-rose-50 text-rose-600 border border-rose-200 text-[12px]"
          >
            로그아웃
          </button>
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="max-w-3xl mx-auto bg-white border rounded-lg shadow-sm p-6">
          <div className="text-[14px] font-black">상품등록 화면 (임시)</div>
          <div className="text-[12px] text-slate-500 mt-2">
            다음 단계에서 실제 차량 등록 폼을 여기에 붙입니다.
          </div>
        </div>
      </main>
    </div>
  );
}
