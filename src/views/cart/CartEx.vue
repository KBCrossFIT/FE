<template>
  <div>
    <h1>장바구니</h1>
    <ul>
      <li v-for="cartItem in cartItems" :key="cartItem.productId">
        {{ cartItem.cartId }}
        {{ cartItem.productId }}
        {{ cartItem.memberNum }}
        {{ cartItem.productType }}
        {{ cartItem.provider }}
        {{ cartItem.productName }}
        {{ cartItem.expectedReturn }}
        {{ cartItem.rsrvType }}
        <!-- 삭제 버튼 추가 -->
        <button @click="removeCartItem(cartItem.productId)">삭제</button>
      </li>
    </ul>

    <!-- 상품 추가 폼 -->
    <div>
      <h2>상품 추가</h2>
      <input v-model="newProduct.productId" placeholder="상품 ID" />
      <input v-model="newProduct.productType" placeholder="상품 유형" />
      <input v-model="newProduct.provider" placeholder="제공자" />
      <input v-model="newProduct.productName" placeholder="상품 이름" />
      <input v-model="newProduct.expectedReturn" placeholder="예상 수익" />
      <input v-model="newProduct.rsrvType" placeholder="예적금 여부" />
      <button @click="addCart">장바구니에 추가</button>
    </div>
  </div>
</template>

<script>
import {deleteCartItem, fetchCartList, getCartList, postCartItem} from "@/api/cartApi.js";

export default {
  data() {
    return {
      cartItems: [], // 장바구니 아이템 리스트
      newProduct: { // 새로 추가할 상품 정보
        productId: "",
        productType: "",
        provider: "",
        productName: "",
        expectedReturn: "",
        rsrvType: ""
      },
    };
  },
  methods: {
    // 장바구니 목록을 가져오는 메서드
    async getCartItems() {
      try {
        const data = await getCartList();
        this.cartItems = data;
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    },

    // 장바구니에 상품 추가
    async addCart() {
      try {
        const data = await postCartItem(this.newProduct); // API 호출
        this.cartItems.push(data); // 장바구니 리스트에 새로 추가된 상품을 반영
        this.clearNewProduct(); // 입력 필드 초기화
      } catch (error) {
        console.error('Error adding cart item:', error);
      }
    },

    // 장바구니에서 상품 삭제
    async removeCartItem(productId) {
      try {
        await deleteCartItem(productId); // API 호출로 아이템 삭제
        this.cartItems = this.cartItems.filter(item => item.productId !== productId); // 리스트에서 삭제된 아이템 제거
      } catch (error) {
        console.error('Error removing cart item:', error);
      }
    },

    // 새 상품 입력 폼 초기화
    clearNewProduct() {
      this.newProduct = {
        productId: "",
        productType: "",
        provider: "",
        productName: "",
        expectedReturn: "",
        rsrvType: ""
      };
    }
  },
  async mounted() {
    // 컴포넌트가 마운트되면 장바구니 데이터를 가져옴
    await this.getCartItems();
  }
};
</script>
