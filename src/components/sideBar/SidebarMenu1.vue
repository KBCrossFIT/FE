<template>
  <li class="menu1" @click="toggleDropdown(1)">
    <a href="javascript:void(0)" class="sidebar-link">
      <i class="fas fa-briefcase"></i>
      <span class="menu-text">포트폴리오</span>
      <span v-if="portfolios && portfolios.length > 0" class="item-count">{{
        portfolios.length
      }}</span>
    </a>
    <div
      v-if="activeDropdown === 1"
      :class="['dropdown-content', { active: activeDropdown === 1 }]"
    >
      <div class="portfolio-dropdown">
        <h3 class="section-title">나의 포트폴리오</h3>
        <table class="portfolio-table">
          <thead>
            <tr>
              <th>포트폴리오 명</th>
              <th>기대수익율</th>
              <th>위험도</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(portfolio, index) in portfolios" :key="index">
              <td class="portfolio-name">{{ portfolio.name }}</td>
              <td
                :class="{
                  positive: portfolio.returns > 0,
                  negative: portfolio.returns < 0,
                }"
              >
                {{ portfolio.returns }}%
              </td>
              <td class="risk-level">{{ portfolio.risk }}%</td>
            </tr>
          </tbody>
        </table>

        <div class="action-buttons">
          <button @click="goToCreatePortfolio">포트폴리오 구성하기</button>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    activeDropdown: {
      type: Number,
      default: null,
    },
    portfolios: {
      type: Array,
      default: () => [],
    },
    portfolios: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    toggleDropdown(menuNumber) {
      this.$emit('toggleDropdown', menuNumber);
    },
    goToCreatePortfolio() {
      this.$emit('goToCreatePortfolio');
    },
  },
};
</script>

<style scoped>
.sidebar-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  padding: 15px;
  text-decoration: none;
  background-color: #575757;
  border-radius: 5px;
  margin-bottom: 5px;
  width: 100%;
}

.sidebar-link:hover {
  background-color: #645f5f;
}

.dropdown-content {
  position: absolute;
  left: -300px; /* Adjusts dropdown to appear on the left side */
  top: 0;
  background-color: #bab3b3;
  color: white;
  padding: 10px;
  width: 300px; /* Dropdown width */
  height: 320px; /* Match button group height */
  border-radius: 5px; /* Rounded corners */
  overflow-y: auto; /* Scroll if content is too long */
  z-index: 5555;
  transform: translateX(-100%); /* Initially hidden */
  transition: transform 0.5s ease; /* Animation effect */
}

/* 아이콘 우상단 개수 표시 스타일 */
.item-count {
  position: absolute;
  top: 5px; /* Adjust this value to position it correctly */
  right: 5px; /* Adjust this value to position it correctly */
  background-color: red; /* Background color for visibility */
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.8rem; /* Font size for the count */
}

.dropdown-content.active {
  transform: translateX(0); /* Show dropdown */
}

.portfolio-dropdown {
  padding: 20px;
}

.section-title {
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: #2d6a4f;
}

.portfolio-table {
  width: 100%;
  border-collapse: collapse;
}

.portfolio-table th,
.portfolio-table td {
  text-align: left;
  padding: 8px;
  border-bottom: 1px solid #ddd;
  font-size: 0.9rem;
}

.portfolio-table th {
  font-weight: bold;
  color: #2d6a4f;
}

.portfolio-name {
  color: #2d6a4f;
}

.portfolio-table td.positive {
  color: red;
}

.portfolio-table td.negative {
  color: blue;
}

.risk-level {
  color: #ffcc00;
}

.action-buttons {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
}

.action-buttons button {
  background-color: #2d6a4f;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.action-buttons button:hover {
  background-color: #1b4633;
}

.menu-text {
  font-size: 0rem;
}
</style>
