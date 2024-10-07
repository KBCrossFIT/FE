<template>
    <div :class="['uiNavAside', { 'expanded': activeDropdown !== null }]" ref="sidebar">
      <ul class="nav-aside">
        <li class="menu-item" @click="toggleDropdown(1)">
          <a href="javascript:void(0)" class="sidebar-link">
            <i class="fas fa-shopping-cart icon grey-icon"></i>
            <span class="menu-text">장바구니</span>
          </a>
          <div v-if="activeDropdown === 1" class="dropdown-content">
            <div class="cart-dropdown">
              <h3 class="section-title">장바구니</h3>
              <div v-if="cart.length === 0" class="empty-cart">장바구니가 비어 있습니다.</div>
              <table v-else class="cart-table">
                <thead>
                  <tr>
                    <th>상품명</th>
                    <th>가격</th>
                    <th>수량</th>
                    <th>삭제</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in paginatedCart" :key="index">
                    <td class="item-name">{{ item.name }}</td>
                    <td class="item-price">{{ item.price }}원</td>
                    <td class="item-quantity">{{ item.quantity }}</td>
                    <td>
                      <button class="cart-trashcanBtn" @click="removeFromCart(item)">삭제</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </li>
        <!-- Add other sidebar sections similarly -->
      </ul>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  
  export default {
    name: 'Sidebar',
    setup() {
      const activeDropdown = ref(null);
      const cart = ref([]); // Initialize your cart here or fetch from props or API
  
      const toggleDropdown = (menuNumber) => {
        activeDropdown.value = activeDropdown.value === menuNumber ? null : menuNumber;
      };
  
      const removeFromCart = (item) => {
        const index = cart.value.indexOf(item);
        if (index > -1) {
          cart.value.splice(index, 1);
        }
      };
  
      const paginatedCart = computed(() => {
        // Logic for paginating the cart items
        return cart.value; // Placeholder, implement your pagination logic
      });
  
      return {
        activeDropdown,
        cart,
        toggleDropdown,
        removeFromCart,
        paginatedCart,
      };
    },
  };
  </script>
  
  <style scoped>
  .uiNavAside {
    position: fixed;
    right: 0;
    top: 50px; /* Adjust if you have a header */
    height: calc(100vh - 50px);
    width: 60px; /* Slim width */
    background-color: #e5e8eb;
    border-left: 1px solid #d1d1d1;
    transition: width 0.3s ease-in-out, margin-left 0.3s ease-in-out; /* Transition for margin-left */
    z-index: 9999;
  }
  
  .uiNavAside.expanded {
    width: 200px; /* Expanded width */
    margin-left: -140px; /* Adjust margin-left to push homepage content */
  }
  
  .nav-aside {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .menu-item {
    width: 100%;
    margin-bottom: 10px;
    text-align: center;
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
    color: grey;
  }
  
  .menu-text {
    font-size: 0.8rem;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .uiNavAside:hover .menu-text {
    opacity: 1;
  }
  
  .dropdown-content {
    position: absolute;
    left: -200px; /* Shift left */
    background-color: #fff;
    padding: 10px;
    width: 180px;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .section-title {
    font-size: 1.4rem;
    color: #2d6a4f;
  }
  
  .empty-cart {
    text-align: center;
    font-size: 1.1rem;
    color: #777;
  }
  
  .cart-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
  }
  
  .cart-table th,
  .cart-table td {
    padding: 12px;
    border-bottom: 1px solid #ddd;
    font-size: 0.9rem;
  }
  </style>
  