<template>
  <div class="signup-container">
    <div class="signup-box">
      <h2>회원가입</h2>
      <form class="signup-form">
        <div class="form-group">
          <label for="username">아이디</label>
          <input type="text" id="username" placeholder="Full name" v-model="username" required />
        </div>

        <div class="form-group">
          <label for="displayName">사용자 이름</label>
          <input type="text" id="displayName" placeholder="Full name" v-model="displayName" required />
        </div>

        <div class="form-group">
          <label for="password">비밀번호</label>
          <input type="password" id="password" placeholder="Password" v-model="password" required />
        </div>

        <div class="form-group">
          <label for="confirmPassword">비밀번호 확인</label>
          <input type="password" id="confirmPassword" placeholder="Confirm Password" v-model="confirmPassword" required />
        </div>

        <div class="form-group">
          <label for="email">이메일 주소</label>
          <input type="email" id="email" placeholder="Email Address" v-model="email" required />
        </div>

        <div class="form-group">
          <label for="dob">생년월일</label>
          <input type="date" id="dob" v-model="dob" />
        </div>
          
        <div class="form-group">
          <label>Gender</label>
          <div class="gender-radio">
            <label><input type="radio" name="gender" value="man" v-model="gender" /> Man</label>
            <label><input type="radio" name="gender" value="woman" v-model="gender" /> Woman</label>
          </div>
        </div>

        <button class="create-btn" type="submit">Create Account</button>
      </form>
      <div class="login-link">
        Already have an account? <a href="/login">Login</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      displayName: '',
      password: '',
      confirmPassword: '',
      email: '',
      dob: null,
      gender: 'man',
    };
  },
  methods: {
    handleSubmit() {
      // Add your form submission logic here
    },
  },
};
</script>

<style scoped>
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f9f9;
}

.signup-box {
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 400px;
  text-align: center;
}

h2 {
  margin-bottom: 20px;
  color: #4db6ac;
}

.form-group {
  margin-bottom: 20px;
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

.gender-radio {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}

.create-btn {
  width: 100%;
  padding: 10px;
  background-color: #4db6ac;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
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
