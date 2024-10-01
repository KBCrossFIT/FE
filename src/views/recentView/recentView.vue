<template>
  <div>
    <h1>최근 본 상품</h1>
    <ul>
      <li v-for="item in recentViewedItems" :key="item.productId">
        {{item.productId }}
        {{item.productType}}
        {{item.productName}}
      </li>
    </ul>

    <!-- 상품 추가 폼 -->
    <div>
      <h2>상품 추가</h2>
      <input v-model="newProduct.productId" placeholder="상품 ID" />
      <input v-model="newProduct.productType" placeholder="상품 유형" />
      <input v-model="newProduct.productName" placeholder="상품 이름" />
      <button @click="addRecentViewedItem">최근 본 상품 요청</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recentViewedItems: [], // 최근 본 상품 리스트
      newProduct: { // 새 상품 입력을 위한 데이터 객체
        productId: "",
        productType: "",
        productName: "",
      }
    };
  },
  methods: {
    // 장바구니 리스트 가져오기
    fetchRecentView() {
      fetch("/api/recentView")
          .then((response) => response.json())
          .then((data) => {
            this.recentViewedItems = data;
          })
          .catch((error) => {
            console.error(error);
          });
    },

    // 최근 본 상품 추가 (POST 요청)
    addRecentViewedItem() {
      fetch("/api/recentView", {
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
          .then(() => {
            this.clearNewProduct();
            this.fetchRecentView();
          })
          .catch((error) => {
            console.error("Error adding cart item:", error);
          });
    },

    // 입력 필드 초기화
    clearNewProduct() {
      this.newProduct = {
        productId: "",
        productType: "",
        productName: "",
      };
    },
  },

  created() {
    this.fetchRecentView(); // 컴포넌트 생성 시 장바구니 데이터 가져오기
  }
};
</script>