<template>
  <div class="modal" @click.self="closeModal">
    <div class="ModalStock-Header">
      <h1>주식 검색/추가 페이지</h1>
    </div>
    <hr />
    <!-- 주식 상품 페이지 -->
    <div class="Stock-filter">
      <input
        v-model="searchQuery"
        type="text"
        class="form-control"
        placeholder="종목명 검색..."
      />
    </div>
    <v-data-table
      class="stockList"
      :items="filteredStocks"
      :headers="headers"
      item-value="id"
    >
      <template #top>
        <th>
          <input type="checkbox" :checked="isAllSelected" @change="toggleAll" />
        </th>
      </template>

      <template #item="{ item }">
        <tr
          @click="toggleSelect(item)"
          :class="{ 'selected-row': selected.includes(item.id) }"
        >
          <td>
            <input
              type="checkbox"
              :checked="selected.includes(item.id)"
              @change="toggleSelect(item)"
            />
          </td>
          <td>{{ item.id }}</td>
          <td>{{ item.StockName }}</td>
          <td>{{ item.itmsNm }}</td>
          <td>{{ item.type }}</td>
          <td>{{ item.DailyPrice }}</td>
          <td>
            <input
              type="number"
              v-model.number="quantities[item.id]"
              placeholder="개수 입력"
            />
          </td>
          <td>{{ item.clpr }}</td>
          <td>{{ (item.fltRt * 100).toFixed(2) }}%</td>
          <td>{{ item.Field }}</td>
        </tr>
      </template>
    </v-data-table>

    <div class="ModalStock-btn">
      <v-btn @click="addToPortfolio">포트폴리오에 추가하기</v-btn>
      <v-btn @click="closeModal">모달 닫기</v-btn>
    </div>
  </div>
</template>

<script>
import { getCartItems } from '@/store/modules/cart'; // Vuex store에서 getCartItems를 가져옴

export default {
  name: 'ModalStock',
  data() {
    return {
      searchQuery: '', // 검색어를 저장할 변수
      selected: [], // 선택된 주식 항목을 저장할 배열
      quantities: {}, // 선택된 주식의 수량을 저장할 객체
      products: [], // API에서 불러온 데이터를 저장할 배열
      headers: [
        { text: 'ID', value: 'id' },
        { text: '종목명', value: 'StockName' },
        { text: 'ITMS 명', value: 'itmsNm' },
        { text: '종류', value: 'type' },
        { text: '현재가', value: 'DailyPrice' },
        { text: '수량', value: 'quantity' },
        { text: '종가', value: 'clpr' },
        { text: '등락률', value: 'fltRt' },
        { text: '분류', value: 'Field' },
      ],
    };
  },
  computed: {
    filteredStocks() {
      return this.products.filter((product) =>
        product.StockName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    isAllSelected() {
      return (
        this.filteredStocks.length > 0 &&
        this.filteredStocks.every((item) => this.selected.includes(item.id))
      );
    },
  },
  methods: {
    async fetchStockItems() {
      try {
        const data = await getCartItems();
        this.products = data;
      } catch (error) {
        console.error('Error fetching stock items:', error);
      }
    },
    toggleAll() {
      if (this.isAllSelected) {
        this.selected = [];
      } else {
        this.selected = this.filteredStocks.map((item) => item.id);
      }
    },
    toggleSelect(item) {
      const index = this.selected.indexOf(item.id);
      if (index > -1) {
        this.selected.splice(index, 1);
      } else {
        this.selected.push(item.id);
      }
    },
    addToPortfolio() {
      if (this.selected.length === 0) {
        alert('선택한 주식이 없습니다.');
        return;
      }
      const selectedStocks = this.products.filter((product) =>
        this.selected.includes(product.id)
      );
      console.log('포트폴리오에 추가할 주식:', selectedStocks, this.quantities);
      this.$emit('close');
    },
    closeModal() {
      this.$emit('close');
    },
  },
  mounted() {
    this.fetchStockItems();
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 1080px;
  height: auto;
  display: flex;
  flex-direction: column;
}

.ModalStock-Header {
  text-align: center;
  padding: 10px;
}

.Stock-filter {
  margin: 10px;
}

.stockList {
  flex-grow: 1;
  overflow-y: auto;
  max-height: 450px;
}

.selected-row {
  background-color: #e0f7fa;
}

.ModalStock-btn {
  display: flex;
  justify-content: flex-end;
  margin: 10px;
}

.ModalStock-btn v-btn {
  background-color: #4db6ac;
  margin-left: 10px;
}
</style>
