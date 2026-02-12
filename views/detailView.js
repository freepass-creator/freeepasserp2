export const DetailView = {
    render(data, manager) {
        return `
            <div class="flex flex-col h-full bg-white">
                <div class="h-[45px] px-4 border-b border-slate-100 flex items-center justify-between flex-shrink-0">
                    <span class="text-[11px] font-black text-slate-800 uppercase tracking-tighter">Detail / ${data.차량_번호}</span>
                    <button onclick="UI.closeDetail()" class="text-slate-400 hover:text-slate-600"><i data-lucide="x" class="w-4 h-4"></i></button>
                </div>

                <div class="flex-1 overflow-auto p-5 space-y-6">
                    <div>
                        <h3 class="text-[13px] font-black text-slate-900 mb-3">${data.모델명}</h3>
                        <div class="grid grid-cols-2 gap-4 text-[11px]">
                            <div class="space-y-2">
                                <p class="text-slate-400 uppercase">연식</p>
                                <p class="font-bold text-slate-700">${data.연식 || '-'}</p>
                            </div>
                            <div class="space-y-2">
                                <p class="text-slate-400 uppercase">주행거리</p>
                                <p class="font-bold text-slate-700">${data.주행거리 || '-'}</p>
                            </div>
                        </div>
                    </div>
                    <div class="p-4 bg-slate-50 border border-slate-100 rounded-sm">
                        <p class="text-[10px] text-slate-400 uppercase mb-1">담당자 정보</p>
                        <p class="text-[12px] font-bold text-slate-800">${manager.company} ${manager.nameTitle}</p>
                        <p class="text-[11px] text-blue-600 font-bold mt-1">${manager.phone}</p>
                    </div>
                </div>

                <div class="h-[60px] px-2 flex items-center justify-between gap-1.5 border-t border-slate-100 bg-white flex-shrink-0">
                    <button onclick="window.openChat()" 
                            class="flex-1 h-[40px] bg-blue-600 text-white rounded-sm flex flex-col items-center justify-center gap-0.5 hover:bg-blue-700 transition-colors">
                        <i data-lucide="message-circle" class="w-3.5 h-3.5"></i>
                        <span class="text-[9px] font-black tracking-tighter uppercase">문의하기</span>
                    </button>
                    
                    <button onclick="alert('링크가 복사되었습니다')"
                            class="flex-1 h-[40px] bg-white border border-slate-200 text-slate-500 rounded-sm flex flex-col items-center justify-center gap-0.5 hover:bg-slate-50 transition-colors">
                        <i data-lucide="share-2" class="w-3.5 h-3.5"></i>
                        <span class="text-[9px] font-black tracking-tighter uppercase">링크복사</span>
                    </button>
                    
                    <button onclick="alert('텍스트가 복사되었습니다')"
                            class="flex-1 h-[40px] bg-[#1e293b] text-white rounded-sm flex flex-col items-center justify-center gap-0.5 hover:bg-slate-800 transition-colors">
                        <i data-lucide="copy" class="w-3.5 h-3.5"></i>
                        <span class="text-[9px] font-black tracking-tighter uppercase">텍스트복사</span>
                    </button>
                </div>
            </div>
        `;
    }
};
