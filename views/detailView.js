import { AppData } from '../js/data.js';

export const DetailView = {
    render(data) {
        const mgr = AppData.manager;
        const policy = AppData.policy;

        return `
            <div class="flex flex-col h-full bg-white font-sans overflow-hidden">
                <div class="h-[45px] px-4 border-b border-slate-200 flex items-center justify-between flex-shrink-0 bg-white">
                    <div class="flex items-center gap-2">
                        <i data-lucide="car" class="w-4 h-4 text-slate-700"></i>
                        <span class="text-[12px] font-black text-slate-800 uppercase tracking-tighter font-black">상품 상세 정보</span>
                    </div>
                    <button onclick="window.closeDetail()" class="text-slate-400 hover:text-slate-600 transition-colors">
                        <i data-lucide="x" class="w-5 h-5"></i>
                    </button>
                </div>

                <div class="flex-1 overflow-auto p-4 space-y-5 bg-white">
                    
                    <div class="border border-slate-200 rounded-sm overflow-hidden shadow-sm">
                        <div class="bg-slate-50 px-3 py-2 border-b border-slate-200 font-black text-[11px]">1. 차량 상세 제원</div>
                        <div class="p-4 space-y-4">
                            <h4 class="text-[14px] font-black text-blue-700">${data.차량_번호} <span class="text-slate-800 ml-1 font-black">${data.모델명}</span></h4>
                            <table class="w-full text-[11px] text-slate-700 font-bold">
                                <tr class="border-b border-slate-50"><td class="py-2 text-slate-400 w-20 uppercase">세부모델</td><td class="py-2 font-black">${data.세부모델 || '-'}</td></tr>
                                <tr class="border-b border-slate-50"><td class="py-2 text-slate-400 uppercase">주행거리</td><td class="py-2 font-black">${data.주행거리}</td></tr>
                            </table>
                        </div>
                    </div>

                    <div class="border border-slate-200 rounded-sm overflow-hidden shadow-sm">
                        <div class="bg-slate-50 px-3 py-2 border-b border-slate-200 font-black text-[11px]">3. 보험 보상 정보</div>
                        <table class="w-full text-[11px] table-fixed font-bold">
                            <tbody class="text-slate-700">
                                ${policy.insurance.map(item => `
                                    <tr class="border-b border-slate-50">
                                        <td class="py-2.5 pl-3 text-slate-400">${item.item}</td>
                                        <td class="text-center font-black">${item.limit}</td>
                                        <td class="pr-3 text-right text-blue-600">${item.fee}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>

                    <div class="border-2 border-blue-100 rounded-sm overflow-hidden shadow-md">
                        <div class="bg-blue-50 px-3 py-2 border-b border-blue-100 font-black text-blue-800 text-[11px]">5. 담당자 및 입금 계좌</div>
                        <div class="p-3 space-y-2.5 bg-white font-black">
                            <div class="flex gap-2">
                                <input type="text" value="${mgr.company}" class="flex-1 border border-slate-200 rounded-sm px-3 py-2 text-[11px] outline-none">
                                <input type="text" value="${mgr.nameTitle}" class="w-[120px] border border-slate-200 rounded-sm px-3 py-2 text-[11px] outline-none">
                            </div>
                            <input type="text" value="${mgr.phone}" class="w-full border border-slate-200 rounded-sm px-3 py-2 text-[11px] outline-none text-blue-700">
                            <div class="bg-slate-50 border border-slate-100 p-2 text-[11px] tracking-tight uppercase">${mgr.account}</div>
                        </div>
                    </div>
                </div>

                <div class="h-[60px] px-2 flex items-center justify-between gap-1.5 border-t border-slate-200 bg-white flex-shrink-0">
                    <button onclick="window.toggleChat()" class="flex-1 h-[40px] bg-blue-600 text-white rounded-sm font-black text-[9px] uppercase tracking-tighter">문의하기</button>
                    <button class="flex-1 h-[40px] bg-white border border-slate-200 text-slate-500 font-black text-[9px] rounded-sm uppercase tracking-tighter">링크복사</button>
                    <button class="flex-1 h-[40px] bg-[#1e293b] text-white font-black text-[9px] rounded-sm uppercase tracking-tighter">텍스트복사</button>
                </div>
            </div>
        `;
    }
};
