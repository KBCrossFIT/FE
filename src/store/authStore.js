import { defineStore } from "pinia";
import { useCookies } from "vue3-cookies";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
    memberNum: null, // memberNum 추가
    userRole: null,
    isTested: JSON.parse(localStorage.getItem("isTested")) || false, // 초기값을 localStorage에서 가져오기
  }),
  actions: {
    async checkAuth() {
      const { cookies } = useCookies();
      const token = cookies.get("Authorization"); // JWT 토큰 가져오기

      if (token) {
        try {
          // JWT 토큰 디코딩
          const base64Url = token.split(".")[1];
          const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split("")
              .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
              })
              .join("")
          );

          const decodedToken = JSON.parse(jsonPayload);
          console.log("Decoded Token:", decodedToken); // JWT 토큰 디코딩 확인

          console.log(this.isTested);

          this.isAuthenticated = true;
          this.memberNum = decodedToken.sub; // JWT 토큰의 subject가 memberNum
          console.log("memberNum:", this.memberNum); // memberNum이 제대로 설정되었는지 확인
        } catch (error) {
          console.error("Error decoding token:", error);
          this.isAuthenticated = false;
          this.memberNum = null;
        }
      } else {
        console.log("No token found");
        this.isAuthenticated = false;
        this.memberNum = null;
      }
    },
    
    async isLoggedIn() {
      const { cookies } = useCookies();
      const token = cookies.get('Authorization'); // 쿠키에서 JWT 토큰 가져오기
      if (!token) return false;

      // 토큰 디코딩 및 만료 시간 검사
      try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map(function (c) {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        );
        const decodedToken = JSON.parse(jsonPayload);
        const now = Math.floor(Date.now() / 1000);
        return decodedToken.exp > now;
      } catch (error) {
        console.error("Invalid token:", error);
        return false;
      }
    },
  },
});
