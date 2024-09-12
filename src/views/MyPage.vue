<template>
    <div class="mypage-container">
      <h1>마이페이지</h1>
      <form @submit.prevent="handleUpdate">
        <div class="form-group">
          <label for="fullName">전체 이름</label>
          <input type="text" id="fullName" v-model="user.fullName" />
        </div>
  
        <div class="form-group">
          <label for="email">이메일</label>
          <input type="email" id="email" v-model="user.email" />
        </div>
  
        <div class="form-group">
          <label for="dob">생년월일</label>
          <input type="date" id="dob" v-model="user.dob" />
        </div>
  
        <div class="form-group gender-group">
          <label>성별</label>
          <div class="gender-options">
            <label>
              <input type="radio" v-model="user.gender" value="male" /> 남성
            </label>
            <label>
              <input type="radio" v-model="user.gender" value="female" /> 여성
            </label>
            <label>
              <input type="radio" v-model="user.gender" value="other" /> 기타
            </label>
          </div>
        </div>
  
        <button type="submit">저장</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MyPage',
    data() {
      return {
        user: {
          fullName: '홍길동',
          email: 'hong@example.com',
          dob: '',
          gender: 'male',
        },
      };
    },
    methods: {
      handleUpdate() {
        // Handle user data update logic
        console.log('User data updated:', this.user);
        alert('정보가 업데이트되었습니다.');
      },
    },
  };
  </script>
  
  <style scoped>
  .mypage-container {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    text-align: center;
    color: #004990;
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
  