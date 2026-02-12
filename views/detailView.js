export const DetailView = {
    render(car, managerInfo) {
        const formatPrice = (val) => Number(val).toLocaleString();
        return `
            <div class="h-[45px] flex justify-between items-center px-4 border-b border-slate-100">
                <h2 class="font-black text-[11px] uppercase flex items-center gap-2"><i data-lucide="car"></i> 상세 정보</h2>
                <button onclick="closeDetail()"><i data-lucide="x" class="w-5 h-5 text-slate-400"></i></button>
            </div>
            <div class="flex-1 overflow-y-auto p-3 space-y-3 bg-[#f8fafc] text-[10.5px]">
                <section class="p-3 bg-white border border-slate-200">1. 제원...</section>
                <section class="p-3 bg-white border border-slate-200">2. 대여료...</section>
                <section class="p-3 bg-white border border-slate-200">3. 보험...</section>
                <section class="p-3 bg-white border border-slate-200">4. 계약조건...</section>
                <section class="p-3 bg-white border border-slate-200">5. 담당자...</section>
            </div>
            <div class="p-3 border-t bg-white space-y-2">
                <div class="grid grid-cols-2 gap-2">
                    <button class="py-3 border border-slate-200 text-slate-500 font-bold text-[10px]">링크복사</button>
                    <button onclick="openChat()" class="py-3 bg-blue-600 text-white font-bold text-[10px]">문의하기</button>
                </div>
                <button onclick="handleCopySummary()" class="w-full py-3 bg-slate-800 text-white font-bold text-[10px]">전달용 텍스트 복사</button>
            </div>
        `;
    }
};
