<template>
    <div class="login-container">
        <div class="login-box">
            <h1>Login</h1>
            <form @submit.prevent="handleLogin">
                <div class="form-group">
                    <label for="username">아이디</label>
                    <input type="text" id="username" v-model="username" required />
                </div>
                <div class="form-group">
                    <label for="password">비밀번호</label>
                    <input type="password" id="password" v-model="password" required />
                </div>
                <button type="submit" class="login-button">LOGIN</button>
            </form>
            <div class="footer-links">
                <div class="link-container">
                    <a href="/find" class="find-link">ID/PW 찾기</a>
                    <router-link to="/signup" class="signup-link">회원가입</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { dummyUsers } from '@/dummyData.js'; // Ensure this path is correct

export default {
    data() {
        return {
            username: '',
            password: '',
        };
    },
    methods: {
        handleLogin() {
            const user = dummyUsers.find(
                (user) => user.username === this.username && user.password === this.password
            );

            if (user) {
                // Save user info in local storage
                localStorage.setItem(
                    'user',
                    JSON.stringify({
                        username: user.username,
                        picture: 'path/to/profile/pic.png', // Update with actual path
                    })
                );
                this.$router.push('/'); // Redirect to homepage
            } else {
                alert('아이디 또는 비밀번호가 잘못되었습니다.');
            }
        },
    },
};
</script>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(to bottom, #e0f2f1, #ffffff);
}

.login-box {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 300px;
    text-align: center;
}

h1 {
    margin-bottom: 20px;
    color: #4db6ac;
}

.form-group {
    margin-bottom: 20px;
    text-align: left;
}

label {
    display: block;
    font-size: 14px;
    margin-bottom: 5px;
    color: #666;
}

input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
}

.login-button {
    width: 100%;
    padding: 10px;
    background-color: #4db6ac;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.login-button:hover {
    background-color: #399d91;
}

.footer-links {
    margin-top: 10px;
}

.link-container {
    display: flex;
    justify-content: space-between;
}

.signup-link,
.find-link {
    color: #4db6ac;
    text-decoration: none;
}

.signup-link:hover,
.find-link:hover {
    text-decoration: underline;
}
</style>
