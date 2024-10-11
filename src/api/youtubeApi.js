import axios from 'axios';
import { defineStore } from 'pinia';

// 유튜브 API 엔드 포인트 생성
const youtubeApi = axios.create({
    baseURL: 'http://localhost:8080/api/youtube',
    headers: {
        'Content-Type': 'application/json',
    },
});

// 유튜브 요약 저장 함수
export const saveYoutube = async (youtubeData) => {
    try {
        const response = await youtubeApi.post('/save', youtubeData);
        return response.data;
    } catch (error) {
        console.error('Error saving YouTube data: ', error);
        throw error;
    }
};

export const getAllYoutubeData = async () => {
    try {
        const response = await youtubeApi.get('/all');
        return response.data;
    } catch (error) {
        console.error('Error fetching YouTube data: ', error);
        throw error;
    }
};

export const getYoutubeDetail = async (youtubeNum) => {
    try {
        const response = await youtubeApi.get(`/${youtubeNum}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching YouTube detail: ', error);
        throw error;
    }
};

