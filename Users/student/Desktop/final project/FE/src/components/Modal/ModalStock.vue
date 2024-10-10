<template>
    <div class="modal-overlay" @click.self="closeModal">
        <div class="modal">
            <div class="ModalStock-Header">
                <h1>주식 검색/추가 페이지</h1>
            </div>
            <hr />

            <!-- 검색 창 -->
            <div class="search-bar">
                <input
                    v-model="searchQuery"
                    type="text"
                    class="search-input"
                    placeholder="종목명 검색..."
                />
                <button class="search-button" @click="performSearch">검색</button>
                <button class="clear-button" @click="clearSearch">지우기</button>
            </div>

            <!-- 상단 주식 리스트 -->
            <div class="table-container">
                <table class="table">
                    <thead>
                        <tr>
                            <th>
                                <input
                                    type="checkbox"
                                    :checked="isAllSelected"
                                    @change="toggleAll"
                                />
                            </th>
                            <th>주식 코드</th>
                            <th>주식명</th>
                            <th>시장 구분</th>
                            <th>전일비</th>
                            <th>등락률</th>
                            <th>종가</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="item in filteredStocks"
                            :key="item.stockCode"
                            @click="toggleSelect(item)"
                            :class="{ 'selected-row': selected.includes(item.stockCode) }"
                            class="upper-modalstock-tr"
                        >
                            <td>
                                <input
                                    type="checkbox"
                                    :checked="selected.includes(item.stockCode)"
                                    @change.stop="toggleSelect(item)"
                                />
                            </td>
                            <td>{{ item.stockCode }}</td>
                            <td>{{ item.stockName }}</td>
                            <td>{{ item.mrktCtg }}</td>
                            <td :style="getColorStyle(item.vs)">{{ item.vs }}</td>
                            <td :style="getColorStyle(item.fltRt)">{{ item.fltRt }}%</td>
                            <td>{{ item.clpr }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- 페이지네이션 -->
            <div class="pagination-controls">
                <button @click="changePage(-1)" :disabled="currentPage === 1">이전 페이지</button>
                <span>{{ currentPage }} / {{ totalPage }}</span>
                <button @click="changePage(1)" :disabled="filteredStocks.length < pageSize">
                    다음 페이지
                </button>
            </div>
            <button class="move-button" @click="moveToSelectedList">선택 항목 하단에 넘기기</button>

            <!-- 하단 선택된 주식 리스트 -->
            <div class="table-container">
                <table class="table">
                    <thead>
                        <tr>
                            <th>주식 코드</th>
                            <th>주식명</th>
                            <th>시장 구분</th>
                            <th>종가</th>
                            <th>수량</th>
                            <th>삭제</th>
                        </tr>
                    </thead>

                    <tbody>
                        <template v-if="paginatedSelectedStocks.length > 0">
                            <tr
                                v-for="item in paginatedSelectedStocks"
                                :key="item.stockCode"
                                class="lower-modalstock-tr"
                            >
                                <td>{{ item.stockCode }}</td>
                                <td>{{ item.stockName }}</td>
                                <td>{{ item.mrktCtg }}</td>
                                <td>{{ item.clpr }}</td>

                                <!-- 개수 입력 박스 -->
                                <td>
                                    <div class="quantity-input">
                                        <button @click="decreaseQuantity(item.stockCode)">-</button>
                                        <input
                                            type="number"
                                            v-model.number="quantities[item.stockCode]"
                                            min="0"
                                            class="quantity-box"
                                        />
                                        <button @click="increaseQuantity(item.stockCode)">+</button>
                                    </div>
                                </td>

                                <!-- 해당 주식 지우기 버튼 -->
                                <td>
                                    <button
                                        class="delete-button"
                                        @click="removeStock(item.stockCode)"
                                    >
                                        지우기
                                    </button>
                                </td>
                            </tr>
                        </template>

                        <!-- 하단 리스트 비어있을 때 출력-->
                        <template v-else>
                            <tr v-for="n in 3" :key="n">
                                <td colspan="5" class="empty-row">빈 항목</td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
            <!-- 하단 리스트 페이지네이션 -->
            <div class="pagination-controls">
                <button @click="changeSelectedPage(-1)" :disabled="selectedCurrentPage === 1">
                    이전 페이지
                </button>
                <span>{{ selectedCurrentPage }} / {{ selectedTotalPage }}</span>
                <button
                    @click="changeSelectedPage(1)"
                    :disabled="paginatedSelectedStocks.length < selectedPageSize"
                >
                    다음 페이지
                </button>
            </div>

            <div class="ModalStock-btn">
                <button
                    :disabled="selectedStocks.length === 0"
                    class="portfolio-button"
                    @click="addToPortfolio"
                >
                    구성 페이지에 담기
                </button>
                <button class="close-button" @click="closeModal">모달 닫기</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, watch } from 'vue';

export default {
    name: 'ModalStock',
    props: {
        existingStocks: {
            type: Array,
            default: () => [],
        },
    },
    setup(props, { emit }) {
        const searchQuery = ref('');
        const selected = ref([]);
        const quantities = ref({});
        const products = ref([]);
        const selectedStocks = ref([]);
        const filteredStocks = ref([]);
        const currentPage = ref(1);
        const pageSize = ref(4);

        // 하단 리스트 페이지네이션 변수
        const selectedCurrentPage = ref(1);
        const selectedPageSize = ref(4);

        const totalPage = computed(() => {
            return Math.ceil(products.value.length / pageSize.value);
        });

        const selectedTotalPage = computed(() => {
            return Math.ceil(selectedStocks.value.length / selectedPageSize.value);
        });

        const paginatedSelectedStocks = computed(() => {
            const startIndex = (selectedCurrentPage.value - 1) * selectedPageSize.value;
            return selectedStocks.value.slice(startIndex, startIndex + selectedPageSize.value);
        });

        function getColorStyle(value) {
            return {
                color: value > 0 ? 'red' : value < 0 ? 'blue' : 'black',
            };
        }

        function changePage(direction) {
            currentPage.value += direction;
            filterStocks();
        }

        function changeSelectedPage(direction) {
            selectedCurrentPage.value += direction;
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
            const allFilteredStocks = products.value.filter(
                (product) =>
                    product.stockName.toLowerCase().includes(query) &&
                    !selectedStocks.value.some(
                        (selected) => selected.stockCode === product.stockCode
                    )
            );
            const startIndex = (currentPage.value - 1) * pageSize.value;
            const endIndex = startIndex + pageSize.value;
            filteredStocks.value = allFilteredStocks.slice(startIndex, endIndex);
        }

        function toggleSelect(item) {
            const index = selected.value.indexOf(item.stockCode);
            if (index > -1) {
                selected.value.splice(index, 1);
            } else {
                selected.value.push(item.stockCode);
            }
        }

        function toggleAll() {
            if (isAllSelected.value) {
                selected.value = [];
            } else {
                selected.value = filteredStocks.value.map((item) => item.stockCode);
            }
        }

        function moveToSelectedList() {
            const itemsToMove = products.value.filter((product) =>
                selected.value.includes(product.stockCode)
            );

            itemsToMove.forEach((item) => {
                if (!quantities.value[item.stockCode]) {
                    quantities.value[item.stockCode] = 1;
                }
            });

            selectedStocks.value.push(...itemsToMove);
            selected.value = [];
            filterStocks();
        }

        function closeModal() {
            selectedStocks.value = [];
            selected.value = [];
            quantities.value = {};
            filterStocks();
            emit('close');
        }

        function decreaseQuantity(stockCode) {
            if (quantities.value[stockCode] > 1) {
                quantities.value[stockCode] -= 1;
            }
        }

        function increaseQuantity(stockCode) {
            if (!quantities.value[stockCode]) {
                quantities.value[stockCode] = 1;
            } else {
                quantities.value[stockCode] += 1;
            }
        }

        function removeStock(stockCode) {
            selectedStocks.value = selectedStocks.value.filter(
                (item) => item.stockCode !== stockCode
            );
            delete quantities.value[stockCode];
            filterStocks();
        }

        function addToPortfolio() {
            emit('add-stocks', selectedStocks.value);
            closeModal();
        }

        const isAllSelected = computed(() => {
            return (
                filteredStocks.value.length > 0 &&
                filteredStocks.value.every((item) => selected.value.includes(item.stockCode))
            );
        });

        watch(
            () => props.existingStocks,
            (newStocks) => {
                if (newStocks.length > 0) {
                    selectedStocks.value = [...newStocks];
                    newStocks.forEach((stock) => {
                        quantities.value[stock.stockCode] = quantities.value[stock.stockCode] || 1;
                    });
                }
            },
            { immediate: true, deep: true }
        );

        return {
            searchQuery,
            selected,
            quantities,
            products,
            selectedStocks,
            filteredStocks,
            currentPage,
            pageSize,
            fetchStockItems,
            filterStocks,
            toggleSelect,
            toggleAll,
            getColorStyle,
            isAllSelected,
            moveToSelectedList,
            closeModal,
            changePage,
            decreaseQuantity,
            increaseQuantity,
            addToPortfolio,
            removeStock,
            totalPage,
            selectedCurrentPage,
            selectedPageSize,
            selectedTotalPage,
            paginatedSelectedStocks,
            changeSelectedPage,
        };
    },
    mounted() {
        this.fetchStockItems();
    },
};
</script>

<style scoped>
/* 기본 스타일 */
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
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    width: 80%;
    max-width: 1200px;
    max-height: 90vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    padding: 20px;
}

.ModalStock-Header {
    text-align: center;
    font-size: 24px;
    margin-bottom: 10px;
}

/* 검색바 */
.search-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
}

.search-input {
    width: 50%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 8px;
}

.search-button {
    padding: 10px 16px;
    font-size: 16px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 5px;
}

.clear-button {
    padding: 10px 16px;
    font-size: 16px;
    background-color: #e0e0e0;
    color: black;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 5px;
}

/* 테이블 스타일 */
.table-container {
    max-height: 400px;
    overflow-y: hidden;
    margin-bottom: 15px;
}

.table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

.table th,
.table td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

.empty-row {
    color: #aaa;
    text-align: center;
    font-style: italic;
}

.upper-modalstock-tr:hover,
.lower-modalstock-tr:hover,
.selected-row {
    background-color: #e0f7fa;
}

/* 하단 버튼들 */
.ModalStock-btn {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
}

.portfolio-button:not(:disabled) {
    background-color: #4db6ac;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    margin-right: 10px;
    cursor: pointer;
}

.portfolio-button:disabled {
    background-color: #ccc;
}

.portfolio-button:hover:not(:disabled) {
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

/* 개수 입력 */
.quantity-input {
    display: flex;
    align-items: center;
    gap: 4px;
}

.quantity-box {
    width: 50px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.quantity-input button {
    width: 30px;
    height: 30px;
    background-color: #4db6ac;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 18px;
}

.quantity-input button:hover {
    background-color: #399d91;
}

.lower-modalstock-tr td {
    padding: 12px 8px;
}

/* 기타 버튼들 */
.delete-button {
    background-color: #f44336;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
}

.delete-button:hover {
    background-color: #d32f2f;
}

.move-button {
    background-color: #4db6ac;
    color: white;
    padding: 8px 12px;
    margin: 10px 0;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.move-button:hover {
    background-color: #399d91;
}

.pagination-controls {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 10px;
}

.pagination-controls button {
    padding: 5px 10px;
    font-size: 14px;
    cursor: pointer;
}
</style>
