<template>
    <div class="app-container">
      <div class="uiNavAside" ref="sidebar">
        <ul class="nav-aside">
          <div class="button-container">
            <!-- Other sidebar menu components -->
            <SidebarMenu1
              :activeDropdown="activeDropdown"
              :portfolios="portfolios"
              @goToCreatePortfolio="goToCreatePortfolio"
            />
            <SidebarMenu2 :cart="cart" @openSidePanel="openSidePanel" />
            <RecentProductsSection
              :recentProducts="recentProducts"
              @openSidePanel="openSidePanel"
            />
          </div>
        </ul>
      </div>
  
      <!-- Side Panel -->
      <SidePanel
        :isVisible="isSidePanelOpen"
        :panelTitle="panelTitle"
        @close="isSidePanelOpen = false"
      >
        <div v-if="activeSection === 'RecentProductsSection'">
          <ul>
            <li v-for="product in panelData" :key="product.id">
              {{ product.name }} - {{ product.price }}원
              <button @click="$emit('removeFromRecent', product)">Remove</button>
            </li>
          </ul>
        </div>
        <!-- Other sections for CartSection, PortfolioSection, etc. -->
      </SidePanel>
    </div>
  </template>
  
  <script>
  import SidebarMenu1 from './sideBar/PortfolioSection.vue';
  import SidebarMenu2 from './sideBar/CartSection.vue';
  import RecentProductsSection from './sideBar/RecentProductsSection.vue';
  import SidePanel from './sideBar/SidePanel.vue';
  import { ref } from 'vue';
  
  export default {
    name: 'SideBar',
    components: {
      SidebarMenu1,
      SidebarMenu2,
      RecentProductsSection,
      SidePanel,
    },
    setup() {
      const portfolios = ref([]);
      const cart = ref([]);
      const recentProducts = ref([]); // Add this line to hold recently viewed products
  
      const isSidePanelOpen = ref(false);
      const panelTitle = ref('');
      const activeSection = ref('');
      const panelData = ref([]);
  
      const openSidePanel = (payload) => {
        panelTitle.value = payload.title; // Set the title
        activeSection.value = payload.section; // Set the active section
        panelData.value = payload.data; // Pass the data to the panel
        isSidePanelOpen.value = true; // Open the panel
      };
  
      return {
        portfolios,
        cart,
        recentProducts, // Include this in your return statement
        isSidePanelOpen,
        panelTitle,
        activeSection,
        panelData,
        openSidePanel,
      };
    },
  };
  </script>
  
  <style scoped>
  .app-container {
    display: flex;
  }
  
  .uiNavAside {
    position: fixed;
    right: 0;
    top: 0;
    width: 90px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    z-index: 9999;
    border-radius: 5px;
    padding: 10px;
    background-color: rgb(233, 233, 233);
  }
  
  .nav-aside {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
  
  .button-container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
  
  .nav-aside li {
    text-align: center;
    flex-grow: 0;
    margin: 0;
  }
  
  .nav-aside a {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    padding: 10px;
    text-decoration: none;
    background-color: #e2dfdf;
    width: 100%;
    border-radius: 5px;
    box-sizing: border-box;
  }
  
  .nav-aside li:hover a {
    background-color: #575757;
  }
  
  .menu-text {
    font-size: 0.9rem;
    margin-top: 5px;
  }
  </style>
  