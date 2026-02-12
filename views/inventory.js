import { API } from '../js/api.js';

export const InventoryView = {
    render() {
        const cars = API.getSampleCars(); // 샘플 데이터 가져오기
        const container = document.getElementById('view-body');
        
        container.innerHTML = `
            <div class="bg-white rounded-[6px] border border-slate-200 shadow-sm overflow-hidden">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-slate-50 border-b border-slate-200 text-[10px] text-slate-500">
                            <th class="p-2 text-center w-20">상태</th>
                            <th class="p-2">차량번호</th>
                            <th class="p-2">모델명</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        ${cars.map(car => `
                            <tr onclick='openDetail(${JSON.stringify(car)})' class="hover:bg-blue-50/50 cursor-pointer transition-all">
                                <td class="p-2 text-center text-[9px] font-bold text-emerald-600">${car.상태}</td>
                                <td class="p-2 font-bold">${car.id}</td>
                                <td class="p-2 text-slate-600">${car.모델}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }
};
