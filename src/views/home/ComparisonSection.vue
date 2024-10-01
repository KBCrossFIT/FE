<template>
  <div class="all">
    <section class="comparison">
      <div class="comparison-item">
        <h3>국내 주요 금융상품비교</h3>
        <p>국내 금융상품을 쉽게 비교하고 선택할 수 있습니다.</p>
      </div>
      <div class="comparison-item">
        <h3>나만의 투자 전략</h3>
        <p>투자 전략을 세우고 원하는 금융상품을 추천받으세요.</p>
      </div>
      <div class="comparison-item">
        <h3>광고 없는 비교</h3>
        <p>광고 없이 다양한 금융상품 정보를 제공합니다.</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ComparisonSection',
  components: {},
};
</script>

<style scoped>
.all {
  background-color: #d0f5ed;
}
.comparison {
  display: flex;
  justify-content: space-around;
  padding: 40px;
  background-color: #f0f8f4; /* Very light minty green */
}

.comparison-item {
  text-align: center;
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
</style>
