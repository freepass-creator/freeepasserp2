// [FILE: /services/auth-service.js]
/**
 * 인증 관련 비즈니스 로직
 */
export const AuthService = {
    // 로그인 시도
    login: async (uid, upw) => {
        // 실제 운영 시에는 여기서 fetch(API) 호출
        console.log(`로그인 시도: ${uid}`);
        
        // 테스트용: 아이디가 'admin'이면 관리자, 'sales'면 영업자, 그 외는 공급사로 가정
        let role = 'provider';
        if (uid === 'admin') role = 'admin';
        else if (uid === 'sales') role = 'sales';

        const userData = {
            id: uid,
            role: role,
            name: uid === 'admin' ? '최고관리자' : '협력파트너',
            isLoggedIn: true
        };

        // 세션 유지용 저장 (기능 중심)
        localStorage.setItem('freepass_user', JSON.stringify(userData));
        return userData;
    },

    // 로그아웃
    logout: () => {
        localStorage.removeItem('freepass_user');
        window.location.href = 'index.html';
    },

    // 현재 사용자 상태 확인
    getCurrentUser: () => {
        return JSON.parse(localStorage.getItem('freepass_user'));
    }
};
