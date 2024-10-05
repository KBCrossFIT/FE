import axios from 'axios';

// Function to create an Axios instance with the current token
const createPortfolioApi = () => {
    const token = localStorage.getItem('authToken'); // Get the token dynamically
    return axios.create({
        baseURL: 'http://localhost:8080/api/portfolio/',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Attach token in Authorization header
        },
    });
};

export async function fetchPortfolioList() {
    try {
        const portfolioApi = createPortfolioApi(); // Create a new instance with the current token
        const response = await portfolioApi.get('/list'); // Use the correct axios instance
        console.log(response.data); // Log the API response data
        return response.data;
    } catch (error) {
        console.error('Error fetching portfolio list:', error);
        throw error;
    }
}

export async function getPortfolioDetail(portfolioId) {
    try {
        const portfolioApi = createPortfolioApi(); // Create a new instance with the current token
        const response = await portfolioApi.get(`/details/${portfolioId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching portfolio detail:', error);
        throw error;
    }
}

export async function postPortfolio(portfolioReqDto) {
    try {
        const portfolioApi = createPortfolioApi(); // Create a new instance with the current token
        const response = await portfolioApi.post('/', portfolioReqDto);
        return response.data;
    } catch (error) {
        console.error('Error posting portfolio:', error);
        throw error;
    }
}

export async function deletePortfolio(portfolioId) {
    try {
        const portfolioApi = createPortfolioApi(); // Create a new instance with the current token
        await portfolioApi.delete(`/${portfolioId}`);
    } catch (error) {
        console.error('Error deleting portfolio:', error);
        throw error;
    }
}
