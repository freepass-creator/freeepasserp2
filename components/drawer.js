// components/drawer.js 전체 덮어쓰기
export const Drawer = {
    render(car) {
        const container = document.getElementById('right-drawer');
        if (!car) return;

        container.innerHTML = `
            <div class="h-[56px] border-b border-slate-200 flex items-center justify-between px-6 bg-white sticky top-0 z-10">
                <div class="flex items-center gap-2">
                    <span class="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase">${car.상태}</span>
                    <h3 class="text-[16px] font-bold text-slate-800">${car.id}</h3>
                </div>
                <button onclick="closeDrawer()" class="p-2 hover:bg-slate-100 rounded-full transition-all">
                    <i data-lucide="x" class="w-5 h-5 text-slate-400"></i>
                </button>
            </div>

            <div class="flex-1 overflow-y-auto bg-slate-50 hide-scrollbar">
                <div class="p-6 space-y-4">
                    <div class="bg-white p-5 rounded-[8px] border border-slate-200 shadow-sm space-y-3">
                        <div>
                            <p class="text-[11px] text-slate-400 font-bold uppercase mb-1">${car.제조사} · ${car.연도}년식</p>
                            <h2 class="text-[18px] font-bold text-slate-900 leading-tight">${car.모델}</h2>
                            <p class="text-[13px] text-blue-600 font-medium mt-1">${car.세부모델}</p>
                        </div>
                        <div class="grid grid-cols-2 gap-4 pt-3 border-t border-slate-50">
                            <div>
                                <p class="text-[10px] text-slate-400">주행거리</p>
                                <p class="text-[13px] font-bold text-slate-700">${Number(car.주행거리).toLocaleString()} km</p>
                            </div>
                            <div>
                                <p class="text-[10px] text-slate-400">연료/색상</p>
                                <p class="text-[13px] font-bold text-slate-700">${car.연료} / ${car.외부색상}</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white p-5 rounded-[8px] border border-slate-200 shadow-sm flex justify-between items-center">
                        <div>
                            <p class="text-[10px] text-slate-400">월 대여료 (36개월)</p>
                            <p class="text-[18px] font-black text-blue-600">₩${Number(car.대여료).toLocaleString()}</p>
                        </div>
                        <div class="text-right border-l pl-5">
                            <p class="text-[10px] text-slate-400">보증금</p>
                            <p class="text-[14px] font-bold text-slate-700">₩${Number(car.보증금).toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                <div class="px-6 pb-6">
                    <p class="text-[11px] font-bold text-slate-500 mb-2 px-1">문의 메시지</p>
                    <div class="bg-slate-100/50 border border-slate-200 rounded-[8px] h-[300px] flex flex-col">
                        <div class="flex-1 p-4 space-y-3 overflow-y-auto text-[11px]">
                            <div class="bg-white p-3 rounded-[6px] shadow-sm border border-slate-200 max-w-[80%]">
                                안녕하세요, 해당 차량 바로 배차 가능한가요?
                            </div>
                        </div>
                        <div class="p-3 bg-white border-t border-slate-200 rounded-b-[8px] flex gap-2">
                            <input type="text" placeholder="답변을 입력하세요..." class="flex-1 bg-slate-50 border-none outline-none px-2 text-[11px]">
                            <button class="bg-blue-600 text-white px-3 py-1 rounded-[4px] font-bold">전송</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        if (window.lucide) lucide.createIcons();
    }
};
