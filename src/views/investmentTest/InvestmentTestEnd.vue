<template>
    <div>
        <h1>투자분석 종료</h1>
        <div class="InvestmentTest-body">
            <div class="InvestmentTest-content">
                <div class="InvestmentTest-text">
                    고객님의 성실한 답변에 감사드리며, 답변해 주신 본 질문지에 기초해 고객님께
                    적합한 상품을 제공하도록 노력하겠습니다. 본 질문지에서 수집된 개인정보는
                    고객님께 적합한 상품을 제공하기 위한 기초자료만으로 활용할 예정이며 기밀로
                    보호될 것을 약속드립니다. 다음 화면에서 제공되는 투자자성향 분석 결과는
                    고객님께서 제공하신 정보를 바탕으로 분석되었으며, 거래목적,
                    투자기간·기대이익·기대손실을 고려한 위험에 대한 태도, 금융상품에 대한 이해도,
                    재산상황, 투자성상품의 취득·처분 경험, 연령 등에 비추어 적합하지 않은 상품은
                    투자권유가 불가합니다. 본인은 투자위험에 대한 본인의 성향이 올바르게 선택되어
                    있음을 확인합니다.
                </div>
                <Br />
                <v-btn class="InvestmentTest-btn" @click="navigateToMyInvestmentAnalyze">
                    결과보기
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script>
import { useAuthStore } from '@/store/authStore';

export default {
    data() {
        return {
            finalScore: 0,
            resultMessage: '',
        };
    },
    mounted() {
        const authStore = useAuthStore();

        // URL 쿼리에서 점수를 받아옴
        this.finalScore = parseFloat(this.$route.query.score) || 0;

        // 점수에 따라 성향 분류
        if (this.finalScore <= 20) {
            this.resultMessage = '안정형';
        } else if (this.finalScore > 20 && this.finalScore <= 40) {
            this.resultMessage = '안정추구형';
        } else if (this.finalScore > 40 && this.finalScore <= 60) {
            this.resultMessage = '위험중립형';
        } else if (this.finalScore > 60 && this.finalScore <= 80) {
            this.resultMessage = '적극투자형';
        } else {
            this.resultMessage = '공격투자형';
        }

        authStore.isTested = true;
    },
    methods: {
        navigateToMyInvestmentAnalyze() {
            // 점수와 함께 MyInvestmentAnalyze 페이지로 이동
            this.$router.push({
                path: '/my-investment-analyze',
                query: { score: this.finalScore },
            });
        },
    },
};
</script>

<style scoped>
.InvestmentTest-container {
    display: flex;
    flex-direction: column; /* 세로 정렬 */
    align-items: flex-start; /* 좌측 정렬 */
    justify-content: space-between; /* 상단과 하단 요소 배치 */
    padding: 20px; /* 좌우 여백 */
}

.InvestmentTest-body {
    display: flex;
    justify-content: center; /* 가운데 정렬 */
    margin-top: 20px;
    width: 100%;
    height: 540px;
}

.InvestmentTest-content {
    display: flex; /* flexbox 사용 */
    flex-direction: column; /* 세로 정렬 */
    align-items: center; /* 수평 중앙 정렬 */
    justify-content: center; /* 수직 중앙 정렬 */
    width: 100%; /* 가로 길이 전체 차지 */
    padding: 20px; /* 여백 추가 */
    background-color: #f0f0f0; /* 배경색 설정 */
    border-radius: 8px; /* 모서리 둥글게 */
}

.InvestmentTest-text {
    text-align: center;
    white-space: normal; /* 기본 줄바꿈 사용 */
    line-height: 1.5; /* 줄 간격 조정 */
    width: 60%;
}

.InvestmentTest-result {
    margin-top: 20px;
    text-align: center;
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
    margin-left: 20px;
}

.InvestmentTest-btn:hover {
    background-color: #399d91;
}
</style>
