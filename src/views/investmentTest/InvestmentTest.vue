<template>
    <div class="InvestmentTest-container">
        <div class="MyInvestment-header">
            <h1>투자성향분석</h1>
        </div>
        <div class="InvestmentTest-body">
            <div class="InvestmentTest-content">
                <div class="question-progress">
                    질문 {{ currentQuestionIndex + 1 }} / {{ questions.length }}
                </div>
                <div class="question-text">{{ currentQuestion.question }}</div>
                <div class="answers">
                    <ul>
                        <li
                            v-for="(option, index) in currentQuestion.options"
                            :key="index"
                            @click="selectAnswer(option)"
                            :class="{ selected: isSelected(option) }"
                        >
                            {{ index + 1 }}. {{ option }}
                        </li>
                    </ul>
                </div>
                <div class="navigation">
                    <div class="navigation-buttons">
                        <v-btn
                            v-if="currentQuestionIndex > 0"
                            class="ModalTest-btn"
                            @click="prevQuestion"
                        >
                            이전 질문
                        </v-btn>
                        <v-btn v-if="!isLastQuestion" class="ModalTest-btn" @click="nextQuestion">
                            다음 질문
                        </v-btn>
                    </div>
                    <div class="navigation-End-btn">
                        <v-btn
                            :disabled="!allQuestionsAnswered"
                            class="ModalTest-btn"
                            @click="finishTest"
                        >
                            테스트 완료
                        </v-btn>
                        <v-btn class="ModalTest-btn" @click="closeModal">취소</v-btn>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { questions } from '@/dummyQuestion.js';

export default {
    data() {
        return {
            questions,
            currentQuestionIndex: 0,
            selectedAnswers: Array(questions.length).fill(null),
        };
    },
    computed: {
        currentQuestion() {
            return this.questions[this.currentQuestionIndex];
        },
        isLastQuestion() {
            return this.currentQuestionIndex === this.questions.length - 1;
        },
        allQuestionsAnswered() {
            return this.selectedAnswers.every((answer) => answer !== null);
        },
    },
    methods: {
        isSelected(option) {
            return this.selectedAnswers[this.currentQuestionIndex] === option;
        },
        selectAnswer(option) {
            this.selectedAnswers[this.currentQuestionIndex] = option;

            // 마지막 질문이 아닐 경우에만 0.2초 후에 다음 질문으로 이동
            if (!this.isLastQuestion) {
                setTimeout(() => {
                    this.nextQuestion();
                }, 200); // 200ms = 0.2초
            }
        },
        nextQuestion() {
            if (this.currentQuestionIndex < this.questions.length - 1) {
                this.currentQuestionIndex++;
            } else {
                this.finishTest(); // 마지막 질문일 때는 테스트 완료 페이지로 이동
            }
        },
        prevQuestion() {
            if (this.currentQuestionIndex > 0) {
                this.currentQuestionIndex--;
            }
        },
        finishTest() {
            this.$router.push('/investment-test-end');
        },
        closeModal() {
            this.$emit('close');
        },
    },
};
</script>

<style scoped>
.InvestmentTest-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    height: 100%;
    padding: 20px;
}

.InvestmentTest-body {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    width: 100%;
    height: 540px;
}

.InvestmentTest-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 20px;
    background-color: #f0f0f0;
    border-radius: 8px;
}

.question-progress {
    font-size: 16px;
    margin: 10px 0;
}

.question-text {
    font-size: 18px;
    margin: 20px 0;
}

.answers ul {
    list-style-type: none;
    padding: 0;
}

.answers li {
    padding: 10px;
    cursor: pointer;
}

.selected {
    background-color: #3f51b5;
    color: white;
}

.navigation {
    margin-top: 20px;
}

.ModalTest-btn {
    margin: 5px;
    background-color: #4db6ac;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.ModalTest-btn:hover {
    background-color: #399d91;
}
</style>
