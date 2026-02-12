import { Config } from '../js/config.js';

export const DetailView = {
    render(data) {
        const cfg = Config.detail;
        return `
            <div class="flex flex-col h-full bg-white font-sans overflow-hidden">
                <div class="h-[45px] px-4 border-b border-slate-200 flex items-center justify-between flex-shrink-0">
                    <span class="text-[12px] font-black text-slate-800 uppercase tracking-tighter">상품 상세 정보</span>
                    <button onclick="window.closeDetail()"><i data-lucide="x" class="w-5 h-5 text-slate-400"></i></button>
                </div>

                <div class="flex-1 overflow-auto p-4 space-y-6">
                    <div class="border border-slate-200 rounded-sm shadow-sm">
                        <div class="bg-slate-50 px-3 py-2 border-b border-slate-200 font-black text-[11px] text-slate-600">${cfg.s1.title}</div>
                        <div class="p-3 font-black">
                            <h4 class="text-[14px] text-blue-700 mb-2">${data.차량_번호 || '차량번호'} ${data.모델명 || ''}</h4>
                            <table class="w-full text-[11px]">
                                ${cfg.s1.labels.map(label => `
                                    <tr class="border-b border-slate-50">
                                        <td class="py-2 text-slate-400 w-24">${label}</td>
                                        <td class="py-2 text-slate-800 tracking-tight">---</td> 
                                    </tr>
                                `).join('')}
                            </table>
                        </div>
                    </div>

                    <div class="border-2 border-blue-100 rounded-sm overflow-hidden font-black">
                        <div class="bg-blue-50 px-3 py-2 border-b border-blue-100 flex justify-between items-center text-blue-800 text-[11px]">
                            <span>${cfg.s5.title}</span>
                            <div class="flex items-center gap-1">
                                <span class="text-[9px] uppercase">${cfg.s5.btnLabel}</span>
                                <input type="checkbox" checked class="w-3.5 h-3.5 accent-blue-600">
                            </div>
                        </div>
                        <div class="p-3 text-[11px] tracking-tighter bg-white">
                             계좌 정보를 불러오는 중...
                        </div>
                    </div>
                </div>

                <div class="h-[60px] px-2 flex items-center justify-between gap-1.5 border-t border-slate-200 bg-white">
                    <button onclick="window.toggleChat()" class="flex-1 h-[40px] bg-blue-600 text-white rounded-sm font-black text-[9px] uppercase">문의하기</button>
                    <button class="flex-1 h-[40px] bg-white border border-slate-200 text-slate-500 font-black text-[9px] rounded-sm uppercase">링크복사</button>
                    <button class="flex-1 h-[40px] bg-[#1e293b] text-white font-black text-[9px] rounded-sm uppercase">텍스트복사</button>
                </div>
            </div>
        `;
    }
};
