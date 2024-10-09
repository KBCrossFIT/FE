<template>
    <li class="menu-item" @click="togglePortfolioSection">
      <a href="javascript:void(0)" class="sidebar-link">
        <i class="fas fa-briefcase icon"></i>
        <span class="menu-text">포트폴리오</span>
      </a>
    </li>
  </template>
  
  <script setup>
  // Vue 3에서는 defineEmits로 이벤트 방출 함수를 정의해야 함
  const emit = defineEmits(['openSidePanel']); // 'openSidePanel' 이벤트 정의
  
  import { ref, onMounted } from 'vue';
  import portfolioApi from '@/api/portfolioApi'; // 포트폴리오 API 임포트
  
  const portfolios = ref([]); // 포트폴리오 데이터
  
  // API에서 포트폴리오 데이터를 가져오는 함수
  const fetchPortfolios = async () => {
    try {
      portfolios.value = await portfolioApi.fetchPortfolioList(); // API 호출로 데이터 가져오기
    } catch (error) {
      console.error('포트폴리오 데이터를 가져오지 못했습니다:', error);
    }
  };
  
  // 컴포넌트가 마운트되었을 때 포트폴리오 데이터 로드
  onMounted(() => {
    fetchPortfolios();
  });
  
  // 포트폴리오 섹션을 토글하고 사이드 패널을 여는 함수
  const togglePortfolioSection = () => {
    emit('openSidePanel', {
      title: '포트폴리오', // 패널 제목
      section: 'PortfolioSection', // 섹션 이름
      data: portfolios.value, // 패널에 전달할 데이터
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
  