import { API } from '../js/api.js';

export const InventoryView = {
    render() {
        const cars = API.getSampleCars();
        const container = document.getElementById('view-body');
        if (!container) return;

        container.innerHTML = `
            <div class="bg-white rounded-[6px] border border-slate-200 shadow-[0_4px_12px_rgba(0,0,0,0.05)] overflow-hidden">
                <table class="w-full text-left border-collapse min-w-[1000px]">
                    <thead>
                        <tr class="bg-slate-50 border-b border-slate-200 text-[10px] text-slate-500 font-bold uppercase">
                            <th class="py-2 px-3 text-center w-20">상태</th>
                            <th class="py-2 px-3 text-center w-20">구분</th>
                            <th class="py-2 px-3 w-32">차량번호</th>
                            <th class="py-2 px-3 w-24">제조사</th>
                            <th class="py-2 px-3">모델 / 상세정보</th>
                            <th class="py-2 px-3 w-28 text-right">주행거리</th>
                            <th class="py-2 px-3 w-32 text-right">대여료(보증)</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        ${cars.map(car => `
                            <tr onclick='openDetail(${JSON.stringify(car)})' class="hover:bg-blue-50/40 cursor-pointer transition-all group">
                                <td class="py-2 px-3 text-center">
                                    <span class="px-1.5 py-0.5 rounded-[3px] text-[8.5px] font-bold border ${car.상태 === '대여가능' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}">${car.상태}</span>
                                </td>
                                <td class="py-2 px-3 text-center">
                                    <span class="px-1.5 py-0.5 rounded-[3px] text-[8.5px] font-bold bg-slate-100 text-slate-600 border border-slate-200">${car.구분}</span>
                                </td>
                                <td class="py-2 px-3 font-bold text-slate-700 text-[11px]">${car.id}</td>
                                <td class="py-2 px-3 text-slate-600 text-[11px]">${car.제조사}</td>
                                <td class="py-2 px-3">
                                    <div class="flex flex-col leading-tight">
                                        <span class="text-[11px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors">${car.모델}</span>
                                        <span class="text-[9.5px] text-slate-400 font-medium">${car.세부모델} · ${car.연료}</span>
                                    </div>
                                </td>
                                <td class="py-2 px-3 text-right font-bold text-slate-600 text-[10.5px]">${Number(car.주행거리).toLocaleString()} km</td>
                                <td class="py-2 px-3 text-right">
                                    <div class="flex flex-col items-end leading-[1.1]">
                                        <span class="text-[12px] font-black text-blue-600 italic">₩${(Number(car.대여료)/10000).toFixed(0)}만</span>
                                        <span class="text-[9px] text-slate-400 font-bold">보증 ${(Number(car.보증금)/10000).toFixed(0)}만</span>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }
};
