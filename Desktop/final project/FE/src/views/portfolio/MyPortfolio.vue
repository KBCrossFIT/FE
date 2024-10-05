<template>
  <div class="MyPortfolio-container">
    <h1>내 포트폴리오 리스트 페이지</h1>
    <div class="MyPortfolio-DataTable">
      <!-- 기본 HTML 테이블로 대체 -->
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                v-model="allSelected"
                @change="toggleSelectAll"
              />
            </th>
            <th>포트폴리오 이름</th>
            <th>투자 총액</th>
            <th>위험도</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in portfolioList" :key="item.id">
            <td>
              <input
                type="checkbox"
                v-model="selected"
                :value="item.PortfolioName"
              />
            </td>
            <td class="NameCursor" @click="goToPortfolioDetail(item.id)">
              {{ item.PortfolioName }}
            </td>
            <td>{{ item.ExpectedReturn }}%</td>
            <td>{{ item.RiskLevel }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="MyPortfolio-btn">
      <button @click="goToCreatePortfolio">포트폴리오 만들러 가기</button>
      <button @click="deleteSelectedPortfolios">삭제하기</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'; // Import useRouter for navigation
import { fetchPortfolioList, deletePortfolio } from '@/api/portfolioApi';

export default {
  setup() {
    const portfolioList = ref([]); // 포트폴리오 목록
    const selected = ref([]); // 선택된 포트폴리오
    const allSelected = ref(false); // 전체 선택 체크박스 상태
    const portfolioListLoaded = ref(false); // 포트폴리오 목록 로드 여부
    const router = useRouter(); // Access Vue Router in Composition API

    // Fetch portfolio data
    const fetchPortfolioListData = async () => {
      try {
        const data = await fetchPortfolioList();
        portfolioList.value = data;
        portfolioListLoaded.value = true;
      } catch (error) {
        console.error('Error fetching portfolio list:', error);
      }
    };

    // Delete a specific portfolio by ID
    const deletePortfolioData = async (portfolioId) => {
      try {
        await deletePortfolio(portfolioId);
        portfolioList.value = portfolioList.value.filter(
          (portfolio) => portfolio.id !== portfolioId
        );
      } catch (error) {
        console.error('Error deleting portfolio:', error);
      }
    };

    // Toggle all selections
    const toggleSelectAll = () => {
      if (allSelected.value) {
        selected.value = portfolioList.value.map(
          (portfolio) => portfolio.PortfolioName
        );
      } else {
        selected.value = [];
      }
    };

    // Navigate to portfolio detail page
    const goToPortfolioDetail = (id) => {
      router.push({ name: 'PortfolioDetail', params: { id } });
    };

    // Navigate to portfolio creation page
    const goToCreatePortfolio = () => {
      router.push({ name: 'CreatePortfolio' });
    };

    // Delete selected portfolios
    const deleteSelectedPortfolios = () => {
      selected.value.forEach((portfolioName) => {
        const portfolio = portfolioList.value.find(
          (p) => p.PortfolioName === portfolioName
        );
        if (portfolio) {
          deletePortfolioData(portfolio.id);
        }
      });
      selected.value = [];
    };

    // Fetch portfolio list on component mount
    onMounted(() => {
      if (!portfolioListLoaded.value) {
        fetchPortfolioListData();
      }
    });

    return {
      selected,
      allSelected,
      portfolioList,
      toggleSelectAll,
      goToPortfolioDetail,
      goToCreatePortfolio,
      deleteSelectedPortfolios,
    };
  },
};
</script>

<style scoped>
.MyPortfolio-container {
  padding: 20px;
}

.MyPortfolio-DataTable {
  margin-top: 20px;
  width: 100%;
  border-collapse: collapse;
}

.MyPortfolio-DataTable table {
  width: 100%;
  border: 1px solid #ccc;
}

.MyPortfolio-DataTable th,
.MyPortfolio-DataTable td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
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

.header-text {
  color: black;
  font-weight: bold;
}
</style>
