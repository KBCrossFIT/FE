<template>
<<<<<<< HEAD
  <section class="product-container">
    <div class="product-list">
      <h2>연령별 금융상품 추천</h2>
      <div class="age-tabs">
        <button
          :class="{ active: activeAge === '20대', hovered: hoverAge === '20대' }"
          @mouseover="setHoverAge('20대')"
          @mouseleave="resetHoverAge"
          @click="setActiveAge('20대')"
        >20대</button>
        
        <button
          :class="{ active: activeAge === '30대', hovered: hoverAge === '30대' }"
          @mouseover="setHoverAge('30대')"
          @mouseleave="resetHoverAge"
          @click="setActiveAge('30대')"
        >30대</button>
        
        <button
          :class="{ active: activeAge === '40대', hovered: hoverAge === '40대' }"
          @mouseover="setHoverAge('40대')"
          @mouseleave="resetHoverAge"
          @click="setActiveAge('40대')"
        >40대</button>
        
        <button
          :class="{ active: activeAge === '50대', hovered: hoverAge === '50대' }"
          @mouseover="setHoverAge('50대')"
          @mouseleave="resetHoverAge"
          @click="setActiveAge('50대')"
        >50대</button>
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
    </div>

    <div class="investment-section">
      <div class="investment-types">
        <button
          :class="{ active: activeInvestment === '공격투자형', hovered: hoverInvestment === '공격투자형' }"
          @mouseover="setHoverInvestment('공격투자형')"
          @mouseleave="resetHoverInvestment"
          @click="setActiveInvestment('공격투자형')"
        >공격투자형</button>
        
        <button
          :class="{ active: activeInvestment === '적극투자형', hovered: hoverInvestment === '적극투자형' }"
          @mouseover="setHoverInvestment('적극투자형')"
          @mouseleave="resetHoverInvestment"
          @click="setActiveInvestment('적극투자형')"
        >적극투자형</button>
        
        <button
          :class="{ active: activeInvestment === '위험중립형', hovered: hoverInvestment === '위험중립형' }"
          @mouseover="setHoverInvestment('위험중립형')"
          @mouseleave="resetHoverInvestment"
          @click="setActiveInvestment('위험중립형')"
        >위험중립형</button>
        
        <button
          :class="{ active: activeInvestment === '안전추구형', hovered: hoverInvestment === '안전추구형' }"
          @mouseover="setHoverInvestment('안전추구형')"
          @mouseleave="resetHoverInvestment"
          @click="setActiveInvestment('안전추구형')"
        >안전추구형</button>
        
        <button
          :class="{ active: activeInvestment === '안전형', hovered: hoverInvestment === '안전형' }"
          @mouseover="setHoverInvestment('안전형')"
          @mouseleave="resetHoverInvestment"
          @click="setActiveInvestment('안전형')"
        >안전형</button>
      </div>
      <p>여기에 각 투자형에 대한 설명이나 내용을 추가하세요.</p>
=======
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
>>>>>>> 6f5c9d18da20f694aec465366f4a5f5cd006b1a0
    </div>
  </section>
</template>

<script>
export default {
<<<<<<< HEAD
  name: 'ProductListSection',
  data() {
    return {
      activeAge: '20대',
      hoverAge: null,
      activeInvestment: '공격투자형',
      hoverInvestment: null,
    };
  },
  methods: {
    setActiveAge(age) {
      this.activeAge = age;
      this.hoverAge = null;
    },
    setHoverAge(age) {
      if (this.activeAge !== age) {
        this.hoverAge = age;
      }
    },
    resetHoverAge() {
      this.hoverAge = null;
    },
    setActiveInvestment(investment) {
      this.activeInvestment = investment;
      this.hoverInvestment = null;
    },
    setHoverInvestment(investment) {
      if (this.activeInvestment !== investment) {
        this.hoverInvestment = investment;
      }
    },
    resetHoverInvestment() {
      this.hoverInvestment = null;
    },
  },
=======
  name: 'ProductListSection'
>>>>>>> 6f5c9d18da20f694aec465366f4a5f5cd006b1a0
};
</script>

<style scoped>
<<<<<<< HEAD
body {
  transform: scale(0.8);
  transform-origin: 0 0;
  width: 125%; /* Prevents the page from clipping at the right */
}

.product-container {
  display: flex;
  justify-content: space-between;
  padding: 40px;
  background-color: #f9fafb;
}

.product-list {
  flex: 1;
  padding: 20px;
=======
.product-list {
  padding: 40px;
  background-color: #f0f8f4; /* Very light minty green */
>>>>>>> 6f5c9d18da20f694aec465366f4a5f5cd006b1a0
}

.age-tabs {
  display: flex;
  justify-content: center;
<<<<<<< HEAD
  gap: 15px;
=======
  gap: 20px;
>>>>>>> 6f5c9d18da20f694aec465366f4a5f5cd006b1a0
  margin-bottom: 20px;
}

.age-tabs button {
<<<<<<< HEAD
  padding: 10px 15px;
  border: 1px solid #0070f3;
  background-color: #ffffff;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  font-weight: bold;
}

.age-tabs .active {
  background-color: #0070f3;
  color: white;
}

.age-tabs .hovered {
  background-color: #0056b3;
=======
  padding: 10px 20px;
  border: 1px solid #2d6a4f; /* Minty green border */
  background-color: #f0f0f0;
  border-radius: 5px;
  cursor: pointer;
}

.age-tabs .active {
  background-color: #2d6a4f; /* Minty green background */
>>>>>>> 6f5c9d18da20f694aec465366f4a5f5cd006b1a0
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
<<<<<<< HEAD
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-card h3 {
  font-size: 18px;
  margin-bottom: 10px;
  color: #0070f3;
}

.investment-section {
  flex: 1;
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.investment-types {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

.investment-types button {
  padding: 10px 15px;
  border: 1px solid #0070f3;
  background-color: #ffffff;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  font-weight: bold;
}

.investment-types .active {
  background-color: #0070f3;
  color: white;
}

.investment-types .hovered {
  background-color: #0056b3;
  color: white;
=======
  border-radius: 5px;
}

.product-card h3 {
  font-size: 16px;
  margin-bottom: 10px;
  color: #2d6a4f; /* Minty green color */
>>>>>>> 6f5c9d18da20f694aec465366f4a5f5cd006b1a0
}
</style>
