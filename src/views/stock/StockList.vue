<template>
    <div class="stock-list-container">
        <div class="table-container">
            <table v-if="paginatedStocks.length > 0" class="table">
                <thead>
                    <tr>
                        <th>주식 코드</th>
                        <th>주식명</th>
                        <th>시장 구분</th>
                        <th>종가</th>
                        <th>전일비</th>
                        <th>등락률</th>
                    </tr>
                </thead>

                <tbody>
                    <template v-for="(stock, idx) in paginatedStocks" :key="stock.stockCode">
                        <tr @click="toggleDropdown(idx)">
                            <td>{{ stock.stockCode }}</td>
                            <td>{{ stock.stockName }}</td>
                            <td>{{ stock.mrktCtg }}</td>
                            <td>{{ formatCurrency(stock.clpr) }}</td>
                            <td :style="getColorStyle(stock.vs)">{{ formatCurrency(stock.vs) }}</td>
                            <td :style="getColorStyle(stock.fltRt)">{{ stock.fltRt }}%</td>
                        </tr>

                        <transition name="fade-slide">
                            <tr v-if="dropdownIndex === idx" class="dropdown-content">
                                <td colspan="6">
                                    <div class="dropdown-box">
                                        <p>
                                            <strong>시가:</strong> {{ formatCurrency(stock.mkp) }}
                                        </p>
                                        <p>
                                            <strong>최고가:</strong>
                                            {{ formatCurrency(stock.hipr) }}
                                        </p>
                                        <p>
                                            <strong>최저가:</strong>
                                            {{ formatCurrency(stock.lopr) }}
                                        </p>
                                        <p>
                                            <strong>거래량:</strong>
                                            {{ formatCurrency(stock.trqu) }}
                                        </p>
                                        <p>
                                            <strong>거래대금:</strong>
                                            {{ formatCurrency(stock.trPrc) }}
                                        </p>
                                        <p>
                                            <strong>상장주식수:</strong>
                                            {{ formatCurrency(stock.istgStCnt) }}
                                        </p>
                                        <p>
                                            <strong>시가총액:</strong>
                                            {{ formatCurrency(stock.mrktTotAmt) }}
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        </transition>
                    </template>
                </tbody>
            </table>

            <p v-else>주식 데이터가 없습니다.</p>
        </div>

        <!-- Pagination Controls -->
        <div v-if="totalPages > 1" class="pagination">
            <button @click="prevPage" :disabled="currentPage === 1" class="pagination-btn">
                이전
            </button>
            <span>페이지 {{ currentPage }} / {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination-btn">
                다음
            </button>
        </div>

        <!-- Page Navigation Input -->
        <div class="page-input-container">
            <input
                v-model.number="inputPage"
                type="number"
                :min="1"
                :max="totalPages"
                class="page-input"
                @keyup.enter="goToPage"
                placeholder="이동할 페이지 입력"
            />
            <button @click="goToPage" class="go-btn">이동</button>
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
            inputPage: '',
            dropdownIndex: null, // 현재 열린 드롭다운 인덱스
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
                this.dropdownIndex = null; // 페이지 이동 시 드롭다운 닫기
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.dropdownIndex = null; // 페이지 이동 시 드롭다운 닫기
            }
        },
        goToPage() {
            if (this.inputPage >= 1 && this.inputPage <= this.totalPages) {
                this.currentPage = this.inputPage;
                this.dropdownIndex = null;
            } else {
                alert(`1에서 ${this.totalPages} 사이의 유효한 페이지 번호를 입력하세요.`);
            }
        },
        getColorStyle(value) {
            if (value > 0) {
                return { color: 'red' };
            } else if (value < 0) {
                return { color: 'blue' };
            } else {
                return { color: 'black' };
            }
        },
        toggleDropdown(index) {
            this.dropdownIndex = this.dropdownIndex === index ? null : index;
        },

        // 통화 형식으로 변환하는 함수
        formatCurrency(value) {
            return Number(value).toLocaleString();
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

/* 페이지네이션 스타일 개선 */
.pagination {
    margin-top: 30px; /* 상단 여백 증가 */
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px; /* 버튼 간격 조정 */
}

.pagination-btn {
    padding: 10px 20px;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.pagination-btn:hover:not(:disabled) {
    background-color: #0056b3;
    transform: translateY(-2px);
}

.pagination-btn:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.pagination span {
    font-size: 16px;
    color: #333;
    font-weight: bold;
}

/* 페이지네이션 입력 박스 스타일 개선 */
.page-input-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15px; /* 상단 여백 조정 */
    gap: 10px; /* 입력과 버튼 간격 조정 */
}

.page-input {
    width: 100px;
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    text-align: center;
    font-size: 14px;
    transition: border-color 0.3s ease;
}

.page-input:focus {
    border-color: #007bff;
    outline: none;
}

.go-btn {
    padding: 8px 16px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.go-btn:hover {
    background-color: #218838;
    transform: translateY(-2px);
}

.dropdown-content {
    background-color: #f9f9f9;
}

.dropdown-box {
    padding: 15px;
    border-top: 1px solid #ddd;
    background-color: #f0f0f0;
}

/* 애니메이션 스타일 추가 */
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

.fade-slide-enter-to,
.fade-slide-leave-from {
    opacity: 1;
    transform: translateY(0);
}

button:disabled {
    background-color: #f1f3f5;
    cursor: not-allowed;
    color: #adb5bd;
}
</style>
