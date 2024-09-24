<template>
    <div class="changePW-container">
        <div class="changePW-header">
            <h1>회원가입</h1>
        </div>
        <div class="changePW-box">
            <form @submit.prevent="handleSubmit" class="changePW-form">
                <div class="form-group">
                    <label for="password"> 기존 비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="기존 비밀번호"
                        v-model="password"
                        required
                    />
                </div>

                <div class="form-group">
                    <label for="password2"> 새 비밀번호</label>
                    <input
                        type="password"
                        id="password2"
                        placeholder="새 비밀번호"
                        v-model="password2"
                        required
                    />
                </div>

                <div class="form-group">
                    <label for="confirmPassword"> 새 비밀번호 확인</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="새 비밀번호 확인"
                        v-model="confirmPassword"
                        required
                    />
                </div>

                <button class="changePW-btn" type="submit">비밀번호 변경</button>
                <v-btn color="teal" block @click="navigateTo('/mypage'), cancel()">취소</v-btn>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            password: '',
            password2: '',
            confirmPassword: '',
            user_pw: '1234',
        };
    },

    methods: {
        handleSubmit() {
            // 1. 기존 비밀번호 확인
            if (this.password !== this.user_pw) {
                alert('기존 비밀번호가 일치하지 않습니다.');
                return;
            }

            // 2. 새 비밀번호와 확인 비밀번호가 일치하는지 확인
            if (this.password2 !== this.confirmPassword) {
                alert('새 비밀번호가 일치하지 않습니다.');
                return;
            }

            // 비밀번호 변경 성공
            alert('비밀번호가 성공적으로 변경되었습니다.');
            console.log('새 비밀번호:', this.password2);
        },

        cancel() {
            // 취소 버튼을 눌렀을 때, 비밀번호 입력 필드 초기화
            this.password = '';
            this.password2 = '';
            this.confirmPassword = '';
        },
        navigateTo(path) {
            this.$router.push(path);
        },
    },
};
</script>

<style scoped>
.changePW-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: linear-gradient(
        to bottom,
        #e0f2f1,
        #ffffff
    ); /* Gradient from light mint to white */
    padding: 20px;
}

.changePW-header {
    margin-bottom: 20px;
}

.changePW-header h1 {
    font-size: 2.5rem;
    color: #4db6ac;
    text-align: center;
}

.changePW-box {
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

.changePW-btn {
    width: 100%;
    padding: 10px;
    background-color: #4db6ac;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
}

.changePW-btn:hover {
    background-color: #399d91;
}
</style>
