import { defineStore } from "pinia";
import { useCookies } from 'vue3-cookies';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuthenticated: false,
        userRole: null, // 사용자의 역할 (admin인지 확인)
    }),
    actions: {
        checkAuth() {
            const { cookies } = useCookies();
            const token = cookies.get('Authorization'); // JWT 토큰 가져오기

            if (token) {
                try {
                    // JWT 토큰을 직접 디코드하기 위해 split 사용 (JWT 구조: header.payload.signature)
                    const base64Url = token.split('.')[1];
                    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                    }).join(''));

                    const decodedToken = JSON.parse(jsonPayload);
                    this.isAuthenticated = true;
                    
                    // 디코드된 토큰에서 역할을 확인하고 저장
                    this.userRole = decodedToken.roles ? decodedToken.roles[0] : null;

                    console.log('Token Decoded Successfully', decodedToken);
                } catch (error) {
                    // 디코드 오류 발생 시 처리
                    this.isAuthenticated = false;
                    this.userRole = null;
                    console.error('Invalid token', error);
                }
            }
        },

        logout() {
            const { cookies } = useCookies();
            // 쿠키에서 토큰 삭제
            cookies.remove('Authorization');
            cookies.remove('Refresh-Token');
            
            // 인증 상태 및 역할 초기화
            this.isAuthenticated = false;
            this.userRole = null;
        },
    },
});