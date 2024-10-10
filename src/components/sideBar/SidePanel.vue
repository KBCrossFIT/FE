<template>
  <div class="side-panel">
    <button @click="closePanel" class="close-button">Close</button>
    <h2>{{ title }}</h2>

    <!-- 포트폴리오 섹션 -->
    <div v-if="section === 'PortfolioSection'">
      <div v-if="user == null">
        <p>로그인 후 사용해주세요.</p>
        <router-link to="/login" class="sidebar-link">
          <i class="fas fa-sign-in-alt icon"></i>
          <span class="menu-text">로그인</span>
        </router-link>
      </div>
      <ul v-else-if="data.length > 0">
        <li v-for="portfolio in data" :key="portfolio.portfolioId">
          {{ portfolio.PortfolioName }} 수익률: {{portfolio.expectedReturn}} {{portfolio.riskLevel}}등급 총액: {{ portfolio.total }}원
        </li>
      </ul>
      <p v-else>포트폴리오 데이터가 없습니다.</p>
    </div>

    <!-- 장바구니 섹션 -->
    <div v-if="section === 'CartSection'">
      <div v-if="user == null">
        <p>로그인 후 사용해주세요.</p>
        <router-link to="/login" class="sidebar-link">
          <i class="fas fa-sign-in-alt icon"></i>
          <span class="menu-text">로그인</span>
        </router-link>
      </div>
      <ul v-else-if="data.length > 0">
        <li v-for="item in data" :key="item.productId">
          {{ getProductTypeLabel(item.productType) }} {{item.provider}} {{ item.productName }} {{ item.expectedReturn }}%
        </li>
      </ul>
      <p v-else>장바구니가 비어 있습니다.</p>
    </div>

    <!-- 최근 본 상품 섹션 -->
    <div v-if="section === 'RecentProductsSection'">
      <ul v-if="data.length > 0">
        <li v-for="item in data" :key="item.productId">
          {{ getProductTypeLabel(item.productType) }} {{ item.productName }}
        </li>
      </ul>
      <p v-else>최근 본 상품이 없습니다.</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const user = localStorage.getItem('user')

const props = defineProps({
  title: String,
  section: String,
  data: Array,
});

const emit = defineEmits(['close']);

const getProductTypeLabel = (productType, rsrvType) => {
  switch (productType) {
    case 'S':
      return '예/적금';
    case 'F':
      return '펀드';
    case 'B':
      return '채권';
    default:
      return '기타';
  }
};

const closePanel = () => {
  emit('close');
};
</script>

<style scoped>
.side-panel {
  position: fixed;
  right: 0;
  top: 0;
  width: 450px;
  height: 100vh;
  background-color: white;
  padding: 20px;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.3);
  z-index: 2000;
  overflow-y: auto;
}
.close-button {
  margin-bottom: 20px;
}
</style>
