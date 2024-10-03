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
import { useCookies } from 'vue3-cookies';

export default {
  data() {
    return {
      memberID: '',
      password: '',
      errorMessage: '',
      isMemberIDFocused: false,
      isPasswordFocused: false,
    };
  },
  methods: {
    checkMemberID() {
      this.isMemberIDFocused = this.memberID.length > 0;
    },
    checkPassword() {
      this.isPasswordFocused = this.password.length > 0;
    },
    async handleLogin() {
      const { cookies } = useCookies();
      this.errorMessage = ''; // Reset error message

      try {
        const response = await axios.post(
          'http://localhost:8080/api/member/login',
          {
            memberID: this.memberID,
            password: this.password,
          }
        );

        console.log('Login successful:', response.data);

        // Assuming your response contains the user data
        const user = {
          username: response.data.username,
          picture: response.data.picture,
        };

        const authHeader =
          response.headers['authorization'] ||
          response.headers['Authorization'];
        const refreshToken =
          response.headers['refresh-token'] ||
          response.headers['Refresh-Token'];

        if (authHeader && refreshToken) {
          cookies.set('Authorization', authHeader, {
            secure: true,
            sameSite: 'Lax',
          });
          cookies.set('Refresh-Token', refreshToken, {
            secure: true,
            sameSite: 'Lax',
          });
          localStorage.setItem('user', JSON.stringify(user));
          this.$emit('login', user);
          this.$router.push('/');
        } else {
          throw new Error('Missing authorization or refresh token');
        }
      } catch (error) {
        // Set error message for display on the UI
        if (error.response) {
          this.errorMessage = '아이디 혹은 비밀번호가 틀렸습니다.'; // Error message in Korean
          console.error('Error logging in user:', error.response.data);
        } else {
          this.errorMessage = '로그인 중 오류 발생: ' + error.message; // General error message
          console.error('Error during login:', error.message);
        }
      }
    },
  },
};
</script>

<style scoped>
.background-container {
  background: linear-gradient(
    to bottom,
    #a0e0d2,
    #ffffff
  ); /* Minty gradient background */
  min-height: 100vh; /* Full height for background */
  display: flex; /* Center login container vertically */
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
}

.login-container {
  max-width: 800px; /* Increased max width for a wider box */
  padding: 50px; /* Padding remains the same */
  background-color: #ffffff; /* Solid background for the login box */
  border-radius: 10px; /* Rounded corners */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); /* Slightly larger shadow */
  text-align: center;
  min-height: 400px; /* Minimum height for a more substantial appearance */
}

h2 {
  margin-bottom: 20px;
  color: #4db6ac; /* Title color */
  font-size: 24px; /* Slightly larger title */
}

.form-group {
  margin-bottom: 20px; /* More space between form groups */
}

.input-container {
  position: relative;
  margin-top: 10px;
}

.v-field__input {
  width: 100%;
  padding: 12px; /* Increased padding for better touch target */
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.3s; /* Smooth transition on focus */
}

.v-field__input:focus {
  outline: none;
  border-color: #4caf50; /* Focus border color */
}

label {
  position: absolute;
  top: 50%;
  left: 12px; /* Adjusted position for better alignment */
  transform: translateY(-50%);
  color: #888;
  pointer-events: none;
  transition: 0.3s ease all;
}

.v-field__input:focus + label,
label.active {
  top: -10px;
  left: 5px;
  font-size: 12px;
  color: #4caf50; /* Active label color */
  background-color: rgba(255, 255, 255, 0.9); /* Match background */
  padding: 0 5px;
}

.button-container {
  display: flex;
  justify-content: center; /* Center the login button */
  align-items: center; /* Align items vertically */
  margin-top: 15px;
}

.login-btn {
  background-color: #4db6ac; /* Minty button background */
  color: white; /* Button text color */
  border: none; /* No border */
  padding: 15px 25px; /* Increased button padding */
  border-radius: 5px; /* Rounded corners */
  font-size: 16px; /* Font size */
  transition: background-color 0.3s; /* Smooth transition */
}

.login-btn:hover {
  background-color: #399d91; /* Darker mint color on hover */
}

.link-container {
  text-align: right; /* Align the link to the right */
  margin-top: 10px; /* Space above the link */
}

.link {
  font-size: 12px; /* Smaller font size for the link */
  color: #4db6ac; /* Minty link color */
  text-decoration: underline; /* Underline the link */
}

.link:hover {
  color: #399d91; /* Darker link color on hover */
}

.error-message {
  color: red;
  margin-top: 1rem;
}
</style>
