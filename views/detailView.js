export const DetailView = {
    render(car, managerInfo) {
        if (!car) return '';
        const formatPrice = (val) => Number(val || 0).toLocaleString();

        return `
            <div class="h-[40px] flex justify-between items-center px-4 bg-white border-b border-slate-200 flex-shrink-0">
                <h2 class="font-black text-[11px] tracking-widest uppercase flex items-center gap-2">
                    <i data-lucide="car" class="w-3.5 h-3.5 text-blue-600"></i> 상품 상세 정보
                </h2>
                <button onclick="closeDetail()" class="text-slate-400 hover:text-rose-500 transition-colors">
                    <i data-lucide="x" class="w-5 h-5"></i>
                </button>
            </div>

            <div class="flex-1 overflow-y-auto p-3 space-y-3 bg-[#f8fafc] hide-scrollbar text-[10.5px]">
                <section class="bg-white border border-slate-200 rounded-sm shadow-sm">
                    <div class="bg-slate-50 px-3 py-2 border-b font-bold text-slate-500 text-[9px] uppercase">1. 차량 상세 제원</div>
                    <div class="p-3 space-y-3">
                        <div class="flex justify-between items-start">
                            <div class="flex flex-col">
                                <span class="text-blue-600 font-black text-[12px] leading-none mb-1">${car.id}</span>
                                <span class="text-slate-900 font-black text-[13px] leading-tight">${car.제조사} ${car.모델}</span>
                            </div>
                            <div class="flex gap-1">
                                <span class="px-1.5 py-0.5 bg-blue-600 text-white text-[8px] font-black rounded-sm uppercase">${car.상태}</span>
                            </div>
                        </div>
                        <div class="grid grid-cols-2 gap-x-4 gap-y-2 pt-2 border-t border-slate-100">
                            <div class="flex justify-between"><span class="text-slate-400 font-bold">세부모델</span><span class="font-bold text-slate-700">${car.세부모델}</span></div>
                            <div class="flex justify-between"><span class="text-slate-400 font-bold">연료/색상</span><span class="font-bold text-slate-700">${car.연료}/${car.외부색상}</span></div>
                            <div class="flex justify-between"><span class="text-slate-400 font-bold">주행거리</span><span class="font-black text-blue-600">${formatPrice(car.주행거리)}km</span></div>
                            <div class="flex justify-between"><span class="text-slate-400 font-bold">연식</span><span class="font-bold text-slate-700">${car.연도}년식</span></div>
                        </div>
                    </div>
                </section>

                <section class="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
                    <div class="bg-slate-50 px-3 py-2 border-b font-bold text-slate-500 text-[9px] uppercase">2. 대여료 및 보증금 안내</div>
                    <table class="w-full text-center border-collapse">
                        <thead class="bg-slate-50/50 border-b text-slate-400 font-bold text-[9px]">
                            <tr><th class="py-1.5">계약기간</th><th class="py-1.5 text-right pr-4">월 대여료</th><th class="py-1.5 text-right pr-4">보증금</th></tr>
                        </thead>
                        <tbody class="divide-y divide-slate-50">
                            <tr class="hover:bg-blue-50/30"><td class="py-2 font-black">기본</td><td class="py-2 text-blue-600 font-black text-right pr-4">₩${formatPrice(car.대여료)}</td><td class="py-2 text-slate-500 font-bold text-right pr-4">₩${formatPrice(car.보증금)}</td></tr>
                        </tbody>
                    </table>
                </section>

                <section class="bg-white border border-slate-200 rounded-sm shadow-sm">
                    <div class="bg-slate-50 px-3 py-2 border-b font-bold text-slate-500 text-[9px] uppercase">3. 담당자 및 입금 계좌</div>
                    <div class="p-3 space-y-2">
                        <div class="flex justify-between items-center bg-slate-50 p-2 rounded-sm border border-slate-100">
                            <span class="text-slate-400 font-bold">담당자</span>
                            <span class="font-black text-slate-800">${managerInfo.nameTitle} (${managerInfo.company})</span>
                        </div>
                        <div class="flex justify-between items-center bg-slate-50 p-2 rounded-sm border border-slate-100">
                            <span class="text-slate-400 font-bold">연락처</span>
                            <span class="font-black text-blue-600">${managerInfo.phone}</span>
                        </div>
                    </div>
                </section>
            </div>

            <div class="p-3 border-t bg-white grid grid-cols-2 gap-2 flex-shrink-0">
                <button class="py-2.5 bg-white border border-slate-200 text-slate-300 font-black text-[10px] uppercase rounded-sm">고객용 링크</button>
                <button onclick="handleCopySummary()" class="py-2.5 bg-slate-800 text-white font-black text-[10px] uppercase rounded-sm flex items-center justify-center gap-1.5 active:scale-95 transition-transform">
                    <i data-lucide="copy" class="w-3.5 h-3.5"></i> 텍스트 복사
                </button>
            </div>
        `;
    }
};
