<template>
    <li class="menu-item" @click="toggleDropdown(3)">
      <a href="javascript:void(0)" class="sidebar-link">
        <i class="fas fa-history icon"></i>
        <span class="menu-text">최근<br>본 상품</span> <!-- Added <br> for line break -->
      </a>
      <div v-if="activeDropdown === 3" class="dropdown-content">
        <h3 class="section-title">최근 본 상품</h3>
        <ul v-if="recentProductSide.length > 0">
          <li v-for="(product, index) in recentProductSide" :key="index" class="recent-item">
            {{ product.name }} - {{ product.price }}원
          </li>
        </ul>
        <div v-else class="empty-recent">최근 본 상품이 없습니다.</div>
      </div>
    </li>
  </template>
  
  <script>
  export default {
    name: 'RecentProductSection',
    props: ['activeDropdown'],
    data() {
      return {
        recentProductSide: [
          { name: '상품 A', price: 10000 },
          { name: '상품 B', price: 20000 },
          { name: '상품 C', price: 30000 },
        ],
      };
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
    text-align: center; /* Center the text */
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
  