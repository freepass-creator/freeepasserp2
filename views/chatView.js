export const ChatView = {
    render(car) {
        return `
            <div class="flex flex-col h-full bg-white border-r border-slate-200 shadow-2xl">
                <div class="h-[45px] flex items-center px-4 border-b border-slate-100 bg-slate-50 justify-between">
                    <div class="flex items-center gap-2">
                        <div class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span class="font-black text-[11px] text-slate-800">${car.id} 문의 상담</span>
                    </div>
                    <button onclick="closeChat()" class="text-slate-400 hover:text-slate-600"><i data-lucide="minus" class="w-4 h-4"></i></button>
                </div>
                
                <div class="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f1f3f6] hide-scrollbar text-[11px]">
                    <div class="flex flex-col gap-1 max-w-[80%]">
                        <span class="text-[9px] text-slate-400 font-bold px-1">시스템 알림</span>
                        <div class="bg-white p-3 rounded-lg rounded-tl-none border border-slate-200 shadow-sm leading-relaxed text-slate-700">
                            안녕하세요! 선택하신 <b>${car.모델}</b> 차량에 대해 궁금하신 점을 남겨주시면 담당자가 즉시 답변해 드립니다.
                        </div>
                    </div>
                </div>

                <div class="p-3 border-t bg-white flex gap-2">
                    <input type="text" placeholder="메시지를 입력하세요..." class="flex-1 bg-slate-50 border-none outline-none px-3 text-[11px] rounded-md">
                    <button class="bg-blue-600 text-white px-4 py-2 rounded-md font-bold text-[11px]">전송</button>
                </div>
            </div>
        `;
    }
};
