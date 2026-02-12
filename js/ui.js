export const UI = {
    openDetail(carData) {
        const drawer = document.getElementById('right-drawer');
        
        // 1. 즉시 멈춤 & 비우기 (잔상 원천 차단)
        drawer.style.transition = 'none';
        drawer.classList.add('translate-x-full');
        drawer.innerHTML = ''; 

        // 2. 데이터 주입
        this.selectedCarData = carData;

        // 3. 브라우저가 화면을 그릴 준비가 되면 슥~ 등장
        requestAnimationFrame(() => {
            drawer.innerHTML = DetailView.render(carData);
            setTimeout(() => {
                drawer.style.transition = 'transform 0.3s ease-in-out';
                drawer.classList.remove('translate-x-full');
                if (window.lucide) lucide.createIcons();
            }, 30); // 아주 짧은 지연이 잔상을 없애는 비결입니다.
        });
    }
};
