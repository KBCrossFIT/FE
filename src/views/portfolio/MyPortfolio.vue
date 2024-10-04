<template>
  <div class="MyPortfolio-container">
    <h1>내 포트폴리오 리스트 페이지</h1>
    <div class="MyPortfolio-DataTable">
      <v-data-table
        v-model="selected"
        :items="filteredPortfolios"
        item-value="PortfolioName"
        show-select
        :headers="headers"
        item-key="id"
      >
        <!-- 전체 선택 체크박스 -->
        <template v-slot:header>
          <tr>
            <v-checkbox v-model="allSelected" @change="toggleSelectAll" />
          </tr>
        </template>

        <!-- 데이터 항목 -->
        <template v-slot:item="{ item }">
          <tr>
            <td>
              <v-checkbox v-model="selected" :value="item.PortfolioName" />
            </td>
            <td class="NameCursor" @click="goToPortfolioDetail(item.id)">
              {{ item.PortfolioName }}
            </td>
            <td>{{ item.ExpectedReturn }}%</td>
            <td>{{ item.RiskLevel }}</td>
          </tr>
        </template>
      </v-data-table>
    </div>
    <div class="MyPortfolio-btn">
      <v-btn @click="goToCreatePortfolio">포트폴리오 만들러 가기</v-btn>
      <v-btn @click="deleteSelectedPortfolios">삭제하기</v-btn>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; // Axios를 import합니다.

export default {
  data() {
    return {
      selected: [], // 삭제관련
      allSelected: false, // 체크박스
      portfolios: [
        {
          id: 1,
          RiskLevel: '포트폴리오 1',
          ExpectedReturn: 10,
          dd: 10,
        },
        {
          id: 2,
          RiskLevel: '포트폴리오 2',
          ExpectedReturn: 15,
        },
        {
          id: 3,
          RiskLevel: '포트폴리오 3',
          ExpectedReturn: 20,
        },
      ],
    };
  },
  computed: {
    filteredPortfolios() {
      // 필터링된 포트폴리오 데이터 (필요 시 수정 가능)
      return this.portfolios;
    },
  },
  methods: {
    fetchPortfolio() {
      axios
        .get('/api/portfolio/1') // 1. '/api/portfolio/1'로 GET 요청을 보냅니다.
        .then((response) => {
          this.portfolio = response.data; // 2. 응답 데이터를 this.portfolio에 저장합니다.
        })
        .catch((error) => {
          console.error(error); // 3. 오류를 콘솔에 출력합니다.
        });
    },

    toggleSelectAll() {
      if (this.allSelected) {
        // 전체 선택 체크박스가 켜져 있을 때 모두 선택
        this.selected = this.portfolios.map(
          (portfolio) => portfolio.PortfolioName
        );
      } else {
        // 전체 선택 체크박스가 꺼져 있을 때 선택 해제
        this.selected = [];
      }
    },
    goToPortfolioDetail(id) {
      // 포트폴리오 세부 사항으로 이동
      this.$router.push({ name: 'PortfolioDetail', params: { id } });
    },
    goToCreatePortfolio() {
      // 포트폴리오 생성 페이지로 이동
      this.$router.push({ name: 'CreatePortfolio' });
    },
    deleteSelectedPortfolios() {
      // 선택된 포트폴리오 삭제
      this.portfolios = this.portfolios.filter(
        (portfolio) => !this.selected.includes(portfolio.PortfolioName)
      );
      this.selected = []; // 선택 초기화
    },
  },
};
</script>

<style scoped>
.MyPortfolio-container {
  padding: 20px;
}

.MyPortfolio-DataTable {
  margin-top: 20px;
}

.MyPortfolio-btn {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

.NameCursor:hover {
  cursor: pointer;
  text-decoration: underline;
  color: blue;
}

/* 헤더 텍스트 색상 */
.header-text {
  color: black; /* 검정색으로 설정 */
  font-weight: bold; /* 필요에 따라 굵게 설정 */
}
</style>
