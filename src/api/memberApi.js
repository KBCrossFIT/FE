import axios from 'axios';

const userApi = axios.create({
    baseURL: 'http://localhost:8080/api/member', // 사용자 API 엔드포인트
    headers: {
        'Content-Type': 'application/json',
    },
});

// 사용자 등록 API
export async function registerUser(userData) {
    try {
        const response = await userApi.post('/register', userData);
        return response.data; // 등록된 사용자 정보 반환
    } catch (error) {
        console.error('Error registering user:', error);
        throw error; // 오류 발생 시 오류를 던져줌
    }
}

// 사용자 로그인 API
export async function loginUser(credentials) {
    try {
        const response = await userApi.post('/login', credentials);
        return response.data; // 로그인된 사용자 정보 반환
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error; // 오류 발생 시 오류를 던져줌
    }
}
