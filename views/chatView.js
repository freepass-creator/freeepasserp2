export const ChatView = {
    render(car) {
        if (!car) return `<div class="p-4 text-slate-400 text-[11px]">차량 정보가 없습니다.</div>`;

        return `
            <div class="flex flex-col h-full bg-white border-r border-slate-200 shadow-2xl">
                <div class="h-[45px] flex items-center px-4 border-b border-slate-100 bg-slate-50 justify-between flex-shrink-0">
                    <div class="flex flex-col">
                        <span class="font-black text-[11px] text-blue-600 leading-none mb-0.5">${car.차량_번호}</span>
                        <span class="font-bold text-[10px] text-slate-800 tracking-tighter">${car.차량_제조사} ${car.차량_모델명} 상담</span>
                    </div>
                    <button onclick="closeChat()" class="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-colors">
                        <i data-lucide="chevron-right" class="w-5 h-5"></i>
                    </button>
                </div>

                <div class="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f1f3f6] hide-scrollbar text-[11px]">
                    <div class="flex flex-col gap-1.5 max-w-[85%] animate-drawer-reset">
                        <div class="flex items-center gap-1.5 mb-0.5">
                            <span class="text-[9px] font-black text-slate-500 uppercase tracking-widest">Assistant</span>
                        </div>
                        <div class="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm text-slate-700 leading-relaxed font-medium">
                            안녕하세요! 선택하신 <b class="text-blue-600">${car.차량_모델명}</b> 차량에 대해 궁금하신 점을 남겨주시면 담당 팀장이 확인 후 즉시 답변해 드리겠습니다.
                        </div>
                        <span class="text-[8px] text-slate-400 font-bold ml-1">방금 전</span>
                    </div>
                </div>

                <div class="p-3 border-t bg-white flex items-center gap-2 flex-shrink-0">
                    <div class="flex-1 relative">
                        <input type="text" placeholder="문의 사항을 입력하세요..." 
                               class="w-full bg-slate-100 border-none px-4 py-2.5 text-[11px] rounded-full outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium">
                    </div>
                    <button class="bg-blue-600 text-white w-9 h-9 rounded-full flex items-center justify-center shadow-lg shadow-blue-100 active:scale-90 transition-transform">
                        <i data-lucide="send" class="w-4 h-4"></i>
                    </button>
                </div>
            </div>
        `;
    }
};
