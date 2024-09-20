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
      <div class="footer-links" v-if="!isLoggedIn">
        <div class="link-container">
          <a href="/find" class="find-link">ID/PW 찾기</a>
          <router-link to="/signup" class="signup-link">회원가입</router-link>
        </div>
      </div>
      <div class="footer-links" v-else>
        <router-link to="/profile" class="profile-link">프로필</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { dummyUsers } from '@/dummydata.js'; // Ensure this matches your file path

export default {
  data() {
    return {
      username: '',
      password: '',
      isLoggedIn: false // Track login status
    };
  },
  methods: {
    handleLogin() {
      const user = dummyUsers.find(
        (user) => user.username === this.username && user.password === this.password
      );

      if (user) {
        this.isLoggedIn = true; // Set logged in status
        localStorage.setItem('user', JSON.stringify({ username: user.username, picture: 'path/to/profile/pic.png' })); // Store user info
        this.$router.push({ name: 'Home' }); // Redirect to homepage
      } else {
        alert('아이디 또는 비밀번호가 올바르지 않습니다.'); // Alert for incorrect login
        // Clear the input fields for a new attempt
        this.username = '';
        this.password = '';
      }
    }
  }
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
  position: relative;
}

h1 {
  margin-bottom: 20px;
  color: #4db6ac;
}

.form-group {
  margin-bottom: 20px;
  text-align: left; /* Align labels and inputs to the left */
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
