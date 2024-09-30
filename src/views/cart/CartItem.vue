<template>
  <div>
    <h1>장바구니</h1>
    <ul>
      <li v-for="cartItem in cartList" :key="cartItem.productId">
        {{ cartItem.cartId }}
        {{ cartItem.productId }}
        {{ cartItem.memberNum }}
        {{cartItem.productType}}
        {{cartItem.provider}}
        {{cartItem.productName}}
        {{cartItem.expectedReturn}}
        {{cartItem.interestRate}}
        <!-- 삭제 버튼 추가 -->
        <button @click="deleteCartItem(cartItem.cartId)">삭제</button>
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
      <input v-model="newProduct.interestRate" placeholder="이자율" />
      <button @click="addCartItem">장바구니에 추가</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartList: [], // 장바구니 리스트
      newProduct: { // 새로운 상품 정보 입력을 위한 데이터 객체
        productId: "",
        productType: "",
        provider: "",
        productName: "",
        expectedReturn: "",
        interestRate: ""
      }
    };
  },
  methods: {
    // 장바구니 리스트 가져오기
    fetchCart() {
      fetch("/api/cart")
          .then((response) => response.json())
          .then((data) => {
            this.cartList = data;
          })
          .catch((error) => {
            console.error(error);
          });
    },

    // 장바구니에 상품 추가 (POST 요청)
    addCartItem() {
      fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.newProduct) // 새로운 상품 정보 전송
      })
          .then((response) => {
            // 응답이 JSON 형식인지 확인
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            // 응답이 비어 있지 않으면 JSON 파싱
            return response.text().then((text) => (text ? JSON.parse(text) : {}));
          })
          .then((data) => {
            this.clearNewProduct(); // 입력 필드 초기화
          })
          .catch((error) => {
            console.error("Error adding cart item:", error);
          });
    },

    // 입력 필드 초기화
    clearNewProduct() {
      this.newProduct = {
        productId: "",
        memberNum: "",
        productType: "",
        provider: "",
        productName: "",
        expectedReturn: "",
        interestRate: ""
      };
    },

    // 장바구니에서 상품 삭제 (DELETE 요청)
    deleteCartItem(cartId) {
      fetch(`/api/cart/${cartId}`, {
        method: "DELETE",
      })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            this.fetchCart();
          })
          .catch((error) => {
            console.error("Error deleting cart item:", error);
          });
    },
  },
  created() {
    this.fetchCart(); // 컴포넌트 생성 시 장바구니 데이터 가져오기
  }
};
</script>
