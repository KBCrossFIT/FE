<template>
    <div class="financial-products-container">
      <h1>금융상품 페이지</h1>
      <div class="search-filter">
        <input v-model="searchQuery" type="text" class="form-control" placeholder="상품명 검색..." />
        <select v-model="selectedCategory" class="form-select">
          <option value="">모든 카테고리</option>
          <option value="savings">적금</option>
          <option value="bonds">채권</option>
          <option value="funds">펀드</option>
        </select>
      </div>
  
      <div class="product-list">
        <div v-for="product in filteredProducts" :key="product.id" class="product-card card">
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text">
              <strong>수익률:</strong><br />
              <span v-if="product.type === 'bonds'">3개월: {{ product.yield[0] }}%<br />
              6개월: {{ product.yield[1] }}%<br />
              12개월: {{ product.yield[2] }}%</span>
              <span v-else-if="product.type === 'funds'">3개월: {{ product.yield[0] }}%<br />
              6개월: {{ product.yield[1] }}%<br />
              12개월: {{ product.yield[2] }}%</span>
              <span v-else>수익률 정보 없음</span>
            </p>
            <button @click="addToCart(product)" class="btn btn-primary">
              장바구니 담기
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed, inject } from 'vue';
  
  export default {
    name: 'FinancialProducts',
    setup() {
      const searchQuery = ref('');
      const selectedCategory = ref('');
      const cart = inject('cart');
  
      if (!cart) {
        throw new Error('Cart not provided');
      }
  
      const products = ref([
        { id: 1, name: '정기예금 A', type: 'savings' },
        { id: 2, name: '국채 B', type: 'bonds', yield: [1.2, 1.5, 1.8] },
        { id: 3, name: '펀드 C', type: 'funds', yield: [3.2, 3.5, 3.8] },
        { id: 4, name: '정기예금 D', type: 'savings' },
        { id: 5, name: '회사채 E', type: 'bonds', yield: [2.1, 2.4, 2.7] },
      ]);
  
      const filteredProducts = computed(() => {
        return products.value.filter(product => {
          const matchesCategory = selectedCategory.value ? product.type === selectedCategory.value : true;
          const matchesSearch = product.name.toLowerCase().includes(searchQuery.value.toLowerCase());
          return matchesCategory && matchesSearch;
        });
      });
  
      const addToCart = (product) => {
        if (cart) {
          cart.value.push(product);
          alert(`${product.name}이 장바구니에 추가되었습니다.`);
        }
      };
  
      return {
        searchQuery,
        selectedCategory,
        filteredProducts,
        addToCart,
      };
    }
  };
  </script>
  
  <style scoped>
  .financial-products-container {
    padding: 20px;
  }
  
  .search-filter {
    margin-bottom: 20px;
    display: flex;
    gap: 10px;
  }
  
  .form-control {
    flex: 1;
  }
  
  .form-select {
    flex: 0.3;
  }
  
  .product-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .product-card {
    flex: 1 1 calc(33.333% - 20px);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
  }
  
  .card-body {
    padding: 20px;
  }
  
  .btn-primary {
    background-color: #007bff;
    border: none;
  }
  
  .btn-primary:hover {
    background-color: #0056b3;
  }
  </style>
  