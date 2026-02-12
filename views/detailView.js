export const DetailView = {
    render(data, manager) {
        return `
            <div class="flex flex-col h-full bg-white font-sans">
                <div class="h-[45px] px-4 border-b border-slate-200 flex items-center justify-between flex-shrink-0 bg-white z-10">
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
                        <div class="bg-slate-50 px-3 py-2 border-b border-slate-200">
                            <h3 class="text-[11px] font-black text-slate-800">1. 차량 상세 제원</h3>
                        </div>
                        <div class="p-3">
                            <div class="flex items-center justify-between mb-4">
                                <h4 class="text-[14px] font-black text-blue-700">${data.차량_번호 || '456나7890'} <span class="text-slate-800 ml-1">${data.모델명 || '기아 카니발'}</span> <span class="text-slate-400 font-medium text-[11px]">가솔린 하이브리드</span></h4>
                                <div class="flex gap-1">
                                    <span class="bg-blue-600 text-white text-[9px] px-1.5 py-0.5 font-bold">신차</span>
                                    <span class="bg-rose-50 text-rose-500 border border-rose-100 text-[9px] px-1.5 py-0.5 font-bold uppercase">출고불가</span>
                                </div>
                            </div>
                            <table class="w-full text-[11px] text-slate-700">
                                <tr class="border-b border-slate-50"><td class="py-2 text-slate-400 font-bold w-20">세부모델</td><td class="py-2 font-black">카니발 KA4 페리</td></tr>
                                <tr class="border-b border-slate-50"><td class="py-2 text-slate-400 font-bold">세부트림</td><td class="py-2 text-blue-600 font-black">1.6 터보 하이브리드 9인승</td></tr>
                                <tr class="border-b border-slate-50"><td class="py-2 text-slate-400 font-bold">선택옵션</td><td class="py-2 font-bold">스타일, 컴포트</td></tr>
                                <tr><td class="py-2 text-slate-400 font-bold">외부/내부</td><td class="py-2 font-bold">아스트라 블루 / 코튼 베이지</td></tr>
                            </table>
                            <div class="grid grid-cols-2 gap-x-8 gap-y-2 text-[11px] mt-2 border-t border-slate-50 pt-3">
                                <div class="flex justify-between"> <span class="text-slate-400 font-bold">주행거리</span> <span class="text-blue-700 font-black">83,200km</span> </div>
                                <div class="flex justify-between"> <span class="text-slate-400 font-bold">배기량</span> <span class="text-slate-800 font-black">1,598cc</span> </div>
                                <div class="flex justify-between"> <span class="text-slate-400 font-bold">최초등록일</span> <span class="text-slate-800 font-black">26-01-20</span> </div>
                                <div class="flex justify-between"> <span class="text-slate-400 font-bold">차량만료일</span> <span class="text-rose-600 font-black">31-01-19</span> </div>
                            </div>
                        </div>
                    </div>

                    <div class="border border-slate-200 rounded-sm overflow-hidden shadow-sm">
                        <div class="bg-slate-50 px-3 py-2 border-b border-slate-200">
                            <h3 class="text-[11px] font-black text-slate-800">2. 대여료 및 보증금 안내</h3>
                        </div>
                        <table class="w-full text-[11px] text-center">
                            <thead class="bg-slate-50/50 border-b border-slate-100 text-slate-400 font-bold">
                                <tr><td class="py-2">계약기간</td><td class="py-2">월 대여료</td><td class="py-2 pr-3 text-right">보증금</td></tr>
                            </thead>
                            <tbody class="text-slate-700 font-bold">
                                <tr class="border-b border-slate-50"><td class="py-2.5">24개월</td><td class="text-blue-600 font-black">1,050,000원</td><td class="pr-3 text-right font-black">4,000,000원</td></tr>
                                <tr class="border-b border-slate-50"><td class="py-2.5">36개월</td><td class="text-blue-600 font-black">980,000원</td><td class="pr-3 text-right font-black">4,000,000원</td></tr>
                                <tr><td class="py-2.5">48개월</td><td class="text-blue-600 font-black">920,000원</td><td class="pr-3 text-right font-black">4,000,000원</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="border border-slate-200 rounded-sm overflow-hidden shadow-sm">
                        <div class="bg-slate-50 px-3 py-2 border-b border-slate-200">
                            <h3 class="text-[11px] font-black text-slate-800">3. 보험 보상 및 공통 면책 조건</h3>
                        </div>
                        <table class="w-full text-[11px]">
                            <thead class="bg-slate-50/50 border-b border-slate-100 text-slate-400 font-bold">
                                <tr><td class="py-2 pl-3">보상 항목</td><td class="py-2 text-center">보상 한도</td><td class="py-2 pr-3 text-right">면책금</td></tr>
                            </thead>
                            <tbody class="text-slate-700 font-bold">
                                <tr class="border-b border-slate-50"><td class="py-2 pl-3">대인 배상</td><td class="text-center">무한</td><td class="pr-3 text-right text-blue-600">30만원</td></tr>
                                <tr class="border-b border-slate-50"><td class="py-2 pl-3">대물 배상</td><td class="text-center">1억</td><td class="pr-3 text-right text-blue-600">30만원</td></tr>
                                <tr><td class="py-2 pl-3">자기신체(자손)</td><td class="text-center">1억</td><td class="pr-3 text-right text-blue-600">30만원</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="border border-slate-200 rounded-sm overflow-hidden shadow-sm">
                        <div class="bg-slate-50 px-3 py-2 border-b border-slate-200">
                            <h3 class="text-[11px] font-black text-slate-800">4. 계약 정책 및 연령/거리 옵션</h3>
                        </div>
                        <div class="p-3 space-y-2.5 text-[11px] font-bold">
                            <div class="flex justify-between border-b border-slate-50 pb-2">
                                <span class="text-slate-400">기본연령 <span class="text-slate-800 ml-2">만 26세</span></span>
                                <span class="text-slate-400">약정거리 <span class="text-slate-800 ml-2">연 2만km</span></span>
                            </div>
                            <div class="flex justify-between"> <span class="text-slate-700 font-black">만 21세 연령 하향</span> <span class="text-blue-600">+55,000원 / 월</span> </div>
                            <div class="flex justify-between"> <span class="text-slate-700 font-black">만 23세 연령 하향</span> <span class="text-blue-600">+35,000원 / 월</span> </div>
                            <div class="flex justify-between border-t border-slate-50 pt-2"> <span class="text-slate-700 font-black">연간 1만km 거리 추가</span> <span class="text-blue-600">+50,000원 / 월</span> </div>
                        </div>
                    </div>

                    <div class="border-2 border-blue-100 rounded-sm overflow-hidden shadow-md">
                        <div class="bg-blue-50 px-3 py-2 border-b border-blue-100 flex justify-between items-center">
                            <h3 class="text-[11px] font-black text-blue-800 uppercase">5. 담당자 및 입금 계좌 안내</h3>
                            <div class="flex items-center gap-1">
                                <input type="checkbox" id="save-manager" checked class="w-3.5 h-3.5 accent-blue-600">
                                <label for="save-manager" class="text-[9px] text-blue-700 font-bold">담당자 정보 저장하기</label>
                            </div>
                        </div>
                        <div class="p-3 space-y-2.5 bg-white">
                            <div class="flex gap-2">
                                <input type="text" value="${manager.company}" class="flex-1 border border-slate-200 rounded-sm px-3 py-2 text-[11px] font-bold outline-none focus:border-blue-400">
                                <input type="text" value="${manager.nameTitle}" class="w-[120px] border border-slate-200 rounded-sm px-3 py-2 text-[11px] font-bold outline-none focus:border-blue-400">
                            </div>
                            <input type="text" value="${manager.phone}" class="w-full border border-slate-200 rounded-sm px-3 py-2 text-[11px] font-bold outline-none focus:border-blue-400 text-blue-700">
                            <div class="flex items-center gap-2 pt-1">
                                <div class="flex-1 bg-slate-50 border border-slate-100 p-2.5 rounded-sm">
                                    <p class="text-[8px] text-slate-400 font-bold mb-1 uppercase tracking-tighter">입금계좌 (클릭 시 복사)</p>
                                    <p class="text-[11px] font-black text-slate-700 uppercase tracking-tighter">하나 123-456789-12345</p>
                                </div>
                                <div class="flex flex-col items-center gap-1 pr-1">
                                    <span class="text-[8px] text-slate-400 font-black tracking-tighter uppercase whitespace-nowrap">계좌 포함</span>
                                    <input type="checkbox" class="w-4 h-4 accent-blue-600">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="h-[60px] px-2 flex items-center justify-between gap-1.5 border-t border-slate-200 bg-white flex-shrink-0 z-10">
                    <button onclick="window.openChat()" 
                            class="flex-1 h-[40px] bg-blue-600 text-white rounded-sm flex flex-col items-center justify-center gap-0.5 hover:bg-blue-700 transition-colors shadow-sm">
                        <i data-lucide="message-circle" class="w-3.5 h-3.5"></i>
                        <span class="text-[9px] font-black uppercase tracking-tighter">문의하기</span>
                    </button>
                    
                    <button onclick="alert('링크가 복사되었습니다')" class="flex-1 h-[40px] bg-white border border-slate-200 text-slate-500 rounded-sm flex flex-col items-center justify-center gap-0.5 hover:bg-slate-50 transition-colors">
                        <i data-lucide="share-2" class="w-3.5 h-3.5"></i>
                        <span class="text-[9px] font-black uppercase tracking-tighter">링크복사</span>
                    </button>
                    
                    <button onclick="alert('데이터가 저장되었습니다')" class="flex-1 h-[40px] bg-[#1e293b] text-white rounded-sm flex flex-col items-center justify-center gap-0.5 hover:bg-slate-800 transition-colors">
                        <i data-lucide="copy" class="w-3.5 h-3.5"></i>
                        <span class="text-[9px] font-black uppercase tracking-tighter">텍스트복사</span>
                    </button>
                </div>
            </div>
        `;
    }
};
