<template>
  <div class="portfolio-container">
    <!-- 포트폴리오 상단 헤더 -->
    <header class="portfolio-header">
      <h1>포트폴리오 상세정보</h1>
      <h2>{{ portfolioDetail.portfolioName }}</h2>
    </header>

    <main class="portfolio-main">
      <section class="portfolio-summary">
        <h2>포트폴리오 요약</h2>

        <!-- 투자 비중 파이 차트 -->
        <h4>포트폴리오 투자 비중</h4>
        <VueApexCharts
          type="pie"
          width="380"
          :options="chartOptions"
          :series="series"
        ></VueApexCharts>

        <!-- 포트폴리오 요약 정보 -->
        <div class="portfolio-summary-info">
          <div class="summary-item">
            <p>총 투자금액</p>
            <p>{{ portfolioDetail.total }}원</p>
          </div>
          <div class="summary-item">
            <p>예상 수익률</p>
            <p>{{ portfolioDetail.expectedReturn }}%</p>
          </div>
          <div class="summary-item">
            <p>예상 투자손익</p>
            <p>{{ expectedProfit.toLocaleString() }}원</p>
          </div>
          <div class="summary-item">
            <p>위험도</p>
            <p>{{ portfolioDetail.riskLevel }}</p>
          </div>
          <div class="summary-item">
            <p>총 평가금액</p>
            <p>{{ totalEvaluation.toLocaleString() }}원</p>
          </div>
        </div>
      </section>

      <section class="portfolio-details">
        <h2>상세 정보</h2>
        <p>Expected return: {{ portfolioDetail }}</p>
        <p>Investment duration: {{ portfolioDetail }} months</p>
        <p>Investment type: {{ portfolioDetail }}</p>
      </section>

      <section class="portfolio-actions">
        <v-btn color="primary" @click="editPortfolio(portfolioId)"
          >수정하기</v-btn
        >
        <v-btn color="red" @click="deletePortfolio(portfolioId)"
          >삭제하기</v-btn
        >
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'; // Composition API
import { useRoute } from 'vue-router'; // 라우트 정보 접근을 위한 useRoute import
import { usePortfolioStore } from '@/store/modules/portfolio'; // Pinia 스토어 가져오기
import VueApexCharts from 'vue3-apexcharts'; // ApexCharts 컴포넌트 import

// 현재 라우트에서 포트폴리오 ID를 가져옴
const route = useRoute();
const portfolioId = route.params.id; // 라우트 파라미터에서 포트폴리오 ID 추출

// Pinia 스토어 가져오기
const portfolioStore = usePortfolioStore();

// 포트폴리오 상세 정보를 가져와 저장할 상태
const portfolioDetail = ref({});

// 예상 투자손익 계산
const expectedProfit = computed(() => {
  const total = portfolioDetail.value.total || 0;
  const expectedReturn = portfolioDetail.value.expectedReturn || 0;
  return Math.round((total * expectedReturn) / 100);
});

// 총 평가금액 계산
const totalEvaluation = computed(() => {
  return (portfolioDetail.value.total || 0) + expectedProfit.value;
});

const getPortfolioDetailAction = async (portfolioId) => {
  try {
    await portfolioStore.getPortfolioDetailAction(portfolioId);
    portfolioDetail.value = portfolioStore.portfolioDetail;
    console.log('Portfolio Detail:', portfolioDetail.value);
  } catch (error) {
    console.error('Error fetching portfolio detail:', error);
  }
};

// 컴포넌트가 마운트될 때 포트폴리오 데이터를 가져오기
onMounted(() => {
  getPortfolioDetailAction(portfolioId); // 포트폴리오 데이터 가져오기
});

// 차트 설정
const chartOptions = {
  chart: {
    width: 380,
    type: 'pie',
  },
  labels: ['예/적금', '채권', '펀드', '주식'],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: 'bottom',
        },
      },
    },
  ],
};

// 예시 데이터
const series = [30, 40, 20, 10];

// 포트폴리오 수정 함수
const editPortfolio = (id) => {
  console.log(`Editing portfolio with ID: ${id}`);
};

// 포트폴리오 삭제 함수
const deletePortfolio = (id) => {
  console.log(`Deleting portfolio with ID: ${id}`);
};
</script>

<style scoped>
.portfolio-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa; /* 페이지 배경 색 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* 부드러운 그림자 효과 */
  border-radius: 10px; /* 둥근 모서리 */
}

.portfolio-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center; /* 텍스트 중앙 정렬 */
  margin-bottom: 20px;
}

.portfolio-header h1 {
  font-size: 2.5rem; /* 큰 헤딩 */
  color: #343a40; /* 진한 텍스트 색상 */
  margin-bottom: 10px;
}

.portfolio-header h2 {
  font-size: 1.5rem; /* 서브 헤딩 */
  color: #6c757d; /* 회색 서브 텍스트 */
}

.portfolio-main {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.portfolio-summary,
.portfolio-details {
  background-color: white; /* 섹션 배경 */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); /* 부드러운 그림자 */
}

.portfolio-summary h2,
.portfolio-details h2 {
  font-size: 1.75rem;
  color: #495057;
  margin-bottom: 15px;
}

.portfolio-summary h4,
.portfolio-details p {
  font-size: 1.125rem;
  color: #212529;
}

.portfolio-summary h4 {
  margin-top: 20px;
  margin-bottom: 15px;
  font-weight: 600;
}

.portfolio-summary-info {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #f1f3f5;
  border-radius: 8px;
}

.summary-item {
  text-align: center;
  flex: 1;
}

.summary-item p:first-child {
  font-size: 1rem;
  color: #495057;
}

.summary-item p:last-child {
  font-size: 1.25rem;
  color: #007bff;
  font-weight: bold;
}

.portfolio-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.v-btn {
  font-size: 1rem;
  padding: 10px 20px;
  border-radius: 6px;
}

.v-btn.primary {
  background-color: #007bff;
  color: white;
}

.v-btn.red {
  background-color: #dc3545;
  color: white;
}

.v-btn.primary:hover,
.v-btn.red:hover {
  opacity: 0.85;
  cursor: pointer;
}

@media (max-width: 768px) {
  .portfolio-container {
    padding: 15px;
  }

  .portfolio-header h1 {
    font-size: 2rem;
  }

  .portfolio-header h2 {
    font-size: 1.25rem;
  }
}
</style>