<template>
    <li class="menu-item" @click="togglePortfolioSection">
      <a href="javascript:void(0)" class="sidebar-link">
        <i class="fas fa-briefcase icon"></i>
        <span class="menu-text">포트폴리오</span>
      </a>
    </li>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import portfolioApi from '@/api/portfolioApi'; // Import your portfolioApi
  
  export default {
    name: 'PortfolioSection',
    setup(props, { emit }) {
      const portfolios = ref([]);
  
      // Fetch portfolio data from the API
      const fetchPortfolios = async () => {
        try {
          portfolios.value = await portfolioApi.fetchPortfolioList(); // Use your API method
        } catch (error) {
          console.error('Failed to fetch portfolios:', error);
        }
      };
  
      onMounted(() => {
        fetchPortfolios(); // Fetch the portfolio list when the component is mounted
      });
  
      const togglePortfolioSection = () => {
        // Emit event to open side panel with the fetched data
        emit('openSidePanel', {
          title: '포트폴리오',
          section: 'PortfolioSection',
          data: portfolios.value, // Pass the fetched data
        });
      };
  
      return {
        togglePortfolioSection,
      };
    },
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
  