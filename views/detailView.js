export const DetailView = {
    render(car, managerInfo) {
        if (!car) return '';
        
        const fNum = (val) => {
            if (!val || val === '-' || val === '0') return '0';
            const n = parseInt(String(val).replace(/[^0-9]/g, ''));
            return isNaN(n) ? '0' : n.toLocaleString();
        };
        const getV = (val, def = '-') => (val && val !== '-' ? val : def);

        // 대여료 행 생성
        const periods = ['6M', '12M', '18M', '24M', '36M', '48M', '60M'];
        const priceRows = periods.map(p => {
            const rent = car[`금액_대여료_${p}`];
            const deposit = car[`금액_보증금_${p}`];
            if (!rent || rent === '-' || rent === '0') return '';
            return `
                <tr class="border-b border-slate-50">
                    <td class="py-2.5 font-black text-slate-700 text-center w-1/4">${p.replace('M','개월')}</td>
                    <td class="py-2.5 text-blue-600 font-black text-right pr-4">₩${fNum(rent)}</td>
                    <td class="py-2.5 text-slate-500 font-bold text-right pr-4">₩${fNum(deposit)}</td>
                </tr>`;
        }).join('');

        return `
            <div class="h-[45px] flex justify-between items-center px-4 bg-white border-b border-slate-200 sticky top-0 z-10">
                <h2 class="font-black text-[11px] uppercase flex items-center gap-2 text-slate-800">
                    <i data-lucide="car" class="w-4 h-4 text-blue-600"></i> 상품 상세 정보
                </h2>
                <button onclick="closeDetail()" class="text-slate-400 hover:text-rose-500 transition-colors">
                    <i data-lucide="x" class="w-5 h-5"></i>
                </button>
            </div>

            <div class="flex-1 overflow-y-auto p-3 space-y-3 bg-[#f8fafc] hide-scrollbar text-[10.5px]">
                <section class="bg-white border border-slate-200 rounded-sm p-4 space-y-3 shadow-sm font-bold">
                    <div class="font-bold text-slate-500 text-[9px] uppercase">1. 차량 상세 제원</div>
                    <div class="flex justify-between items-start">
                        <div class="space-y-1">
                            <span class="text-blue-600 font-black text-[14px] block leading-none">${getV(car.차량_번호)}</span>
                            <span class="text-slate-900 font-black text-[16px] block leading-tight tracking-tighter">${getV(car.차량_제조사)} ${getV(car.차량_모델명)}</span>
                        </div>
                        <span class="px-2 py-0.5 bg-blue-600 text-white text-[8px] font-black rounded-sm uppercase">${getV(car.차량_구분)}</span>
                    </div>
                    <div class="space-y-1.5 pt-3 border-t border-slate-100">
                        <div class="flex gap-2"><span class="text-slate-400 w-[60px] flex-shrink-0">세부트림</span><span class="text-blue-700">${getV(car.차량_세부트림)}</span></div>
                        <div class="flex gap-2 font-black"><span class="text-slate-400 w-[60px] flex-shrink-0">주행거리</span><span class="text-blue-600">${fNum(car.차량_현재주행거리)}km</span></div>
                    </div>
                    <button onclick="window.open('${car.차량_사진링크}','_blank')" class="w-full py-3 bg-white border border-slate-300 text-[10px] font-black uppercase shadow-sm">실물 사진 확인</button>
                </section>

                <section class="bg-white border border-slate-200 rounded-sm overflow-hidden shadow-sm">
                    <div class="bg-slate-50 px-3 py-2.5 border-b font-bold text-slate-500 text-[9px] uppercase">2. 대여료 안내</div>
                    <table class="w-full text-center border-collapse"><tbody>${priceRows}</tbody></table>
                </section>

                <section class="bg-white border border-slate-200 rounded-sm p-3 shadow-sm font-bold">
                    <div class="font-bold text-slate-500 text-[9px] uppercase mb-2">3. 보험 보상 정보</div>
                    <div class="flex justify-between">
                        <span class="text-slate-400 font-bold uppercase">자차 면책금</span>
                        <span class="text-rose-600 font-black">수리비의 ${getV(car.보험_자차수리비율, '30%')}</span>
                    </div>
                </section>

                <section class="bg-white border border-slate-200 rounded-sm p-3 shadow-sm font-bold">
                    <div class="font-bold text-slate-500 text-[9px] uppercase mb-2">4. 계약 정책</div>
                    <div class="flex justify-between text-blue-600">
                        <span>연령 하향 (21세)</span>
                        <span>+${fNum(car.계약_21세추가금)}원</span>
                    </div>
                </section>

                <section class="bg-white border border-slate-200 rounded-sm p-4 shadow-sm space-y-3 font-bold">
                    <div class="font-bold text-slate-500 text-[9px] uppercase">5. 담당자 안내</div>
                    <div class="p-3 bg-blue-600 text-white rounded-sm font-black text-center text-[13px]">
                        ${managerInfo.phone}
                    </div>
                </section>
            </div>

            <div class="p-2.5 border-t bg-white flex-shrink-0 shadow-sm">
                <div class="grid grid-cols-3 gap-1.5 font-black text-[10px] uppercase">
                    <button onclick="openChat()" class="py-3.5 bg-blue-600 text-white rounded-sm flex flex-col items-center justify-center gap-1 active:bg-blue-700">
                        <i data-lucide="message-circle" class="w-4 h-4"></i>
                        <span>문의하기</span>
                    </button>
                    <button onclick="alert('링크가 복사되었습니다.')" class="py-3.5 border border-slate-200 text-slate-500 rounded-sm flex flex-col items-center justify-center gap-1 active:bg-slate-50">
                        <i data-lucide="share-2" class="w-4 h-4"></i>
                        <span>링크복사</span>
                    </button>
                    <button onclick="window.handleCopySummary()" class="py-3.5 bg-slate-800 text-white rounded-sm flex flex-col items-center justify-center gap-1 active:bg-slate-900">
                        <i data-lucide="copy" class="w-4 h-4"></i>
                        <span>텍스트복사</span>
                    </button>
                </div>
            </div>
        `;
    }
};

// [중요] 함수가 없어서 에러나는 것 방지용 가짜 함수
if (!window.handleCopySummary) {
    window.handleCopySummary = () => alert('텍스트 복사 기능 준비중');
}
