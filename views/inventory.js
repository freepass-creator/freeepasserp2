import { API } from '../js/api.js';

export const InventoryView = {
    render() {
        const cars = API.getSampleCars();
        const container = document.getElementById('view-body');
        if (!container) return;

        // [핵심] 전역 변수에 데이터를 보관하여 ui.js에서 찾을 수 있게 함
        window.inventoryData = cars;

        container.innerHTML = `
            <div class="bg-white rounded-sm border border-slate-200 overflow-hidden shadow-sm">
                <table class="w-full text-left border-collapse min-w-[1200px]">
                    <thead>
                        <tr class="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
                            <th class="py-2.5 px-2 text-center w-[60px]">상태</th>
                            <th class="py-2.5 px-2 text-center w-[60px]">구분</th>
                            <th class="py-2.5 px-2 w-[100px]">차량번호</th>
                            <th class="py-2.5 px-2 w-[80px]">제조사</th>
                            <th class="py-2.5 px-2 w-[120px]">모델</th>
                            <th class="py-2.5 px-2 w-[150px]">세부모델</th>
                            <th class="py-2.5 px-2 w-[180px]">세부트림(옵션)</th>
                            <th class="py-2.5 px-2 w-[100px] text-right">주행거리</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        ${cars.map((car, index) => `
                            <tr onclick="window.openDetailByIndex(${index})" class="hover:bg-blue-50/30 cursor-pointer transition-colors group">
                                <td class="py-3 px-2 text-center">
                                    <span class="px-1.5 py-0.5 rounded-sm text-[8.5px] font-bold border ${car.차량_상태 === '출고가능' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-200'}">${car.차량_상태}</span>
                                </td>
                                <td class="py-3 px-2 text-center">
                                    <span class="px-1.5 py-0.5 rounded-sm text-[8.5px] font-bold bg-slate-100 text-slate-500 border border-slate-200">${car.차량_구분}</span>
                                </td>
                                <td class="py-3 px-2 font-black text-slate-700 text-[11px] group-hover:text-blue-600">${car.차량_번호}</td>
                                <td class="py-3 px-2 text-[11px] font-bold text-slate-600">${car.차량_제조사}</td>
                                <td class="py-3 px-2 text-[11px] font-bold text-slate-800 tracking-tighter">${car.차량_모델명}</td>
                                <td class="py-3 px-2 text-[10px] text-slate-500 font-medium">${car.차량_세부모델}</td>
                                <td class="py-3 px-2 text-[10px] text-blue-600 font-bold leading-tight">
                                    ${car.차량_세부트림}
                                    <div class="text-[9px] text-slate-400 font-medium">${car.차량_선택옵션 || ''}</div>
                                </td>
                                <td class="py-3 px-2 text-right font-black text-slate-700 text-[11px]">${Number(car.차량_현재주행거리).toLocaleString()}km</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }
};
