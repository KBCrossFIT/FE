<template>
    <div class="signup-wrapper">
      <div class="signup-container">
        <div class="signup-box">
          <form @submit.prevent="handleSubmit" class="signup-form">
            <div class="form-group">
              <label for="username">아이디</label>
              <input
                type="text"
                id="username"
                placeholder="아이디"
                v-model="memberID"
                required
              />
            </div>
  
            <div class="form-group">
              <label for="displayName">사용자 이름</label>
              <input
                type="text"
                id="displayName"
                placeholder="사용자 이름"
                v-model="memberName"
                required
              />
            </div>
  
            <div class="form-group">
              <label for="password">비밀번호</label>
              <input
                type="password"
                id="password"
                placeholder="비밀번호"
                v-model="password"
                required
              />
            </div>
  
            <div class="form-group">
              <label for="confirmPassword">비밀번호 확인</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="비밀번호 확인"
                v-model="reEnteredPassword"
                required
              />
            </div>
  
            <div class="form-group">
              <label for="email">이메일 주소</label>
              <input
                type="email"
                id="email"
                placeholder="이메일 주소"
                v-model="email"
                required
              />
            </div>
  
            <div class="form-group">
              <label for="dob">생년월일</label>
              <div class="dob-container">
                <input type="date" id="dob" v-model="birth" required />
                <v-btn @click="openDatePicker">📅</v-btn>
              </div>
            </div>
  
            <div class="form-group">
              <label>성별</label>
              <v-radio-group v-model="gender" row>
                <v-radio
                  label="남"
                  value="남"
                  color="teal"
                  class="gender-radio"
                ></v-radio>
                <v-radio
                  label="여"
                  value="여"
                  color="teal"
                  class="gender-radio"
                ></v-radio>
              </v-radio-group>
            </div>
  
            <div class="form-group">
              <label>성향분석 하기</label>
              <v-btn
                @click="openModal"
                color="teal"
                large
                rounded
                elevation="8"
              >
                <v-icon left>mdi-star</v-icon> 테스트 시작
              </v-btn>
              <span v-if="!InvestMentTest" class="red-mark">❌</span>
              <span v-else class="green-mark">✅</span>
            </div>
  
            <button
              class="create-btn"
              type="submit"
              :disabled="!InvestMentTest"
            >
              회원가입
            </button>
          </form>
  
          <ModalTest
            :isOpen="isModalOpen"
            :InvestMentTest="InvestMentTest"
            :currentComponent="currentComponent"
            @close="handleClose"
            @finishTest="markTestAsFinished"
            @next="nextStep"
          />
  
          <div class="login-link">
            이미 계정이 있으신가요? <router-link to="/login">로그인</router-link>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Modal from '@/components/Modal/Modal.vue';
  import ModalTestStart from '@/components/Modal/ModalTestStart.vue';
  import ModalTest from '@/components/Modal/ModalTest.vue';
  import ModalTestEnd from '@/components/Modal/ModalTestEnd.vue';
  import { markRaw } from 'vue';
  import { registerUser } from '@/api/memberApi'; // Import your API function
  
  export default {
    components: {
      Modal,
      ModalTestStart,
      ModalTest,
      ModalTestEnd,
    },
    data() {
      return {
        memberID: '', // Changed to match DTO field
        memberName: '', // Changed to match DTO field
        password: '',
        reEnteredPassword: '',
        email: '',
        birth: null, // Changed to match DTO field
        gender: '남', // Default value set to '남'
        isModalOpen: false,
        currentComponent: markRaw(ModalTestStart),
        InvestMentTest: false,
      };
    },
    methods: {
      async handleSubmit() {
        if (this.password !== this.reEnteredPassword) {
          alert('비밀번호가 일치하지 않습니다.'); // Password mismatch alert
          return;
        }
  
        const userData = {
          memberID: this.memberID, // Updated field names
          email: this.email,
          memberName: this.memberName, // Updated field names
          password: this.password,
          reEnteredPassword: this.reEnteredPassword, // Updated field names
          birth: this.birth, // Updated field names
          gender: this.gender, // Updated field names
          InvestMentTest: this.InvestMentTest,
        };
  
        try {
          const result = await registerUser(userData); // Call the registerUser API
          console.log('회원가입 성공:', result);
          // You can add a redirect or other logic here
        } catch (error) {
          console.error('회원가입 실패:', error);
        }
      },
      openModal() {
        console.log('모달테스트 시작 창 열기');
        this.isModalOpen = true;
        this.currentComponent = markRaw(ModalTestStart);
      },
  
      handleClose() {
        this.isModalOpen = false;
        console.log('모달이 닫혔습니다.', this.isModalOpen);
      },
      nextStep() {
        if (this.currentComponent.__file.includes('ModalTestStart.vue')) {
          this.currentComponent = markRaw(ModalTest);
        } else if (this.currentComponent.__file.includes('ModalTest.vue')) {
          this.currentComponent = markRaw(ModalTestEnd);
        }
      },
      markTestAsFinished() {
        this.InvestMentTest = true;
        this.handleClose();
      },
  
      openDatePicker() {
        console.log('Open date picker');
      },
    },
  };
  </script>
  
  <style scoped>
  .signup-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 800px; /* Fixed width */
    height: 600px; /* Fixed height */
    background: linear-gradient(to bottom, #a0e0d2, #ffffff);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); /* Center the box */
  }
  
  .signup-container {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  
  .signup-box {
    background-color: rgba(255, 255, 255, 0.9);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 400px; /* Fixed width */
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
    width: 100%; /* Fill the width of the container */
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
  
  .dob-container {
    display: flex;
    align-items: center;
  }
  
  .dob-container input {
    width: calc(100% - 50px); /* Adjust width for the button */
    margin-right: 5px;
  }
  </style>
        