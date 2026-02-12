export const DetailView = {
    render(car, managerInfo) {
        if (!car) return '';
        const f = (n) => Number(n || 0).toLocaleString();
        const v = (val, d = '-') => (val && val !== '-' ? val : d);

        return `
            <div class="h-[45px] flex justify-between items-center px-4 bg-white border-b border-slate-200 sticky top-0 z-10">
                <h2 class="font-black text-[11px] uppercase flex items-center gap-2 text-slate-800"><i data-lucide="car" class="w-4 h-4 text-blue-600"></i> 상품 상세 정보</h2>
                <button onclick="closeDetail()" class="text-slate-400 hover:text-rose-500"><i data-lucide="x" class="w-5 h-5"></i></button>
            </div>

            <div class="flex-1 overflow-y-auto p-3 space-y-3 bg-[#f8fafc] hide-scrollbar text-[10.5px]">
                <section class="bg-white border border-slate-200 rounded-sm p-4 space-y-3 shadow-sm font-bold">
                    <div class="text-slate-500 text-[10px]">1. 차량 상세 제원</div>
                    <div class="flex justify-between items-start">
                        <div class="space-y-1">
                            <span class="text-blue-600 font-black text-[14px] block">${v(car.차량_번호)}</span>
                            <span class="text-slate-900 font-black text-[16px] block tracking-tighter">${v(car.차량_제조사)} ${v(car.차량_모델명)} <span class="text-slate-400 text-[12px] font-bold ml-1">${v(car.차량_연료)}</span></span>
                        </div>
                        <div class="flex gap-1"><span class="px-2 py-0.5 bg-blue-600 text-white text-[9px] rounded-sm uppercase">신차</span><span class="px-2 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-100 text-[9px] rounded-sm">${v(car.차량_상태)}</span></div>
                    </div>
                    <div class="space-y-1 pt-3 border-t border-slate-100">
                        <div class="flex gap-2"><span class="text-slate-400 w-[70px]">세부모델</span><span class="text-slate-900 font-black">${v(car.차량_세부모델)}</span></div>
                        <div class="flex gap-2"><span class="text-slate-400 w-[70px]">세부트림</span><span class="text-blue-600 font-black">${v(car.차량_세부트림)}</span></div>
                        <div class="flex gap-2"><span class="text-slate-400 w-[70px]">선택옵션</span><span class="text-slate-500 font-medium">${v(car.차량_선택옵션)}</span></div>
                        <div class="flex gap-2"><span class="text-slate-400 w-[70px]">외부/내부</span><span class="text-slate-700">${v(car.차량_외부색상)} / ${v(car.차량_내부색상)}</span></div>
                    </div>
                    <div class="grid grid-cols-2 pt-3 border-t border-slate-50">
                        <div class="flex justify-between pr-4"><span class="text-slate-400 uppercase font-bold">주행거리</span><span class="text-blue-600 font-black">${f(car.차량_현재주행거리)}km</span></div>
                        <div class="flex justify-between"><span class="text-slate-400 uppercase font-bold">배기량</span><span class="font-black">${f(car.차량_배기량)}cc</span></div>
                        <div class="flex justify-between pr-4"><span class="text-slate-400 uppercase font-bold">최초등록일</span><span class="font-black">${v(car.차량_최초등록일)}</span></div>
                        <div class="flex justify-between"><span class="text-slate-400 uppercase font-bold">차령만료일</span><span class="text-rose-600 font-black">${v(car.차량_차령만료일)}</span></div>
                    </div>
                    <div class="p-3 bg-slate-50 rounded-sm text-slate-700">
                        <div class="text-[9px] text-slate-400 font-bold mb-1 uppercase tracking-widest">차량 세부 상태 및 비고</div>
                        <div>${v(car.차량_세부상태)}</div>
                    </div>
                    <button class="w-full py-3 bg-white border border-slate-300 text-[10px] font-black uppercase shadow-sm">차량 사진 확인 (링크)</button>
                </section>

                <section class="bg-white border border-slate-200 rounded-sm overflow-hidden shadow-sm">
                    <div class="bg-slate-50 px-3 py-2 border-b font-bold text-slate-500 text-[9px] uppercase">2. 대여료 및 보증금 안내</div>
                    <table class="w-full text-center border-collapse text-[10.5px]">
                        <thead><tr class="bg-slate-50/50 border-b text-slate-400 text-[9px] font-bold"><th class="py-2">계약기간</th><th class="py-2 text-right pr-4">월 대여료</th><th class="py-2 text-right pr-4">보증금</th></tr></thead>
                        <tbody class="divide-y divide-slate-50 font-black">
                            <tr><td class="py-2.5">24개월</td><td class="py-2.5 text-blue-600 text-right pr-4">${f(car.금액_대여료_24M)}원</td><td class="py-2.5 text-slate-500 text-right pr-4">${f(car.금액_보증금_24M)}원</td></tr>
                            <tr><td class="py-2.5">36개월</td><td class="py-2.5 text-blue-600 text-right pr-4">${f(car.금액_대여료_36M)}원</td><td class="py-2.5 text-slate-500 text-right pr-4">${f(car.금액_보증금_36M)}원</td></tr>
                            <tr><td class="py-2.5">48개월</td><td class="py-2.5 text-blue-600 text-right pr-4">${f(car.금액_대여료_48M)}원</td><td class="py-2.5 text-slate-500 text-right pr-4">${f(car.금액_보증금_48M)}원</td></tr>
                            <tr><td class="py-2.5">60개월</td><td class="py-2.5 text-blue-600 text-right pr-4">${f(car.금액_대여료_60M)}원</td><td class="py-2.5 text-slate-500 text-right pr-4">${f(car.금액_보증금_60M)}원</td></tr>
                        </tbody>
                    </table>
                </section>

                <section class="bg-white border border-slate-200 rounded-sm overflow-hidden shadow-sm font-bold">
                    <div class="bg-slate-50 px-3 py-2 border-b font-bold text-slate-500 text-[9px] uppercase">3. 보험 보상 및 공통 면책 조건</div>
                    <table class="w-full text-[10px] border-collapse"><tbody class="divide-y divide-slate-50 font-bold">
                        <tr><td class="py-2 px-3 text-slate-400">대인 배상</td><td class="py-2 text-center text-slate-800">${v(car.보험_대인한도)}</td><td class="py-2 px-3 text-right text-blue-600 pr-4">${v(car.보험_대인면책)}만원</td></tr>
                        <tr><td class="py-2 px-3 text-slate-400">대물 배상</td><td class="py-2 text-center text-slate-800">${v(car.보험_대물한도)}</td><td class="py-2 px-3 text-right text-blue-600 pr-4">${v(car.보험_대물면책)}만원</td></tr>
                        <tr><td class="py-2 px-3 text-slate-400">자기신체(자손)</td><td class="py-2 text-center text-slate-800">${v(car.보험_자손한도)}</td><td class="py-2 px-3 text-right text-blue-600 pr-4">없음</td></tr>
                        <tr class="bg-slate-50/50"><td class="py-2 px-3 text-slate-400">자기차량(자차)</td><td class="py-2 text-center text-slate-800">${v(car.보험_자차한도)}</td><td class="py-2 px-3 text-right text-rose-600 pr-4">수리비의 ${v(car.보험_자차수리비율)}, 최소 ${v(car.보험_자차면책최소)}만 ~ 최대 ${v(car.보험_자차면책최대)}만</td></tr>
                    </tbody></table>
                </section>

                <section class="bg-white border border-slate-200 rounded-sm overflow-hidden shadow-sm font-bold">
                    <div class="bg-slate-50 px-3 py-2 border-b font-bold text-slate-500 text-[9px] uppercase">4. 계약 정책 및 연령/거리 옵션</div>
                    <div class="divide-y divide-slate-50 font-black">
                        <div class="grid grid-cols-2"><div class="p-3 border-r flex justify-between uppercase"><span class="text-slate-400">기본연령</span><span>${v(car.계약_기본운전연령)}</span></div><div class="p-3 flex justify-between uppercase"><span class="text-slate-400">약정거리</span><span>${v(car.계약_약정주행거리)}</span></div></div>
                        <div class="p-3 flex justify-between font-bold text-blue-600 uppercase"><span>만 21세 연령 하향</span><span>+${f(car.계약_21세추가금)}원 / 월</span></div>
                        <div class="p-3 flex justify-between font-bold text-blue-600 uppercase"><span>만 23세 연령 하향</span><span>+${f(car.계약_23세추가금)}원 / 월</span></div>
                    </div>
                </section>

                <section class="bg-white border border-slate-200 rounded-sm p-4 space-y-3 font-bold">
                    <div class="flex justify-between items-center font-bold text-slate-500 text-[10px] uppercase"><span>5. 담당자 및 입금 계좌 안내</span><label class="flex items-center gap-1 cursor-pointer"><input type="checkbox" checked class="w-3.5 h-3.5 accent-blue-600 font-bold"><span class="text-[9px]">담당자 정보 저장하기</span></label></div>
                    <div class="grid grid-cols-2 gap-2 text-[11px]"><div class="p-3 bg-slate-50 border border-slate-100 rounded-sm text-center">${managerInfo.company}</div><div class="p-3 bg-slate-50 border border-slate-100 rounded-sm text-center">${managerInfo.nameTitle}</div></div>
                    <div class="p-3 bg-blue-600 text-white rounded-sm text-center text-[13px] tracking-tight font-black">${managerInfo.phone}</div>
                </section>
            </div>

            <div class="p-2 border-t bg-white flex-shrink-0">
                <div class="grid grid-cols-3 gap-1.5 font-black text-[10px] uppercase">
                    <button onclick="openChat()" class="py-3 bg-blue-600 text-white rounded-sm flex flex-col items-center gap-1 active:bg-blue-700 transition-all"><i data-lucide="message-circle" class="w-4 h-4"></i><span>문의하기</span></button>
                    <button onclick="alert('링크가 복사되었습니다.')" class="py-3 border border-slate-200 text-slate-500 rounded-sm flex flex-col items-center gap-1 active:bg-slate-50 transition-all"><i data-lucide="share-2" class="w-4 h-4"></i><span>링크복사</span></button>
                    <button onclick="handleCopySummary()" class="py-3 bg-slate-800 text-white rounded-sm flex flex-col items-center gap-1 active:bg-slate-900 transition-all"><i data-lucide="copy" class="w-4 h-4"></i><span>텍스트복사</span></button>
                </div>
            </div>
        `;
    }
};
