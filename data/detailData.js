export const DetailData = {
    // 1. 차량 상세 제원 항목 제목
    carInfoLabels: {
        subModel: "세부모델",
        trim: "세부트림",
        options: "선택옵션",
        colors: "외부/내부",
        mileage: "주행거리",
        displacement: "배기량",
        regDate: "최초등록일",
        expireDate: "차량만료일",
        noteLabel: "차량 세부 상태 및 비고"
    },

    // 2. 대여료 및 보증금 안내 항목 제목
    rentLabels: {
        header: ["계약기간", "월 대여료", "보증금"],
        periods: ["24개월", "36개월", "48개월", "60개월"]
    },

    // 3. 보험 보상 항목 제목
    insuranceLabels: {
        header: ["보상 항목", "보상 한도", "면책금"],
        items: [
            { id: "person", label: "대인 배상" },
            { id: "property", label: "대물 배상" },
            { id: "self", label: "자기신체(자손)" },
            { id: "uninsured", label: "무보험차 상해" },
            { id: "car", label: "자기차량(자차)" },
            { id: "emergency", label: "긴급출동" }
        ]
    },

    // 4. 계약 정책 항목 제목
    policyLabels: {
        age: "기본연령",
        distance: "약정거리",
        options: [
            "만 21세 연령 하향",
            "만 23세 연령 하향",
            "연간 1만KM 거리 추가"
        ],
        note: "계약 관련 특이사항 및 비고"
    }
};
