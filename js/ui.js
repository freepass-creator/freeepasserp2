// ... 상단 import 생략 (InquiryView 포함 확인) ...

export const UI = {
    selectedCarData: null,

    // ... init, switchView 생략 (기존과 동일) ...

    // 상세페이지 열기 (애니메이션 리셋 포함)
    openDetail(carData, autoOpenChat = false) {
        const drawer = document.getElementById('right-drawer');
        if (!drawer) return;

        drawer.classList.add('hidden');
        drawer.classList.remove('animate-drawer-reset');
        this.closeChat();

        setTimeout(() => {
            this.selectedCarData = carData;
            const managerInfo = { company: "프리패스모빌리티", nameTitle: "박영협 팀장", phone: "010-6393-0926" };
            drawer.innerHTML = DetailView.render(carData, managerInfo);
            drawer.classList.remove('hidden');
            drawer.classList.add('animate-drawer-reset');
            
            if (window.lucide) lucide.createIcons();

            // 대화현황에서 클릭한 경우 채팅창도 바로 띄움
            if (autoOpenChat) {
                setTimeout(() => this.openChat(), 50);
            }
        }, 15);
    },

    openChat() {
        const chatDrawer = document.getElementById('chat-drawer');
        if (!this.selectedCarData || !chatDrawer) return;
        chatDrawer.innerHTML = ChatView.render(this.selectedCarData);
        chatDrawer.classList.remove('hidden');
        chatDrawer.classList.add('animate-drawer-reset');
        if (window.lucide) lucide.createIcons();
    },

    closeChat() {
        const chatDrawer = document.getElementById('chat-drawer');
        if (chatDrawer) chatDrawer.classList.add('hidden');
    },

    closeDetail() {
        this.selectedCarData = null;
        this.closeChat();
        const drawer = document.getElementById('right-drawer');
        if (drawer) drawer.classList.add('hidden');
    }
};

// [추가] 대화현황 목록 클릭 전용 함수 (상세 + 채팅 동시 호출)
window.openFullChatByIndex = (idx) => {
    if (window.inquiryData?.[idx]) {
        UI.openDetail(window.inquiryData[idx].차량정보, true);
    }
};

window.openDetailByIndex = (idx) => {
    if (window.inventoryData?.[idx]) UI.openDetail(window.inventoryData[idx], false);
};

window.switchView = (id) => UI.switchView(id);
window.closeDetail = () => UI.closeDetail();
window.openChat = () => UI.openChat();
window.closeChat = () => UI.closeChat();
