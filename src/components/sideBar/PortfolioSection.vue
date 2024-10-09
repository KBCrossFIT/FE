<template>
    <li class="menu-item" @click="toggleDropdown(1)">
      <a href="javascript:void(0)" class="sidebar-link">
        <i class="fas fa-briefcase icon"></i>
        <span class="menu-text">포트폴리오</span>
      </a>
      <!-- Full-page dropdown -->
      <div v-if="activeDropdown === 1" class="full-page-dropdown">
        <div class="dropdown-header">
          <h3 class="section-title">포트폴리오</h3>
          <button class="close-btn" @click="toggleDropdown(null)">×</button>
        </div>
        <div class="portfolio-content">
          <!-- Add portfolio content here -->
          <ul>
            <li>프로젝트 A</li>
            <li>프로젝트 B</li>
            <li>프로젝트 C</li>
          </ul>
        </div>
      </div>
    </li>
  </template>
  
  <script>
  export default {
    name: 'PortfolioSection',
    props: {
      activeDropdown: {
        type: Number,
        required: true,
      },
    },
    methods: {
      toggleDropdown(menuNumber) {
        this.$emit('toggleDropdown', menuNumber);
      },
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
  
  /* Full-page sliding dropdown */
  .full-page-dropdown {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #fff;
    z-index: 9999;
    transform: translateX(-100%);
    transition: transform 0.5s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .full-page-dropdown.active {
    transform: translateX(0);
  }
  
  .dropdown-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: #2d6a4f;
    color: white;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
  
  .close-btn {
    background: none;
    border: none;
    font-size: 2rem;
    color: white;
    cursor: pointer;
  }
  
  .portfolio-content {
    padding: 20px;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 10px;
    font-size: 1.2rem;
  }
  </style>
  