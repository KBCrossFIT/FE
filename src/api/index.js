import axios from 'axios';

import router from '@/router';

const instance = axios.create({
    timeout: 5000,
});

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