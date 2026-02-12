export const DetailView = {
    render(data, manager) {
        return `
            <div class="flex flex-col h-full bg-white font-sans">
                <div class="h-[45px] px-4 border-b border-slate-200 flex items-center justify-between flex-shrink-0 bg-white">
                    <div class="flex items-center gap-2">
                        <i data-lucide="car" class="w-4 h-4 text-slate-700"></i>
                        <span class="text-[12px] font-black text-slate-800 uppercase tracking-tighter">상품 상세 정보</span>
                    </div>
                    <button onclick="UI.closeDetail()" class="text-slate-400 hover:text-slate-600 transition-colors">
                        <i data-lucide="x" class="w-5 h-5"></i>
                    </button>
                </div>

                <div class="flex-1 overflow-auto p-4 space-y-5 bg-white">
                    
                    <div class="border border-slate-200 rounded-sm overflow-hidden shadow-sm">
                        <div class="bg-slate-50 px-3 py-2 border-b border-slate-200"><h3 class="text-[11px] font-black text-slate-800 uppercase">1. 차량 상세 제원</h3></div>
                        <div class="p-3">
                            <h4 class="text-[14px] font-black text-blue-700 mb-3">${data.차량_번호 || ''} <span class="text-slate-800 ml-1">${data.모델명 || ''}</span></h4>
                            <table class="w-full text-[11px] text-slate-700">
                                <tr class="border-b border-slate-50"><td class="py-2 text-slate-400 font-bold w-20 uppercase">세부모델</td><td class="py-2 font-black">${data.세부모델 || '-'}</td></tr>
                                <tr class="border-b border-slate-50"><td class="py-2 text-slate-400 font-bold uppercase">주행거리</td><td class="py-2 font-black">${data.주행거리 || '-'}</td></tr>
                                <tr><td class="py-2 text-slate-400 font-bold uppercase">연식</td><td class="py-2 font-black">${data.연식 || '-'}</td></tr>
                            </table>
                        </div>
                    </div>

                    <div class="border border-slate-200 rounded-sm overflow-hidden shadow-sm">
                        <div class="bg-slate-50 px-3 py-2 border-b border-slate-200"><h3 class="text-[11px] font-black text-slate-800 uppercase">2. 대여료 및 보증금 안내</h3></div>
                        <table class="w-full text-[11px] text-center font-bold">
                            <thead class="bg-slate-50 text-slate-400 uppercase"><tr><td class="py-2">계약기간</td><td class="py-2">월 대여료</td><td class="py-2">보증금</td></tr></thead>
                            <tbody class="text-slate-700 border-t border-slate-100">
                                <tr class="border-b border-slate-50"><td class="py-2.5">24개월</td><td class="text-blue-600 font-black">1,050,000원</td><td>400만원</td></tr>
                                <tr class="bg-blue-50/20"><td class="py-2.5">36개월</td><td class="text-blue-600 font-black">980,000원</td><td>400만원</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="border border-slate-200 rounded-sm overflow-hidden shadow-sm">
                        <div class="bg-slate-50 px-3 py-2 border-b border-slate-200"><h3 class="text-[11px] font-black text-slate-800 uppercase">3. 보험 보상 정보</h3></div>
                        <div class="p-3 space-y-2 text-[11px]">
                            <div class="flex justify-between border-b border-slate-50 pb-1"><span class="text-slate-400 font-bold">보상한도</span><span class="text-slate-800 font-black">대인 무한 / 대물 1억 / 자손 1억</span></div>
                            <div class="flex justify-between"><span class="text-slate-400 font-bold">면책금</span><span class="text-rose-600 font-black italic">사고 건당 30만원</span></div>
                        </div>
                    </div>

                    <div class="border border-slate-200 rounded-sm overflow-hidden shadow-sm">
                        <div class="bg-slate-50 px-3 py-2 border-b border-slate-200"><h3 class="text-[11px] font-black text-slate-800 uppercase">4. 연령 및 거리 옵션</h3></div>
                        <div class="p-3 text-[11px] font-black space-y-2">
                            <div class="flex justify-between"><span>만 21세 하향</span><span class="text-blue-600">+55,000원</span></div>
                            <div class="flex justify-between"><span>약정거리 1만km 추가</span><span class="text-blue-600">+50,000원</span></div>
                        </div>
                    </div>

                    <div class="border-2 border-blue-100 rounded-sm overflow-hidden shadow-md">
                        <div class="bg-blue-50 px-3 py-2 border-b border-blue-100 flex justify-between items-center">
                            <h3 class="text-[11px] font-black text-blue-800 uppercase">5. 담당자 및 입금 계좌</h3>
                            <input type="checkbox" checked class="w-3.5 h-3.5 accent-blue-600">
                        </div>
                        <div class="p-3 space-y-2 bg-white">
                            <div class="flex gap-2">
                                <input type="text" value="${manager.company}" class="flex-1 border border-slate-200 rounded-sm px-3 py-2 text-[11px] font-bold outline-none">
                                <input type="text" value="${manager.nameTitle}" class="w-[120px] border border-slate-200 rounded-sm px-3 py-2 text-[11px] font-bold outline-none">
                            </div>
                            <input type="text" value="${manager.phone}" class="w-full border border-slate-200 rounded-sm px-3 py-2 text-[11px] font-bold outline-none text-blue-700">
                            <div class="bg-slate-50 border border-slate-100 p-2 text-[11px] font-black tracking-tight uppercase">하나 123-456789-12345</div>
                        </div>
                    </div>
                </div>

                <div class="h-[60px] px-2 flex items-center justify-between gap-1.5 border-t border-slate-200 bg-white flex-shrink-0">
                    <button onclick="window.toggleChat()" 
                            class="flex-1 h-[40px] bg-blue-600 text-white rounded-sm flex flex-col items-center justify-center gap-0.5 hover:bg-blue-700 shadow-sm font-black">
                        <i data-lucide="message-circle" class="w-3.5 h-3.5"></i>
                        <span class="text-[9px] uppercase tracking-tighter">문의하기</span>
                    </button>
                    
                    <button onclick="alert('링크복사')" class="flex-1 h-[40px] bg-white border border-slate-200 text-slate-500 rounded-sm flex flex-col items-center justify-center gap-0.5 font-black hover:bg-slate-50 transition-colors">
                        <i data-lucide="share-2" class="w-3.5 h-3.5"></i>
                        <span class="text-[9px] uppercase tracking-tighter">링크복사</span>
                    </button>
                    
                    <button onclick="alert('텍스트복사')" class="flex-1 h-[40px] bg-[#1e293b] text-white rounded-sm flex flex-col items-center justify-center gap-0.5 font-black hover:bg-slate-800 transition-colors">
                        <i data-lucide="copy" class="w-3.5 h-3.5"></i>
                        <span class="text-[9px] uppercase tracking-tighter">텍스트복사</span>
                    </button>
                </div>
            </div>
        `;
    }
};
