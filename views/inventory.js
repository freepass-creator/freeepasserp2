import { API } from '../js/api.js';

export const InventoryView = {
    render() {
        const cars = API.getSampleCars();
        const container = document.getElementById('view-body');
        if (!container) return;

        // 전역 변수에 잠시 보관 (따옴표 에러 방지용)
        window.currentCars = cars;

        container.innerHTML = `
            <div class="bg-white rounded-[6px] border border-slate-200 shadow-sm overflow-hidden">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
                            <th class="py-2 px-3 text-center w-20">상태</th>
                            <th class="py-2 px-3 w-32">차량번호</th>
                            <th class="py-2 px-3">모델명</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        ${cars.map((car, index) => `
                            <tr onclick="window.openDetailByIndex(${index})" class="hover:bg-blue-50/40 cursor-pointer transition-all">
                                <td class="py-2 px-3 text-center">
                                    <span class="px-1.5 py-0.5 rounded-[3px] text-[8.5px] font-bold border bg-emerald-50 text-emerald-600 border-emerald-100">${car.차량_상태 || '대여가능'}</span>
                                </td>
                                <td class="py-2 px-3 font-bold text-slate-700 text-[11px]">${car.차량_번호}</td>
                                <td class="py-2 px-3 text-[11px] text-slate-600">${car.차량_제조사} ${car.차량_모델명}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }
};
