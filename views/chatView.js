export const ChatView = {
    render(data) {
        return `
            <div class="flex flex-col h-full bg-white">
                <div class="h-[45px] px-4 border-b border-slate-100 flex items-center justify-between flex-shrink-0">
                    <span class="text-[11px] font-black text-slate-800 uppercase tracking-tighter">Chat / ${data.차량_번호}</span>
                    <button onclick="UI.closeChat()" class="text-slate-400 hover:text-slate-600"><i data-lucide="x" class="w-4 h-4"></i></button>
                </div>

                <div class="flex-1 overflow-auto p-4 bg-[#f8fafc] space-y-4">
                    <div class="flex flex-col gap-1">
                        <div class="bg-white border border-slate-200 rounded-lg rounded-tl-none p-3 shadow-sm max-w-[85%]">
                            <p class="text-[11.5px] text-slate-700 leading-relaxed font-medium">
                                안녕하세요. 해당 차량 담당 팀장을 담당 직원이 확인 후 답변해 드리겠습니다. 잠시만 기다려 주세요.
                            </p>
                        </div>
                        <span class="text-[9px] text-slate-400 ml-1 uppercase font-bold tracking-tight">System Message</span>
                    </div>
                </div>

                <div class="h-[60px] px-3 flex items-center border-t border-slate-100 bg-white flex-shrink-0">
                    <div class="flex-1 relative flex items-center">
                        <input type="text" placeholder="메시지를 입력하세요..." 
                               class="w-full h-[40px] bg-slate-50 border border-slate-200 rounded-full px-4 text-[12px] outline-none focus:border-blue-400 transition-all">
                        <button class="absolute right-1 w-[32px] h-[32px] bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-all">
                            <i data-lucide="send" class="w-3.5 h-3.5"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
};
