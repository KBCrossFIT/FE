import axios from 'axios';

const stockApi = axios.create({
    baseURL: 'http://localhost:8080/api/stock', // 주식 api 엔드포인트
    headers: {
        'Content-Type': 'application/json',
    },
});

export async function searchStock(searchTerm) {
    try {
        const response = await stockApi.get(`/searchStock`, {
            params: { searchTerm },
        });
        return response.data;
    } catch (error) {
        console.error('Error searching stock product: ', error);
        throw error;
    }
}

