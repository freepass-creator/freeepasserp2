import { API } from '../js/api.js';

export const InquiryView = {
    render() {
        const inquiries = API.getSampleInquiries();
        const container = document.getElementById('view-body');
        if (!container) return;

        window.inquiryData = inquiries;

        container.innerHTML = `
            <div class="bg-white rounded-sm border border-slate-200 overflow-x-auto shadow-sm">
                <table class="w-full text-left border-collapse min-w-[1000px]">
                    <thead>
                        <tr class="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                            <th class="py-2.5 px-4 text-center w-[80px]">상태</th>
                            <th class="py-2.5 px-4 w-[120px]">고객명</th>
                            <th class="py-2.5 px-4 w-[120px]">차량번호</th>
                            <th class="py-2.5 px-4 w-[150px]">모델명</th>
                            <th class="py-2.5 px-4 flex-1">최근 메시지 내용</th>
                            <th class="py-2.5 px-4 w-[100px] text-right">문의시간</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100 font-bold text-[11px]">
                        ${inquiries.map((chat, index) => `
                            <tr onclick="window.openFullChatByIndex(${index})" class="hover:bg-blue-50/30 cursor-pointer transition-colors group">
                                <td class="py-3 px-4 text-center">
                                    <span class="px-2 py-0.5 rounded-sm text-[8.5px] font-black border ${chat.상태 === '대기중' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-slate-50 text-slate-500 border-slate-200'}">
                                        ${chat.상태}
                                    </span>
                                </td>
                                <td class="py-3 px-4 text-slate-900 flex items-center gap-2">
                                    <i data-lucide="user" class="w-3.5 h-3.5 text-slate-300"></i>
                                    ${chat.고객명}
                                    ${!chat.읽음 ? '<span class="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>' : ''}
                                </td>
                                <td class="py-3 px-4 text-blue-600 font-black">${chat.차량정보.차량_번호}</td>
                                <td class="py-3 px-4 text-slate-600">${chat.차량정보.차량_모델명}</td>
                                <td class="py-3 px-4 text-slate-500 font-medium truncate max-w-[400px]">
                                    ${chat.최근메시지}
                                </td>
                                <td class="py-3 px-4 text-right text-slate-400 font-bold tracking-tighter">
                                    ${chat.시간}
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
        
        if (window.lucide) lucide.createIcons();
    }
};
