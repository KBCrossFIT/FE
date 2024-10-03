import axios from 'axios';
import { useAuthStore } from '@/store/auth';
import router from '@/router';

const instance = axios.create({
    timeout: 5000,
});

instance.interceptors.request.use(
    (config) => {
      // 쿠키에서 Refresh-Token 추출
      const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
        const [name, value] = cookie.split('=');
        acc[name] = decodeURIComponent(value); // URL 디코딩
        return acc;
      }, {});
    
      console.log("@@@@@@@@@@@@@@@@",cookies);
      const token = cookies['Refresh-Token']; // 쿠키에서 'Refresh-Token' 가져오기
        console.log("###################",token);      
      if (token) {

        // 토큰이 있는 경우
        config.headers['Authorization'] = `Bearer ${token}`;
        console.log(config.headers.Authorization);
      }
      return config;
    },
    (error) => {
      console.log(error);
      return Promise.reject(error);
    }
  );

instance.interceptors.response.use(
    (response) => {
        if (response.status === 200) {
            return response;
        }
        if (response.status === 400) {
            return Promise.reject('404: 페이지 없음' + response.request);
        }
        return response;
    }
);

export default instance;

