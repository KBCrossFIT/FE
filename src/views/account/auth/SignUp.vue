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
                          v-model="username"
                          required
                      />
                  </div>

                  <div class="form-group">
                      <label for="displayName">사용자 이름</label>
                      <input
                          type="text"
                          id="displayName"
                          placeholder="사용자 이름"
                          v-model="displayName"
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
                          v-model="confirmPassword"
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
                          <input type="date" id="dob" v-model="dob" required />
                          <v-btn @click="openDatePicker">📅</v-btn> <!-- Calendar icon button -->
                      </div>
                  </div>

                  <div class="form-group">
                    <label>성별</label>
                    <v-radio-group v-model="gender" row>
                        <v-radio 
                            label="남자" 
                            value="man" 
                            color="teal" 
                            class="gender-radio"
                        ></v-radio>
                        <v-radio 
                            label="여자" 
                            value="woman" 
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
      <v-icon left>mdi-star</v-icon>  <!-- Add an icon to the left of the button text -->
      테스트 시작
    </v-btn>
    <span v-if="!InvestMentTest" class="red-mark">❌</span>
    <span v-else class="green-mark">✅</span>
</div>

                  <button class="create-btn" type="submit" :disabled="!InvestMentTest">
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
export default {
  components: {
      Modal,
      ModalTestStart,
      ModalTest,
      ModalTestEnd,
  },
  data() {
      return {
          username: '',
          displayName: '',
          password: '',
          confirmPassword: '',
          email: '',
          dob: null,
          gender: 'man',
          isModalOpen: false,
          currentComponent: markRaw(ModalTestStart),
          InvestMentTest: false,
      };
  },
  methods: {
      handleSubmit() {
          console.log(
              '회원가입 성공, Signing up with',
              this.username,
              this.displayName,
              this.password,
              this.confirmPassword,
              this.email,
              this.dob,
              this.gender,
              this.InvestMentTest
          );
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
          this.closeModal();
      },

      updateCurrentComponent(component) {
          this.currentComponent = component;
      },
      
      openDatePicker() {
          // Logic to open a date picker (if needed)
          console.log('Open date picker');
      },
  },
};
</script>

<style scoped>
.signup-wrapper {
    display: flex;
    justify-content: center;
    align-items: center; /* Center vertically */
    flex-direction: column;
    height: 100vh; /* Full viewport height */
    background: linear-gradient(to bottom, #a0e0d2, #ffffff); /* Minty gradient */
}

.signup-container {
    display: flex;
    justify-content: center;
    width: 100%; /* Full width */
}

.signup-box {
    background-color: rgba(255, 255, 255, 0.9); /* Slight transparency */
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 400px; /* Limit max width */
    width: 100%; /* Full width up to max width */
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

.dob-container {
    display: flex;
    align-items: center;
}

.dob-container input {
    width: calc(100% - 50px); /* Adjust width for the button */
    margin-right: 5px; /* Space between input and button */
}

.ModalTest-btn {
    padding: 10px;
    background-color: #4db6ac;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
</style>
