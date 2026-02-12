import { CAR_SAMPLES } from './data_cars.js';
import { INQUIRY_SAMPLES } from './data_inquiries.js';

export const API = {
    // 상품현황 전용 데이터 호출
    getSampleCars() {
        return CAR_SAMPLES;
    },

    // 대화현황 전용 데이터 호출
    getSampleInquiries() {
        return INQUIRY_SAMPLES;
    }
};
