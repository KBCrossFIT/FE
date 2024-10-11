<template>
  <div class="menu-item" @click="openPortfolioList">
    <a href="javascript:void(0)" class="sidebar-link">
      <i class="fas fa-briefcase icon"></i>
      <span class="menu-text">포트폴리오</span>
    </a>
  </div>
</template>

<script>
import { usePortfolioStore } from '@/store/modules/portfolio.js';

export default {
  name: 'PortfolioSection',
  props: {
    portfolios: {
      type: Array,
      required: true,
    },
  },
  methods: {
    async openPortfolioList() {
      const portfolioStore = usePortfolioStore();
      if (
        localStorage.getItem('user') != null &&
        !portfolioStore.portfolioListLoaded
      ) {
        await portfolioStore.fetchPortfolioListAction();
      }
      this.$emit('openSidePanel', {
        title: '나의 포트폴리오 목록',
        section: 'PortfolioSection',
        data: portfolioStore.portfolioList,
      });
    },
  },
};
</script>

<style scoped>
.menu-item {
  width: 100%;
  margin-bottom: 10px;
  text-align: center;
}

.sidebar-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  padding: 10px;
  text-decoration: none;
  background-color: #575757;
  border-radius: 5px;
  width: 100%;
  height: 6vh;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: background-color 0.3s ease;
}

.sidebar-link:hover {
  background-color: #645f5f;
}

.icon {
  font-size: 24px;
  position: relative;
  margin-bottom: 5px;
}

.menu-text {
  font-size: 0.7rem;
  opacity: 1;
}
</style>
