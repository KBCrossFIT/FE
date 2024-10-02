<template>
    <div class="account-management">
      <section class="basic-info">
        <h2>계정 관리</h2>
        <div class="info-card">
          <div class="info">
            <h3 v-if="!isEditing">{{ name }}</h3>
            <input
              v-if="isEditing"
              type="text"
              v-model="newName"
              placeholder="이름을 입력하세요"
              required
            />
            <p v-if="!isEditing">
              <span v-if="isVerified">{{ email }} <span class="verified">인증 완료</span></span>
              <span v-else>{{ email }} <span class="not-verified">인증 대기중</span></span>
            </p>
            <input
              v-if="isEditing"
              type="email"
              v-model="newEmail"
              placeholder="이메일을 입력하세요"
              required
            />
          </div>
          <button class="edit-btn" @click="toggleEditMode">{{ isEditing ? '저장' : '수정' }}</button>
        </div>
        <div v-if="isEditing && !verificationSent" class="verification-section">
          <button @click="sendVerificationCode" class="send-verification-btn">인증번호 전송</button>
        </div>
        <div v-if="verificationSent" class="verification-code-section">
          <input type="text" v-model="verificationCode" placeholder="인증번호를 입력하세요" required />
          <button @click="verifyCode" class="verify-btn">인증하기</button>
        </div>
      </section>
      <section class="password-section">
        <h3>비밀번호</h3>
        <div class="password-info">
          <p>최근 업데이트: 2024-04-12</p>
          <button class="password-btn" @click="navigateToChangePassword">비밀번호 변경</button>
        </div>
      </section>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router'; // Import useRouter from vue-router
  
  // Reactive variables for name and email
  const name = ref('인성준');
  const email = ref('isjsjd0228@gmail.com');
  
  // Reactive variable to control editing state
  const isEditing = ref(false);
  
  // Variables for new name and email
  const newName = ref(name.value);
  const newEmail = ref(email.value);
  
  // Variables for verification code
  const verificationSent = ref(false);
  const verificationCode = ref('');
  const isVerified = ref(false); // To track if email is verified
  
  // Router instance
  const router = useRouter();
  
  // Function to toggle edit mode and save changes
  const toggleEditMode = () => {
    if (isEditing.value) {
      // If already in editing mode, prompt to send verification code
      if (!verificationSent.value) {
        // Prompt for sending verification code
        alert('인증번호를 전송하십시오.');
        return;
      }
  
      // Verify code before saving changes
      if (verificationCode.value !== '123456') { // Simulating a verification code
        alert('잘못된 인증번호입니다.');
        return;
      }
  
      // Save the changes
      name.value = newName.value;
      email.value = newEmail.value;
      isVerified.value = true; // Mark as verified after successful update
  
      // Reset the editing state after saving
      isEditing.value = false;
      verificationSent.value = false; // Reset the verification sent state
      verificationCode.value = ''; // Clear the verification code input
    } else {
      // Enter edit mode
      newName.value = name.value;
      newEmail.value = email.value;
      isEditing.value = true;
    }
  };
  
  // Function to send the verification code
  const sendVerificationCode = () => {
    // Here, you can implement the logic to send the verification code via email.
    alert('인증번호가 전송되었습니다.'); // Simulating the sending of the verification code
    verificationSent.value = true; // Set the state to indicate verification code was sent
  };
  
  // Function to verify the entered verification code
  const verifyCode = () => {
    if (verificationCode.value === '123456') { // Simulating a verification code
      alert('인증 완료! 변경 사항을 저장하십시오.');
    } else {
      alert('잘못된 인증번호입니다.');
    }
  };
  
  // Function to navigate to the Change Password component
  const navigateToChangePassword = () => {
    router.push({ name: 'ChangePW' }); // Adjust this according to your router configuration
  };
  </script>
  
  <style scoped>
  .account-management {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .basic-info {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
  }
  
  .info-card {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  
  .verified {
    color: green;
    margin-left: 10px;
  }
  
  .not-verified {
    color: orange;
    margin-left: 10px;
  }
  
  .edit-btn {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .verification-section {
    margin-top: 20px;
  }
  
  .send-verification-btn,
  .verify-btn {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .verification-code-section {
    margin-top: 10px;
  }
  
  input {
    width: calc(100% - 22px);
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    display: block; /* Ensure inputs take full width */
  }
  </style>
  