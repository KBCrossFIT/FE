<template>
    <div>
        <h2>본 테스트 지문 표시</h2>

        <div class="InvestmentTest-query">
            <p>{{ currentQuestion.question }}</p>
            <div v-for="(option, index) in currentQuestion.options" :key="index">
                <p>{{ option }}</p>
            </div>
        </div>

        <v-btn class="ModalTest-btn" @click="nextQuestion"> 다음 문제 </v-btn>
        <v-btn class="ModalTest-btn" @click="closeModal">취소 </v-btn>
    </div>
</template>

<script>
import { questions } from '@/dummyQuestion.js';

export default {
    name: 'ModalTest',
    props: {
        questions: {
            type: Array,
            required: true,
            default: () => [],
        },
        currentQuestionIndex: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    data() {
        return {};
    },

    computed: {
        currentQuestion() {
            if (questions.length === 0 || this.currentQuestionIndex >= questions.length) {
                return {}; // Return an empty object if there's no valid question
            }
            return questions[this.currentQuestionIndex];
        },
    },

    methods: {
        setQuestions(newQuestions) {
            this.questions = newQuestions; // Update questions
        },
        closeModal() {
            console.log('모달 닫기 작동 확인');
            this.$emit('close'); // Emit close event to parent
        },
        nextQuestion() {
            if (this.currentQuestionIndex < questions.length - 1) {
                this.currentQuestionIndex++;
            } else {
                this.$emit('next');
            }
        },
    },
};
</script>
