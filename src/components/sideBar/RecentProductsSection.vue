<template>
  <li class="nav-item" @click="toggleDropdown(3)">
    <a class="nav-link" href="javascript:void(0)">
      <i class="fas fa-history nav-icon"></i>
      최근 본 상품
    </a>
    <div v-if="activeDropdown === 3" class="dropdown-content">
      <div class="recent-products">
        <h3 class="section-title">최근 본 상품</h3>
        <ul>
          <li v-for="(product, index) in recentProducts" :key="index">{{ product.name }}</li>
        </ul>
      </div>
    </div>
  </li>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'RecentProductSection',
  props: {
    activeDropdown: Number,
    toggleDropdown: Function,
  },
  data() {
    return {
      recentProducts: [
        { name: '상품 A' },
        { name: '상품 B' },
        { name: '상품 C' },
      ],
    };
  },
});
</script>

<style scoped>
.sidebar {
  background-color: #333;
  width: 60px;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: fixed;
  right: 0;
  top: 0;
}

.sidebar-header {
  padding: 10px;
  background-color: #444;
}

.sidebar-brand {
  color: #fff;
  font-size: 1.2rem;
}

.sidebar-nav {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  width: 100%;
}

.nav-link {
  display: block;
  padding: 10px;
  color: #fff;
  text-align: center;
  text-decoration: none;
}

.nav-link i {
  display: block;
  font-size: 1.5rem;
}

.nav-item:hover .nav-link {
  background-color: #575757;
}

.dropdown-content {
  position: absolute;
  right: 60px;
  background-color: #444;
  padding: 10px;
  width: 300px;
  z-index: 9999!important;
}

.portfolio-dropdown,
.cart-dropdown {
  background-color: #f0f8f4;
  padding: 15px;
  border-radius: 8px;
}

.action-buttons button {
  background-color: #2d6a4f;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
}

.action-buttons button:hover {
  background-color: #1b4633;
}
</style>
