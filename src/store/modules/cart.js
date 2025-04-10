// src/store/modules/cart.js
import { defineStore } from 'pinia';
import {
  deleteCartItem,
  fetchCartList,
  getCartList,
  postCartItem,
} from '@/api/cartApi.js';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [], // 장바구니 아이템
    cartItemsLoaded: false, // 장바구니 아이템 로딩 여부
    newCartItem: null, // 새로 추가된 장바구니 아이템
    selectedProducts: [], // 선택된 상품 목록
  }),
  actions: {
    // 모든 장바구니 아이템을 가져오는 메서드
    async getCartItems() {
      try {
        const data = await getCartList();
        this.cartItems = data;
        console.log(this.cartItems);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    },

    // 장바구니에 새 아이템을 추가하는 메서드
    async addCartItem(cartItem) {
      try {
        await postCartItem(cartItem);
        this.cartItems.push(cartItem);
      } catch (error) {
        console.error('Error adding cart item:', error);
      }
    },

    // 장바구니에서 아이템을 삭제하는 메서드
    async removeCartItem(productId) {
      try {
        await deleteCartItem(productId);
        this.cartItems = this.cartItems.filter(
          (item) => item.productId !== productId
        ); // productId typo 수정
      } catch (error) {
        console.error('Error removing cart item:', error);
      }
    },

    // 장바구니 아이템을 초기화하는 메서드(로그인 시 1번만 실행됨)
    async fetchCartItems() {
      if (!this.cartItems || this.cartItems.length === 0) {
        try {
          const data = await fetchCartList();
          this.cartItems = data;
          this.cartItemsLoaded = true;
        } catch (error) {
          console.error('Error fetching cart items:', error);
        }
      }
    },

    // 선택된 상품 목록 설정 메서드
    setSelectedProducts(products) {
      this.selectedProducts = products;
    },

    // 선택된 상품 목록 초기화 메서드
    clearSelectedProducts() {
      this.selectedProducts = [];
    },

    // 선택된 상품 목록 가져오기
    getSelectedProducts() {
      return this.selectedProducts;
    },
  },
});
