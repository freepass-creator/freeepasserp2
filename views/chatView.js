export const ChatView = {
    render(car) {
        return `
            <div class="flex flex-col h-full bg-white border-r border-slate-200">
                <div class="h-[45px] flex items-center px-4 border-b border-slate-100 bg-slate-50 justify-between flex-shrink-0">
                    <div class="flex items-center gap-2">
                        <span class="font-black text-[11px] text-slate-800 uppercase">${car.id} 상담</span>
                    </div>
                    <button onclick="closeChat()" class="flex items-center justify-center w-8 h-8 hover:bg-slate-200 rounded-md transition-colors text-slate-500">
                        <span class="text-[14px] font-black">>></span>
                    </button>
                </div>
                
                <div class="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f1f3f6] hide-scrollbar text-[11px]">
                    <div class="bg-white p-3 rounded-lg border border-slate-200 shadow-sm text-slate-700">
                        <b>${car.모델}</b> 관련 문의를 남겨주세요.
                    </div>
                </div>

                <div class="p-3 border-t bg-white flex gap-2">
                    <input type="text" placeholder="메시지 입력..." class="flex-1 bg-slate-50 border border-slate-100 outline-none px-3 text-[11px] rounded">
                    <button class="bg-blue-600 text-white px-3 py-1 rounded font-bold text-[11px]">전송</button>
                </div>
            </div>
        `;
    }
};
