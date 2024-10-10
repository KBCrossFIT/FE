<template>
  <li class="menu-item" @click="togglePortfolioSection">
    <a href="javascript:void(0)" class="sidebar-link">
      <i class="fas fa-briefcase icon"></i>
      <span class="menu-text">포트폴리오</span>
    </a>
  </li>
</template>

<script setup>
const emit = defineEmits(['openSidePanel']);
import { ref, onMounted } from 'vue';
import portfolioApi from '@/api/portfolioApi'; // Adjust path as necessary

const portfolios = ref([]);

const fetchPortfolios = async () => {
  try {
    portfolios.value = await portfolioApi.fetchPortfolioList();
  } catch (error) {
    console.error('포트폴리오 데이터를 가져오지 못했습니다:', error);
  }
};

onMounted(() => {
  fetchPortfolios();
});

const togglePortfolioSection = () => {
  emit('openSidePanel', {
    title: '포트폴리오',
    section: 'PortfolioSection',
    data: portfolios.value,
  });
};
</script>

<style scoped>
.menu-item {
  position: relative;
}

.sidebar-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  color: grey;
  text-decoration: none;
  width: 100%;
  transition: background-color 0.3s ease;
}

.sidebar-link:hover {
  background-color: #d7dbde;
}

.icon {
  font-size: 24px;
  margin-bottom: 5px;
}

.menu-text {
  font-size: 0.7rem;
  opacity: 1;
  transition: none;
}
</style>
