// src/store/modules/cart.js
import { defineStore } from 'pinia';
import { deleteCartItem, fetchCartList, getCartList, postCartItem } from '@/api/cartApi.js';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [], // List of cart items
    cartItemsLoaded: false, // Flag to track loading status
  }),
  actions: {
    // Fetch initial cart items
    async fetchCartItems() {
      if (!this.cartItems || this.cartItems.length === 0) {
        try {
          const data = await fetchCartList();
          this.cartItems = data;
          this.cartItemsLoaded = true;
          console.log('Fetched initial cart items:', data);
        } catch (error) {
          console.error('Error fetching initial cart items:', error);
        }
      }
    },

    // Fetch all cart items for regular use
    async getCartItems() {
      try {
        const data = await getCartList();
        this.cartItems = data;
        this.cartItemsLoaded = true;
        console.log('Fetched cart items:', data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    },

    // Add a new item to the cart
    async addCartItem(cartItem) {
      try {
        const data = await postCartItem(cartItem);
        this.cartItems.push(data);
        console.log('Added item to cart:', data);
      } catch (error) {
        console.error('Error adding item to cart:', error);
      }
    },

    // Remove an item from the cart
    async removeCartItem(cartId) {
      try {
        await deleteCartItem(cartId);
        this.cartItems = this.cartItems.filter(item => item.cartId !== cartId);
        console.log(`Removed item with ID ${cartId} from cart`);
      } catch (error) {
        console.error('Error removing item from cart:', error);
      }
    },
  },
});
