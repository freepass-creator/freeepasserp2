export const DetailView = {
    render(data, manager) {
        return `
            <div class="flex flex-col h-full bg-white">
                <div class="h-[45px] px-4 border-b border-slate-200 flex items-center justify-between flex-shrink-0">
                    <div class="flex items-center gap-2">
                        <i data-lucide="car" class="w-4 h-4 text-slate-700"></i>
                        <span class="text-[12px] font-black text-slate-800 uppercase tracking-tighter">상품 상세 정보</span>
                    </div>
                    <button onclick="UI.closeDetail()" class="text-slate-400 hover:text-slate-600 transition-colors">
                        <i data-lucide="x" class="w-5 h-5"></i>
                    </button>
                </div>

                <div class="flex-1 overflow-auto p-4 bg-white space-y-5">
                    
                    <div class="border border-slate-200 rounded-sm overflow-hidden shadow-sm">
                        <div class="bg-slate-50 px-3 py-2 border-b border-slate-200">
                            <h3 class="text-[11px] font-black text-slate-800 font-black uppercase">1. 차량 상세 제원</h3>
                        </div>
                        <div class="p-3 space-y-4">
                            <div class="flex items-center justify-between">
                                <h4 class="text-[13px] font-black text-blue-700">${data.차량_번호 || '456나7890'} <span class="text-slate-800 ml-1 font-black">${data.모델명 || '기아 카니발'}</span></h4>
                                <div class="flex gap-1">
                                    <span class="bg-blue-600 text-white text-[9px] px-1.5 py-0.5 font-black uppercase shadow-sm">출고가능</span>
                                </div>
                            </div>

                            <table class="w-full text-[11px]">
                                <tr class="border-b border-slate-50">
                                    <td class="py-2 text-slate-400 font-bold w-20 uppercase tracking-tighter">세부모델</td>
                                    <td class="py-2 text-slate-800 font-black">카니발 KA4 페리 (1.6 터보 하이브리드)</td>
                                </tr>
                                <tr class="border-b border-slate-50">
                                    <td class="py-2 text-slate-400 font-bold uppercase tracking-tighter">세부트림</td>
                                    <td class="py-2 text-blue-600 font-black">시그니처 9인승</td>
                                </tr>
                                <tr class="border-b border-slate-50">
                                    <td class="py-2 text-slate-400 font-bold uppercase tracking-tighter">주행거리</td>
                                    <td class="py-2 text-slate-800 font-black">${data.주행거리 || '83,200km'}</td>
                                </tr>
                            </table>

                            <div class="grid grid-cols-2 gap-x-6 gap-y-2 text-[11px] pt-1">
                                <div class="flex justify-between border-b border-slate-50 pb-1">
                                    <span class="text-slate-400 font-bold uppercase tracking-tighter">연식</span>
                                    <span class="text-slate-800 font-black">${data.연식 || '2024'}</span>
                                </div>
                                <div class="flex justify-between border-b border-slate-50 pb-1">
                                    <span class="text-slate-400 font-bold uppercase tracking-tighter">배기량</span>
                                    <span class="text-slate-800 font-black">1,598cc</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="border border-slate-200 rounded-sm overflow-hidden shadow-sm">
                        <div class="bg-slate-50 px-3 py-2 border-b border-slate-200">
                            <h3 class="text-[11px] font-black text-slate-800 font-black uppercase">2. 대여료 및 보증금 안내</h3>
                        </div>
                        <table class="w-full text-[11px] text-center">
                            <thead class="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold uppercase tracking-tighter">
                                <tr>
                                    <td class="py-2">계약기간</td>
                                    <td class="py-2">월 대여료</td>
                                    <td class="py-2 border-l border-slate-100">보증금</td>
                                </tr>
                            </thead>
                            <tbody class="text-slate-700 font-bold">
                                <tr class="border-b border-slate-50"><td class="py-2.5">24개월</td><td class="text-blue-600 font-black">1,050,000원</td><td class="border-l border-slate-50">400만원</td></tr>
                                <tr class="border-b border-slate-50 bg-blue-50/20 font-black"><td class="py-2.5">36개월</td><td class="text-blue-600 font-black">980,000원</td><td class="border-l border-slate-50">400만원</td></tr>
                                <tr class="border-b border-slate-50"><td class="py-2.5">48개월</td><td class="text-blue-600 font-black">920,000원</td><td class="border-l border-slate-50">400만원</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="border border-slate-200 rounded-sm overflow-hidden shadow-sm">
                        <div class="bg-slate-50 px-3 py-2 border-b border-slate-200">
                            <h3 class="text-[11px] font-black text-slate-800 font-black uppercase">3. 보험 보상 정보</h3>
                        </div>
                        <div class="p-3 space-y-2">
                            <div class="flex justify-between text-[11px] border-b border-slate-50 pb-1">
                                <span class="text-slate-400 font-bold tracking-tighter">대인/대물/자손</span>
                                <span class="text-slate-800 font-black italic">무한 / 1억 / 1억</span>
                            </div>
                            <div class="flex justify-between text-[11px]">
                                <span class="text-slate-400 font-bold tracking-tighter">면책금(건당)</span>
                                <span class="text-rose-600 font-black">국산차 30만원</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="h-[60px] px-2 flex items-center justify-between gap-1.5 border-t border-slate-200 bg-white flex-shrink-0">
                    <button onclick="window.openChat()" 
                            class="flex-1 h-[40px] bg-blue-600 text-white rounded-sm flex flex-col items-center justify-center gap-0.5 hover:bg-blue-700 transition-colors shadow-sm">
                        <i data-lucide="message-circle" class="w-3.5 h-3.5"></i>
                        <span class="text-[9px] font-black uppercase tracking-tighter">문의하기</span>
                    </button>
                    
                    <button onclick="alert('링크복사')" class="flex-1 h-[40px] bg-white border border-slate-200 text-slate-500 rounded-sm flex flex-col items-center justify-center gap-0.5 hover:bg-slate-50">
                        <i data-lucide="share-2" class="w-3.5 h-3.5"></i>
                        <span class="text-[9px] font-black uppercase tracking-tighter">링크복사</span>
                    </button>
                    
                    <button onclick="alert('텍스트복사')" class="flex-1 h-[40px] bg-[#1e293b] text-white rounded-sm flex flex-col items-center justify-center gap-0.5 hover:bg-slate-800">
                        <i data-lucide="copy" class="w-3.5 h-3.5"></i>
                        <span class="text-[9px] font-black uppercase tracking-tighter">텍스트복사</span>
                    </button>
                </div>
            </div>
        `;
    }
};
