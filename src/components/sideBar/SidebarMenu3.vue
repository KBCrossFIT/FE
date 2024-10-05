<template>
  <li class="menu3" @click="toggleDropdown(3)">
    <a href="javascript:void(0)" class="sidebar-link">
      <i class="fas fa-history icon"></i>
      <!-- 아이콘에 'icon' 클래스 추가 -->
      <span class="menu-text">최근 본 상품</span>
    </a>
    <div
      v-if="activeDropdown === 3"
      :class="['dropdown-content', { active: activeDropdown === 3 }]"
    >
      <div class="recent-dropdown">
        <h3 class="section-title">최근 본 상품</h3>
        <ul>
          <li
            v-for="(product, index) in recentProductSide"
            :key="index"
            class="recent-item"
          >
            {{ product.name }} - {{ product.price }}원
          </li>
        </ul>
      </div>
    </div>
  </li>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'RecentProductSection',
  props: ['activeDropdown', 'recentProducts'],
  methods: {
    toggleDropdown(menuNumber) {
      this.$emit('toggleDropdown', menuNumber);
    },
  },
  data() {
    return {
      recentProductSide: [
        { name: '상품 A', price: 10000 },
        { name: '상품 B', price: 20000 },
        { name: '상품 C', price: 30000 },
      ],
    };
  },
});
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

.icon {
  font-size: 24px; /* 원하는 크기로 설정 (기본값: 16px) */
}

.dropdown-content {
  position: absolute;
  left: -300px; /* 버튼의 왼쪽에 펼쳐지도록 조정 */
  top: 0;
  background-color: #bab3b3;
  color: white;
  padding: 10px;
  width: 300px; /* 드롭다운 너비 */
  height: 320px; /* 버튼 그룹과 동일한 높이 */
  border-radius: 5px; /* 모서리 둥글게 */
  overflow-y: auto; /* 내용이 많을 경우 스크롤 가능 */
  z-index: 5555;
  transform: translateX(-100%); /* 기본적으로 숨기기 */
  transition: transform 0.5s ease; /* 애니메이션 효과 */
}

.dropdown-content.active {
  transform: translateX(0); /* 드롭다운을 보이게 하기 위해 원위치 */
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
</style>
