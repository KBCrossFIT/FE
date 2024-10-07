<template>
  <div>
    <h1>내 포트폴리오</h1>
    <ul>
      <li v-for="portfolio in portfolioList" :key="portfolio.productId">
        {{portfolio.portfolioId }}
        {{portfolio.portfolioName}}
        {{portfolio.creationDate}}
        {{portfolio.total}}
        {{portfolio.expectedReturn}}
        {{portfolio.riskLevel}}
        {{portfolio.memberNum}}
        <button @click="deletePortfolio(portfolio.portfolioId)">삭제</button>
      </li>
    </ul>

    <h1>내 포트폴리오 구성 상품</h1>
    <ul>
      <li v-for="item in portfolio.portfolioItems" :key="item.productId">
        {{item.portfolioItemId }}
        {{item.portfolioId}}
        {{item.productId}}
        {{item.stockCode}}
        {{item.amount}}
        {{item.expectedReturn}}
        {{item.productType}}
        {{item.dailyPrice}}
      </li>
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
export default {
  data() {
    return {
      portfolioList: [], // 최근 본 상품 리스트
      portfolio: { // 포트폴리오 데이터를 저장할 객체
        portfolioId: null,
        portfolioName: "",
        creationDate: null,
        total: 0,
        expectedReturn: 0,
        riskLevel: 0,
        memberNum: null,
        portfolioItems: [], // 포트폴리오 항목 리스트
        portion: {
          totalSaving: 0,
          totalBond: 0,
          totalFund: 0,
          totalStock: 0
        }
      },
      newPortfolio: { // 새 포트폴리오 입력을 위한 데이터 객체
        portfolioName: "",
        total: 0,
        memberNum: 1,
        portfolioItems: [], // 포트폴리오 항목 리스트
      },
      newPortfolioItems: [
        {
        productId:"",
        stockCode:"",
        amount: 0,
        },
        {
          productId:"",
          stockCode:"",
          amount: 0,
        },
        {
          productId:"",
          stockCode:"",
          amount: 0,
        },
      ]
    };
  },
  methods: {
    fetchPortfolioList() {
      fetch("/api/portfolio")
        .then((response) => response.json())
        .then((data) => {
          this.portfolioList = data;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    fetchPortfolio() {
      fetch("/api/portfolio/1")
        .then((response) => response.json())
        .then((data) => {
          this.portfolio = data;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    // 최근 본 상품 추가 (POST 요청)
    addPortfolio() {
      // 포트폴리오 항목 합산
      const totalAmount = this.newPortfolioItems.reduce((acc, item) => acc + item.amount, 0);

      // newPortfolio에 항목 추가 및 total 값 설정
      this.newPortfolio.portfolioItems = [...this.newPortfolioItems];
      this.newPortfolio.total = totalAmount;

      // POST 요청으로 서버에 전송
      fetch("/api/portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.newPortfolio) // 새로운 포트폴리오 정보 전송
      })
          .then((response) => {
            // 응답이 성공적이지 않으면 에러 처리
            if (!response.ok) {
              throw new Error("네트워크 에러");
            }
            // 응답이 비어 있지 않으면 JSON 파싱
            return response.text().then((text) => (text ? JSON.parse(text) : {}));
          })
          .then(() => {
            // 포트폴리오 추가 후 입력 필드 초기화 및 새 데이터 가져오기
            this.clearNewPortfolio();
            this.fetchPortfolio();
          })
          .catch((error) => {
            console.error("포트폴리오 추가 시 에러 발생: ", error);
          });
    },

    deletePortfolio(portfolioId) {
      fetch(`/api/portfolio/${portfolioId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          this.fetchPortfolioList();
        })
        .catch((error) => {
          console.error("포트폴리오 삭제시 에러 발생: ", error);
        });
    },

    // 입력 필드 초기화
    clearNewPortfolio() {
      this.newPortfolio = {
        portfolioName: "",
        total: 0,
        memberNum: 1,
        portfolioItems: []
      };
      this.newPortfolioItems = [
        { productId: "", stockCode: "", amount: 0 }, // 첫 번째 항목 초기화
        { productId: "", stockCode: "", amount: 0 }, // 두 번째 항목 초기화
        { productId: "", stockCode: "", amount: 0 }  // 세 번째 항목 초기화
      ];
    }
  },

  created() {
    this.fetchPortfolioList();
    this.fetchPortfolio();
  }
};
</script>