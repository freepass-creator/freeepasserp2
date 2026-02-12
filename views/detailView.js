export const DetailView = {
    render(car, managerInfo) {
        if (!car) return '';
        
        const formatPrice = (val) => {
            if (!val || val === '-' || val === '0') return '0';
            const num = parseInt(String(val).replace(/[^0-9]/g, ''));
            return isNaN(num) ? '0' : num.toLocaleString();
        };

        const getVal = (val, def = '-') => (val && val !== '-' ? val : def);

        // 대여료 행 생성 함수 (6M ~ 60M)
        const renderPriceRows = () => {
            const periods = ['6M', '12M', '24M', '36M', '48M', '60M'];
            return periods.map(p => {
                const rent = car[`금액_대여료_${p}`];
                const deposit = car[`금액_보증금_${p}`];
                if (!rent || rent === '-' || rent === '0') return '';
                return `
                    <tr class="hover:bg-blue-50/30 transition-colors">
                        <td class="py-2 font-black text-slate-700">${p.replace('M', '개월')}</td>
                        <td class="py-2 text-blue-600 font-black text-right pr-4">₩${formatPrice(rent)}</td>
                        <td class="py-2 text-slate-500 font-bold text-right pr-4">₩${formatPrice(deposit)}</td>
                    </tr>`;
            }).join('');
        };

        return `
            <div class="h-[45px] flex justify-between items-center px-4 bg-white border-b border-slate-200 flex-shrink-0 sticky top-0 z-10">
                <h2 class="font-black text-[11px] tracking-widest uppercase flex items-center gap-2">
                    <i data-lucide="car" class="w-4 h-4 text-blue-600"></i> 상품 상세 정보
                </h2>
                <button onclick="closeDetail()" class="text-slate-400 hover:text-rose-500 transition-colors">
                    <i data-lucide="x" class="w-5 h-5"></i>
                </button>
            </div>

            <div class="flex-1 overflow-y-auto p-3 space-y-3 bg-[#f8fafc] hide-scrollbar text-[10.5px]">
                
                <section class="bg-white border border-slate-200 rounded-sm shadow-sm p-4 space-y-3">
                    <div class="font-bold text-slate-500 text-[9px] uppercase">1. 차량 상세 제원</div>
                    <div class="flex justify-between items-start pt-1">
                        <div>
                            <span class="text-blue-600 font-black text-[12.5px] block mb-1">${getVal(car.차량_번호)}</span>
                            <span class="text-slate-900 font-black text-[14px] leading-tight">${getVal(car.차량_제조사)} ${getVal(car.차량_모델명)}</span>
                        </div>
                        <div class="flex gap-1 font-black text-[8px] uppercase">
                            <span class="px-1.5 py-0.5 bg-blue-600 text-white rounded-sm">${getVal(car.차량_구분)}</span>
                            <span class="px-1.5 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-sm">${getVal(car.차량_상태)}</span>
                        </div>
                    </div>
                    <div class="space-y-1.5 pt-3 border-t border-slate-50">
                        <div class="flex gap-2"><span class="text-slate-400 font-bold w-[60px]">세부트림</span><span class="font-bold text-slate-800">${getVal(car.차량_세부트림)}</span></div>
                        <div class="flex gap-2"><span class="text-slate-400 font-bold w-[60px]">선택옵션</span><span class="font-medium text-slate-500 leading-tight">${getVal(car.차량_선택옵션)}</span></div>
                    </div>
                    <div class="grid grid-cols-2 gap-y-2 pt-2">
                        <div class="flex justify-between pr-4"><span class="text-slate-400 font-bold">주행거리</span><span class="font-black text-blue-600">${formatPrice(car.차량_현재주행거리)}km</span></div>
                        <div class="flex justify-between"><span class="text-slate-400 font-bold">연료/배기</span><span class="font-bold">${getVal(car.차량_연료)} / ${formatPrice(car.차량_배기량)}cc</span></div>
                        <div class="flex justify-between pr-4"><span class="text-slate-400 font-bold">내/외장</span><span class="font-bold">${getVal(car.차량_내부색상)} / ${getVal(car.차량_외부색상)}</span></div>
                        <div class="flex justify-between"><span class="text-slate-400 font-bold">최초등록</span><span class="font-bold">${getVal(car.차량_최초등록일)}</span></div>
                    </div>
                    <button onclick="window.open('${car.차량_사진링크}','_blank')" class="w-full py-2.5 bg-white border border-slate-300 text-[10px] font-black uppercase shadow-sm active:bg-slate-50 transition-colors">차량 사진 확인 (링크)</button>
                </section>

                <section class="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
                    <div class="bg-slate-50 px-3 py-2 border-b font-bold text-slate-500 text-[9px] uppercase">2. 대여료 및 보증금 안내 (VAT 포함)</div>
                    <table class="w-full text-center border-collapse">
                        <thead class="bg-slate-50/50 border-b text-slate-400 text-[9px] font-bold">
                            <tr><th class="py-2">계약기간</th><th class="py-2 text-right pr-4">월 대여료</th><th class="py-2 text-right pr-4">보증금</th></tr>
                        </thead>
                        <tbody class="divide-y divide-slate-50">
                            ${renderPriceRows()}
                        </tbody>
                    </table>
                </section>

                <section class="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
                    <div class="bg-slate-50 px-3 py-2 border-b font-bold text-slate-500 text-[9px] uppercase">3. 보험 보상 및 공통 면책 조건</div>
                    <div class="p-3 space-y-2">
                        <div class="flex justify-between"><span class="text-slate-400 font-bold">대인 배상</span><span class="font-bold">${getVal(car.보험_대인한도, '무한')}</span></div>
                        <div class="flex justify-between"><span class="text-slate-400 font-bold">대물 배상</span><span class="font-bold">${getVal(car.보험_대물한도, '1억')}</span></div>
                        <div class="flex justify-between items-start">
                            <span class="text-slate-400 font-bold uppercase">자차 면책</span>
                            <div class="text-right">
                                <div class="font-bold text-rose-600">수리비의 ${getVal(car.보험_자차수리비율, '30%')}</div>
                                <div class="text-[9px] text-slate-400">(최소 ${formatPrice(car.보험_자차면책최소)}만 ~ 최대 ${formatPrice(car.보험_자차면책최대)}만)</div>
                            </div>
                        </div>
                        <div class="flex justify-between"><span class="text-slate-400 font-bold">긴급출동</span><span class="font-bold text-emerald-600">${getVal(car.보험_긴급출동, '연 5회')}</span></div>
                    </div>
                </section>

                <section class="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
                    <div class="bg-slate-50 px-3 py-2 border-b font-bold text-slate-500 text-[9px] uppercase">4. 계약 정책 및 연령/거리 옵션</div>
                    <div class="divide-y divide-slate-50">
                        <div class="p-3 grid grid-cols-2 gap-2">
                            <div class="flex justify-between pr-2"><span class="text-slate-400 font-bold">기본연령</span><span class="font-bold">${getVal(car.계약_기본운전연령, '만 26세')}</span></div>
                            <div class="flex justify-between"><span class="text-slate-400 font-bold">약정거리</span><span class="font-bold">${getVal(car.계약_약정주행거리, '2만km')}</span></div>
                        </div>
                        <div class="p-3 space-y-2">
                            <div class="flex justify-between"><span class="text-slate-500 font-bold">만 21세 하향</span><span class="font-black text-blue-600">+${formatPrice(car.계약_21세추가금)}원 / 월</span></div>
                            <div class="flex justify-between"><span class="text-slate-500 font-bold">만 23세 하향</span><span class="font-black text-blue-600">+${formatPrice(car.계약_23세추가금)}원 / 월</span></div>
                            <div class="flex justify-between"><span class="text-slate-500 font-bold">연 1만km 추가</span><span class="font-black text-blue-600">+${formatPrice(car.계약_1만Km추가금)}원 / 월</span></div>
                        </div>
                        <div class="p-3 bg-slate-50/50">
                            <div class="text-[9px] text-slate-400 font-bold uppercase mb-1">계약 비고</div>
                            <div class="text-slate-600 leading-tight">${getVal(car.계약_비고, '특이사항 없음')}</div>
                        </div>
                    </div>
                </section>

                <section class="bg-white border border-slate-200 rounded-sm shadow-sm p-3 space-y-3">
                    <div class="font-bold text-slate-500 text-[9px] uppercase">5. 담당자 및 입금 계좌 안내</div>
                    <div class="grid grid-cols-2 gap-2 font-black">
                        <div class="p-3 bg-slate-50 border border-slate-100 rounded-sm text-center text-slate-700">${managerInfo.company}</div>
                        <div class="p-3 bg-slate-50 border border-slate-100 rounded-sm text-center text-slate-700">${managerInfo.nameTitle}</div>
                    </div>
                    <div class="p-3 bg-slate-50 border border-slate-100 rounded-sm font-black text-blue-600 text-center text-[12px] tracking-tight">
                        ${managerInfo.phone}
                    </div>
                    <div class="p-2 bg-blue-50 border border-blue-100 rounded-sm text-center">
                        <div class="text-[8px] text-blue-400 font-bold uppercase mb-0.5">Deposit Account</div>
                        <div class="text-[10px] font-black text-blue-700">${getVal(car.계약_입금계좌번호, '담당자 별도 문의')}</div>
                    </div>
                </section>
            </div>

            <div class="p-3 border-t bg-white space-y-2 flex-shrink-0">
                <div class="grid grid-cols-2 gap-2">
                    <button class="py-3.5 border border-slate-200 text-slate-500 font-black text-[11px] uppercase rounded-sm flex items-center justify-center gap-1.5 active:bg-slate-50 transition-colors">
                        <i data-lucide="share-2" class="w-4 h-4"></i> 링크복사
                    </button>
                    <button onclick="openChat()" class="py-3.5 bg-blue-600 text-white font-black text-[11px] uppercase rounded-sm flex items-center justify-center gap-1.5 active:bg-blue-700 shadow-md shadow-blue-100 transition-all">
                        <i data-lucide="message-circle" class="w-4 h-4"></i> 문의하기
                    </button>
                </div>
                <button onclick="handleCopySummary()" class="w-full py-3.5 bg-slate-800 text-white font-black text-[11px] uppercase rounded-sm flex items-center justify-center gap-1.5 active:bg-slate-900 transition-colors">
                    <i data-lucide="copy" class="w-4 h-4"></i> 전달용 텍스트 복사
                </button>
            </div>
        `;
    }
};
