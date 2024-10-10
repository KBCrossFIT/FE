import axios from 'axios';

const API_URL = 'http://localhost:5000/api/persona';

const sendMessageToChatbot = async (id, message) => {
    try {
        const response = await axios.post(API_URL, {
            id: id, // "warren_buffett"
            message: message,
        });
        return response.data.data; // API 응답의 데이터 반환
    } catch (error) {
        console.error('Error sending message to chatbot:', error);
        throw error; // 에러를 호출자에게 전달
    }
};

export default sendMessageToChatbot;