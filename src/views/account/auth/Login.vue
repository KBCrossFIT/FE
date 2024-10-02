<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <div class="input-container">
          <input type="text" v-model="memberID" id="memberID" required />
          <label for="memberID" :class="{ active: memberID }">아이디</label>
        </div>
      </div>
      <div class="form-group">
        <div class="input-container">
          <input type="password" v-model="password" id="password" required />
          <label for="password" :class="{ active: password }">비밀번호</label>
        </div>
      </div>
      <button type="submit">Login</button>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      memberID: '', // Updated variable name to match DTO
      password: '',
      errorMessage: '', // Added property to hold error message
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post('http://localhost:8080/api/member/login', {
          memberID: this.memberID,
          password: this.password,
        });
        console.log('Login successful:', response.data);

        // Assuming your response contains the user data
        const user = {
          username: response.data.username, // Update this according to your API response
          picture: response.data.picture, // Update this according to your API response
        };

        // Save user data to localStorage
        localStorage.setItem('Authorization', response.headers.getAuthorization); 
        localStorage.setItem('Refresh-Token', response.headers.get('Refresh-Token')); // Store token
        localStorage.setItem('user', JSON.stringify(user)); // Store user data

        // Emit an event with user data to update App.vue
        this.$emit('login', user);

        // Redirect to the home page after successful login
        this.$router.push('/');
      } catch (error) {
        // Set error message for display on the UI
        if (error.response) {
          this.errorMessage = '아이디 혹은 비밀번호가 틀렸습니다.'; // Display a custom error message
          console.error('Error logging in user:', error.response.data);
        } else {
          this.errorMessage = 'Error during login: ' + error.message;
          console.error('Error during login:', error.message);
        }
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

.input-container {
  position: relative;
  margin-top: 10px;
}

input {
  width: 100%;
  padding: 10px 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #4caf50;
}

label {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  color: #888;
  pointer-events: none;
  transition: 0.3s ease all;
}

input:focus + label,
.active + label {
  top: -10px;
  left: 5px;
  font-size: 12px;
  color: #4caf50;
  background-color: #f5f5f5;
  padding: 0 5px;
}

button {
  padding: 10px 20px;
  border: none;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #45a049;
}

.error-message {
  color: red;
  margin-top: 1rem;
}
</style>
