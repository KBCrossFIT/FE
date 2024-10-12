<template>
  <div class="menu-item" @click="openCart">
    <a href="javascript:void(0)" class="sidebar-link">
      <i class="fas fa-shopping-cart icon"></i>
      <span class="menu-text">장바구니</span>
    </a>
  </div>
</template>

<script>
import { useCartStore } from '@/store/modules/cart.js';

export default {
  name: 'CartSection',
  props: {
    cart: Array,
  },
  methods: {
    async openCart() {
      const cartStore = useCartStore();
      if (!cartStore.cartItemsLoaded) {
        await cartStore.getCartItems();
      }
      this.$emit('openSidePanel', {
        title: '장바구니',
        section: 'CartSection',
        data: cartStore.cartItems,
      });
    },
  },
};
</script>

<style scoped>
.menu-item {
  width: 100%;
  margin-bottom: 10px;
  text-align: center;
}

.sidebar-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;
  padding: 10px;
  text-decoration: none;
  background-color: white;
  border-radius: 5px;
  width: 100%;
  height: 6vh;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: background-color 0.3s ease;
}

.sidebar-link:hover {
  background-color: #7bd5c3;
}

.icon {
  font-size: 24px;
  position: relative;
  margin-bottom: 5px;
}

.menu-text {
  font-size: 0.7rem;
  opacity: 1; /* Always fully visible */
}
</style>
