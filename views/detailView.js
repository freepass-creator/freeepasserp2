import { DetailData } from '../data/detailData.js';

export const DetailView = {
    render(data) {
        const labels = DetailData; // 고정 제목들 불러오기

        return `
            <div class="flex flex-col h-full bg-white font-sans">
                <div class="h-[45px] px-4 border-b border-slate-200 flex items-center justify-between flex-shrink-0 bg-white">
                    <div class="flex items-center gap-2">
                        <i data-lucide="car" class="w-4 h-4 text-slate-700"></i>
                        <span class="text-[12px] font-black text-slate-800 uppercase tracking-tighter">상품 상세 정보</span>
                    </div>
                    <button onclick="window.closeDetail()"><i data-lucide="x" class="w-5 h-5 text-slate-400"></i></button>
                </div>

                <div class="flex-1 overflow-auto p-4 space-y-6">
                    
                    <div class="border border-slate-200 rounded-sm overflow-hidden shadow-sm">
                        <div class="bg-slate-50 px-3 py-2 border-b border-slate-200 font-black text-[11px] text-slate-600 tracking-tighter uppercase">1. 차량 상세 제원</div>
                        <div class="p-3 space-y-4 font-bold">
                            <h4 class="text-[14px] font-black text-blue-700">${data.차량_번호} <span class="text-slate-800 ml-1">${data.모델명}</span></h4>
                            <table class="w-full text-[11px]">
                                <tr class="border-b border-slate-50"><td class="py-2 text-slate-400 w-24">${labels.carInfoLabels.subModel}</td><td class="py-2 text-slate-800">${data.세부모델 || '-'}</td></tr>
                                <tr class="border-b border-slate-50"><td class="py-2 text-slate-400">${labels.carInfoLabels.trim}</td><td class="py-2 text-blue-600">${data.세부트림 || '-'}</td></tr>
                            </table>
                            </div>
                    </div>

                    <div class="border border-slate-200 rounded-sm overflow-hidden shadow-sm">
                        <div class="bg-slate-50 px-3 py-2 border-b border-slate-200 font-black text-[11px] text-slate-600">3. ${labels.insuranceLabels.header.join(' 및 ')}</div>
                        <table class="w-full text-[11px] table-fixed">
                            <thead class="bg-slate-50/50 text-slate-400 font-bold border-b border-slate-100">
                                <tr>${labels.insuranceLabels.header.map(h => `<td class="py-2 text-center">${h}</td>`).join('')}</tr>
                            </thead>
                            <tbody class="text-slate-800 font-black divide-y divide-slate-50">
                                ${labels.insuranceLabels.items.map(item => `
                                    <tr>
                                        <td class="py-2.5 pl-3 text-slate-400">${item.label}</td>
                                        <td class="text-center">데이터 필요</td>
                                        <td class="pr-3 text-right text-blue-600">데이터 필요</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>

                    <div class="border border-slate-200 rounded-sm overflow-hidden">
                        <div class="bg-slate-50 px-3 py-2 border-b border-slate-200 flex justify-between items-center font-black">
                            <h3 class="text-[11px] text-slate-600 uppercase">5. 담당자 및 입금 계좌 안내</h3>
                            <div class="flex items-center gap-1.5"><label class="text-[9px] text-blue-600">정보 저장</label><input type="checkbox" checked class="w-3.5 h-3.5 accent-blue-600"></div>
                        </div>
                        <div class="p-3 space-y-2 bg-white">
                            <div class="flex gap-2"><input type="text" placeholder="업체명" class="flex-1 border p-2 text-[11px] font-black outline-none"><input type="text" placeholder="이름" class="w-[100px] border p-2 text-[11px] font-black outline-none"></div>
                            <input type="text" placeholder="연락처" class="w-full border p-2 text-[11px] font-black text-blue-700 outline-none">
                            <div class="bg-slate-50 p-3 rounded-sm text-[11px] font-black flex justify-between items-center">
                                <span>하나 123-456789-12345</span>
                                <div class="flex items-center gap-1"><span class="text-[8px] text-slate-400">포함</span><input type="checkbox" class="w-3.5 h-3.5 accent-blue-600"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="h-[60px] px-2 flex items-center justify-between gap-1.5 border-t border-slate-200 bg-white">
                    <button onclick="window.toggleChat()" class="flex-1 h-[40px] bg-blue-600 text-white rounded-sm font-black text-[9px] uppercase tracking-tighter shadow-sm">문의하기</button>
                    <button class="flex-1 h-[40px] bg-white border border-slate-200 text-slate-500 font-black text-[9px] rounded-sm uppercase tracking-tighter">링크복사</button>
                    <button class="flex-1 h-[40px] bg-[#1e293b] text-white rounded-sm font-black text-[9px] uppercase tracking-tighter">텍스트복사</button>
                </div>
            </div>
        `;
    }
};
