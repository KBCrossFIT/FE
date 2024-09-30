<template>
    <div>
        <h1>회원가입</h1>
        <form @submit.prevent="handleSubmit">
            <div>
                <label for="username">사용자 이름</label>
                <input type="text" v-model="username" required />
            </div>
            <div>
                <label for="displayName">표시 이름</label>
                <input type="text" v-model="displayName" required />
            </div>
            <div>
                <label for="password">비밀번호</label>
                <input type="password" v-model="password" required />
            </div>
            <div>
                <label for="email">이메일</label>
                <input type="email" v-model="email" required />
            </div>
            <div>
                <label for="dob">생일</label>
                <input type="date" v-model="dob" required />
            </div>
            <div>
                <label for="gender">성별</label>
                <select v-model="gender" required>
                    <option value="">선택하세요</option>
                    <option value="male">남성</option>
                    <option value="female">여성</option>
                    <option value="other">기타</option>
                </select>
            </div>
            <button type="submit">회원가입</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            username: '',
            displayName: '',
            password: '',
            email: '',
            dob: '',
            gender: '',
        };
    },
    methods: {
        async handleSubmit() {
            try {
                const response = await axios.post('YOUR_BACKEND_API_URL/signup', {
                    username: this.username,
                    displayName: this.displayName,
                    password: this.password,
                    email: this.email,
                    dob: this.dob,
                    gender: this.gender,
                });
                console.log('회원가입 성공', response.data);
                // Optionally redirect or show a success message
                this.$router.push('/login'); // Redirect to login page after successful signup
            } catch (error) {
                console.error('회원가입 실패', error);
                // Handle errors, e.g., show an error message
                alert('회원가입에 실패했습니다. 다시 시도해 주세요.'); // Display error message
            }
        },
    },
};
</script>

<!-- <script>
import {ModalTest} from '@/components/Modal/ModalTest.vue'; // Main test component

export default {
    components: {
        ModalTest,
    },
    data() {
        return {
            username: '',
            displayName: '',
            password: '',
            confirmPassword: '',
            email: '',
            dob: null,
            gender: 'man',
            isModalOpen: false,
            InvestMentTest: false, // Check if investment test is done
        };
    },
    methods: {
        handleSubmit() {
            // Add your form submission logic here
            console.log(
                '회원가입 성공, Signing up with',
                this.username,
                this.displayName,
                this.password,
                this.confirmPassword,
                this.email,
                this.dob,
                this.gender,
                this.InvestMentTest
            );
        },
        openModal() {
            console.log('모달테스트 시작 창 열기');
            this.isModalOpen = true; // Open the modal
        },
        handleClose() {
            this.isModalOpen = false; // Close the modal
            console.log('모달이 닫혔습니다.', this.isModalOpen);
        },
        markTestAsFinished() {
            this.InvestMentTest = true; // Update the test status when test is finished
            this.handleClose(); // Close the modal when test is done
        },
        nextStep() {
            // Logic to handle the next step in the modal can be added here
        },
    },
};
</script> -->

<style scoped>
.signup-wrapper {
    display: flex;
    justify-content: center; /* Center content horizontally */
    align-items: flex-start; /* Align to the start vertically */
    flex-direction: column; /* Stack children vertically */
    flex: 1; /* Allow the wrapper to grow within the layout */
}

.signup-container {
    display: flex;
    width: 100%;
    margin: 0 auto;
    background: linear-gradient(to bottom, #e0f2f1, #ffffff);
    align-items: center;
    flex-direction: column;
    justify-content: center;
    height: 100%;
}

.signup-header {
    margin-bottom: 20px;
}

.signup-header h1 {
    font-size: 2.5rem;
    color: #4db6ac;
    text-align: center;
}

.signup-box {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 300px; /* Smaller box */
    text-align: center;
}

.form-group {
    margin-bottom: 15px;
    text-align: left;
}

label {
    display: block;
    font-size: 14px;
    margin-bottom: 5px;
    color: #666;
}

input {
    width: calc(100% - 22px);
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
}

.gender-radio {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 10px;
}

.start-test-btn {
    padding: 10px;
    background-color: #4db6ac;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
}

.start-test-btn:hover {
    background-color: #399d91;
}

.create-btn {
    width: 100%;
    padding: 10px;
    background-color: #4db6ac;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
}

.create-btn:hover {
    background-color: #399d91;
}

.login-link {
    margin-top: 10px;
}

.login-link a {
    color: #4db6ac;
    text-decoration: none;
}

.login-link a:hover {
    text-decoration: underline;
}
</style>
