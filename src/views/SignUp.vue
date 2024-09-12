<template>
    <div class="signup-container">
      <h1>회원가입</h1>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="fullName">전체 이름</label>
          <input type="text" id="fullName" v-model="form.fullName" required />
        </div>
  
        <div class="form-group">
          <label for="email">이메일</label>
          <input type="email" id="email" v-model="form.email" required />
        </div>
  
        <div class="form-group">
          <label for="password">비밀번호</label>
          <input type="password" id="password" v-model="form.password" required />
        </div>
  
        <div class="form-group">
          <label for="confirmPassword">비밀번호 확인</label>
          <input type="password" id="confirmPassword" v-model="form.confirmPassword" required />
        </div>
  
        <div class="form-group">
          <label for="dob">생년월일</label>
          <input type="date" id="dob" v-model="form.dob" required />
        </div>
  
        <div class="form-group gender-group">
          <label>성별</label>
          <div class="gender-options">
            <label>
              <input type="radio" v-model="form.gender" value="male" /> 남성
            </label>
            <label>
              <input type="radio" v-model="form.gender" value="female" /> 여성
            </label>
            <label>
              <input type="radio" v-model="form.gender" value="other" /> 기타
            </label>
          </div>
        </div>
  
        <button type="submit">회원가입</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SignUp',
    data() {
      return {
        form: {
          fullName: '',
          email: '',
          password: '',
          confirmPassword: '',
          dob: '',
          gender: 'male',
        },
      };
    },
    methods: {
      handleSubmit() {
        // Handle form submission
        if (this.form.password !== this.form.confirmPassword) {
          alert('비밀번호가 일치하지 않습니다.');
          return;
        }
  
        // Perform sign-up action (e.g., API call)
        console.log('Sign up:', this.form);
      },
    },
  };
  </script>
  
  <style scoped>
  .signup-container {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  .form-group input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .gender-group {
    margin-bottom: 15px;
  }
  
  .gender-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  .gender-options {
    display: flex;
    gap: 15px;
  }
  
  .gender-options label {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  
  button {
    display: block;
    width: 100%;
    padding: 10px;
    background-color: #004990;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #003670;
  }
  </style>
  