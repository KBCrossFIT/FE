<template>
    <div class="stock-list-container">
        <div class="table-container">
            <table v-if="paginatedStocks.length > 0" class="table">
                <thead>
                    <tr>
                        <th>종목코드</th>
                        <th>종목명</th>
                        <th>시장 구분</th>
                        <th>종가</th>
                        <th>전일비</th>
                        <th>등락률</th>
                    </tr>
                </thead>

                <tbody>
                    <template v-for="(stock, idx) in paginatedStocks" :key="stock.stockCode">
                        <tr @click="gotoNaverStock(stock.stockCode)">
                            <td>{{ stock.stockCode }}</td>
                            <td>
                                <p class="stockname_font">{{ stock.stockName }}</p>
                            </td>
                            <td>
                                <b>{{ stock.mrktCtg }}</b>
                            </td>
                            <td>
                                <b>{{ formatCurrency(stock.clpr) }}원</b>
                            </td>
                            <td :style="getColorStyle(stock.vs)">
                                {{ stock.vs > 0 ? '+' : '' }}{{ formatCurrency(stock.vs) }}원
                            </td>
                            <td :style="getColorStyle(stock.fltRt)">{{ stock.fltRt }}%</td>
                        </tr>
                    </template>
                </tbody>
            </table>

            <p v-else>종목이 없습니다.</p>
        </div>

        <!-- Pagination Controls -->
        <div class="pagination-container">
            <div class="page-navigation">
                <button @click="prevPage" :disabled="currentPage === 1">이전</button>
                <span>{{ currentPage }} / {{ totalPages }}</span>
                <button @click="nextPage" :disabled="currentPage === totalPages">다음</button>
            </div>
            <div class="page-selection">
                <input v-model.number="goToPage" type="number" min="1" :max="totalPages" />
                <button @click="goToSpecificPage">이동</button>
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
            inputPage: '',
            dropdownIndex: null, // 현재 열린 드롭다운 인덱스
            goToPage: 1,
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
        goToSpecificPage() {
            if (this.goToPage >= 1 && this.goToPage <= this.totalPages) {
                this.currentPage = this.goToPage;
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

        // 통화 형식으로 변환하는 함수
        formatCurrency(value) {
            if (!value || isNaN(value)) return '0';

            if (value < 1_000_000) {
                // 백만 단위 이하의 경우 원래 값 반환
                return Number(value).toLocaleString();
            }

            const units = [
                { limit: 1_000_000_000_000_000, label: '경' }, // 조 위 단위는 경
                { limit: 1_000_000_000_000, label: '조' },
                { limit: 10_000_000, label: '억' },
                { limit: 1_000_000, label: '백만' },
            ];

            for (const unit of units) {
                if (value >= unit.limit) {
                    const formattedValue = (value / unit.limit).toFixed(1);
                    return `${Number(formattedValue)}${unit.label}`;
                }
            }

            // 1백만 이상인 경우 소수점 포함 없이 전체 숫자 반환
            return Number(value).toLocaleString();
        },

        gotoNaverStock(stockCode) {
            const url = `https://finance.naver.com/item/main.naver?code=${stockCode}`;
            window.open(url, '_blank');
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
    border-spacing: 0 15px;
    table-layout: fixed;
}

.table th,
.table td {
    padding: 20px 16px;
    vertical-align: middle;
}

.table th {
    background-color: #f1f3f5;
    font-weight: bold;
    color: #495057;
    font-size: 18px;
    padding: 15px 16px;
}

.table tr {
    background-color: #ffffff;
    transition: background-color 0.3s ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.table tr:hover {
    background-color: #f8f9fa;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.table td:first-child,
.table th:first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
}

.table th:nth-child(1),
.table td:nth-child(1) {
    text-align: center;
    width: 10%;
}

.table th:nth-child(2),
.table td:nth-child(2) {
    text-align: left;
    width: 25%;
}

.table th:nth-child(3),
.table td:nth-child(3) {
    text-align: center;
    width: 10%;
}

.table th:nth-child(4),
.table td:nth-child(4),
.table th:nth-child(5),
.table td:nth-child(5),
.table th:nth-child(6),
.table td:nth-child(6) {
    text-align: right;
    width: 15%;
}

/* 페이지네이션 스타일 */
.pagination-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    gap: 20px;
}

.page-navigation {
    display: flex;
    align-items: center;
}

.page-navigation button,
.page-selection button {
    padding: 5px 10px;
    margin: 0 5px;
    background-color: #7bd5c3;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
}

.page-navigation button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
}

.page-navigation span {
    margin: 0 10px;
}

.page-selection {
    display: flex;
    align-items: center;
}

.page-selection input {
    width: 50px;
    padding: 5px;
    margin-right: 5px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    font-size: 14px;
}

.page-selection input:focus {
    outline: none;
    border-color: #589f91;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.pagination-btn {
    padding: 10px 20px;
    background-color: #7bd5c3;
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.pagination-btn:hover:not(:disabled) {
    background-color: #589f91;
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

.stockname_font {
    font-size: 20px;
}

button:disabled {
    background-color: #f1f3f5;
    cursor: not-allowed;
    color: #adb5bd;
}
</style>
