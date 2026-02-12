import { API } from '../js/api.js';

export const InventoryView = {
    render() {
        const cars = API.getSampleCars();
        const container = document.getElementById('view-body');
        if (!container) return;

        window.inventoryData = cars;

        container.innerHTML = `
            <div class="bg-white rounded-sm border border-slate-200 overflow-x-auto shadow-sm">
                <table class="w-full text-left border-collapse min-w-[1500px]">
                    <thead>
                        <tr class="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                            <th class="py-2 px-2 text-center w-[60px]">상태</th>
                            <th class="py-2 px-2 text-center w-[60px]">구분</th>
                            <th class="py-2 px-2 w-[100px]">차량번호</th>
                            <th class="py-2 px-2 w-[80px]">제조사</th>
                            <th class="py-2 px-2 w-[100px]">모델</th>
                            <th class="py-2 px-2 w-[120px]">세부모델</th>
                            <th class="py-2 px-2 w-[180px]">세부트림(선택옵션)</th>
                            <th class="py-2 px-2 w-[80px] text-center font-bold">외부색상</th>
                            <th class="py-2 px-2 w-[80px] text-center font-bold">내부색상</th>
                            <th class="py-2 px-2 w-[100px] text-right">주행거리</th>
                            <th class="py-2 px-2 w-[100px] text-right bg-blue-50/50">36개월(보증금)</th>
                            <th class="py-2 px-2 w-[100px] text-right bg-blue-50/50">48개월(보증금)</th>
                            <th class="py-2 px-2 w-[100px] text-right bg-blue-50/50">60개월(보증금)</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100 font-bold text-[11px]">
                        ${cars.map((car, index) => `
                            <tr onclick="window.openDetailByIndex(${index})" class="hover:bg-blue-50/30 cursor-pointer transition-colors">
                                <td class="py-3 px-2 text-center">
                                    <span class="px-1.5 py-0.5 rounded-sm text-[8.5px] border ${car.차량_상태 === '출고가능' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}">${car.차량_상태}</span>
                                </td>
                                <td class="py-3 px-2 text-center">
                                    <span class="px-1.5 py-0.5 rounded-sm text-[8.5px] bg-blue-600 text-white border border-blue-700">${car.차량_구분}</span>
                                </td>
                                <td class="py-3 px-2 text-slate-700 font-black">${car.차량_번호}</td>
                                <td class="py-3 px-2 text-slate-500">${car.차량_제조사}</td>
                                <td class="py-3 px-2 text-slate-800">${car.차량_모델명}</td>
                                <td class="py-3 px-2 text-slate-500 font-medium text-[10px]">${car.차량_세부모델}</td>
                                <td class="py-3 px-2 text-blue-600 leading-tight">
                                    <div>${car.차량_세부트림}</div>
                                    <div class="text-[9px] text-slate-400 font-medium">${car.차량_선택옵션 || ''}</div>
                                </td>
                                <td class="py-3 px-2 text-center text-slate-600 font-medium text-[10px]">${car.차량_외부색상}</td>
                                <td class="py-3 px-2 text-center text-slate-600 font-medium text-[10px]">${car.차량_내부색상}</td>
                                <td class="py-3 px-2 text-right text-slate-700">${Number(car.차량_현재주행거리).toLocaleString()}km</td>
                                <td class="py-3 px-2 text-right bg-blue-50/20">
                                    <div class="text-blue-600 font-black">${(car.금액_대여료_36M/10000).toFixed(0)}만</div>
                                    <div class="text-[9px] text-slate-400 font-bold">${car.금액_보증금_36M/10000}만</div>
                                </td>
                                <td class="py-3 px-2 text-right bg-blue-50/20">
                                    <div class="text-blue-600 font-black">${(car.금액_대여료_48M/10000).toFixed(0)}만</div>
                                    <div class="text-[9px] text-slate-400 font-bold">${car.금액_보증금_48M/10000}만</div>
                                </td>
                                <td class="py-3 px-2 text-right bg-blue-50/20">
                                    <div class="text-blue-600 font-black">${(car.금액_대여료_60M/10000).toFixed(0)}만</div>
                                    <div class="text-[9px] text-slate-400 font-bold">${car.금액_보증금_60M/10000}만</div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }
};
