import axios from 'axios';

const userApi = axios.create({
  baseURL: 'http://localhost:8080/api/portfolio', // 사용자 API 엔드포인트
  headers: {
    'Content-Type': 'application/json',
  },
});
