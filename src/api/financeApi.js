import axios from 'axios';

const bondApi = axios.create({
    baseURL: 'http://localhost:8080/api/bond', // API 엔드 포인트
    headers: { 
        'Content-Type': 'application/json',
    },
});

const savingApi = axios.create({
    baseURL: 'http://localhost:8080/api/saving-products', // API 엔드 포인트
    headers: { 
        'Content-Type': 'application/json',
    },
});

const fundApi = axios.create({
    baseURL: 'http://localhost:8080/api/fund-products', // API 엔드 포인트
    headers: {
      'Content-Type': 'application/json',
    },
});

// 채권 상품 조회 API
export async function fetchBondProducts() {
    try {
        const response = await bondApi.get('/list');
        return response.data;
    } catch (error) {
        console.error('Error fetching bond products:', error);
        throw error;  // 오류 발생 시 오류를 던져줌
    }
}

// 예금 상품 조회 API
export async function fetchDepositProducts() {
    try {
        const response = await savingApi.get('/deposit');
        return response.data;
    } catch (error) {
        console.error('Error fetching deposit products:', error);
        throw error;
    }
}

// 적금 상품 조회 API
export async function fetchSavingProducts() {
    try {
        const response = await savingApi.get('/saving');
        return response.data;
    } catch (error) {
        console.error('Error fetching saving products:', error);
        throw error;
    }
}

// 펀드 상품 조회 API
export async function fetchFundProducts() {
    try {
        const response = await fundApi.get('/list');
        return response.data;
    } catch(error) {
        console.error('Error fetching fund product: ', error);
        throw error;
    }
}