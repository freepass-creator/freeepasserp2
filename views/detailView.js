export const DetailView = {
    // 텍스트를 따로 관리하기 위해 여기에 내용을 몰아넣습니다.
    render(data) {
        // [디자인 틀 시작]
        return `
            <div class="flex flex-col h-full bg-white font-sans">
                <div class="h-[45px] px-4 border-b border-slate-200 flex items-center justify-between flex-shrink-0">
                    <span class="text-[12px] font-black text-slate-800 uppercase">상품 상세 정보</span>
                    <button onclick="window.closeDetail()"><i data-lucide="x" class="w-5 h-5"></i></button>
                </div>

                <div class="flex-1 overflow-auto p-4 space-y-5">
                    ${this.section1(data)}
                    ${this.section2(data)}
                    ${this.section3(data)}
                    ${this.section4(data)}
                    ${this.section5(data)}
                </div>

                <div class="h-[60px] px-2 flex items-center justify-between gap-1.5 border-t border-slate-200 bg-white">
                    <button onclick="window.toggleChat()" class="flex-1 h-[40px] bg-blue-600 text-white font-black text-[9px] rounded-sm">문의하기</button>
                    <button class="flex-1 h-[40px] bg-white border border-slate-200 text-slate-500 font-black text-[9px] rounded-sm">링크복사</button>
                    <button class="flex-1 h-[40px] bg-[#1e293b] text-white font-black text-[9px] rounded-sm">텍스트복사</button>
                </div>
            </div>
        `;
    },

    // 1~5번 섹션을 각각의 함수로 나눠서 관리하면 수정하기 아주 편합니다.
    section1(data) {
        return `
            <div class="border border-slate-200 rounded-sm overflow-hidden">
                <div class="bg-slate-50 px-3 py-2 border-b border-slate-200 font-black text-[11px]">1. 차량 상세 제원</div>
                <div class="p-3">
                    </div>
            </div>
        `;
    },
    // section2, 3, 4, 5... 이런 식으로 이어나가면 됩니다.
};
