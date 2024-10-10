<template>
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

        <button
          :class="{ active: activeAge === '60대', hovered: hoverAge === '60대' }"
          @mouseover="setHoverAge('60대')"
          @mouseleave="resetHoverAge"
          @click="setActiveAge('60대')"
        >60대 이상</button>
      </div>

      <div class="product-grid">
        <!-- 연령대 추천 상품을 렌더링 -->
        <div class="product-card" v-for="(product, index) in ageGroupProducts" :key="index">
          <!-- 상품 렌더링 로직 -->
          <div v-if="product.isinCdNm && product.bondIsurNm">
            <h3>{{ product.isinCdNm }}</h3>
            <p>{{ product.bondIsurNm }}</p>
          </div>
          <div v-else-if="product.productNm && product.companyNm">
            <h3>{{ product.productNm }}</h3>
            <p>{{ product.companyNm }}</p>
          </div>
          <div v-else-if="product.savingProduct && product.savingProduct.finPrdtNm && product.savingProduct.korCoNm">
            <h3>{{ product.savingProduct.finPrdtNm }}</h3>
            <p>{{ product.savingProduct.korCoNm }}</p>
          </div>
          <div v-else>
            <h3>알 수 없는 상품</h3>
            <p>상품 데이터를 확인해주세요.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="investment-section">
      <h2>투자 성향별 금융상품 추천</h2>
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

      <div class="investment-grid">
        <!-- 투자 성향 추천 상품을 렌더링 -->
        <div class="product-card" v-for="(product, index) in investmentProducts" :key="index">
          <!-- 상품 렌더링 로직 -->
          <div v-if="product.isinCdNm && product.bondIsurNm">
            <h3>{{ product.bondIsurNm }}</h3>
            <p>{{ product.isinCdNm }}</p>
          </div>
          <div v-else-if="product.productNm && product.companyNm">
            <h3>{{ product.productNm }}</h3>
            <p>{{ product.companyNm }}</p>
          </div>
          <div v-else-if="product.savingProduct && product.savingProduct.finPrdtNm && product.savingProduct.korCoNm">
            <h3>{{ product.savingProduct.finPrdtNm }}</h3>
            <p>{{ product.savingProduct.korCoNm }}</p>
          </div>
          <div v-else>
            <h3>알 수 없는 상품</h3>
            <p>상품 데이터를 확인해주세요.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getTopProductsByAgeGroup, getTopProductsByPreference, getTopProductsBySelectedAgeGroup, getTopProductsBySelectedPreference } from '@/api/hit';

export default {
  name: 'ProductListSection',
  data() {
    return {
      activeAge: '20대',
      hoverAge: null,
      activeInvestment: '위험중립형',
      hoverInvestment: null,
      ageGroupProducts: [],
      investmentProducts: [],
    };
  },
  methods: {
    setActiveAge(age) {
      this.activeAge = age;
      this.hoverAge = null;
      const ageGroup = this.convertAgeToNumber(age);
      this.fetchAgeGroupProducts(ageGroup, true);
      // 선택한 연령대를 localStorage에 저장
      localStorage.setItem('selectedAgeGroup', age);
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
      const preference = this.convertInvestmentToNumber(investment);
      this.fetchInvestmentProducts(preference, true);
      // 선택한 투자 성향을 localStorage에 저장
      localStorage.setItem('selectedInvestmentType', investment);
    },
    setHoverInvestment(investment) {
      if (this.activeInvestment !== investment) {
        this.hoverInvestment = investment;
      }
    },
    resetHoverInvestment() {
      this.hoverInvestment = null;
    },
    async fetchAgeGroupProducts(ageGroup, skipAuth = false) {
      try {
        const response = await getTopProductsBySelectedAgeGroup(ageGroup, skipAuth);
        this.ageGroupProducts = response.slice(0, 3); // 최대 3개까지만 가져오기
      } catch (error) {
        console.error('Error fetching top products for age group:', error);
      }
    },
    async fetchInvestmentProducts(preference, skipAuth = false) {
      try {
        const response = await getTopProductsBySelectedPreference(preference, skipAuth);
        this.investmentProducts = response.slice(0, 3);
      } catch (error) {
        console.error('Error fetching top products for preference:', error);
      }
    },
    convertAgeToNumber(age) {
      const ageMapping = {
        '20대': 20,
        '30대': 30,
        '40대': 40,
        '50대': 50,
        '60대': 60,
      };
      return ageMapping[age] || 20;
    },
    convertInvestmentToNumber(investment) {
      const investmentMapping = {
        '안전형': 1,
        '안전추구형': 2,
        '위험중립형': 3,
        '적극투자형': 4,
        '공격투자형': 5,
      };
      return investmentMapping[investment] || 5;
    },
  },
  async mounted() {
    // 기본 연령대와 투자 성향에 맞는 데이터를 가져옴
    try {
      const ageResponse = await getTopProductsByAgeGroup();
      const investmentResponse = await getTopProductsByPreference();

      if (ageResponse) {
        this.ageGroupProducts = ageResponse.slice(0, 3);
      }
      if (investmentResponse) {
        this.investmentProducts = investmentResponse.slice(0, 3);
      }
    } catch (error) {
      console.error('Error during initial load:', error);
    }
  },
};
</script>

<style scoped>
.product-container {
  display: flex;
  justify-content: space-between;
  padding: 40px;
  background-color: #f9fafb;
}

.product-list {
  flex: 1;
  padding: 20px;
}

.age-tabs {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
}

.age-tabs button {
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
  color: white;
}

.product-grid,
.investment-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.product-card {
  background-color: white;
  padding: 20px;
  border: 1px solid #ddd;
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
}
</style>