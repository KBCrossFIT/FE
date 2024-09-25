<script>
import { questions } from '@/dummyQuestion.js'; // 질문 파일 가져오기

export default {
    name: 'MyInvestmentTest',
    data() {
        return {
            currentQuestionIndex: 0,
        };
    },
    computed: {
        currentQuestion() {
            return questions[this.currentQuestionIndex];
        },
    },
    methods: {
        navigateTo(path) {
            this.$router.push(path);
        },
        nextQuestion() {
            if (this.currentQuestionIndex < questions.length - 1) {
                this.currentQuestionIndex++;
            } else {
                this.navigateTo('/investment-test-end');
            }
        },
    },
};
</script>

<template>
    <div>
        <h1>투자성향분석 페이지</h1>
        <div class="InvestmentTest-query">
            <p>{{ currentQuestion.question }}</p>
            <div v-for="(option, index) in currentQuestion.options" :key="index">
                <p>{{ option }}</p>
            </div>
        </div>
        <v-btn class="InvestmentTest-btn" @click="nextQuestion"> 다음 문제 </v-btn>
    </div>
</template>

<style scoped></style>
