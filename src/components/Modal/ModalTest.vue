<template>
    <div v-if="isOpen" class="modal">
        <div class="modal-content">
            <span class="close" @click="closeModal">&times;</span>
            <div v-if="step === 'start'">
                <h2>테스트 시작 설명</h2>
                <div class="InvestmentTest-body">
                    <div class="InvestmentTest-content">
                        <div class="InvestmentTest-text">
                            투자성향분석 결과는 12개월간 재사용이 가능합니다. 다만 당일이 아닐 경우
                            재사용을 하더라도 일부 문항에 대한 답변은 필수입니다...
                        </div>
                        <v-btn class="ModalTest-btn" @click="startTest">시작하기</v-btn>
                        <v-btn class="ModalTest-btn" @click="closeModal">취소</v-btn>
                    </div>
                </div>
            </div>

            <div v-else-if="step === 'test'">
                <h2>투자 성향 분석 테스트</h2>
                <v-progress-linear :model-value="progress" :height="9"></v-progress-linear>

                <div class="question-container">
                    <div class="question-progress">
                        질문 {{ currentQuestionIndex + 1 }} / {{ questions.length }}
                    </div>
                    <div class="question-text">{{ currentQuestion.question }}</div>
                    <div class="answers">
                        <v-btn
                            v-for="(option, index) in currentQuestion.options"
                            :key="index"
                            :class="{ selected: selectedAnswers.includes(option) }"
                            @click="selectAnswer(option)"
                        >
                            {{ option }}
                        </v-btn>
                    </div>
                    <div class="navigation">
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
                        <v-btn v-else-if="isLastQuestion" class="ModalTest-btn" @click="finishTest">
                            테스트 완료
                        </v-btn>
                        <v-btn class="ModalTest-btn" @click="closeModal">취소</v-btn>
                    </div>
                </div>
            </div>

            <div v-else-if="step === 'end'">
                <h2>테스트 완료</h2>
                <div class="test-end-message">
                    투자 성향 분석이 완료되었습니다. 결과를 확인하세요.
                </div>
                <v-btn class="ModalTest-btn" @click="closeModal">완료</v-btn>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, defineComponent, watch } from 'vue';

export default defineComponent({
    props: {
        isOpen: {
            type: Boolean,
            required: true,
        },
    },
    setup(props, { emit }) {
        const step = ref('start'); // Tracks which step the modal is in: 'start', 'test', 'end'
        const currentQuestionIndex = ref(0);
        const selectedAnswers = ref([]); // Stores selected answers for the current question
        const questionsList = questions;

        // Computed properties
        const currentQuestion = computed(() => questions[currentQuestionIndex.value]);
        const isLastQuestion = computed(() => currentQuestionIndex.value === questions.length - 1);
        const progress = computed(
            () => ((currentQuestionIndex.value + 1) / questions.length) * 100
        );

        // Method to start the test
        const startTest = () => {
            step.value = 'test'; // Move to the test part of the modal
        };

        // Method to go to the next question
        const nextQuestion = () => {
            if (currentQuestionIndex.value < questions.length - 1) {
                currentQuestionIndex.value++;
                selectedAnswers.value = []; // Clear selected answers for the next question
            }
        };

        // Method to go to the previous question
        const prevQuestion = () => {
            if (currentQuestionIndex.value > 0) {
                currentQuestionIndex.value--;
                selectedAnswers.value = []; // Clear selected answers for the previous question
            }
        };

        // Method to select an answer
        const selectAnswer = (option) => {
            if (!selectedAnswers.value.includes(option)) {
                selectedAnswers.value.push(option);
                nextQuestion();
            }
        };

        // Method to finish the test
        const finishTest = () => {
            step.value = 'end'; // Move to the end part of the modal
            emit('finishTest'); // Emit event to parent component
        };

        // Method to close the modal
        const closeModal = () => {
            emit('close');
            resetModal(); // Reset the modal state
        };

        // Method to reset the modal state
        const resetModal = () => {
            step.value = 'start'; // Reset to start
            currentQuestionIndex.value = 0; // Reset questions
            selectedAnswers.value = []; // Clear selected answers
        };

        // Watch for changes in the modal's open state to reset if necessary
        watch(
            () => props.isOpen,
            (newValue) => {
                if (!newValue) {
                    resetModal();
                }
            }
        );

        return {
            step,
            currentQuestionIndex,
            selectedAnswers,
            currentQuestion,
            isLastQuestion,
            progress,
            startTest,
            nextQuestion,
            prevQuestion,
            selectAnswer,
            finishTest,
            closeModal,
            questions: questionsList,
        };
    },
});
</script>

<style scoped>
.modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 500px;
}

.close {
    float: right;
    cursor: pointer;
}

.InvestmentTest-body,
.question-container {
    margin: 20px 0;
}

.ModalTest-btn {
    margin: 10px 5px;
}

.selected {
    background-color: lightblue;
}
</style>
