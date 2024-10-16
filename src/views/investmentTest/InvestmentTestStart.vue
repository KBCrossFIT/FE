<template>
    <!-- 로그인하지 않은 상태 -->
    <div v-if="!authStore.isAuthenticated" class="empty_login_data">
        <h1>로그인 정보 없음.</h1>
        <p>로그인하고 내 투자성향을 확인해보세요.</p>
        <router-link to="/login" class="btn btn-primary sidebar-link">
            <i class="fas fa-sign-in-alt icon"></i>
            <span class="menu-text"> 로그인하러 가기</span>
        </router-link>
    </div>

    <div v-else class="InvestmentTest-container">
        <div class="InvestmentTest-body">
            <div class="InvestmentTest-content">
                <h1>투자성향 분석하기</h1>
                <div class="InvestmentTest-text">
                    투자성향 분석은 계정에 저장되어 내 투자성향 페이지를 통해 언제든지 접근 가능하며
                    별도의 기한 없이 언제든지 이용하실 수 있습니다. 분석 횟수에 제한은 없으며,
                    필요할 때마다 재분석이 가능합니다. 테스트를 완료하고 결과를 저장하신 후 성향을
                    변경하고자 할 경우, 다시 한 번 테스트를 진행하셔야 합니다. 본 분석은 총 점수를
                    기반으로 다섯 가지 투자 성향으로 분류되며, 이를 통해 고객님께 적합한 투자 전략을
                    제안해드립니다. 신중하고 정확한 답변을 통해 자신의 투자 성향을 명확히
                    파악해보시기 바랍니다.
                </div>
                <br /><br />
                <v-btn
                    class="InvestmentTest-btn center-btn"
                    @click="navigateTo('/investment-test')"
                >
                    시작하기
                </v-btn>
                <v-btn class="InvestmentTest-btn bottom-right-btn" @click="openCancelDialog">
                    다음에 하기
                </v-btn>

                <!-- 확인 대화상자 추가_다음에 하기 누를 때 발생 -->
                <v-dialog v-model="dialog" max-width="400">
                    <v-card>
                        <v-card-title class="headline">확인</v-card-title>
                        <v-card-text>투자성향 분석을 취소하시겠습니까?</v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="green darken-1" text @click="closeDialog">취소</v-btn>
                            <v-btn color="red darken-1" text @click="confirmCancel">확인</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>
        </div>
    </div>
</template>

<script>
import { useAuthStore } from '@/store/authStore';

export default {
    name: 'InvestmentTestStart',
    data() {
        return {
            dialog: false,
        };
    },
    methods: {
        navigateTo(path) {
            this.$router.push(path);
        },
        openCancelDialog() {
            this.dialog = true;
        },
        closeDialog() {
            this.dialog = false;
        },
        confirmCancel() {
            this.dialog = false;
            this.navigateTo('/');
        },
    },

    computed: {
        authStore() {
            return useAuthStore();
        },
    },
};
</script>

<style scoped>
.InvestmentTest-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; /* Centers vertically */
    padding: 20px;
    width: 100%;
    background-color: #f0f0f0;
    height: 100vh; /* Full viewport height */
    margin: 0 auto; /* Centers horizontally */
}

.InvestmentTest-body {
    display: flex;
    justify-content: center;
    align-items: center; /* Centers content within body */
    width: 100%;
    height: 100%; /* Fill parent container */
}

.InvestmentTest-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px; /* Reduced padding to avoid left shift */
}

.InvestmentTest-text {
    white-space: normal; /* 기본 줄바꿈 사용 */
    line-height: 1.5; /* 줄 간격 조정 */
    text-align: center; /* 텍스트 중앙 정렬 */
    margin-top: 35px;
    width: 60%;
    letter-spacing: 0.05em;
}
.InvestmentTest-btn {
    width: 180px;
    padding: 10px;
    background-color: #4db6ac;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
    /* margin-left: 20px; 기존 여백 제거 */
}
.center-btn {
    align-self: center; /* 중앙 정렬 */
}
.bottom-right-btn {
    position: absolute;
    bottom: 20px;
    right: 20px;
    margin-left: 0; /* 불필요한 여백 제거 */
}
.InvestmentTest-btn:hover {
    background-color: #399d91;
}

.empty-test {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh; /* 화면 전체 높이에서 중앙 정렬 */
    text-align: center;
    color: #666;
}

.empty_login_data {
    position: absolute;
    top: 40%; /* 조금 위로 올림 */
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    padding: 50px; /* 여백을 살짝 늘림 */
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 350px; /* 필요에 따라 너비 조정 */
}

.empty_login_data h1 {
    margin-bottom: 20px;
    color: #343a40;
    font-size: 1.8rem; /* 글자 크기 키움 */
    font-weight: bold;
}

.empty_login_data p {
    margin-bottom: 20px;
    color: #6c757d;
    font-size: 1.2rem; /* 본문 글자 크기 조정 */
}

.empty_login_data .btn {
    font-size: 1.1rem; /* 버튼 글자 크기 조정 */
    padding: 10px 20px;
}
</style>
