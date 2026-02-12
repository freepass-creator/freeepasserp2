import { API } from '../js/api.js';

export const InventoryView = {
    render() {
        const cars = API.getSampleCars();
        const container = document.getElementById('view-body');
        
        // 테이블 레이아웃 구성
        container.innerHTML = `
            <div class="bg-white rounded-[6px] border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse min-w-[1000px]">
                        <thead>
                            <tr class="bg-slate-50 border-b border-slate-200">
                                <th class="p-4 text-[11px] font-bold text-slate-500 uppercase w-24 text-center">상태</th>
                                <th class="p-4 text-[11px] font-bold text-slate-500 uppercase w-32">차량번호</th>
                                <th class="p-4 text-[11px] font-bold text-slate-500 uppercase">모델/상세정보</th>
                                <th class="p-4 text-[11px] font-bold text-slate-500 uppercase w-32 text-right">주행거리</th>
                                <th class="p-4 text-[11px] font-bold text-slate-500 uppercase w-40 text-right">대여료(보증금)</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100">
                            ${cars.map(car => `
                                <tr onclick="selectCar('${car.id}')" class="hover:bg-blue-50/50 cursor-pointer transition-colors group">
                                    <td class="p-4 text-center">
                                        <span class="px-2 py-1 rounded-[4px] text-[9px] font-bold border ${car.상태 === '대여가능' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}">
                                            ${car.상태}
                                        </span>
                                    </td>
                                    <td class="p-4 font-bold text-slate-700 text-[13px]">${car.id}</td>
                                    <td class="p-4">
                                        <div class="flex flex-col">
                                            <span class="text-[13px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors">${car.모델}</span>
                                            <span class="text-[11px] text-slate-400 font-medium">${car.세부모델} | ${car.연도}년 | ${car.연료}</span>
                                        </div>
                                    </td>
                                    <td class="p-4 text-right font-bold text-slate-600 text-[12px]">${Number(car.주행거리).toLocaleString()} km</td>
                                    <td class="p-4 text-right">
                                        <div class="flex flex-col items-end leading-tight">
                                            <span class="text-[14px] font-black text-blue-600">₩${Number(car.대여료).toLocaleString()}</span>
                                            <span class="text-[10px] text-slate-400 font-bold">보증 ₩${Number(car.보증금).toLocaleString()}</span>
                                        </div>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }
};
