import { DetailData } from '../data/detailData.js';

export const DetailView = {
    render(data) {
        const lb = DetailData.labels; // 고정 제목들

        return `
            <div class="flex flex-col h-full bg-white font-sans">
                <div class="h-[45px] px-4 border-b border-slate-200 flex items-center justify-between flex-shrink-0 bg-white z-10">
                    <div class="flex items-center gap-2">
                        <i data-lucide="car" class="w-4 h-4 text-slate-700"></i>
                        <span class="text-[12px] font-black text-slate-800 uppercase tracking-tighter">상품 상세 정보</span>
                    </div>
                    <button onclick="window.closeDetail()" class="text-slate-400 hover:text-slate-600">
                        <i data-lucide="x" class="w-5 h-5"></i>
                    </button>
                </div>

                <div class="flex-1 overflow-auto p-4 space-y-6 bg-white">
                    
                    <div class="border border-slate-200 rounded-sm shadow-sm overflow-hidden">
                        <div class="bg-slate-50 px-3 py-2 border-b border-slate-200 font-black text-[11px] uppercase">${lb.s1.title}</div>
                        <div class="p-3">
                            <h4 class="text-[14px] font-black text-blue-700 mb-3 tracking-tight">${data.차량_번호 || '00가0000'} <span class="text-slate-800 ml-1">${data.모델명 || '모델명'}</span></h4>
                            <table class="w-full text-[11px] font-black">
                                ${lb.s1.rows.map(row => `
                                    <tr class="border-b border-slate-50"><td class="py-2 text-slate-400 w-24">${row}</td><td class="py-2 text-slate-800">데이터 연동 예정</td></tr>
                                `).join('')}
                            </table>
                            <div class="bg-slate-50 p-2.5 mt-2 rounded-sm"><p class="text-[9px] text-slate-400 font-black uppercase mb-1">${lb.s1.note}</p><p class="text-[11px] font-bold text-slate-700">즉시출고가능</p></div>
                        </div>
                    </div>

                    <div class="border border-slate-200 rounded-sm shadow-sm overflow-hidden">
                        <div class="bg-slate-50 px-3 py-2 border-b border-slate-200 font-black text-[11px] uppercase">${lb.s2.title}</div>
                        <table class="w-full text-[11px] text-center font-black">
                            <thead class="bg-slate-50 text-slate-400 uppercase tracking-tighter border-b border-slate-100">
                                <tr>${lb.s2.table.map(h => `<td class="py-2">${h}</td>`).join('')}</tr>
                            </thead>
                            <tbody class="divide-y divide-slate-50 text-slate-700">
                                <tr><td class="py-3">36개월</td><td class="text-blue-600 font-black">980,000원</td><td>4,000,000원</td></tr>
                                <tr class="bg-blue-50/20 font-black text-blue-700"><td class="py-3">48개월</td><td>920,000원</td><td>4,000,000원</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="border border-slate-200 rounded-sm shadow-sm overflow-hidden">
                        <div class="bg-slate-50 px-3 py-2 border-b border-slate-200 font-black text-[11px] uppercase">${lb.s3.title}</div>
                        <table class="w-full text-[11px] font-black">
                            <thead class="bg-slate-50 text-slate-400 uppercase tracking-tighter border-b border-slate-100">
                                <tr>${lb.s3.table.map(h => `<td class="py-2 text-center">${h}</td>`).join('')}</tr>
                            </thead>
                            <tbody class="divide-y divide-slate-50 text-slate-700">
                                ${lb.s3.items.map(item => `
                                    <tr><td class="py-2.5 pl-3 text-slate-400">${item}</td><td class="text-center">무한/1억</td><td class="pr-3 text-right text-blue-600">30만원</td></tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>

                    <div class="border border-slate-200 rounded-sm shadow-sm overflow-hidden font-black">
                        <div class="bg-slate-50 px-3 py-2 border-b border-slate-200 font-black text-[11px] uppercase">${lb.s4.title}</div>
                        <div class="p-3">
                            <div class="flex border-b border-slate-100 pb-2 mb-3 text-[11px]">
                                <div class="flex-1 flex justify-between pr-4 border-r border-slate-100"><span class="text-slate-400">${lb.s4.header[0]}</span><span>만 26세</span></div>
                                <div class="flex-1 flex justify-between pl-4"><span class="text-slate-400">${lb.s4.header[1]}</span><span>연 2만km</span></div>
                            </div>
                            <div class="space-y-2.5 text-[11px]">
                                ${lb.s4.options.map(opt => `<div class="flex justify-between"><span>${opt}</span><span class="text-blue-600">+55,000원</span></div>`).join('')}
                            </div>
                        </div>
                    </div>

                    <div class="border-2 border-blue-100 rounded-sm shadow-md overflow-hidden font-black">
                        <div class="bg-blue-50 px-3 py-2 border-b border-blue-100 flex justify-between items-center">
                            <h3 class="text-[11px] text-blue-800 uppercase font-black">${lb.s5.title}</h3>
                            <div class="flex items-center gap-1.5 cursor-pointer">
                                <span class="text-[9px] text-blue-600 uppercase tracking-tighter">${lb.s5.check}</span>
                                <input type="checkbox" checked class="w-3.5 h-3.5 accent-blue-600">
                            </div>
                        </div>
                        <div class="p-3 bg-white">
                            <div onclick="alert('계좌번호 복사')" class="bg-slate-50 border border-slate-100 p-3 rounded-sm cursor-pointer hover:bg-slate-100 transition-colors">
                                <p class="text-[8px] text-slate-400 font-black uppercase mb-1 tracking-tighter">${lb.s5.copyNote}</p>
                                <p class="text-[12px] text-slate-800 tracking-tight">하나 123-456789-12345 <span class="text-slate-400 ml-1 font-medium">(프리패스모빌리티)</span></p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="h-[60px] px-2 flex items-center justify-between gap-1.5 border-t border-slate-200 bg-white flex-shrink-0 z-10">
                    <button onclick="window.toggleChat()" class="flex-1 h-[40px] bg-blue-600 text-white rounded-sm font-black text-[9px] uppercase tracking-tighter shadow-sm">문의하기</button>
                    <button onclick="alert('링크복사')" class="flex-1 h-[40px] bg-white border border-slate-200 text-slate-500 font-black text-[9px] rounded-sm uppercase tracking-tighter">링크복사</button>
                    <button onclick="alert('텍스트복사')" class="flex-1 h-[40px] bg-[#1e293b] text-white rounded-sm font-black text-[9px] uppercase tracking-tighter font-black">텍스트복사</button>
                </div>
            </div>
        `;
    }
};
