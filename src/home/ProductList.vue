<template>
  <section class="product-list">
    <h2>연령별 금융상품 추천</h2>
    <div class="age-tabs">
      <button class="active">20대</button>
      <button>30대</button>
      <button>40대</button>
      <button>50대</button>
    </div>

    <div class="product-grid">
      <!-- Product Card 1 -->
      <div class="product-card">
        <h3>KB 미국 대표성장주 (H)</h3>
        <p>해외 투자 상품</p>
      </div>
      <!-- Product Card 2 -->
      <div class="product-card">
        <h3>KB 글로벌 대표자산 분산 (H)</h3>
        <p>다양한 글로벌 자산에 투자</p>
      </div>
      <!-- Add more product cards as needed -->
    </div>
  </section>
</template>

<script>
export default {
  name: 'ProductListSection'
};
</script>

<style scoped>
.product-list {
  padding: 40px;
  background-color: #f0f8f4; /* Very light minty green */
}

.age-tabs {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}

.age-tabs button {
  padding: 10px 20px;
  border: 1px solid #2d6a4f; /* Minty green border */
  background-color: #f0f0f0;
  border-radius: 5px;
  cursor: pointer;
}

.age-tabs .active {
  background-color: #2d6a4f; /* Minty green background */
  color: white;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.product-card {
  background-color: white;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.product-card h3 {
  font-size: 16px;
  margin-bottom: 10px;
  color: #2d6a4f; /* Minty green color */
}
</style>
