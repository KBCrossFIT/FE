<template>
  <div class="signup-container">
    <div class="signup-header">
      <h1>회원가입</h1>
    </div>
    <div class="signup-box">
      <form @submit.prevent="handleSubmit" class="signup-form">
        <div class="form-group">
          <label for="username">아이디</label>
          <input type="text" id="username" placeholder="아이디" v-model="username" required />
        </div>

        <div class="form-group">
          <label for="displayName">사용자 이름</label>
          <input type="text" id="displayName" placeholder="사용자 이름" v-model="displayName" required />
        </div>

        <div class="form-group">
          <label for="password">비밀번호</label>
          <input type="password" id="password" placeholder="비밀번호" v-model="password" required />
        </div>

        <div class="form-group">
          <label for="confirmPassword">비밀번호 확인</label>
          <input type="password" id="confirmPassword" placeholder="비밀번호 확인" v-model="confirmPassword" required />
        </div>

        <div class="form-group">
          <label for="email">이메일 주소</label>
          <input type="email" id="email" placeholder="이메일 주소" v-model="email" required />
        </div>

        <div class="form-group">
          <label for="dob">생년월일</label>
          <input type="date" id="dob" v-model="dob" />
        </div>
          
        <div class="form-group">
          <label>성별</label>
          <div class="gender-radio">
            <label><input type="radio" name="gender" value="man" v-model="gender" /> 남자</label>
            <label><input type="radio" name="gender" value="woman" v-model="gender" /> 여자</label>
          </div>
        </div>

        <button class="create-btn" type="submit">회원가입</button>
      </form>
      <div class="login-link">
        이미 계정이 있으신가요? <router-link to="/login">로그인</router-link>
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
      console.log('Signing up with', this.username, this.displayName, this.password, this.confirmPassword, this.email, this.dob, this.gender);
    },
  },
};
</script>

<style scoped>
.signup-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to bottom, #e0f2f1, #ffffff); /* Gradient from light mint to white */
  padding: 20px;
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
