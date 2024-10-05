<template> <!-- 포트폴리오 API/module 분리 페이지 -->
  <div>
    <h1>내 포트폴리오</h1>
    <ul>
      <li v-for="portfolio in portfolioList" :key="portfolio.portfolioId">
        {{ portfolio.portfolioId }}
        {{ portfolio.portfolioName }}
        {{ portfolio.creationDate }}
        {{ portfolio.total }}
        {{ portfolio.expectedReturn }}
        {{ portfolio.riskLevel }}
        {{ portfolio.memberNum }}
        <button @click="handleDeletePortfolio(portfolio.portfolioId)">삭제</button>
      </li>
    </ul>

    <h1>내 포트폴리오 구성 상품</h1>
    <ul>
      {{portfolioDetail}}
<!--      <li v-for="item in portfolioDetail.portfolioItems" :key="item.prnpmoductId">-->
<!--        {{ item.portfolioItemId }}-->
<!--        {{ item.portfolioId }}-->
<!--        {{ item.productId }}-->
<!--        {{ item.stockCode }}-->
<!--        {{ item.amount }}-->
<!--        {{ item.expectedReturn }}-->
<!--        {{ item.productType }}-->
<!--        {{ item.dailyPrice }}-->
<!--      </li>-->
    </ul>

    <!-- 상품 추가 폼 -->
    <div>
      <h2>포트폴리오 추가</h2>

      <!-- 포트폴리오 이름 입력 -->
      <input v-model="newPortfolio.portfolioName" placeholder="포트폴리오 이름" />

      <!-- 첫 번째 상품 항목 -->
      <h3>첫 번째 상품</h3>
      <input v-model.number="newPortfolioItems[0].productId" placeholder="상품 ID" />
      <input v-model="newPortfolioItems[0].stockCode" placeholder="주식 코드" />
      <input v-model.number="newPortfolioItems[0].amount" placeholder="상품 수량" />

      <!-- 두 번째 상품 항목 -->
      <h3>두 번째 상품</h3>
      <input v-model.number="newPortfolioItems[1].productId" placeholder="상품 ID" />
      <input v-model="newPortfolioItems[1].stockCode" placeholder="주식 코드" />
      <input v-model.number="newPortfolioItems[1].amount" placeholder="상품 수량" />

      <!-- 세 번째 상품 항목 -->
      <h3>세 번째 상품</h3>
      <input v-model.number="newPortfolioItems[2].productId" placeholder="상품 ID" />
      <input v-model="newPortfolioItems[2].stockCode" placeholder="주식 코드" />
      <input v-model.number="newPortfolioItems[2].amount" placeholder="상품 수량" />

      <!-- 포트폴리오 추가 버튼 -->
      <button @click="addPortfolio">포트폴리오 추가</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      newPortfolio: {
        portfolioName: "",
        portfolioItems: [],
      },
      newPortfolioItems: [
        { productId: null, stockCode: "", amount: null },
        { productId: null, stockCode: "", amount: null },
        { productId: null, stockCode: "", amount: null },
      ],
    };
  },
  computed: {
    ...mapGetters("portfolio", ["portfolioList", "portfolioDetail"]),
  },
  methods: {
    ...mapActions("portfolio", ["fetchPortfolioList", "postPortfolio", "deletePortfolio"]),

    async addPortfolio() {
      if (this.newPortfolio.portfolioName.trim()) {
        try {
          await this.postPortfolio(this.newPortfolio);
          this.resetNewPortfolio(); // 포트폴리오 추가 후 리셋
        } catch (error) {
          console.error("Error adding portfolio:", error);
        }
      } else {
        alert("포트폴리오 이름을 입력해주세요.");
      }
    },

    resetNewPortfolio() {
      this.newPortfolio = {
        portfolioName: "",
        portfolioItems: [],
      };
      this.newPortfolioItems = [
        { productId: null, stockCode: "", amount: null },
        { productId: null, stockCode: "", amount: null },
        { productId: null, stockCode: "", amount: null },
      ]; // 초기화
    },

    async handleDeletePortfolio(portfolioId) {
      if (confirm("정말 삭제하시겠습니까?")) {
        try {
          await this.deletePortfolio(portfolioId);
        } catch (error) {
          console.error("Error deleting portfolio:", error);
        }
      }
    },
  },
  async mounted() {
    try {
      await this.fetchPortfolioList();
    } catch (error) {
      console.error("Error loading portfolio list:", error);
    }
  },
};
</script>
