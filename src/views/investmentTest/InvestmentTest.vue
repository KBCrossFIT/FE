<template>
  <div class="InvestmentTest-container">
    <h1>투자성향 분석</h1>
    <!-- 진행 상황 표시 -->
    <div class="question-progress">{{ currentQuestionIndex + 1 }} / {{ questions.length }}</div>
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
      <div class="answers">
        <ul>
          <li
            v-for="(option, index) in currentQuestion.options"
            :key="index"
            @click="selectAnswer(option, index)"
            :class="{ selected: isSelected(option) }"
          >
            {{ index + 1 }}. {{ option }}
          </li>
        </ul>
      </div>
    </div>
    <!-- 네비게이션 버튼 -->
    <div class="navigation">
      <v-btn v-if="currentQuestionIndex > 0" class="InvestmentTest-btn" @click="prevQuestion">이전 질문</v-btn>
      <v-btn v-if="!isLastQuestion" class="InvestmentTest-btn" @click="nextQuestion">다음 질문</v-btn>
    </div>
    <!-- 완료 버튼과 취소 버튼 -->
    <div class="navigation-End-btn">
      <v-btn :disabled="!allQuestionsAnswered" class="InvestmentTest-btn" @click="finishTest"> 제출하기 </v-btn>

      <v-btn class="InvestmentTest-btn" @click="closeTest">취소</v-btn>
    </div>
  </div>
</template>

<script>
import instance from "@/api"; // 서버 요청을 위한 instance
import { useAuthStore } from "@/store/authStore"; // Pinia store에서 사용자 정보를 가져옵니다.

export default {
  data() {
    return {
      questions: [
        {
          question: "1. 고객님의 연령대가 어떻게 되십니까?",
          options: ["19세 이하", "20세~40세", "41세~50세", "51세~64세", "65세 이상"],
          scores: [4, 4, 3, 2, 1], // 각 답변의 점수
        },
        {
          question: "2. 투자하려는 자금의 투자가능기간은 어떻게 되십니까?",
          options: ["6개월 미만", "6개월 이상~1년 미만", "1년 이상~2년 미만", "2년 이상~3년 미만", "3년 이상"],
          scores: [1, 2, 3, 4, 5],
        },
        {
          question: "3. 현재와 미래 소득에 대한 예상을 선택해 주십시오",
          options: [
            "현재 일정한 소득이 발생하고 있으며, 미래에도 현재 수준을 유지하거나 늘어날 것으로 예상",
            "현재 일정한 소득이 발생하고 있으나, 미래에는 줄어들거나 불안정할 것으로 예상",
            "현재 일정한 소득이 없으며, 연금이 주 소득임",
          ],
          scores: [3, 2, 1],
        },
        {
          question: "4. 연간소득 금액이 어떻게 되십니까?",
          options: ["1천만원 미만", "3천만원 이하", "5천만원 이하", "1억원 이하", "1억원 초과"],
          scores: [1, 2, 3, 4, 5],
        },
        {
          question: "5. 전체 자산(부동산 포함) 중 금융자산 비중이 어떻게 되십니까?",
          options: ["10% 이하", "20% 이하", "30% 이하", "40% 이하", "40% 초과"],
          scores: [5, 4, 3, 2, 1],
        },
        {
          question: "6. 투자 또는 이용해 본 적이 있는 금융투자상품",
          options: [
            "국채, 지방채, 보증채, MMF 등",
            "금융채, 신용도가 높은 회사채, 채권형 펀드, 원금보장형 ELS 등",
            "신용도 중간 등급의 회사채, 원금의 일부만 보장되는 ELS, 혼합형 펀드 등",
            "주식, 원금이 보장되지 않는 ELS, 신용도가 낮은 회사채, 시장 수익률 수준의 수익을 추구하는 주식형 펀드 등",
            "ELW, 선물옵션, 시장 수익률 이상의 수익을 추구하는 주식형 펀드, 파생상품 펀드, 주식 신용거래 등",
          ],
          scores: [1, 2, 3, 4, 5],
        },
        {
          question:
            "7. 금융투자상품(주식, 채권, 펀드, 선물/옵션 등) 투자 (가입) 기간 (투자했던 기간이 가장 긴 상품의 가입 기간)",
          options: ["전혀 없음", "1년 미만", "3년 미만", "5년 미만", "5년 이상"],
          scores: [1, 2, 3, 4, 5],
        },
        {
          question: "8. 일반적 투자목적이 어떻게 되십니까? ※ 기대수익이 높을수록 손실위험도 커짐",
          options: [
            "적극적 매매를 통한 수익을 원하며 원금을 초과하는 손실 위험도 감당 가능",
            "적극적 매매를 통한 수익 실현 목적",
            "시장(예: 주가지수) 가격 변동 추이와 비슷한 수준의 수익 실현",
            "채권 이자·주식 배당 정도의 수익 실현 목적",
            "기존 보유 자산에 대한 위험 헤지 목적",
          ],
          scores: [5, 4, 3, 2, 1],
        },
        {
          question: "9. 금융투자상품 취득 및 처분 목적이 어떻게 되십니까?",
          options: ["학비", "생활비", "주택마련", "자산증식", "채무상환"],
          scores: [1, 2, 3, 4, 5],
        },
        {
          question: "10. 금융지식 수준/이해도가 어떻게 되십니까?",
          options: [
            "금융투자상품에 투자해 본 경험이 없음",
            "널리 알려진 금융투자상품(주식, 채권 및 펀드 등)의 구조 및 위험을 일정 부분 이해하고 있음",
            "널리 알려진 금융투자상품(주식, 채권 및 펀드 등)의 구조 및 위험을 깊이 있게 이해하고 있음",
            "파생상품을 포함한 대부분의 금융투자상품의 구조 및 위험을 이해하고 있음",
          ],
          scores: [1, 2, 3, 4],
        },
        {
          question: "11. 기대이익 수준이 어떻게 되십니까?",
          options: ["원금 기준 ±10% 범위", "원금 기준 ±20% 범위", "원금 기준 ±50% 범위", "원금 기준 ±100% 범위"],
          scores: [1, 2, 3, 4],
        },
        {
          question: "12. 감당할 수 있는 손실 수준",
          options: [
            "투자 원금 보전을 선호함",
            "투자 원금에서 최소한의 손실만을 감당할 수 있음",
            "투자 원금 중 일부의 손실을 감당할 수 있음",
            "기대수익이 높다면 위험이 높아도 상관하지 않음",
          ],
          scores: [-2, 2, 4, 6], // 음수 값도 반영
        },
      ],
      currentQuestionIndex: 0,
      selectedAnswers: Array(12).fill(null), // 선택된 답변을 저장
      selectedScores: Array(12).fill(null), // 각 질문의 점수를 저장
      totalScore: 0, // 총 점수
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
    selectAnswer(option, index) {
      // 선택된 답변 저장
      this.selectedAnswers[this.currentQuestionIndex] = option;
      // 선택된 답변에 해당하는 점수를 저장
      this.selectedScores[this.currentQuestionIndex] = this.currentQuestion.scores[index];

      // 자동으로 다음 질문으로 이동
      if (!this.isLastQuestion) {
        setTimeout(() => {
          this.nextQuestion();
        }, 200);
      }
    },
    isSelected(option) {
      return this.selectedAnswers[this.currentQuestionIndex] === option;
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
      // 총 점수 계산 (선택된 점수의 합산)
      this.totalScore = this.selectedScores.reduce((acc, score) => acc + score, 0);

      // 점수를 백분율로 환산하여 전송할 최종 점수 계산
      const finalScore = parseInt((this.totalScore / 51) * 100, 10);

      // 서버로 점수 전송
      instance
        .post("/member/investPreference", {
          investScore: finalScore, // 서버로 보낼 점수 데이터
        })
        .then(() => {
          // 전송 성공 시 페이지 이동
          this.$router.push({
            path: "/investment-test-end",
            query: { score: finalScore },
          });
        })
        .catch((error) => {
          console.error("데이터 전송 중 오류가 발생했습니다:", error);
        });
    },
    closeTest() {
      this.$router.push("/"); // 취소 시 메인 페이지로 이동
    },
  },
};
</script>
<style scoped>
.InvestmentTest-container {
  /* 화면의 중앙에 배치 */
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%); /* 중앙 정렬을 위해 사용 */

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  height: auto; /* 필요에 따라 높이 변경 */
  padding: 40px; /* 내부 여백 */
  background-color: #f0f0f0;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  /* 가로 너비 설정 */
  width: 100%; /* 너비를 100%로 설정하여 반응형 적용 */
  max-width: 1500px; /* 최대 너비를 800px로 제한 */
  min-width: 500px; /* 최소 너비를 300px로 설정 */
}

.question-progress {
  font-size: 18px;
  margin-bottom: 30px;
  color: #3f51b5;
}

.InvestmentTest-query p {
  font-size: 20px;
  margin-top: 60px;
  margin-bottom: 0px;

  color: #2e2e2e;
  text-align: center;
}

.answers ul {
  list-style-type: none;
  padding: 0;
  width: 100%;
}

.answers li {
  padding: 15px;
  cursor: pointer;
  border-radius: 8px;
  background-color: #ffffff;
  margin-bottom: 10px;
  font-size: 16px;
  color: #333;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.answers li:hover {
  background-color: #e0e0e0;
  transform: translateY(-3px);
}

.answers li.selected {
  background-color: #2a9d8f; /* 선택된 항목에 진한 배경색 */
  color: white;
  box-shadow: 0 4px 12px rgba(37, 66, 38, 0.3); /* 선택된 항목 강조 */
  border: 1px solid #2a9d8f;
}

.progress-bar {
  width: 50%;
  height: 10px;
  background-color: #ddd;
  margin: 2px;
  border-radius: 6px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background-color: #3f51b5;

  border-radius: 6px;
  transition: width 0.4s ease;

  /* 아래에 간격을 주기 위해 margin-bottom 추가 */
  margin-bottom: 20px; /* 원하는 간격 크기로 설정 */
}

.navigation {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  width: 50%;
}

.v-btn {
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #2a9d8f;
  color: white;
  border-radius: 6px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.v-btn:hover {
  background-color: #1f7268;
  box-shadow: 0 4px 14px rgba(56, 142, 60, 0.3);
}
</style>
