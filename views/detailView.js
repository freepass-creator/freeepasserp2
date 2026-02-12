// views/detailView.js
export const DetailView = {
    render(car, managerInfo) {
        if (!car) return '';

        const isEV = String(car.차량_연료).includes('전기');
        const formatPrice = (val) => parseInt(String(val || 0).replace(/[^0-9]/g, '')).toLocaleString();
        const formatDeductible = (val) => (!val || val === '-' || val === '0' || val === '없음') ? '없음' : ( /^\d+$/.test(val) ? val + '만원' : val);
        const formatPercent = (val) => (!val || val === '-' || val === '0') ? '30%' : (/^\d+$/.test(val) ? val + '%' : val);
        
        // 배터리 용량 계산 로직 (기존 함수 활용)
        const getBatteryCap = (c) => {
            let cap = String(c.차량_배터리용량 || c.차량_배기량 || '').trim();
            return /^\d+$/.test(cap) ? cap + 'kWh' : cap;
        };

        return `
            <div class="h-[50px] flex justify-between items-center px-4 bg-white border-b border-slate-100 text-slate-800 flex-shrink-0">
                <h2 class="font-black text-[12px] tracking-widest uppercase flex items-center gap-2">
                    <i data-lucide="car" class="w-4 h-4"></i> 상품 상세 정보
                </h2>
                <button onclick="closeDetail()" class="text-slate-400 hover:text-slate-800 p-1">
                    <i data-lucide="x" class="w-5 h-5"></i>
                </button>
            </div>

            <div class="flex-1 overflow-y-auto p-3 space-y-3 bg-white text-[11px] text-slate-800 hide-scrollbar">
                <section class="border border-slate-200 bg-white rounded-none shadow-sm tactile-section">
                    <div class="bg-slate-50 px-3 py-2.5 border-b font-bold text-slate-600 uppercase">1. 차량 상세 제원</div>
                    <div class="p-3 space-y-3.5">
                        <div class="flex items-center justify-between pb-2 border-b border-slate-100">
                            <div class="flex items-center gap-2 flex-wrap">
                                <span class="font-black text-[12px] text-blue-700">${car.차량_번호}</span>
                                <span class="font-black text-[12px] text-slate-900">${car.차량_제조사} ${car.차량_모델명}</span>
                            </div>
                        </div>
                        <div class="space-y-1.5">
                            <div class="flex gap-2"><span class="text-slate-400 font-bold w-[60px]">세부트림</span><span class="font-black text-blue-700">${car.차량_세부트림}</span></div>
                            <div class="flex gap-2"><span class="text-slate-400 font-bold w-[60px]">내/외부</span><span class="font-black text-slate-700">${car.차량_외부색상} / ${car.차량_내부색상}</span></div>
                        </div>
                        <div class="grid grid-cols-2 gap-2 border-t border-slate-100 pt-3">
                            <div class="flex justify-between"><span class="text-slate-400 font-bold">주행거리</span><span class="font-black text-blue-700">${formatPrice(car.차량_현재주행거리)}km</span></div>
                            <div class="flex justify-between"><span class="text-slate-400 font-bold">${isEV ? '배터리' : '배기량'}</span><span class="font-black">${isEV ? getBatteryCap(car) : formatPrice(car.차량_배기량)+'cc'}</span></div>
                        </div>
                        <button onclick="window.open('${car.차량_사진링크}','_blank')" class="w-full py-3 bg-white border border-slate-300 font-black text-[10px] apply-btn-shadow uppercase">차량 사진 확인</button>
                    </div>
                </section>

                <section class="border border-slate-200 bg-white shadow-sm overflow-hidden">
                    <div class="bg-slate-50 px-3 py-2.5 border-b font-bold text-slate-600 uppercase">2. 대여료 및 보증금 안내</div>
                    <table class="w-full text-center text-[11px]">
                        <thead class="bg-slate-50 border-b font-bold text-slate-500">
                            <tr><th class="py-2">계약기간</th><th class="py-2 text-blue-800 text-right pr-4">월 대여료</th><th class="py-2 text-right pr-4 text-slate-400">보증금</th></tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100">
                            ${['24M', '36M', '48M', '60M'].map(m => {
                                const fee = car[`금액_대여료_${m}`];
                                const dep = car[`금액_보증금_${m}`];
                                if (!fee || fee === '-') return '';
                                return `<tr><td class="py-2 font-black">${m}</td><td class="py-2 text-blue-800 font-black text-right pr-4">${fee}원</td><td class="py-2 text-slate-500 text-right pr-4 font-bold">${dep}원</td></tr>`;
                            }).join('')}
                        </tbody>
                    </table>
                </section>

                <section class="border border-slate-200 bg-white shadow-sm overflow-hidden">
                    <div class="bg-slate-50 px-3 py-2.5 border-b font-bold text-slate-600 uppercase flex justify-between">
                        <span>3. 담당자 정보</span>
                    </div>
                    <div class="p-3 space-y-2">
                        <div class="grid grid-cols-2 gap-2">
                            <input type="text" placeholder="소속" oninput="updateManagerField('company', this.value)" value="${managerInfo.company}" class="p-2 border border-slate-200 outline-none font-bold">
                            <input type="text" placeholder="성명" oninput="updateManagerField('nameTitle', this.value)" value="${managerInfo.nameTitle}" class="p-2 border border-slate-200 outline-none font-bold">
                        </div>
                        <input type="text" placeholder="연락처" oninput="updateManagerField('phone', this.value)" value="${managerInfo.phone}" class="w-full p-2 border border-slate-200 outline-none font-bold">
                    </div>
                </section>
            </div>

            <div class="p-3 border-t bg-white flex-shrink-0 grid grid-cols-2 gap-3">
                <button class="py-3.5 bg-white border border-slate-300 text-slate-400 font-black text-[11px] uppercase tracking-widest cursor-default">고객용 링크</button>
                <button onclick="handleCopySummary()" class="py-3.5 bg-slate-800 text-white font-black text-[11px] uppercase tracking-widest apply-btn-shadow flex items-center justify-center gap-2">
                    <i data-lucide="copy" class="w-4 h-4"></i> 전달용 텍스트
                </button>
            </div>
        `;
    }
};
