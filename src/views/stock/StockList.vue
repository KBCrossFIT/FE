<template>
    <div class="stock-list-container">
      <div class="table-container">
        <table v-if="stocks.length > 0" class="table">
          <thead>
            <tr>
              <th>주식 코드</th>
              <th>주식명</th>
              <th>시장 구분</th>
              <th>종가</th>
              <th>전일비</th>
              <th>등락률</th>
              <th>시가</th>
              <th>최고가</th>
              <th>최저가</th>
              <th>거래량</th>
              <th>거래대금</th>
              <th>상장주식수</th>
              <th>시가총액</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="stock in paginatedStocks" :key="stock.stockCode">
              <td>{{ stock.stockCode }}</td>
              <td>{{ stock.stockName }}</td>
              <td>{{ stock.mrktCtg }}</td>
              <td>{{ formatPrice(stock.clpr) }}원</td>
              <td :class="getPriceChangeClass(stock.vs)">{{ formatPriceChange(stock.vs) }}원</td>
              <td :class="getPriceChangeClass(stock.fltRt)">{{ formatPercentage(stock.fltRt) }}</td>
              <td>{{ formatPrice(stock.mkp) }}원</td>
              <td>{{ formatPrice(stock.hipr) }}원</td>
              <td>{{ formatPrice(stock.lopr) }}원</td>
              <td>{{ formatNumber(stock.trqu) }}주</td>
              <td>{{ formatLargeNumber(stock.trPrc) }}</td>
              <td>{{ formatNumber(stock.istgStCnt) }}주</td>
              <td>{{ formatLargeNumber(stock.mrktTotAmt) }}</td>
            </tr>
          </tbody>
        </table>
        <p v-else>주식 데이터가 없습니다.</p>
      </div>

        <!-- 페이지 네비게이션 -->
        <div class="navigation-container">
      <div v-if="totalPages > 1" class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1" class="pagination-btn">
          이전
        </button>
        <span>페이지 {{ currentPage }} / {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination-btn">
          다음
        </button>
      </div>

      <div class="page-input-container">
        <input
          v-model.number="inputPage"
          type="number"
          :min="1"
          :max="totalPages"
          class="page-input"
          @keyup.enter="goToPage"
          placeholder="이동할 페이지"
        />
        <button @click="goToPage" class="go-btn">이동</button>
      </div>
    </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            stocks: [],
            currentPage: 1,
            pageSize: 6,
            totalPages: 0,
            inputPage: '', // 입력된 페이지 번호
        };
    },
    computed: {
        paginatedStocks() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            return this.stocks.slice(start, end);
        },
    },
    methods: {
        fetchStocks() {
            fetch('/api/stock/all')
                .then((response) => response.json())
                .then((data) => {
                    this.stocks = data;
                    this.totalPages = Math.ceil(this.stocks.length / this.pageSize);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        goToPage() {
            // 페이지 입력 값이 유효한지 확인
            if (this.inputPage >= 1 && this.inputPage <= this.totalPages) {
                this.currentPage = this.inputPage; // 입력한 페이지로 이동
            } else {
                alert(`1에서 ${this.totalPages} 사이의 유효한 페이지 번호를 입력하세요.`);
            }
        },
        // 값에 따라 색상을 반환하는 메서드
        getColorStyle(value) {
            if (value > 0) {
                return { color: 'red' }; // 양수일 때 빨간색
            } else if (value < 0) {
                return { color: 'blue' }; // 음수일 때 파란색
            } else {
                return { color: 'black' }; // 0일 때 검정색
            }
        },

        formatPrice(price) {
            return Intl.NumberFormat('ko-KR').format(price);
        },
        
        formatPriceChange(change) {
            const formatted = new Intl.NumberFormat('ko-KR').format(Math.abs(change));
            return change >= 0 ? `+${formatted}` : `-${formatted}`;
        },

        formatPercentage(percentage) {
            return new Intl.NumberFormat('ko-KR').format(percentage) + '%';
        },
        
        formatNumber(number) {
            return new Intl.NumberFormat('ko-KR').format(number);
        },

        formatLargeNumber(number) {
            if (number >= 1000000000000) { // 1조 이상
                return this.formatNumber(Math.floor(number / 100000000000) / 10) + '조원';
            } else if (number >= 100000000) { // 1억 이상
                return this.formatNumber(Math.floor(number / 10000000) / 10) + '억원';
            } else if (number >= 10000) { // 1만 이상
                return this.formatNumber(Math.floor(number / 1000) / 10) + '만원';
            } else {
                return this.formatNumber(number) + '원';
            }
        },

        getPriceChangeClass(value) {
            return value > 0 ? 'price-up' : value < 0 ? 'price-down' : '';
        },
    },
    created() {
        this.fetchStocks();
    },
};
</script>

<style scoped>
.stock-list-container {
  width: 100%;
  padding: 20px;
  background-color: #f8f9fa;
  color: #333;
  font-size: 16px;
}

.table-box {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 20px;
}

.table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 15px; /* 행 간격 증가 */
}

.table th,
.table td {
  padding: 20px 16px; /* 셀 내부 패딩 증가 */
  text-align: right;
  vertical-align: middle; /* 셀 내용 수직 가운데 정렬 */
}

.table th {
  background-color: #f1f3f5;
  font-weight: bold;
  text-align: center;
  color: #495057;
  font-size: 18px;
  padding: 15px 16px; /* 헤더 셀 패딩 조정 */
}

.table tr {
  background-color: #ffffff;
  transition: background-color 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); /* 각 행에 그림자 효과 추가 */
}

.table tr:hover {
  background-color: #f8f9fa;
  transform: translateY(-2px); /* 호버 시 약간 위로 이동 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 호버 시 그림자 강화 */
}

.table td:first-child,
.table th:first-child {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

.table td:last-child,
.table th:last-child {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}

.table td:nth-child(2) {
  text-align: left;
}

.price-up {
  color: #dc3545;
}

.price-down {
  color: #28a745;
}

.navigation-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 20px;
}

/* 페이지네이션 스타일 */
.pagination {
  display: flex;
  align-items: center;
}

.pagination-btn {
  padding: 8px 16px;
  background-color: #e9ecef;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  color: #495057;
  margin: 0 5px;
}

.pagination-btn:hover {
  background-color: #ced4da;
}

.pagination span {
  margin: 0 10px;
}

.page-input-container {
  display: flex;
  align-items: center;
}

.page-input {
  width: 100px;
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  text-align: center;
}

.go-btn {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.go-btn:hover {
  background-color: #0056b3;
}

button:disabled {
  background-color: #f1f3f5;
  cursor: not-allowed;
  color: #adb5bd;
}
</style>
