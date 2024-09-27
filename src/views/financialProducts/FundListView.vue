<template>
    <div>
      <h1>Fund Products</h1>
      <div v-if="fundProducts && fundProducts.length > 0">
        <ul>
          <li v-for="fund in fundProducts" :key="fund.productId">
            <div class="fund-item">
              <h2>{{ fund.productNm }}</h2>
              <p><strong>Company:</strong> {{ fund.companyNm }}</p>
              <p><strong>Fund Type:</strong> {{ fund.fundType }}</p>
              <p><strong>Risk Level:</strong> {{ fund.riskLevel }}</p>
              <p><strong>Yield (1 year):</strong> {{ fund.yield1 }}%</p>
              <p><strong>Yield (3 years):</strong> {{ fund.yield3 }}%</p>
              <p><strong>Yield (6 years):</strong> {{ fund.yield6 }}%</p>
              <p><strong>Yield (12 years):</strong> {{ fund.yield12 }}%</p>
              <p><strong>Total Payoff Rate:</strong> {{ fund.totalPayoffRate }}%</p>
              <p><strong>Advanced Fee:</strong> {{ fund.advancedFee === 1 ? 'Yes' : 'No' }}</p>
              <p><strong>Hit:</strong> {{ fund.hit }}</p>
            </div>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>No fund products available.</p>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    name: 'FundListView',
    computed: {
      ...mapGetters(['getFundList']), // Vuex에서 펀드 리스트 상태 가져오기
      fundProducts() {
        return this.getFundList; // getter를 통해 펀드 리스트 반환
      }
    },
    created() {
      // 컴포넌트가 생성될 때 펀드 리스트 데이터 가져오기
      this.fetchFundList();
    },
    methods: {
      ...mapActions(['fetchFundList']), // Vuex에서 API 호출 액션 매핑
    },
  };
  </script>
  
  <style scoped>
  h1 {
    color: #2c3e50;
    margin-bottom: 20px;
  }
  ul {
    list-style-type: none;
    padding-left: 0;
  }
  li {
    margin-bottom: 15px;
    background-color: #f9f9f9;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  .fund-item {
    line-height: 1.8;
  }
  .fund-item h2 {
    margin: 0;
    color: #1e88e5;
  }
  </style>