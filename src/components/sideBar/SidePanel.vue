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
      <table v-else-if="data.length > 0" class="data-table">
        <thead>
        <tr>
          <th class="portfolio-name">포트폴리오 이름</th>
          <th class="return-rate">수익률</th>
          <th class="risk-level">위험등급</th>
          <th class="total-amount">총액</th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="portfolio in data"
            :key="portfolio.portfolioId"
            class="data-row"
            @click="goToPortfolioDetail(portfolio.portfolioId)"
        >
          <td>{{ portfolio.portfolioName }}</td>
          <td :class="{'positive-return': portfolio.expectedReturn > 0, 'negative-return': portfolio.expectedReturn < 0}">
            {{ portfolio.expectedReturn }}%
          </td>
          <td>{{ portfolio.riskLevel }}등급</td>
          <td>{{ portfolio.total }}원</td>
        </tr>
        </tbody>
      </table>
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
      <table v-else-if="data.length > 0" class="data-table cart-table">
        <thead>
        <tr>
          <th class="product-type">상품 종류</th>
          <th class="provider">제공자</th>
          <th class="product-name">상품 이름</th>
          <th class="return-rate">수익률</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in data" :key="item.productId" class="data-row">
          <td>{{ getProductTypeLabel(item.productType) }}</td>
          <td>{{ item.provider }}</td>
          <td class="product-name">{{ item.productName }}</td>
          <td :class="{'positive-return': item.expectedReturn > 0, 'negative-return': item.expectedReturn < 0}">
            {{ item.expectedReturn }}%
          </td>
        </tr>
        </tbody>
      </table>
      <p v-else>장바구니가 비어 있습니다.</p>
    </div>

    <!-- 최근 본 상품 섹션 -->
    <div v-if="section === 'RecentProductsSection'">
      <table v-if="data.length > 0" class="data-table">
        <thead>
        <tr>
          <th class="product-type">상품 종류</th>
          <th class="product-name">상품 이름</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in data" :key="item.productId" class="data-row">
          <td>{{ getProductTypeLabel(item.productType) }}</td>
          <td class="product-name">{{ item.productName }}</td>
        </tr>
        </tbody>
      </table>
      <p v-else>최근 본 상품이 없습니다.</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { useRouter } from 'vue-router';

const user = localStorage.getItem('user');

const props = defineProps({
  title: String,
  section: String,
  data: Array,
});

const router = useRouter();

const goToPortfolioDetail = (portfolioId) => {
  router.push(`/portfolio/${portfolioId}`);
};

const emit = defineEmits(['close']);

const getProductTypeLabel = (productType) => {
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
  width: 600px;
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

.data-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.data-table th,
.data-table td {
  padding: 8px 12px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.data-table th {
  font-weight: bold;
  color: #333;
}

/* 포트폴리오 섹션 열 간격 조정 */
.portfolio-name {
  min-width: 150px;
}

.return-rate {
  min-width: 70px;
}

.risk-level {
  min-width: 80px;
}

.total-amount {
  min-width: 140px;
}

.data-row {
  cursor: pointer;
}

.data-row:hover {
  background-color: #f5f5f5;
}

.positive-return {
  color: red;
}

.negative-return {
  color: blue;
}
</style>
