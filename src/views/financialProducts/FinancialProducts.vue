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

        <!-- 검색 및 필터링 -->
        <div class="search-filter mb-4">
            <input
                v-model="searchQuery"
                type="text"
                class="form-control mb-2"
                placeholder="상품명 검색..."
                @input="handleSearch"
            />
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
        <div v-else>
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
                            <td>{{ getRate(product.productId, 12).intrRate2 }}%</td>
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
                                @click="addToCart(product.productId)"
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

            <!-- Vuetify 페이지네이션 제거 후 직접 페이지네이션 구현 -->
            <div id="Pagination" class="mt-4 pagination-buttons">
                <button
                    :disabled="currentPage === 1"
                    @click="changePage(currentPage - 1)"
                    class="pagination-btn"
                >
                    이전
                </button>

                <button
                    v-for="page in totalPages"
                    :key="page"
                    @click="changePage(page)"
                    :class="['pagination-btn', { active: currentPage === page }]"
                >
                    {{ page }}
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
import { ref, computed, onMounted, watch, inject } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { fetchDepositProducts, fetchSavingProducts } from '@/api/financeApi.js';

export default {
    name: 'FinancialProducts',
    setup() {
        const store = useStore();
        const searchQuery = ref('');
        const selectedCategory = ref('');

        // cart는 깡통 배열로 유지 (버튼 기능만 구현)
        const cart = ref([]);

        const displayedProducts = ref([]);
        const selectedProducts = ref([]);
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
        ];

        const activeButtonStyle = {
            backgroundColor: '#3961e4',
            color: 'white',
        };

        const getProductName = (product) => {
            if (selectedCategory.value === 'bonds') {
                return product.isinCdNm || '상품명 없음';
            } else if (selectedCategory.value === 'funds') {
                return product.productNm || '상품명 없음'; // Use productNm for funds
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

        const loadProducts = async (page) => {
            isLoading.value = true;
            error.value = null;
            try {
                if (selectedCategory.value === 'bonds') {
                    await store.dispatch('bond/fetchBondList', { page, pageSize: pageSize.value });
                    const bonds = store.getters['bond/getBondList'];
                    if (!Array.isArray(bonds)) {
                        throw new Error('채권 리스트가 배열이 아닙니다.');
                    }
                    displayedProducts.value = bonds.map((product) => ({
                        ...product,
                        yield: [],
                        type: selectedCategory.value,
                    }));
                    totalPages.value = store.getters['bond/getTotalPages'] || 1; // 채권 페이지네이션 설정
                } else if (selectedCategory.value === 'funds') {
                    await store.dispatch('fund/fetchFundList', { page, pageSize: pageSize.value });
                    const funds = store.getters['fund/getFundList'];
                    if (!Array.isArray(funds)) {
                        throw new Error('펀드 리스트가 배열이 아닙니다.');
                    }
                    displayedProducts.value = funds.map((product) => ({
                        ...product,
                        yield: [],
                        type: selectedCategory.value,
                    }));
                    totalPages.value = store.getters['fund/getTotalPages'] || 1; // 펀드 페이지네이션 설정
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
            console.log('페이지 변경 감지:', page); // 페이지 변경 로그 추가
            if (page < 1 || page > totalPages.value) return;

            // 페이지 변경 시 router.push가 실행되는지 확인
            router
                .push({
                    name: 'Products',
                    params: { category: selectedCategory.value },
                    query: { page, pageSize: pageSize.value }, // 페이지 번호를 쿼리로 설정
                })
                .then(() => {
                    console.log('라우터 변경 완료:', router.currentRoute.value.fullPath); // 변경된 경로 확인
                })
                .catch((error) => {
                    console.error('라우터 변경 중 오류:', error);
                });
        };

        // 상품 상세 페에지로 이동 -클릭이벤트 지정
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

        const addToCart = (productId) => {
            if (!cart.value.includes(productId)) {
                cart.value.push(productId);
                alert(`상품 ID ${productId}이 장바구니에 추가되었습니다.`);
            }
        };

        const filteredProducts = computed(() => {
            return displayedProducts.value.filter((product) => {
                let productName =
                    selectedCategory.value === 'bonds' ? product.isinCdNm : product.finPrdtNm;

                return productName?.toLowerCase().includes(searchQuery.value.toLowerCase());
            });
        });

        const handleSearch = () => {
            currentPage.value = 1;
            router.push({
                name: 'Products',
                params: { category: selectedCategory.value },
                query: { page: 1, pageSize: pageSize.value },
            });
        };

        const selectTab = (category) => {
            selectedCategory.value = category;
            currentPage.value = 1;
            router.push({
                name: 'Products',
                params: { category },
                query: { page: 1, pageSize: pageSize.value },
            });
        };

        watch(
            () => [route.params.category, route.query.page, route.query.pageSize],
            ([newCategory, newPage, newPageSize]) => {
                console.log('watch로 경로 변경 감지:', newCategory, newPage, newPageSize); // 경로 변경 확인

                selectedCategory.value = newCategory || 'all';
                currentPage.value = parseInt(newPage) || 1;
                pageSize.value = parseInt(newPageSize) || 10;

                loadProducts(currentPage.value); // 페이지 변경 감지 후 로드
            },
            { immediate: true }
        );

        // 중복 호출 제거.
        // onMounted(() => {
        //     loadProducts(currentPage.value);
        // });

        return {
            searchQuery,
            selectedCategory,
            tabs,
            filteredProducts,
            addToCart,
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
            selectedProducts,
            getRate,
            cart, // 빈 cart 노출
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

.search-filter {
    display: flex;
    justify-content: center;
}

.search-filter input {
    width: 300px;
    padding: 8px;
    border-radius: 4px;
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
