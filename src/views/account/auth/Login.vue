<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="memberID">Member ID</label>
        <input type="text" v-model="memberID" id="memberID" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" v-model="password" id="password" required />
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
        localStorage.setItem('authToken', response.data.token); // Store token
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

input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
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
