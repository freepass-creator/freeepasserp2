export const AppData = {
    // 담당자 기본 정보 (5번 섹션용)
    manager: {
        company: "프리패스모빌리티",
        nameTitle: "박영협 팀장",
        phone: "010-6393-0926",
        account: "하나 123-456789-12345"
    },

    // 보험 및 공통 정책 (3, 4번 섹션용)
    policy: {
        insurance: [
            { item: "대인 배상", limit: "무한", fee: "30만원" },
            { item: "대물 배상", limit: "1억", fee: "30만원" },
            { item: "자기신체(자손)", limit: "1억", fee: "30만원" },
            { item: "자기차량(자차)", limit: "차량가액", fee: "수리비 30% (30~50만)" }
        ],
        options: [
            { name: "만 21세 연령 하향", price: "+55,000원 / 월" },
            { name: "만 23세 연령 하향", price: "+35,000원 / 월" },
            { name: "연간 1만KM 거리 추가", price: "+50,000원 / 월" }
        ]
    }
};
