<template>
    <div class="InvestmentTest-container">
        <div class="InvestmentTest-box">
            <h1>투자성향분석 페이지</h1>

            <!-- 진행 상황 표시 -->
            <div class="question-progress">
                질문 {{ currentQuestionIndex + 1 }} / {{ questions.length }}
            </div>

            <!-- 진행 바 -->
            <div class="progress-bar">
                <div
                    class="progress"
                    :style="{
                        width: ((currentQuestionIndex + 1) / questions.length) * 100 + '%',
                    }"
                ></div>
            </div>

            <!-- 질문과 답변 표시 -->
            <div class="InvestmentTest-query">
                <p>{{ currentQuestion.question }}</p>
                <p v-if="currentQuestion.description" class="description">
                    {{ currentQuestion.description }}
                </p>
                <div class="answers">
                    <ul>
                        <li
                            v-for="(option, index) in currentQuestion.options"
                            :key="index"
                            @click="selectAnswer(option, index)"
                            :class="{ selected: isSelected(index) }"
                        >
                            {{ index + 1 }}. {{ option }}
                        </li>
                    </ul>
                </div>
            </div>

            <!-- 네비게이션 버튼 -->
            <div class="navigation">
                <v-btn
                    v-if="currentQuestionIndex > 0"
                    class="InvestmentTest-btn"
                    @click="prevQuestion"
                    >이전 질문</v-btn
                >
                <v-btn
                    v-if="!isLastQuestion && currentQuestionIndex > 0"
                    class="InvestmentTest-btn"
                    @click="nextQuestion"
                    >다음 질문</v-btn
                >
            </div>

            <!-- 완료 버튼과 취소 버튼 -->
            <div class="navigation-End-btn">
                <v-btn
                    :disabled="!allQuestionsAnswered"
                    class="InvestmentTest-btn"
                    @click="finishTest"
                >
                    테스트 완료
                </v-btn>
                <v-btn class="InvestmentTest-btn" @click="closeTest">취소</v-btn>
            </div>
        </div>
    </div>
</template>

<script>
import { useAuthStore } from '@/store/authStore'; // Pinia store에서 로그인된 사용자 정보를 가져옵니다.
import instance from '@/api';
export default {
    data() {
        return {
            questions: [
                {
                    question: '1. 투자성향분석 시작',
                    options: ['알겠습니다!'],
                    scores: [0],
                    description: `투자성향 분석은 계정에 저장되어 내 투자성향 페이지를 통해 언제든지 접근 가능하며
                    별도의 기한 없이 언제든지 이용하실 수 있습니다. 분석 횟수에 제한은 없으며,
                    필요할 때마다 재분석이 가능합니다. 테스트를 완료하고 결과를 저장하신 후 성향을
                    변경하고자 할 경우, 다시 한 번 테스트를 진행하셔야 합니다. 본 분석은 총 점수를
                    기반으로 다섯 가지 투자 성향으로 분류되며, 이를 통해 고객님께 적합한 투자 전략을
                    제안해드립니다. 신중하고 정확한 답변을 통해 자신의 투자 성향을 명확히
                    파악해보시기 바랍니다.`,
                },
                {
                    question: '2. 고객님의 연령대가 어떻게 되십니까?',
                    options: ['19세 이하', '20세~40세', '41세~50세', '51세~64세', '65세 이상'],
                    scores: [4, 4, 3, 2, 1], // 각 답변의 점수
                },
                {
                    question: '3. 투자하려는 자금의 투자가능기간은 어떻게 되십니까?',
                    options: [
                        '6개월 미만',
                        '6개월 이상~1년 미만',
                        '1년 이상~2년 미만',
                        '2년 이상~3년 미만',
                        '3년 이상',
                    ],
                    scores: [1, 2, 3, 4, 5],
                },
                {
                    question: '4. 현재와 미래 소득에 대한 예상을 선택해 주십시오',
                    options: [
                        '현재 일정한 소득이 발생하고 있으며, 미래에도 현재 수준을 유지하거나 늘어날 것으로 예상',
                        '현재 일정한 소득이 발생하고 있으나, 미래에는 줄어들거나 불안정할 것으로 예상',
                        '현재 일정한 소득이 없으며, 연금이 주 소득임',
                    ],
                    scores: [3, 2, 1],
                },
                {
                    question: '5. 연간소득 금액이 어떻게 되십니까?',
                    options: [
                        '1천만원 미만',
                        '3천만원 이하',
                        '5천만원 이하',
                        '1억원 이하',
                        '1억원 초과',
                    ],
                    scores: [1, 2, 3, 4, 5],
                },
                {
                    question: '6. 전체 자산(부동산 포함) 중 금융자산 비중이 어떻게 되십니까?',
                    options: ['10% 이하', '20% 이하', '30% 이하', '40% 이하', '40% 초과'],
                    scores: [5, 4, 3, 2, 1],
                },
                {
                    question: '7. 투자 또는 이용해 본 적이 있는 금융투자상품',
                    options: [
                        '국채, 지방채, 보증채, MMF 등',
                        '금융채, 신용도가 높은 회사채, 채권형 펀드, 원금보장형 ELS 등',
                        '신용도 중간 등급의 회사채, 원금의 일부만 보장되는 ELS, 혼합형 펀드 등',
                        '주식, 원금이 보장되지 않는 ELS, 신용도가 낮은 회사채, 시장 수익률 수준의 수익을 추구하는 주식형 펀드 등',
                        'ELW, 선물옵션, 시장 수익률 이상의 수익을 추구하는 주식형 펀드, 파생상품 펀드, 주식 신용거래 등',
                    ],
                    scores: [1, 2, 3, 4, 5],
                },
                {
                    question:
                        '8. 금융투자상품(주식, 채권, 펀드, 선물/옵션 등) 투자 (가입) 기간 (투자했던 기간이 가장 긴 상품의 가입 기간)',
                    options: ['전혀 없음', '1년 미만', '3년 미만', '5년 미만', '5년 이상'],
                    scores: [1, 2, 3, 4, 5],
                },
                {
                    question:
                        '9. 일반적 투자목적이 어떻게 되십니까? ※ 기대수익이 높을수록 손실위험도 커짐',
                    options: [
                        '적극적 매매를 통한 수익을 원하며 원금을 초과하는 손실 위험도 감당 가능',
                        '적극적 매매를 통한 수익 실현 목적',
                        '시장(예: 주가지수) 가격 변동 추이와 비슷한 수준의 수익 실현',
                        '채권 이자·주식 배당 정도의 수익 실현 목적',
                        '기존 보유 자산에 대한 위험 헤지 목적',
                    ],
                    scores: [5, 4, 3, 2, 1],
                },
                {
                    question: '10. 금융투자상품 취득 및 처분 목적이 어떻게 되십니까?',
                    options: ['학비', '생활비', '주택마련', '자산증식', '채무상환'],
                    scores: [1, 2, 3, 4, 5],
                },
                {
                    question: '11. 금융지식 수준/이해도가 어떻게 되십니까?',
                    options: [
                        '금융투자상품에 투자해 본 경험이 없음',
                        '널리 알려진 금융투자상품(주식, 채권 및 펀드 등)의 구조 및 위험을 일정 부분 이해하고 있음',
                        '널리 알려진 금융투자상품(주식, 채권 및 펀드 등)의 구조 및 위험을 깊이 있게 이해하고 있음',
                        '파생상품을 포함한 대부분의 금융투자상품의 구조 및 위험을 이해하고 있음',
                    ],
                    scores: [1, 2, 3, 4],
                },
                {
                    question: '12. 기대이익 수준이 어떻게 되십니까?',
                    options: [
                        '원금 기준 ±10% 범위',
                        '원금 기준 ±20% 범위',
                        '원금 기준 ±50% 범위',
                        '원금 기준 ±100% 범위',
                    ],
                    scores: [1, 2, 3, 4],
                },
                {
                    question: '13. 감당할 수 있는 손실 수준',
                    options: [
                        '투자 원금 보전을 선호함',
                        '투자 원금에서 최소한의 손실만을 감당할 수 있음',
                        '투자 원금 중 일부의 손실을 감당할 수 있음',
                        '기대수익이 높다면 위험이 높아도 상관하지 않음',
                    ],
                    scores: [-2, 2, 4, 6], // 음수 값도 반영
                },
            ],
            currentQuestionIndex: 0,
            selectedAnswers: Array(13).fill(null), // 13개의 질문에 대한 답변을 저장
            totalScore: 0, // 총 점수를 저장
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
    async mounted() {
        const authStore = useAuthStore();
        // checkAuth가 완료된 후에 memberNum을 사용
        await authStore.checkAuth();
    },

    mounted() {
        this.$nextTick(() => {
            const questionElement = this.$el.querySelector('.InvestmentTest-query');
            if (questionElement) {
                questionElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    },
    methods: {
        selectAnswer(option, index) {
            // 선택된 답변의 인덱스를 저장
            this.selectedAnswers[this.currentQuestionIndex] = index;
            // 다음 질문으로 자동 이동 (0.2초 딜레이)
            if (!this.isLastQuestion) {
                setTimeout(() => {
                    this.nextQuestion();
                }, 200);
            }
        },
        isSelected(index) {
            return this.selectedAnswers[this.currentQuestionIndex] === index;
        },
        nextQuestion() {
            if (this.currentQuestionIndex < this.questions.length - 1) {
                this.currentQuestionIndex++;
            }
        },
        prevQuestion() {
            if (this.currentQuestionIndex > 0) {
                this.currentQuestionIndex--;
            }
        },
        finishTest() {
            // 선택된 답변의 점수를 합산
            this.totalScore = this.selectedAnswers.reduce((acc, selectedIndex, i) => {
                if (selectedIndex !== null) {
                    return acc + this.questions[i].scores[selectedIndex];
                }
                return acc;
            }, 0);
            // 점수를 백분율로 환산하고 정수로 변환
            const maxTotalScore = this.questions.reduce((acc, q) => acc + Math.max(...q.scores), 0);
            const finalScore = parseInt((this.totalScore / maxTotalScore) * 100, 10);
            // instance 객체를 사용하여 post 요청
            instance
                .post('/member/investPreference', {
                    investScore: finalScore,
                })
                .then(() => {
                    this.$router.push({
                        path: '/investment-test-end',
                        query: { score: finalScore },
                    });
                })
                .catch((error) => {
                    console.error('데이터 전송 중 오류가 발생했습니다:', error);
                });
        },
        closeTest() {
            this.$router.push('/'); // 취소 시 홈페이지로 이동
        },

        selectAnswer(option, index) {
            // 선택된 답변의 인덱스를 저장
            this.selectedAnswers[this.currentQuestionIndex] = index;

            // 다음 질문으로 자동 이동 (0.2초 딜레이)
            if (!this.isLastQuestion) {
                setTimeout(() => {
                    this.nextQuestion();
                    // 다음 질문 위치로 스크롤
                    this.$nextTick(() => {
                        const questionElement = this.$el.querySelector('.InvestmentTest-query');
                        if (questionElement) {
                            questionElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                    });
                }, 200);
            }
        },
    },
};
</script>

<style scoped>
.InvestmentTest-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    min-height: 100vh;
    box-sizing: border-box;
    background-color: #f5f5f5;
}

.InvestmentTest-box {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffffff;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 700px;
    min-height: 750px;
    box-sizing: border-box;
}

h1 {
    font-size: 2rem;
    margin-bottom: 20px;
    color: #333333;
    text-align: center;
}

.question-progress {
    font-size: 16px;
    margin-bottom: 10px;
    color: #555555;
    margin-bottom: 20px;
}

.progress-bar {
    width: 100%;
    height: 10px;
    background-color: #eee;
    border-radius: 5px;
    overflow: hidden;
    margin-bottom: 20px;
}

.progress {
    height: 100%;
    background-color: #3f51b5;
    transition: width 0.3s ease;
}

.InvestmentTest-query {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* 시작 위치 고정 */
    justify-content: flex-start; /* 시작 위치 고정 */
    margin-bottom: 20px;
    overflow: hidden; /* 아래로만 확장되게 */
}

.InvestmentTest-query p {
    font-size: 1.3rem;
    margin-bottom: 15px;
    color: #424242;
    text-align: left;
}

.answers {
    margin-top: 20px;
    width: 100%;
}

.answers ul {
    list-style-type: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.answers li {
    padding: 12px 20px;
    cursor: pointer;
    border-radius: 8px;
    background-color: #f0f0f0;
    transition: background-color 0.3s, color 0.3s, transform 0.2s;
    font-size: 1rem;
    color: #333333;
    display: flex;
    align-items: center;
    border: 2px solid transparent;
}

.answers li:hover {
    background-color: #e0e0e0;
}

.answers li.selected {
    background-color: #4caf50;
    color: white;
    border-color: #388e3c;
    transform: scale(1.02);
}

.navigation {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 100px;
}

.navigation-End-btn {
    position: absolute;
    bottom: 20px;
    right: 20px;
    display: flex;
    gap: 10px;
}

.v-btn {
    padding: 10px 20px;
    font-size: 1rem;
    border-radius: 8px;
    background-color: #4caf50;
    color: white;
    transition: background-color 0.3s;
}

.v-btn:hover {
    background-color: #388e3c;
}

.v-btn:disabled {
    background-color: #a5d6a7;
    cursor: not-allowed;
}

@media (max-width: 600px) {
    .InvestmentTest-box {
        padding: 20px;
    }

    h1 {
        font-size: 1.5rem;
    }

    .InvestmentTest-query p {
        font-size: 1rem;
    }

    .v-btn {
        padding: 8px 16px;
        font-size: 0.9rem;
    }

    .navigation-End-btn {
        bottom: 10px;
        right: 10px;
    }
}
</style>
