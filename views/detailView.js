export const DetailView = {
    render(car, managerInfo) {
        if (!car) return '';

        // 유틸리티 함수: 금액 포맷팅 (숫자만 추출 후 콤마 추가)
        const formatPrice = (val) => {
            if (!val || val === '-' || val === '0') return '0';
            const num = parseInt(String(val).replace(/[^0-9]/g, ''));
            return isNaN(num) ? '0' : num.toLocaleString();
        };

        // 유틸리티 함수: 데이터 부재 시 기본값 처리
        const getVal = (val, def = '-') => (val && val !== '-' ? val : def);

        // [이미지 반영] 2번 대여료 리스트 생성 (6M ~ 60M 중 데이터 있는 것만)
        const renderPriceRows = () => {
            const periods = ['6M', '12M', '18M', '24M', '36M', '48M', '60M'];
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
                <h2 class="font-black text-[11px] tracking-widest uppercase flex items-center gap-2 text-slate-800">
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
                            <span class="text-blue-600 font-black text-[13px] block mb-1">${getVal(car.차량_번호)}</span>
                            <span class="text-slate-900 font-black text-[15px] leading-tight">${getVal(car.차량_제조사)} ${getVal(car.차량_모델명)}</span>
                            <span class="text-slate-400 font-bold text-[11px] ml-1">${getVal(car.차량_연료)}</span>
                        </div>
                        <div class="flex gap-1 font-black text-[8px] uppercase">
                            <span class="px-1.5 py-0.5 bg-blue-600 text-white rounded-sm">${getVal(car.차량_구분)}</span>
                            <span class="px-1.5 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-sm">${getVal(car.차량_상태)}</span>
                        </div>
                    </div>
                    
                    <div class="space-y-1.5 pt-3 border-t border-slate-100">
                        <div class="flex gap-2"><span class="text-slate-400 font-bold w-[70px]">세부모델</span><span class="font-bold text-slate-800">${getVal(car.차량_세부모델)}</span></div>
                        <div class="flex gap-2"><span class="text-slate-400 font-bold w-[70px]">세부트림</span><span class="font-bold text-blue-700">${getVal(car.차량_세부트림)}</span></div>
                        <div class="flex gap-2"><span class="text-slate-400 font-bold w-[70px]">선택옵션</span><span class="font-medium text-slate-500 leading-tight">${getVal(car.차량_선택옵션)}</span></div>
                        <div class="flex gap-2"><span class="text-slate-400 font-bold w-[70px]">외부/내부</span><span class="font-bold text-slate-700">${getVal(car.차량_외부색상)} / ${getVal(car.차량_내부색상)}</span></div>
                    </div>

                    <div class="grid grid-cols-2 gap-y-2 pt-3 border-t border-slate-50">
                        <div class="flex justify-between pr-4"><span class="text-slate-400 font-bold">주행거리</span><span class="font-black text-blue-600">${formatPrice(car.차량_현재주행거리)}km</span></div>
                        <div class="flex justify-between"><span class="text-slate-400 font-bold">배기량</span><span class="font-black text-slate-800">${formatPrice(car.차량_배기량)}cc</span></div>
                        <div class="flex justify-between pr-4"><span class="text-slate-400 font-bold">최초등록일</span><span class="font-black text-slate-800">${getVal(car.차량_최초등록일)}</span></div>
                        <div class="flex justify-between"><span class="text-slate-400 font-bold">차령만료일</span><span class="font-black text-rose-600">${getVal(car.차량_차령만료일)}</span></div>
                    </div>

                    <div class="p-3 bg-slate-50/50 border border-slate-100 rounded-sm">
                        <div class="text-[9px] text-slate-400 font-bold uppercase mb-1">차량 세부 상태 및 비고</div>
                        <div class="font-bold text-slate-700 leading-relaxed">${getVal(car.차량_세부상태, '기재 사항 없음')}</div>
                    </div>

                    <button onclick="window.open('${car.차량_사진링크}','_blank')" class="w-full py-3 bg-white border border-slate-300 text-[10px] font-black uppercase shadow-sm active:bg-slate-50 transition-colors">차량 사진 확인 (링크)</button>
                </section>

                <section class="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
                    <div class="bg-slate-50 px-3 py-2.5 border-b font-bold text-slate-600 text-[10px] uppercase">2. 대여료 및 보증금 안내</div>
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
                    <div class="bg-slate-50 px-3 py-2.5 border-b font-bold text-slate-600 text-[10px] uppercase">3. 보험 보상 및 공통 면책 조건</div>
                    <table class="w-full text-[10px] border-collapse">
                        <thead class="bg-slate-50 border-b text-slate-400 font-bold">
                            <tr><th class="py-2 px-3 text-left">보상 항목</th><th class="py-2 text-center">보상 한도</th><th class="py-2 px-3 text-right pr-4">면책금</th></tr>
                        </thead>
                        <tbody class="divide-y divide-slate-50 font-bold">
                            <tr><td class="py-2 px-3 text-slate-500">대인 배상</td><td class="py-2 text-center text-slate-800">${getVal(car.보험_대인한도, '무한')}</td><td class="py-2 px-3 text-right text-blue-600 pr-4">${formatPrice(car.보험_대인면책)}만원</td></tr>
                            <tr><td class="py-2 px-3 text-slate-500">대물 배상</td><td class="py-2 text-center text-slate-800">${getVal(car.보험_대물한도, '1억')}</td><td class="py-2 px-3 text-right text-blue-600 pr-4">${formatPrice(car.보험_대물면책)}만원</td></tr>
                            <tr><td class="py-2 px-3 text-slate-500">자기신체(자손)</td><td class="py-2 text-center text-slate-800">${getVal(car.보험_자손한도)}</td><td class="py-2 px-3 text-right text-blue-600 pr-4">없음</td></tr>
                            <tr><td class="py-2 px-3 text-slate-500">무보험차 상해</td><td class="py-2 text-center text-slate-800">${getVal(car.보험_무보험한도, '2억')}</td><td class="py-2 px-3 text-right text-blue-600 pr-4">없음</td></tr>
                            <tr class="bg-slate-50/30"><td class="py-2 px-3 text-slate-500">자기차량(자차)</td><td class="py-2 text-center text-slate-800">${getVal(car.보험_자차한도, '차량가액')}</td><td class="py-2 px-3 text-right text-rose-600 pr-4 tracking-tighter">수리비의 ${getVal(car.보험_자차수리비율, '30%')}, 최소 ${formatPrice(car.보험_자차면책최소)} ~ 최대 ${formatPrice(car.보험_자차면책최대)}</td></tr>
                            <tr><td class="py-2 px-3 text-slate-500">긴급출동</td><td class="py-2 text-center text-slate-800">${getVal(car.보험_긴급출동, '연 5회')}</td><td class="py-2 px-3 text-right pr-4">-</td></tr>
                        </tbody>
                    </table>
                </section>

                <section class="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
                    <div class="bg-slate-50 px-3 py-2.5 border-b font-bold text-slate-600 text-[10px] uppercase">4. 계약 정책 및 연령/거리 옵션</div>
                    <div class="divide-y divide-slate-100">
                        <div class="grid grid-cols-2">
                            <div class="p-3 flex justify-between border-r"><span class="text-slate-400 font-bold uppercase">기본연령</span><span class="font-black text-slate-800">${getVal(car.계약_기본운전연령, '만 26세')}</span></div>
                            <div class="p-3 flex justify-between"><span class="text-slate-400 font-bold uppercase">약정거리</span><span class="font-black text-slate-800">${getVal(car.계약_약정주행거리, '연 2만km')}</span></div>
                        </div>
                        <div class="p-3 space-y-2.5">
                            <div class="flex justify-between"><span class="text-slate-500 font-bold">만 21세 연령 하향</span><span class="font-black text-blue-600">+${formatPrice(car.계약_21세추가금)}원 / 월</span></div>
                            <div class="flex justify-between"><span class="text-slate-500 font-bold">만 23세 연령 하향</span><span class="font-black text-blue-600">+${formatPrice(car.계약_23세추가금)}원 / 월</span></div>
                            <div class="flex justify-between"><span class="text-slate-500 font-bold italic">연 1만km 약정 추가</span><span class="font-black text-blue-600">+${getVal(car.계약_1만Km추가금, '+10%')} / 월</span></div>
                        </div>
                        <div class="p-3 bg-slate-50/50">
                            <div class="text-[9px] text-slate-400 font-bold uppercase mb-1">계약 관련 특이사항 및 비고</div>
                            <div class="text-slate-600 font-bold leading-relaxed">${getVal(car.계약_비고, '기재 사항 없음')}</div>
                        </div>
                    </div>
                </section>

                <section class="bg-white border border-slate-200 rounded-sm shadow-sm p-3 space-y-3">
                    <div class="flex justify-between items-center">
                        <div class="font-bold text-slate-500 text-[10px] uppercase">5. 담당자 및 입금 계좌 안내</div>
                        <label class="flex items-center gap-1.5 cursor-pointer">
                            <input type="checkbox" checked class="w-3.5 h-3.5 accent-blue-600">
                            <span class="text-[9px] font-bold text-slate-400">담당자 정보 저장하기</span>
                        </label>
                    </div>
                    <div class="grid grid-cols-2 gap-2 font-black">
                        <div class="p-3 bg-slate-50 border border-slate-100 rounded-sm text-center text-slate-700">${managerInfo.company}</div>
                        <div class="p-3 bg-slate-50 border border-slate-100 rounded-sm text-center text-slate-700">${managerInfo.nameTitle}</div>
                    </div>
                    <div class="p-3 bg-slate-50 border border-slate-100 rounded-sm font-black text-blue-600 text-center text-[12px] tracking-tight">
                        ${managerInfo.phone}
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="flex-1 p-3 bg-blue-50/50 border border-blue-100 rounded-sm">
                            <div class="text-[8px] text-blue-400 font-bold uppercase mb-0.5">Deposit Account (클릭 시 복사)</div>
                            <div class="text-[10px] font-black text-blue-700 tracking-tight cursor-pointer" onclick="copyText('${car.계약_입금계좌번호}')">
                                ${getVal(car.계약_입금계좌번호, '계좌 정보 미등록')}
                            </div>
                        </div>
                        <label class="flex flex-col items-center gap-1">
                            <span class="text-[8px] font-bold text-slate-400">계좌포함</span>
                            <input type="checkbox" checked class="w-3.5 h-3.5 accent-slate-800">
                        </label>
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
