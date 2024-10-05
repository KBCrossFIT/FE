<template>
  <div>
    <div class="portfolio-section">
      <h3 @click="toggleDropdown" class="section-title">
        <i class="fas fa-chart-line"></i> <!-- Portfolio Icon -->
        포트폴리오
        <span :class="['arrow', { 'open': isDropdownOpen }]">▼</span>
      </h3>
      <div v-if="isDropdownOpen" class="dropdown-content">
        <h4 class="dropdown-header">나의 포트폴리오</h4>
        <div class="portfolio-scroll">
          <table class="portfolio-table">
            <thead>
              <tr>
                <th>포트폴리오</th>
                <th>기대수익율</th>
                <th>위험도</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(portfolio, index) in portfolios" :key="index">
                <td :style="{ color: portfolio.returns > 0 ? 'red' : 'blue' }">{{ portfolio.name }}</td>
                <td :class="{ 'positive': portfolio.returns > 0, 'negative': portfolio.returns < 0 }">{{ portfolio.returns }}%</td>
                <td :style="{ color: getRiskColor(portfolio.risk) }">{{ portfolio.risk }}%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="action-buttons">
          <button @click="goToCreatePortfolio">포트폴리오 구성하기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'PortfolioSection',
  setup() {
    const portfolios = ref([
      { name: '포트폴리오 1', returns: 10.3, risk: 8.74 },
      { name: '포트폴리오 2', returns: -3.0, risk: 4.0 },
      // More portfolios...
    ]);

    const isDropdownOpen = ref(false);
    const router = useRouter();

    const toggleDropdown = () => {
      isDropdownOpen.value = !isDropdownOpen.value;
    };

    const goToCreatePortfolio = () => {
      router.push('/make-portfolio');
    };

    const getRiskColor = (risk) => {
      if (risk <= 5) return 'green';
      else if (risk <= 10) return 'orange';
      return 'red';
    };

    return {
      portfolios,
      isDropdownOpen,
      toggleDropdown,
      goToCreatePortfolio,
      getRiskColor,
    };
  },
};
</script>

<style scoped>
.portfolio-section {
  padding: 15px;
  background-color: #f9f9f9; /* Light background for the section */
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  margin-bottom: 20px; /* Space between sections */
}

.section-title {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px; /* Padding for the title */
  background-color: #2d6a4f; /* Darker background for the title */
  color: white;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.section-title:hover {
  background-color: #1b4633; /* Darker shade on hover */
}

.dropdown-content {
  background-color: #fff; /* White background for dropdown */
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* Shadow for dropdown */
  margin-top: 10px;
  padding: 15px;
  animation: slide-down 0.3s ease; /* Slide down effect */
}

.dropdown-header {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.portfolio-scroll {
  max-height: 200px; /* Limit height for scroll */
  overflow-y: auto; /* Scrollable if too many items */
}

.portfolio-table {
  width: 100%;
  border-collapse: collapse;
}

.portfolio-table th, .portfolio-table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

.action-buttons {
  text-align: center;
  margin-top: 15px;
}

.action-buttons button {
  background-color: #2d6a4f;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.action-buttons button:hover {
  background-color: #1b4633;
}

.arrow {
  transition: transform 0.3s ease;
}

.arrow.open {
  transform: rotate(180deg); /* Rotate arrow when open */
}

/* Slide down animation */
@keyframes slide-down {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
