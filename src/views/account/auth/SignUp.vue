<template>
    <div class="signup-wrapper">
        <div class="signup-container">
            <div class="signup-header">
                <h1>회원가입</h1>
            </div>
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
                        <input type="date" id="dob" v-model="dob" />
                    </div>

                    <div class="form-group">
                        <label>성별</label>
                        <div class="gender-radio">
                            <label
                                ><input type="radio" name="gender" value="man" v-model="gender" />
                                남자</label
                            >
                            <label
                                ><input type="radio" name="gender" value="woman" v-model="gender" />
                                여자</label
                            >
                        </div>
                    </div>

                    <div class="form-group">
                        <label>성향분석 하기</label>
                        <v-btn @click="openModal">테스트 시작</v-btn>
                        <span v-if="!InvestMentTest" class="red-mark">❌</span>
                        <span v-else class="green-mark">✅</span>
                    </div>

                    <button class="create-btn" type="submit" :disabled="!InvestMentTest">
                        회원가입
                    </button>
                </form>

                <Modal
                    ref="modal"
                    :isOpen="isModalOpen"
                    :currentComponent="currentComponent"
                    @close="handleClose"
                    @finished="InvestMentTest = true"
                    @update:currentComponent="updateCurrentComponent"
                    @investMentTestStarted="InvestMentTest = true"
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
import ModalTestStart from '@/components/Modal/ModalTestStart.vue'; // Test start component
import ModalTest from '@/components/Modal/ModalTest.vue'; // Main test component
import ModalTestEnd from '@/components/Modal/ModalTestEnd.vue'; // Test end component
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
            questions: [],
            currentQuestionIndex: 0, // Initialize current question index
        };
    },
    methods: {
        handleSubmit() {
            // Add your form submission logic here
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
            this.isModalOpen = true;
            this.currentComponent = markRaw(ModalTestStart);
        },

        handleClose() {
            this.isModalOpen = false; // 모달을 닫습니다.
            console.log('모달이 닫혔습니다.', this.isModalOpen); // 닫힘 확인용 로그
        },
        nextStep() {
            console.log('nextStep 호출됨');
            if (this.currentComponent.__file.includes('ModalTestStart.vue')) {
                console.log('현재 ModalTestStart에서 ModalTest로 이동');
                this.currentComponent = markRaw(ModalTest); // Move to the next component

                // Set questions prop for ModalTest
                this.$nextTick(() => {
                    if (this.$refs.modal.currentComponentRef) {
                        this.$refs.modal.currentComponentRef.setQuestions(this.questions);
                        this.$refs.modal.currentComponentRef.currentQuestionIndex =
                            this.currentQuestionIndex;
                    }
                });
            } else if (this.currentComponent.__file.includes('ModalTest.vue')) {
                console.log('현재 ModalTest에서 ModalTestEnd로 이동');
                this.currentComponent = markRaw(ModalTestEnd); // Move to the end component
            }

            console.log('현재 컴포넌트:', this.currentComponent);
        },

        updateCurrentComponent(component) {
            this.currentComponent = component; // 부모 컴포넌트의 currentComponent 업데이트
        },
    },
};
</script>

<style scoped>
.signup-wrapper {
    display: flex;
    justify-content: center; /* Center content horizontally */
    align-items: flex-start; /* Align to the start vertically */
    flex-direction: column; /* Stack children vertically */
    flex: 1; /* Allow the wrapper to grow within the layout */
}

.signup-container {
    display: flex;
    width: 100%;
    margin: 0 auto;
    background: linear-gradient(to bottom, #e0f2f1, #ffffff);
    align-items: center;
    flex-direction: column;
    justify-content: center;
    height: 100%;
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
.ModalTest-btn {
    padding: 10px;
    background-color: #4db6ac;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
</style>
