export const DetailView = {
    render(data, manager) {
        // 복사용 텍스트 미리 정의
        const copyText = `[차량정보]
모델명: ${data.모델명}
차량번호: ${data.차량_번호}
연식: ${data.연식} / 주행: ${data.주행거리}
대여료: 월 ${data.대여료} / 보증금: ${data.보증금}
보험조건: ${data.보험조건 || '만 26세 이상'}
담당: ${manager.company} ${manager.nameTitle} (${manager.phone})`;

        return `
            <div class="flex flex-col h-full bg-white shadow-2xl">
                <div class="h-[45px] px-4 border-b border-slate-100 flex items-center justify-between flex-shrink-0">
                    <div class="flex items-center gap-2">
                        <div class="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                        <span class="text-[11px] font-black text-slate-800 uppercase tracking-tighter">Vehicle Detail</span>
                    </div>
                    <button onclick="UI.closeDetail()" class="text-slate-400 hover:text-slate-600 transition-colors">
                        <i data-lucide="x" class="w-4 h-4"></i>
                    </button>
                </div>

                <div class="flex-1 overflow-auto bg-white">
                    <div class="w-full h-48 bg-slate-100 flex items-center justify-center border-b border-slate-50 relative overflow-hidden">
                        <i data-lucide="car" class="w-12 h-12 text-slate-300 opacity-20"></i>
                        <div class="absolute bottom-3 left-3 bg-black/60 text-white px-2 py-1 rounded text-[9px] font-bold">PHOTO 01</div>
                    </div>

                    <div class="p-5 space-y-6">
                        <div class="space-y-1">
                            <div class="flex items-center gap-2">
                                <span class="bg-blue-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded tracking-tighter uppercase">Available</span>
                                <span class="text-slate-400 text-[10px] font-bold tracking-tight">${data.차량_번호}</span>
                            </div>
                            <h3 class="text-[15px] font-black text-slate-900 tracking-tight leading-tight">${data.모델명}</h3>
                        </div>

                        <div class="grid grid-cols-2 gap-y-5 border-y border-slate-50 py-5">
                            <div class="space-y-1">
                                <p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">연식</p>
                                <p class="text-[12px] font-black text-slate-800">${data.연식 || '2024년형'}</p>
                            </div>
                            <div class="space-y-1">
                                <p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">주행거리</p>
                                <p class="text-[12px] font-black text-slate-800">${data.주행거리 || '0km'}</p>
                            </div>
                            <div class="space-y-1">
                                <p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">대여료</p>
                                <p class="text-[12px] font-black text-blue-600">${data.대여료 || '상담'}</p>
                            </div>
                            <div class="space-y-1">
                                <p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">보증금</p>
                                <p class="text-[12px] font-black text-slate-800">${data.보증금 || '0원'}</p>
                            </div>
                        </div>

                        <div class="space-y-3">
                            <h4 class="text-[11px] font-black text-slate-800 uppercase border-l-2 border-blue-600 pl-2">Options & Info</h4>
                            <div class="space-y-2">
                                <div class="flex justify-between text-[11px] border-b border-slate-50 pb-2">
                                    <span class="text-slate-400 font-bold">보험 조건</span>
                                    <span class="text-slate-700 font-bold">${data.보험조건 || '만 26세 이상'}</span>
                                </div>
                                <div class="flex justify-between text-[11px] border-b border-slate-50 pb-2">
                                    <span class="text-slate-400 font-bold">연료 타입</span>
                                    <span class="text-slate-700 font-bold">휘발유 (가솔린)</span>
                                </div>
                                <div class="flex justify-between text-[11px] border-b border-slate-50 pb-2">
                                    <span class="text-slate-400 font-bold">차량 위치</span>
                                    <span class="text-slate-700 font-bold">서울 본사 전시장</span>
                                </div>
                            </div>
                        </div>

                        <div class="p-4 bg-slate-50 rounded-sm border border-slate-100 space-y-2">
                            <p class="text-[9px] text-slate-400 font-black uppercase tracking-widest">Support Manager</p>
                            <div class="flex items-center justify-between">
                                <div class="space-y-0.5">
                                    <p class="text-[12.5px] font-black text-slate-800">${manager.nameTitle}</p>
                                    <p class="text-[10px] text-slate-500 font-bold">${manager.company}</p>
                                </div>
                                <a href="tel:${manager.phone}" class="w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center text-blue-600 shadow-sm">
                                    <i data-lucide="phone" class="w-3.5 h-3.5"></i>
                                </a>
                            </div>
                            <p class="text-[12px] font-black text-blue-600 tracking-tighter pt-1">${manager.phone}</p>
                        </div>
                    </div>
                </div>

                <div class="h-[60px] px-2 flex items-center justify-between gap-1.5 border-t border-slate-100 bg-white flex-shrink-0">
                    <button onclick="window.openChat()" 
                            class="flex-[1.5] h-[40px] bg-blue-600 text-white rounded-sm flex flex-col items-center justify-center gap-0.5 hover:bg-blue-700 transition-colors shadow-sm">
                        <i data-lucide="message-circle" class="w-3.5 h-3.5"></i>
                        <span class="text-[9px] font-black tracking-tighter uppercase">문의하기</span>
                    </button>
                    
                    <button onclick="navigator.clipboard.writeText(window.location.href); alert('링크가 복사되었습니다');"
                            class="flex-1 h-[40px] bg-white border border-slate-200 text-slate-500 rounded-sm flex flex-col items-center justify-center gap-0.5 hover:bg-slate-50 transition-colors">
                        <i data-lucide="share-2" class="w-3.5 h-3.5"></i>
                        <span class="text-[9px] font-black tracking-tighter uppercase">링크복사</span>
                    </button>
                    
                    <button onclick="navigator.clipboard.writeText(\`${copyText}\`); alert('상세 정보가 복사되었습니다');"
                            class="flex-1 h-[40px] bg-[#1e293b] text-white rounded-sm flex flex-col items-center justify-center gap-0.5 hover:bg-slate-800 transition-colors">
                        <i data-lucide="copy" class="w-3.5 h-3.5"></i>
                        <span class="text-[9px] font-black tracking-tighter uppercase">텍스트복사</span>
                    </button>
                </div>
            </div>
        `;
    }
};
