<template>
    <li class="menu-item" @click="toggleDropdown(1)">
      <a href="javascript:void(0)" class="sidebar-link">
        <i class="fas fa-briefcase icon"></i>
        <span class="menu-text">포트폴리오</span>
      </a>
      <div v-if="activeDropdown === 1" class="dropdown-content">
        <h3 class="section-title">포트폴리오</h3>
        <div class="portfolio-content">
          <!-- Add portfolio content here -->
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
    position: relative; /* Ensures the dropdown is positioned correctly */
  }
  
  .sidebar-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px 0;
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
    opacity: 1; /* Always fully visible */
    transition: none; /* Remove the transition */
  }
  
  .dropdown-content {
    position: absolute;
    left: 100%; /* Align dropdown to the right of the menu item */
    top: 0;
    background-color: #fff;
    padding: 10px;
    width: 180px;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  </style>
  