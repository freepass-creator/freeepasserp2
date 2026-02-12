export const DetailView = {
    render(car, managerInfo) {
        if (!car) return '';
        const formatPrice = (val) => Number(val || 0).toLocaleString();

        return `
            <div class="h-[45px] flex justify-between items-center px-4 bg-white border-b border-slate-100 flex-shrink-0">
                <h2 class="font-black text-[11px] tracking-widest uppercase flex items-center gap-2">
                    <i data-lucide="car" class="w-4 h-4 text-blue-600"></i> 상품 상세 정보
                </h2>
                <button onclick="closeDetail()" class="text-slate-400 hover:text-rose-500 transition-colors"><i data-lucide="x" class="w-5 h-5"></i></button>
            </div>

            <div class="flex-1 overflow-y-auto p-3 space-y-3 bg-[#f8fafc] hide-scrollbar text-[10.5px]">
                <section class="bg-white border border-slate-200 rounded-sm shadow-sm p-3 space-y-3">
                    <div class="font-bold text-slate-500 text-[9px] uppercase mb-1">1. 차량 상세 제원</div>
                    <div class="flex justify-between items-start">
                        <div>
                            <span class="text-blue-600 font-black text-[12px] block">${car.id}</span>
                            <span class="text-slate-900 font-black text-[13px]">${car.제조사} ${car.모델}</span>
                        </div>
                        <div class="flex gap-1">
                            <span class="px-1.5 py-0.5 bg-blue-600 text-white text-[8px] font-black rounded-sm uppercase">신차</span>
                            <span class="px-1.5 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-100 text-[8px] font-black rounded-sm uppercase">${car.상태}</span>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-y-2 pt-2 border-t border-slate-50">
                        <div class="flex justify-between pr-4"><span class="text-slate-400 font-bold">세부모델</span><span class="font-bold">${car.세부모델}</span></div>
                        <div class="flex justify-between"><span class="text-slate-400 font-bold">주행거리</span><span class="font-bold text-blue-600">${formatPrice(car.주행거리)}km</span></div>
                        <div class="flex justify-between pr-4"><span class="text-slate-400 font-bold">외부/내부</span><span class="font-bold">${car.외부색상}/${car.내부색상}</span></div>
                        <div class="flex justify-between"><span class="text-slate-400 font-bold">연식</span><span class="font-bold">${car.연도}년식</span></div>
                    </div>
                    <button class="w-full py-2.5 bg-white border border-slate-300 text-[10px] font-black uppercase shadow-sm">차량 사진 확인 (링크)</button>
                </section>

                <section class="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
                    <div class="bg-slate-50 px-3 py-2 border-b font-bold text-slate-500 text-[9px]">2. 대여료 및 보증금 안내</div>
                    <table class="w-full text-center border-collapse">
                        <thead class="bg-slate-50/50 border-b text-slate-400 text-[9px]">
                            <tr><th class="py-1.5">계약기간</th><th class="py-1.5 text-right pr-4">월 대여료</th><th class="py-1.5 text-right pr-4">보증금</th></tr>
                        </thead>
                        <tbody class="divide-y divide-slate-50 font-bold">
                            <tr><td class="py-2">36개월</td><td class="py-2 text-blue-600 text-right pr-4">${formatPrice(car.대여료)}원</td><td class="py-2 text-slate-500 text-right pr-4">${formatPrice(car.보증금)}원</td></tr>
                        </tbody>
                    </table>
                </section>

                <section class="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
                    <div class="bg-slate-50 px-3 py-2 border-b font-bold text-slate-500 text-[9px]">3. 보험 보상 및 공통 면책 조건</div>
                    <div class="p-3 space-y-1.5">
                        <div class="flex justify-between"><span class="text-slate-400 font-bold">대인 배상</span><span class="font-bold">무한</span></div>
                        <div class="flex justify-between"><span class="text-slate-400 font-bold">대물 배상</span><span class="font-bold">1억</span></div>
                        <div class="flex justify-between"><span class="text-slate-400 font-bold">자차 면책금</span><span class="font-bold text-rose-600">수리비의 30% (최소 30만)</span></div>
                    </div>
                </section>

                <section class="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
                    <div class="bg-slate-50 px-3 py-2 border-b font-bold text-slate-500 text-[9px]">4. 계약 정책 및 연령/거리 옵션</div>
                    <div class="p-3 space-y-1.5">
                        <div class="flex justify-between"><span class="text-slate-400 font-bold">기본연령</span><span class="font-bold">만 26세</span></div>
                        <div class="flex justify-between"><span class="text-slate-400 font-bold">연간 주행거리</span><span class="font-bold">2만km</span></div>
                        <div class="flex justify-between text-blue-600 font-bold"><span>만 21세 하향</span><span>+50,000원 / 월</span></div>
                    </div>
                </section>

                <section class="bg-white border border-slate-200 rounded-sm shadow-sm p-3 space-y-2">
                    <div class="font-bold text-slate-500 text-[9px] mb-1">5. 담당자 및 입금 계좌 안내</div>
                    <div class="grid grid-cols-2 gap-2">
                        <div class="p-2.5 bg-slate-50 border border-slate-100 rounded-sm font-black text-center">${managerInfo.company}</div>
                        <div class="p-2.5 bg-slate-50 border border-slate-100 rounded-sm font-black text-center">${managerInfo.nameTitle}</div>
                    </div>
                    <div class="p-2.5 bg-slate-50 border border-slate-100 rounded-sm font-black text-blue-600 text-center">${managerInfo.phone}</div>
                </section>
            </div>

            <div class="p-3 border-t bg-white space-y-2 flex-shrink-0">
                <div class="grid grid-cols-2 gap-2">
                    <button class="py-3 border border-slate-200 text-slate-500 font-black text-[10px] uppercase rounded-sm flex items-center justify-center gap-1.5 active:bg-slate-50">
                        <i data-lucide="share-2" class="w-3.5 h-3.5"></i> 링크복사
                    </button>
                    <button onclick="openChat()" class="py-3 bg-blue-600 text-white font-black text-[10px] uppercase rounded-sm flex items-center justify-center gap-1.5 active:bg-blue-700">
                        <i data-lucide="message-circle" class="w-3.5 h-3.5"></i> 문의하기
                    </button>
                </div>
                <button onclick="handleCopySummary()" class="w-full py-3 bg-slate-800 text-white font-black text-[10px] uppercase rounded-sm flex items-center justify-center gap-1.5 active:bg-slate-900">
                    <i data-lucide="copy" class="w-3.5 h-3.5"></i> 전달용 텍스트 복사
                </button>
            </div>
        `;
    }
};
