<template>
    <div class="financial-products-container">
        <h1>금융상품 페이지</h1>

        <!-- 탭 버튼 -->
        <div class="tabs">
            <v-btn
                v-for="tab in tabs"
                :key="tab.value"
                :class="{ 'v-btn--active': selectedCategory === tab.value }"
                @click="selectTab(tab.value)"
                class="nav-button"
                :style="selectedCategory === tab.value ? activeButtonStyle : {}"
            >
                {{ tab.label }}
            </v-btn>
        </div>

        <!-- 주식 리스트 -->
        <stock-search v-if="selectedCategory === 'stocks'" />
        <stock-list v-if="selectedCategory === 'stocks'" />

        <!-- 검색 및 필터링 -->
        <div class="search-filter-container">
            <div class="search-filter mb-4" v-if="selectedCategory !== 'stocks'">
                <input
                    v-model="searchQuery"
                    type="text"
                    class="form-control mb-2"
                    placeholder="상품명 검색..."
                    @input="handleSearch"
                />
            </div>
            <div v-if="selectedCategory !== 'stocks'" class="erase-filter">
                <v-btn class="erase-filter-btn" @click="eraseFilter"> 지우기 </v-btn>
            </div>
        </div>

        <!-- 로딩 중 메시지 -->
        <div v-if="isLoading" class="text-center my-4">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p>상품 정보를 불러오는 중입니다...</p>
        </div>

        <!-- 에러 메시지 -->
        <div v-if="error" class="alert alert-danger" role="alert">
            {{ error }}
        </div>

        <!-- 상품 리스트 -->
        <div v-else v-if="selectedCategory !== 'stocks'">
            <table class="table">
                <thead>
                    <tr>
                        <th>상품명</th>
                        <template v-if="selectedCategory === 'funds'">
                            <th>회사명</th>
                            <th>펀드유형</th>
                            <th>위험도</th>
                            <th>1개월 수익률</th>
                        </template>
                        <template
                            v-else-if="
                                selectedCategory === 'deposit' || selectedCategory === 'savings'
                            "
                        >
                            <th>금융회사명</th>
                            <th>기본금리</th>
                            <th>최고금리</th>
                        </template>
                        <template v-else-if="selectedCategory === 'bonds'">
                            <th>ISIN 코드명</th>
                            <th>채권발행일자</th>
                            <th>채권금리</th>
                        </template>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in filteredProducts" :key="product.productId">
                        <!-- 상품명 -->
                        <td @click="gotoDetail(product.productId)" class="Detail-Link">
                            {{ getProductName(product) }}
                        </td>

                        <!-- 펀드 정보 -->
                        <template v-if="selectedCategory === 'funds'">
                            <td>{{ product.companyNm }}</td>
                            <td>{{ product.fundType }}</td>
                            <td>{{ product.riskLevel }}</td>
                            <td>{{ product.yield1 }}%</td>
                        </template>

                        <!-- 예금 및 적금 정보 -->
                        <template
                            v-else-if="
                                selectedCategory === 'deposit' || selectedCategory === 'savings'
                            "
                        >
                            <td>{{ product.korCoNm }}</td>
                            <td>{{ getRate(product.productId, 12).intrRate }}%</td>
                            <td>{{ getRate(product.productId, 12).intrRate2 }}</td>
                        </template>

                        <!-- 채권 정보 -->
                        <template v-else-if="selectedCategory === 'bonds'">
                            <td>{{ product.isinCdNm }}</td>
                            <td>{{ product.bondIssuDt }}</td>
                            <td>{{ product.bondSrfcInrt }}</td>
                        </template>

                        <!-- 장바구니 버튼 -->
                        <td>
                            <v-btn
                                icon
                                @click="toggleCartAndIncreaseHit(product.productId)"
                                :style="{
                                    backgroundColor: cart.includes(product.productId)
                                        ? '#4caf50'
                                        : '',
                                    color: cart.includes(product.productId) ? 'white' : '',
                                }"
                            >
                                <v-icon>mdi-cart</v-icon>
                            </v-btn>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- 페이지네이션 -->
            <div id="Pagination" class="mt-4 pagination-buttons">
                <button
                    :disabled="currentPage === 1"
                    @click="changePage(currentPage - 1)"
                    class="pagination-btn"
                >
                    이전
                </button>

                <button v-if="currentPage > 3" @click="changePage(1)" class="pagination-btn">
                    1
                </button>

                <span v-if="currentPage > 4" class="pagination-ellipsis">...</span>

                <button
                    v-for="page in visiblePages"
                    :key="page"
                    @click="changePage(page)"
                    :class="['pagination-btn', { active: currentPage === page }]"
                >
                    {{ page }}
                </button>

                <span v-if="currentPage < totalPages - 3" class="pagination-ellipsis">...</span>

                <button
                    v-if="currentPage < totalPages - 2"
                    @click="changePage(totalPages)"
                    class="pagination-btn"
                >
                    {{ totalPages }}
                </button>

                <button
                    :disabled="currentPage === totalPages"
                    @click="changePage(currentPage + 1)"
                    class="pagination-btn"
                >
                    다음
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useBondStore } from '@/store/modules/bond.js'; // Pinia bond store 사용
import { useFundStore } from '@/store/modules/fund.js'; // Pinia fund store 사용
import { useRouter, useRoute } from 'vue-router';
import { increaseAgeGroupProductHit, increasePreferenceProductHit } from '@/api/hit';
import { fetchDepositProducts, fetchSavingProducts } from '@/api/financeApi.js';
import StockList from '@/views/stock/StockList.vue'; // StockList 컴포넌트 임포트
import StockSearch from '@/views/stock/StockSearch.vue'; // StockList 컴포넌트 임포트

export default {
    name: 'FinancialProducts',
    components: {
        StockList, // StockList 컴포넌트 등록
        StockSearch,
    },
    setup() {
        const bondStore = useBondStore(); // Pinia bond store 호출
        const fundStore = useFundStore(); // Pinia fund store 호출
        const searchQuery = ref('');
        const selectedCategory = ref('');

        const cart = ref([]);
        const displayedProducts = ref([]);
        const currentPage = ref(1);
        const pageSize = ref(10);
        const totalPages = ref(1);
        const isLoading = ref(false);
        const error = ref(null);

        const router = useRouter();
        const route = useRoute();

        const tabs = [
            { label: '예금', value: 'deposit' },
            { label: '적금', value: 'savings' },
            { label: '채권', value: 'bonds' },
            { label: '펀드', value: 'funds' },
            { label: '주식', value: 'stocks' }, // 주식 탭 추가
        ];

        const activeButtonStyle = {
            backgroundColor: '#3961e4',
            color: 'white',
        };

        const getProductName = (product) => {
            if (selectedCategory.value === 'bonds') {
                return product.isinCdNm || '상품명 없음';
            } else if (selectedCategory.value === 'funds') {
                return product.productNm || '상품명 없음';
            } else {
                return product.finPrdtNm || '상품명 없음';
            }
        };

        const getRate = (productId, term) => {
            const product = displayedProducts.value.find((p) => p.productId === productId);
            if (product && product.yield) {
                const rate = product.yield.find((r) => r.saveTrm === term);
                return rate || {};
            }
            return {};
        };

        // 상품 리스트 가져오기(load)
        const loadProducts = async (page) => {
            isLoading.value = true;
            error.value = null;
            try {
                if (selectedCategory.value === 'bonds') {
                    await bondStore.fetchBondList(page, pageSize.value);
                    displayedProducts.value = bondStore.getBondList;
                    totalPages.value = bondStore.getTotalPages;
                } else if (selectedCategory.value === 'funds') {
                    await fundStore.fetchFundList(page, pageSize.value);
                    displayedProducts.value = fundStore.getFundList;
                    totalPages.value = fundStore.getTotalPages;
                } else if (selectedCategory.value === 'deposit') {
                    const data = await fetchDepositProducts(page, pageSize.value);
                    if (data.products && data.rates) {
                        const productRatesMap = data.rates.reduce((acc, rate) => {
                            if (!acc[rate.productId]) {
                                acc[rate.productId] = [];
                            }
                            acc[rate.productId].push(rate);
                            return acc;
                        }, {});

                        displayedProducts.value = data.products.map((product) => ({
                            ...product,
                            finPrdtNm: product.finPrdtNm || '상품명 없음',
                            yield: productRatesMap[product.productId]
                                ? productRatesMap[product.productId]
                                      .sort((a, b) => a.saveTrm - b.saveTrm)
                                      .map((r) => ({
                                          saveTrm: r.saveTrm,
                                          intrRate: r.intrRate,
                                          intrRate2: r.intrRate2 || r.intrRate,
                                      }))
                                : [],
                            type: selectedCategory.value,
                        }));
                        totalPages.value = data.totalPages || 1;
                    } else {
                        throw new Error('예금 데이터를 불러오는데 문제가 있습니다.');
                    }
                } else if (selectedCategory.value === 'savings') {
                    const data = await fetchSavingProducts(page, pageSize.value);
                    if (data.products && data.rates) {
                        const productRatesMap = data.rates.reduce((acc, rate) => {
                            if (!acc[rate.productId]) {
                                acc[rate.productId] = [];
                            }
                            acc[rate.productId].push(rate);
                            return acc;
                        }, {});

                        displayedProducts.value = data.products.map((product) => ({
                            ...product,
                            finPrdtNm: product.finPrdtNm || '상품명 없음',
                            yield: productRatesMap[product.productId]
                                ? productRatesMap[product.productId]
                                      .sort((a, b) => a.saveTrm - b.saveTrm)
                                      .map((r) => ({
                                          saveTrm: r.saveTrm,
                                          intrRate: r.intrRate,
                                          intrRate2: r.intrRate2 || r.intrRate,
                                      }))
                                : [],
                            type: selectedCategory.value,
                        }));
                        totalPages.value = data.totalPages || 1;
                    } else {
                        throw new Error('적금 데이터를 불러오는데 문제가 있습니다.');
                    }
                }
            } catch (err) {
                console.error('상품 정보를 불러오는 중 오류 발생:', err);
                error.value = '상품 정보를 불러오는 중 오류가 발생했습니다.';
            } finally {
                isLoading.value = false;
            }
        };

        const changePage = (page) => {
            if (page < 1 || page > totalPages.value) return;

            router
                .push({
                    name: 'Products',
                    params: { category: selectedCategory.value },
                    query: { page, pageSize: pageSize.value },
                })
                .then(() => {
                    console.log('라우터 변경 완료:', router.currentRoute.value.fullPath);
                })
                .catch((error) => {
                    console.error('라우터 변경 중 오류:', error);
                });
        };

        const gotoDetail = (productId) => {
            const productTypeMap = {
                savings: 'saving',
                bonds: 'bond',
                funds: 'fund',
                deposit: 'deposit',
            };

            const productType = productTypeMap[selectedCategory.value] || 'deposit';

            if (!productType) {
                console.error('productType이 설정되지 않았습니다.');
                return;
            }

            router.push({
                path: `/list/${productId}`,
                query: { productType },
            });
        };

        const toggleCartAndIncreaseHit = async (productId) => {
            const index = cart.value.indexOf(productId);
            if (index === -1) {
                cart.value.push(productId);
            } else {
                cart.value.splice(index, 1);
            }
            if (!cart.value.includes(productId)) {
                cart.value.push(productId);
                alert(`상품 ID ${productId}이 장바구니에 추가되었습니다.`);
            }

            try {
                await increaseAgeGroupProductHit(productId);
                await increasePreferenceProductHit(productId);
            } catch (error) {
                console.error('조회수 증가 오류: ', error);
                alert('조회수를 증가하는 중 오류가 발생했습니다.');
            }
        };

        const filteredProducts = computed(() => {
            return displayedProducts.value.filter((product) => {
                let productName;

                // 조건에 따라 상품명 설정
                if (selectedCategory.value === 'bonds') {
                    productName = product.isinCdNm; // 채권의 경우 ISIN 코드명
                } else if (selectedCategory.value === 'funds') {
                    productName = product.productNm; // 펀드의 경우 productNm
                } else {
                    productName = product.finPrdtNm; // 그 외 금융상품의 경우 finPrdtNm
                }

                // 상품명이 검색어를 포함하는지 여부를 반환
                return productName?.toLowerCase().includes(searchQuery.value.toLowerCase());
            });
        });

        const eraseFilter = () => {
            searchQuery.value = ''; // 검색어 초기화
            handleSearch(); // 검색어가 초기화된 후 다시 검색 로직 실행
        };

        const handleSearch = () => {
            currentPage.value = 1;
            router.push({
                name: 'Products',
                params: { category: selectedCategory.value },
                query: { page: 1, pageSize: pageSize.value },
            });
        };

        const selectTab = (category) => {
            searchQuery.value = '';
            selectedCategory.value = category;
            currentPage.value = 1;
            router.push({
                name: 'Products',
                params: { category },
                query: { page: 1, pageSize: pageSize.value },
            });
        };

        const visiblePages = computed(() => {
            const pages = [];
            const total = totalPages.value;
            const current = currentPage.value;

            if (total <= 7) {
                for (let i = 1; i <= total; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                if (current > 4) pages.push('...');
                const startPage = Math.max(2, current - 2);
                const endPage = Math.min(total - 1, current + 2);

                for (let i = startPage; i <= endPage; i++) {
                    pages.push(i);
                }

                if (current < total - 3) pages.push('...');
                pages.push(total);
            }

            return pages;
        });

        watch(
            () => [route.params.category, route.query.page, route.query.pageSize],
            ([newCategory, newPage, newPageSize]) => {
                console.log('watch로 경로 변경 감지:', newCategory, newPage, newPageSize);
                selectedCategory.value = newCategory || 'all';
                currentPage.value = parseInt(newPage) || 1;
                pageSize.value = parseInt(newPageSize) || 10;

                loadProducts(currentPage.value);
            },
            { immediate: true }
        );

        return {
            searchQuery,
            selectedCategory,
            tabs,
            filteredProducts,
            eraseFilter,
            gotoDetail,
            currentPage,
            totalPages,
            changePage,
            isLoading,
            error,
            handleSearch,
            selectTab,
            activeButtonStyle,
            getProductName,
            getRate,
            cart,
            visiblePages,
            toggleCartAndIncreaseHit,
        };
    },
};
</script>

<style scoped>
.financial-products-container {
    width: 100%;
    padding: 20px;
}

.tabs {
    display: flex;
    margin-bottom: 20px;
}

.nav-button {
    text-align: center;
    width: 20%; /* 각 탭 버튼이 동일한 너비를 가지도록 설정 */
    margin: 0;
}

.active-button {
    background-color: #3961e4;
    color: white;
}

.search-filter-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px; /* 하단 여백 */
}

.search-filter input {
    width: 300px;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    margin-right: 10px; /* 버튼과의 간격 */
}

.erase-fillter-btn {
    background-color: #f0f0f0;
    color: #000;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
    border: 1px solid #ccc;
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

.Detail-Link {
    cursor: pointer;
    color: #007bff;
}

.Detail-Link:hover {
    text-decoration: underline;
}

.v-btn--active {
    background-color: #3961e4 !important;
    color: white !important;
}

.pagination-btn {
    padding: 8px 16px;
    background-color: #f0f0f0;
    border: none;
    cursor: pointer;
    font-size: 14px;
}

.pagination-btn.active {
    background-color: #3961e4;
    color: white;
}

.pagination-btn:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}
</style>
