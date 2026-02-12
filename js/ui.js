// js/ui.js 내 추가 및 수정
import { ChatView } from '../views/chatView.js';

export const UI = {
    // ... 기존 코드 ...

    openChat() {
        const chatContainer = document.getElementById('chat-drawer'); // 메인 content 옆에 숨겨둔 영역
        if (!this.selectedCarData) return;
        
        chatContainer.innerHTML = ChatView.render(this.selectedCarData);
        chatContainer.classList.remove('translate-x-full');
        chatContainer.classList.add('translate-x-0');
        if (window.lucide) lucide.createIcons();
    },

    closeChat() {
        const chatContainer = document.getElementById('chat-drawer');
        chatContainer.classList.add('translate-x-full');
    },

    openDetail(carData) {
        this.selectedCarData = carData; // 데이터 보관
        // ... 기존 오픈 로직 ...
    }
};

window.openChat = () => UI.openChat();
window.closeChat = () => UI.closeChat();
