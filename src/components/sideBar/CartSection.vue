<template>
  <li class="nav-item" @click="toggleDropdown(2)">
    <a class="nav-link" href="javascript:void(0)">
      <i class="fas fa-shopping-cart nav-icon"></i>
      장바구니
    </a>
    <div v-if="activeDropdown === 2" class="dropdown-content">
      <div class="cart-dropdown">
        <h3 class="section-title">장바구니 목록</h3>
        <div class="cart-scroll">
          <table class="cart-table">
            <thead>
              <tr>
                <th>상품명</th>
                <th>수량</th>
                <th>가격</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in cartItems" :key="index">
                <td>{{ item.name }}</td>
                <td>{{ item.quantity }}</td>
                <td>{{ item.price }} 원</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="action-buttons">
          <button @click="goToCheckout">결제하기</button>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CartSection',
  props: {
    cartItems: Array,
    activeDropdown: Number,
    goToCheckout: Function,
    toggleDropdown: Function,
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
