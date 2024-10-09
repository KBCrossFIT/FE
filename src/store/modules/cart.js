import {deleteCartItem, fetchCartList, getCartList, postCartItem} from "@/api/cartApi.js";

export default {
  data() {
    return {
      cartItems: [], // 장바구니 아이템
      cartItemsLoaded: false, // 장바구니 아이템 로딩 여부
      newCartItem: null, // 새로 추가된 장바구니 아이템
    };
  },

  methods: {
    // 장바구니 아이템을 가져오는 메서드
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

    // 장바구니에 새 아이템을 추가하는 메서드
    async addCartItem(cartItem) {
      try {
        const data = await postCartItem(cartItem);
        this.newCartItem = data;
        this.cartItems.push(this.newCartItem); // 새 아이템 추가
      } catch (error) {
        console.error('Error adding cart item:', error);
      }
    },

    // 장바구니에서 아이템을 삭제하는 메서드
    async removeCartItem(cartId) {
      try {
        await deleteCartItem(cartId);
        this.cartItems = this.cartItems.filter(
          (item) => item.cartId !== carttId
        );
      } catch (error) {
        console.error('Error removing cart item:', error);
      }
    },

    async getCartItems() {
      try {
        const data = await getCartList();
        this.cartItems = data;
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    },
  },
};

