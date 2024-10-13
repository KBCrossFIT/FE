<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal">
      <div class="ModalStock-Header">
        <h1>주식 검색</h1>
      </div>
      <hr />

      <!-- 검색 창 -->
      <div class="search-bar">
        <input v-model="searchQuery" type="text" class="search-input" placeholder="종목명 검색..." />
        <button class="search-button" @click="performSearch">검색</button>
      </div>

      <!-- 주식 리스트 -->
      <div class="table-container">
        <table class="table">
          <thead>
          <tr>
            <th style="width: 7%; text-align: center;">선택</th>
            <th style="width: 15%; text-align: left;">주식 코드</th>
            <th style="width: 28%; text-align: left;">종목명</th>
            <th style="width: 15%; text-align: center;">시장 구분</th>
            <th style="width: 12%; text-align: right;">전일비</th>
            <th style="width: 12%; text-align: right;">등락률</th>
            <th style="width: 15%; text-align: right;">종가</th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="item in filteredStocks"
              :key="item.stockCode"
              :class="{ 'selected-row': selected.includes(item.stockCode) }"
          >
            <td style="text-align: center;">
              <input type="checkbox" :checked="selected.includes(item.stockCode)" @change="toggleSelect(item)" />
            </td>
            <td style="text-align: left;">{{ item.stockCode }}</td>
            <td style="text-align: left;">{{ item.stockName }}</td>
            <td style="text-align: center;">{{ item.mrktCtg }}</td>
            <td style="text-align: right;" :style="getColorStyle(item.vs)">
              <span v-if="item.vs > 0">▲</span>
              <span v-else-if="item.vs < 0">▼</span>
              {{ Math.abs(item.vs) }}
            </td>
            <td style="text-align: right;" :style="getColorStyle(item.fltRt)">
              <span v-if="item.fltRt > 0">+</span>{{ item.fltRt }}%
            </td>
            <td style="text-align: right;">{{ formatPrice(item.clpr) }}</td>
          </tr>
          </tbody>
        </table>
      </div>

      <!-- 페이지네이션과 버튼 -->
      <div class="pagination-and-buttons">
        <div class="pagination-controls">
          <button @click="changePage(-1)" :disabled="currentPage === 1">이전</button>
          <span>{{ currentPage }} / {{ totalPage }}</span>
          <button @click="changePage(1)" :disabled="filteredStocks.length < pageSize">다음</button>
        </div>
        <div class="ModalStock-btn">
          <button class="portfolio-button" @click="addToPortfolio">담기</button>
          <button class="close-button" @click="closeModal">닫기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';

export default {
  name: 'ModalStock',
  setup(_, { emit }) {
    const searchQuery = ref('');
    const selected = ref([]);
    const products = ref([]);
    const filteredStocks = ref([]);
    const currentPage = ref(1);
    const pageSize = ref(7);

    const totalPage = computed(() => {
      return Math.ceil(products.value.length / pageSize.value);
    });

    function getColorStyle(value) {
      return {
        color: value > 0 ? 'red' : value < 0 ? 'blue' : 'black',
      };
    }

    function formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    async function fetchStockItems() {
      try {
        const response = await fetch('/api/stock/all');
        const data = await response.json();
        products.value = data;
        filterStocks();
      } catch (error) {
        console.error('Error fetching stock items:', error);
      }
    }

    function filterStocks() {
      const query = searchQuery.value.toLowerCase();
      const allFilteredStocks = products.value.filter((product) =>
          product.stockName.toLowerCase().includes(query)
      );
      const startIndex = (currentPage.value - 1) * pageSize.value;
      const endIndex = startIndex + pageSize.value;
      filteredStocks.value = allFilteredStocks.slice(startIndex, endIndex);
    }

    function changePage(direction) {
      currentPage.value += direction;
      filterStocks();
    }

    function toggleSelect(item) {
      const index = selected.value.indexOf(item.stockCode);
      if (index > -1) {
        selected.value.splice(index, 1);
      } else {
        selected.value.push(item.stockCode);
      }
    }

    function closeModal() {
      selected.value = [];
      emit('close');
    }

    function addToPortfolio() {
      const stocksToAdd = selected.value.map((stockCode) =>
          products.value.find((stock) => stock.stockCode === stockCode)
      );
      emit('add-stocks', stocksToAdd);
      closeModal();
    }

    onMounted(() => {
      fetchStockItems();
    });

    return {
      searchQuery,
      selected,
      filteredStocks,
      currentPage,
      pageSize,
      getColorStyle,
      formatPrice,
      changePage,
      toggleSelect,
      closeModal,
      addToPortfolio,
      totalPage,
    };
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal {
  background-color: white;
  border-radius: 8px;
  width: 85%;
  max-width: 1000px;
  max-height: 90vh; /* Adjusted for better fit */
  overflow: hidden; /* Removed overflow-y here */
  padding: 20px;
  display: flex;
  flex-direction: column;
}


.ModalStock-Header {
  text-align: center;
  font-size: 24px;
  margin-bottom: 10px;
}

.search-bar {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.search-input {
  width: 50%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.search-button {
  padding: 10px 16px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.search-button:hover {
  background-color: #0056b3;
}

.table-container {
  flex: 1; /* Allow the table to take available space */
  overflow-y: auto;
}
.table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.table th,
.table td {
  padding: 12px 10px;
  border-bottom: 1px solid #ddd;
}

.table th {
  text-align: center;
}

.selected-row {
  background-color: #e0f7fa;
}

.pagination-and-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  padding-top: 10px; /* Added padding for spacing */
  border-top: 1px solid #ddd; /* Optional: border to separate from table */
}

.pagination-controls {
  display: flex;
  gap: 10px;
}

.ModalStock-btn {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.portfolio-button {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.portfolio-button:hover {
  background-color: #45a049;
}

.close-button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.close-button:hover {
  background-color: #d32f2f;
}
</style>
