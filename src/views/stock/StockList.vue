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
    </div>

    <div class="info-message">※ 종목 선택 시 네이버 증권으로 이동합니다.</div>

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
/* 전체 컨테이너 스타일 */
.stock-list-container {
    width: 100%;
    padding: 10px;
    color: #333;
    font-size: 16px;
    position: relative;
}

/* 테이블 컨테이너 스타일 */
.table-container {
    width: 100%;
}

/* 테이블 스타일 */
.table {
    width: 100%;
    min-width: 800px;
    border-collapse: collapse;
    margin-top: 20px;
}

.table th,
.table td {
    padding: 20px 30px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    font-size: 18px;
    color: #333333;
}

.table th {
    font-weight: bold;
    color: #495057;
}

.table tbody tr:hover {
    background-color: #f1f1f1;
    cursor: pointer;
}

.table tr {
    background-color: #ffffff;
    transition: background-color 0.3s ease, transform 0.3s ease;
}

.table tr:hover {
    background-color: #f1f1f1;
    transform: translateY(-2px);
}

/* 열 너비 재조정 */
.table td:first-child,
.table th:first-child {
    text-align: center; /* 첫 번째 열 텍스트 중앙 정렬 */
    width: 15%; /* 첫 번째 열 너비를 10%에서 12%로 증가 */
}

.table td:nth-child(2),
.table th:nth-child(2) {
    text-align: center; /* 두 번째 열 텍스트 좌측 정렬 */
    width: 30%; /* 두 번째 열 너비를 25%에서 30%로 증가 */
}

.table td:nth-child(3),
.table th:nth-child(3) {
    text-align: center; /* 세 번째 열 텍스트 중앙 정렬 */
    width: 10%; /* 세 번째 열 너비를 10%에서 8%로 감소 */
}

.table td:nth-child(4),
.table th:nth-child(4) {
    text-align: center; /* 네 번째, 다섯 번째, 여섯 번째 열 텍스트 우측 정렬 */
    width: 20%; /* 네 번째, 다섯 번째, 여섯 번째 열 너비 유지 */
}

.table td:nth-child(5),
.table th:nth-child(5),
.table td:nth-child(6),
.table th:nth-child(6) {
    text-align: right; /* 네 번째, 다섯 번째, 여섯 번째 열 텍스트 우측 정렬 */
    width: 15%; /* 네 번째, 다섯 번째, 여섯 번째 열 너비 유지 */
}

.info-message {
    text-align: right; /* 우측 정렬 */
    font-size: 14px; /* 폰트 크기 조정 */
    color: #666666; /* 색상 조정 (회색 계열) */
}

/* 페이지네이션 컨테이너 스타일 */
.pagination-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    gap: 20px;
}

/* 페이지 네비게이션 스타일 */
.page-navigation {
    display: flex;
    align-items: center;
}

.page-navigation button,
.page-selection button {
    padding: 10px 15px; /* 버튼 패딩 조정 */
    margin: 0 5px; /* 버튼 간 간격 */
    background-color: #7bd5c3; /* 버튼 배경색 */
    color: white; /* 버튼 텍스트 색상 */
    border: none; /* 테두리 제거 */
    border-radius: 5px; /* 버튼 테두리 반경 */
    cursor: pointer; /* 커서 포인터 변경 */
    font-size: 14px; /* 버튼 폰트 크기 */
    transition: background-color 0.3s ease, transform 0.2s ease; /* 전환 효과 */
}

.page-navigation button:disabled,
.page-selection button:disabled {
    background-color: #cccccc; /* 비활성화된 버튼 배경색 */
    cursor: not-allowed; /* 비활성화된 버튼 커서 */
}

.page-navigation button:hover:not(:disabled),
.page-selection button:hover:not(:disabled) {
    background-color: #589f91; /* 호버 시 버튼 배경색 변경 */
    transform: translateY(-2px); /* 호버 시 버튼 위로 이동 */
}

.page-navigation span {
    margin: 0 10px;
    font-size: 16px;
    color: #333;
    font-weight: bold;
}

/* 페이지 선택 스타일 */
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
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.page-selection input:focus {
    outline: none;
    border-color: #589f91;
    box-shadow: 0 0 0 0.2rem rgba(88, 159, 145, 0.25);
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

.stockname_font {
    font-size: 20px;
}

button:disabled {
    background-color: #f1f3f5;
    cursor: not-allowed;
    color: #adb5bd;
}

/* 검색 및 정렬 버튼 스타일 */
.search-btn,
.clear-btn {
    padding: 10px 15px;
    margin-left: 10px;
    background-color: #7bd5c3;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.clear-btn {
    background-color: #f0f0f0;
    color: #000;
}

.search-btn:hover {
    background-color: #589f91;
}

.clear-btn:hover {
    background-color: #ddd;
}
</style>
