<template>
  <div class="InvestmentTest-container">
    <div class="MyInvestment-header">
      <h1>투자성향분석 시작</h1>
    </div>
    <div class="InvestmentTest-body">
      <div class="InvestmentTest-content">
        <div class="InvestmentTest-text">
          투자성향 분석은 계정에 저장되어 내 투자성향 페이지를 통해 언제든지
          접근 가능하며 별도의 기한 없이 언제든지 이용하실 수 있습니다. 분석
          횟수에 제한은 없으며, 필요할 때마다 재분석이 가능합니다. 테스트를
          완료하고 결과를 저장하신 후 성향을 변경하고자 할 경우, 다시 한 번
          테스트를 진행하셔야 합니다. 본 분석은 총 점수를 기반으로 다섯 가지
          투자 성향으로 분류되며, 이를 통해 고객님께 적합한 투자 전략을
          제안해드립니다. 신중하고 정확한 답변을 통해 자신의 투자 성향을 명확히
          파악해보시기 바랍니다.
        </div>
        <br /><br />
        <v-btn
          class="InvestmentTest-btn center-btn"
          @click="navigateTo('/investment-test')"
        >
          분석하기
        </v-btn>
        <v-btn
          class="InvestmentTest-btn bottom-right-btn"
          @click="openCancelDialog"
        >
          다음에 하기
        </v-btn>

        <!-- 확인 대화상자 추가_다음에 하기 누를 때 발생 -->
        <v-dialog v-model="dialog" max-width="400">
          <v-card>
            <v-card-title class="headline">확인</v-card-title>
            <v-card-text>투자성향 분석을 취소하시겠습니까?</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="closeDialog"
                >취소</v-btn
              >
              <v-btn color="red darken-1" text @click="confirmCancel"
                >확인</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>
  </div>
</template>

<script>
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
  position: relative; /* 자식 요소의 절대 위치를 위해 추가 */
}

.InvestmentTest-text {
  white-space: normal; /* 기본 줄바꿈 사용 */
  line-height: 1.5; /* 줄 간격 조정 */
  text-align: center; /* 텍스트 중앙 정렬 */
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
</style>
