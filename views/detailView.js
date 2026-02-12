import { DetailData } from '../data/detailData.js';

export const DetailView = {
    render(data) {
        const lb = DetailData.labels;
        return `
            <div class="flex flex-col h-full bg-white font-sans overflow-hidden">
                <div class="h-[45px] px-4 border-b border-slate-200 flex items-center justify-between flex-shrink-0 bg-white">
                    <span class="text-[12px] font-black text-slate-800 uppercase tracking-tighter">상품 상세 정보</span>
                    <button onclick="window.closeDetail()"><i data-lucide="x" class="w-5 h-5 text-slate-400"></i></button>
                </div>
                <div class="flex-1 overflow-auto p-4 space-y-6">
                    <div class="border border-slate-200 rounded-sm">
                        <div class="bg-slate-50 px-3 py-2 border-b border-slate-200 font-black text-[11px]">${lb.s1.title}</div>
                        <div class="p-3">
                            <h4 class="text-[14px] font-black text-blue-700 mb-2">${data.차량_번호 || ''} ${data.모델명 || ''}</h4>
                            <table class="w-full text-[11px] font-black">
                                ${lb.s1.rows.map(row => `<tr class="border-b border-slate-50"><td class="py-2 text-slate-400 w-24">${row}</td><td class="py-2 text-slate-800">값 대기중</td></tr>`).join('')}
                            </table>
                        </div>
                    </div>
                    <div class="border-2 border-blue-100 rounded-sm overflow-hidden shadow-md">
                        <div class="bg-blue-50 px-3 py-2 border-b border-blue-100 flex justify-between items-center">
                            <h3 class="text-[11px] font-black text-blue-800 uppercase">${lb.s5.title}</h3>
                            <div class="flex items-center gap-1"><span class="text-[9px] text-blue-600 font-black">${lb.s5.check}</span><input type="checkbox" checked class="w-3.5 h-3.5 accent-blue-600"></div>
                        </div>
                        <div class="p-3 bg-white font-black">
                            <div class="bg-slate-50 p-3 rounded-sm text-[11px]">하나 123-456789-12345 (프리패스모빌리티)</div>
                        </div>
                    </div>
                </div>
                <div class="h-[60px] px-2 flex items-center justify-between gap-1.5 border-t border-slate-200 bg-white">
                    <button onclick="window.toggleChat()" class="flex-1 h-[40px] bg-blue-600 text-white rounded-sm font-black text-[9px] uppercase shadow-sm">문의하기</button>
                    <button onclick="alert('링크복사')" class="flex-1 h-[40px] bg-white border border-slate-200 text-slate-500 font-black text-[9px] rounded-sm uppercase">링크복사</button>
                    <button onclick="alert('텍스트복사')" class="flex-1 h-[40px] bg-[#1e293b] text-white rounded-sm font-black text-[9px] uppercase">텍스트복사</button>
                </div>
            </div>
        `;
    }
};
