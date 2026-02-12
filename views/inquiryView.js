import { API } from '../js/api.js';

export const InquiryView = {
    render() {
        const inquiries = API.getSampleInquiries();
        const container = document.getElementById('view-body');
        if (!container) return;

        // 전역 변수에 보관 (클릭 시 상세페이지 연동용)
        window.inquiryData = inquiries;

        container.innerHTML = `
            <div class="bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden">
                <div class="divide-y divide-slate-100">
                    ${inquiries.map((chat, index) => `
                        <div onclick="window.openDetailByInquiryIndex(${index})" 
                             class="p-4 hover:bg-slate-50 cursor-pointer transition-colors flex items-center justify-between group">
                            <div class="flex items-center gap-4">
                                <div class="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                                    <i data-lucide="user" class="w-5 h-5"></i>
                                </div>
                                <div class="space-y-0.5">
                                    <div class="flex items-center gap-2">
                                        <span class="font-black text-[12px] text-slate-800">${chat.고객명}</span>
                                        <span class="text-[9px] font-bold px-1.5 py-0.5 rounded-sm ${chat.상태 === '대기중' ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-500'}">
                                            ${chat.상태}
                                        </span>
                                    </div>
                                    <div class="text-[11px] text-slate-500 font-medium truncate max-w-[400px]">
                                        ${chat.최근메시지}
                                    </div>
                                    <div class="text-[9px] text-blue-600 font-black uppercase tracking-tight flex items-center gap-1 mt-1">
                                        <i data-lucide="car" class="w-2.5 h-2.5"></i>
                                        ${chat.차량정보.차량_번호} · ${chat.차량정보.차량_제조사} ${chat.차량정보.차량_모델명}
                                    </div>
                                </div>
                            </div>
                            <div class="text-right flex flex-col items-end gap-2">
                                <span class="text-[9px] text-slate-400 font-bold tracking-tighter">${chat.시간}</span>
                                ${!chat.읽음 ? `<div class="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        if (window.lucide) lucide.createIcons();
    }
};
