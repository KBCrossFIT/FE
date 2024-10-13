<template>
  <section class="comparison">
    <div class="comparison-item">
      <img
        src="@/assets/img/mainicon-Lcongeek26.png"
        alt="비교 이미지"
        class="comparison-image1"
      />
      <h3>한눈에 상품 비교</h3>
      <div>
        금융상품들을 장바구니에 담아서 <br />
        나에게 맞는 상품은 무엇인지<br />
        한눈에 비교해보세요.
      </div>
    </div>
    <div class="comparison-item">
      <img
        src="@/assets/img/mainicon-VectorPortal.png"
        alt="비교 이미지"
        class="comparison-image2"
      />
      <h3>투자성향 기반 포트폴리오 추천</h3>
      <div>
        나의 투자 성향을 확인하고 <br />
        성향에 맞는 다양한 추천을 통해 <br />
        나만의 포트폴리오를 만들어 보세요.
      </div>
    </div>
    <div class="comparison-item">
      <img
        src="@/assets/img/mainicon-Freepik.png"
        alt="비교 이미지"
        class="comparison-image3"
      />
      <h3>페르소나 챗봇과의 투자 상담</h3>
      <div>
        나만의 투자 조언자를 만나보세요! <br />
        페르소나 챗봇과 대화를 통해 유명 투자자들의<br />
         전략과 팁을 쉽게 얻을 수 있습니다.
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ComparisonSection',
  components: {},
};
</script>

<style scoped>
.comparison {
  display: flex;
  gap: 146px;
  padding: 60px;
  padding-left: 100px;
  position: relative;
  top: -1px;
  justify-content: center;
  border: 1px solid #ddd;
  height: 425px;
}

.comparison-item {
  text-align: center;
  flex: 1;
}

.comparison-item h3 {
  font-size: 18px;
  margin-bottom: 10px;
  color: #2d6a4f; /* Minty green color */
}

.comparison-item p {
  font-size: 16px;
  color: #333;
}
/* 이미지 크기 조절 */
.comparison-image1,
.comparison-image2,
.comparison-image3 {
  width: 100px; /* 원하는 크기로 설정 */
  height: auto;
  margin-bottom: 30px; /* 이미지와 텍스트 사이 간격 */
}
</style>
