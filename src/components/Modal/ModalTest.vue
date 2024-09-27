<template>
    <div>
        <h2>투자 성향 분석 테스트</h2>
        <div class="question-container">
            <div class="question-text">
                {{ currentQuestion.question }}
                <!-- Display the current question -->
            </div>
            <div class="answers">
                <v-btn
                    v-for="(option, index) in currentQuestion.options"
                    :key="index"
                    @click="selectAnswer(option)"
                >
                    {{ option }}
                </v-btn>
            </div>
            <div class="navigation">
                <v-btn v-if="!isLastQuestion" class="ModalTest-btn" @click="nextQuestion">
                    다음 질문
                </v-btn>
                <v-btn v-else class="ModalTest-btn" @click="finishTest">테스트 완료</v-btn>
            </div>
        </div>
    </div>
</template>

<script>
import { questions } from '@/dummyQuestion.js'; // Import the questions from dummyQuestion.js

export default {
    data() {
        return {
            currentQuestionIndex: 0, // Track the current question
            questions, // Load all questions from dummyQuestion.js
        };
    },
    computed: {
        currentQuestion() {
            return this.questions[this.currentQuestionIndex]; // Get the current question object
        },
        isLastQuestion() {
            return this.currentQuestionIndex === this.questions.length - 1; // Check if this is the last question
        },
    },
    methods: {
        nextQuestion() {
            if (this.currentQuestionIndex < this.questions.length - 1) {
                this.currentQuestionIndex++;
            }
        },
        selectAnswer(option) {
            console.log('선택한 답변:', option); // Log the selected answer
            // Optionally handle answer selection, e.g., store it or process it
        },
        finishTest() {
            this.$emit('next'); // Emit 'next' event to switch to ModalTestEnd.vue
        },
    },
};
</script>
