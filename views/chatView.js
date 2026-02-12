export const ChatView = {
    render(data) {
        // 제목: 차량번호 세부모델
        const chatTitle = `${data.차량_번호 || ''} ${data.세부모델 || ''}`.trim() || '차량 상담';

        return `
            <div class="flex flex-col h-full bg-white font-sans">
                <div class="h-[45px] px-4 border-b border-slate-200 flex items-center justify-between flex-shrink-0 bg-white">
                    <span class="text-[11px] font-black text-slate-800 uppercase tracking-tighter">${chatTitle}</span>
                    <button onclick="window.toggleChat()" class="text-slate-400 hover:text-slate-600 transition-colors">
                        <i data-lucide="chevron-right" class="w-6 h-6"></i>
                    </button>
                </div>

                <div class="flex-1 overflow-auto p-4 bg-[#f8fafc] space-y-4">
                    <div class="flex flex-col gap-1.5">
                        <div class="bg-white border border-slate-200 rounded-lg rounded-tl-none p-3 shadow-sm max-w-[90%]">
                            <p class="text-[11.5px] text-slate-700 leading-relaxed font-bold">
                                안녕하세요! 해당 차량에 대해 궁금하신 점이 있으신가요? <br>
                                지금부터 담당직원과 실시간 상담이 가능합니다. 편하게 말씀해 주세요.
                            </p>
                        </div>
                        <span class="text-[9px] text-slate-400 ml-1 font-black uppercase">담당직원</span>
                    </div>
                </div>

                <div class="h-[60px] px-3 flex items-center border-t border-slate-200 bg-white flex-shrink-0">
                    <div class="flex-1 relative flex items-center">
                        <input type="text" placeholder="담당직원에게 메시지 보내기..." 
                               class="w-full h-[40px] bg-slate-50 border border-slate-200 rounded-full px-4 text-[12px] outline-none focus:border-blue-400 transition-all">
                        <button class="absolute right-1 w-[32px] h-[32px] bg-blue-600 text-white rounded-full flex items-center justify-center">
                            <i data-lucide="send" class="w-3.5 h-3.5"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
};
