<template>
  <div>
    <h1>최근 본 상품</h1>
    <ul>
      <li v-for="item in recentItems" :key="item.productId">
        {{ item.productId }}
        {{ item.productType }}
        {{ item.productName }}
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
import { useRecentViewStore } from '@/store/modules/recentView.js'; // Pinia 스토어 import

export default {
  data() {
    return {
      newProduct: {
        productId: "",
        productType: "",
        productName: "",
      }
    };
  },
  computed: {
    recentItems() {
      const store = useRecentViewStore();
      return store.recentItems; // Pinia 스토어에서 최근 본 상품 리스트 가져오기
    }
  },
  methods: {
    async addRecentViewedItem() {
      const store = useRecentViewStore();
      try {
        await store.addRecentViewItem(this.newProduct); // 최근 본 상품 추가
        this.clearNewProduct();
        await store.fetchRecentItems(); // 최근 본 상품 리스트 새로고침
      } catch (error) {
        console.error('Error adding recent viewed item:', error);
      }
    },
    clearNewProduct() {
      this.newProduct = {
        productId: "",
        productType: "",
        productName: "",
      };
    }
  },
  created() {
    const store = useRecentViewStore();
    store.fetchRecentItems(); // 컴포넌트 생성 시 최근 본 상품 데이터 가져오기
  }
};
</script>
