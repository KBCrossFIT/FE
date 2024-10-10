<template>
  <div class="layout-wrapper">
    <!-- 사이드바 -->
    <div class="uiNavAside" ref="sidebar">
      <ul class="nav-aside">
        <div class="button-container">
          <SidebarMenu1
            :activeDropdown="activeDropdown"
            :portfolios="portfolios"
            @toggleDropdown="toggleDropdown"
            @goToCreatePortfolio="goToCreatePortfolio"
          />
          <SidebarMenu2
            :activeDropdown="activeDropdown"
            @toggleDropdown="toggleDropdown"
            :cart="cart"
            :removeFromCart="removeFromCart"
          />
          <SidebarMenu3 :activeDropdown="activeDropdown" @toggleDropdown="toggleDropdown" />
        </div>
      </ul>
    </div>

    <!-- 메인 컨텐츠 -->
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script>
import SidebarMenu1 from './sideBar/PortfolioSection.vue';
import SidebarMenu2 from './sideBar/CartSection.vue';
import SidebarMenu3 from './sideBar/RecentProductsSection.vue';
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'SideBar',
  components: {
    SidebarMenu1,
    SidebarMenu2,
    SidebarMenu3,
  },
  setup() {
    const portfolios = ref([
      { name: '포트폴리오 1', returns: 10.3, risk: 8.74 },
      { name: '포트폴리오 2', returns: -3.0, risk: 4.0 },
      { name: '포트폴리오 3', returns: 10.3, risk: 8.74 },
    ]);

    const activeDropdown = ref(null);
    const isSidebarExpanded = ref(false); // This is not needed anymore
    const cart = ref([]); // Initialize your cart here or fetch from props or API
    const router = useRouter();
    const sidebar = ref(null);

    const toggleDropdown = (menuNumber) => {
      // Toggle the dropdown without affecting sidebar width
      activeDropdown.value = activeDropdown.value === menuNumber ? null : menuNumber;
    };

    const goToCreatePortfolio = () => {
      router.push('/make-portfolio');
    };

    const removeFromCart = (item) => {
      const index = cart.value.indexOf(item);
      if (index > -1) {
        cart.value.splice(index, 1);
      }
    };

    const handleClickOutside = (event) => {
      if (sidebar.value && !sidebar.value.contains(event.target)) {
        activeDropdown.value = null; // Collapse dropdown on outside click
      }
    };

    onMounted(() => {
      document.addEventListener('click', handleClickOutside);
    });

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside);
    });

    return {
      portfolios,
      activeDropdown,
      toggleDropdown,
      goToCreatePortfolio,
      sidebar,
      cart,
      removeFromCart,
    };
  },
};
</script>

<style scoped>
.layout-wrapper {
  display: flex;
  height: 100vh;
}

.uiNavAside {
  position: fixed;
  right: 0;
  top: 10px;
  width: 65px; /* Fixed width */
  height: 100vh;
  background-color: #f5f6fa;
  display: flex;
  flex-direction: column;
  z-index: 9999;
  border-left: 1px solid #e0e0e0;
  transition: none; /* Remove transition to prevent size changes */
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

.main-content {
  flex-grow: 1;
  margin-right: 45px; /* Adjust this to match the new default sidebar width */
}

.nav-aside a {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 15px;
  color: #333;
  text-decoration: none;
  background-color: #fff;
  border-radius: 8px;
  margin: 5px 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.menu-text {
  font-size: 0.7rem;
  margin-left: 10px;
}

.uiNavAside .nav-aside li {
  margin-top: 25px; /* Adjust this value to align with the header */
}

/* Style for dropdown */
.dropdown-content {
  position: absolute; /* Positioned relative to the menu item */
  left: 100%; /* Align dropdown to the right of the menu item */
  top: 0; /* Aligns dropdown to the top */
  background-color: #fff;
  padding: 10px;
  width: 180px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 100; /* Ensure it's above other elements */
}
</style>
