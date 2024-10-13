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
        <div class="stock-container">
            <stock-search v-if="selectedCategory === 'stock'" />
            <p v-if="selectedCategory === 'stock'">
                주식 데이터 클릭 시 해당 종목 네이버 증권으로 연결됩니다.
            </p>
            <stock-list v-if="selectedCategory === 'stock'" />
        </div>

        <!-- 검색 및 필터링 -->
        <div class="search-box" v-if="selectedCategory !== 'stock'">
            <input
                v-model="searchQuery"
                type="text"
                class="search-input mb-2"
                placeholder="상품명 검색..."
                @keydown.enter="handleSearch"
            />
            <button @click="handleSearch" class="search-btn">
                <i class="fa-solid fa-magnifying-glass"></i>
            </button>
            <button @click="eraseFilter" class="erase-filter-btn">
                <i class="fa-solid fa-rotate-left"></i>
            </button>
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
        <div v-else v-if="selectedCategory !== 'stock'">
            <table class="table">
                <thead>
                    <tr>
                        <template v-if="selectedCategory === 'fund'">
                            <th @click="sortBy('companyNm')">
                                회사명
                                <SortIndicator
                                    field="companyNm"
                                    :currentSortField="sortField"
                                    :sortDirection="sortDirection"
                                />
                            </th>
                            <th @click="sortBy('productNm')">
                                상품명
                                <SortIndicator
                                    field="productNm"
                                    :currentSortField="sortField"
                                    :sortDirection="sortDirection"
                                />
                            </th>
                            <th @click="sortBy('fundType')">
                                펀드유형
                                <SortIndicator
                                    field="fundType"
                                    :currentSortField="sortField"
                                    :sortDirection="sortDirection"
                                />
                            </th>
                            <th @click="sortBy('riskLevel')">
                                위험도
                                <SortIndicator
                                    field="riskLevel"
                                    :currentSortField="sortField"
                                    :sortDirection="sortDirection"
                                />
                            </th>
                            <th @click="sortBy('yield12')">
                                12개월 수익률
                                <SortIndicator
                                    field="yield12"
                                    :currentSortField="sortField"
                                    :sortDirection="sortDirection"
                                />
                            </th>
                            <th></th>
                        </template>

                        <template
                            v-else-if="
                                selectedCategory === 'deposit' || selectedCategory === 'saving'
                            "
                        >
                            <th @click="sortBy('korCoNm')">
                                금융회사명
                                <SortIndicator
                                    field="korCoNm"
                                    :currentSortField="sortField"
                                    :sortDirection="sortDirection"
                                />
                            </th>
                            <th @click="sortBy('finPrdtNm')">
                                상품명
                                <SortIndicator
                                    field="finPrdtNm"
                                    :currentSortField="sortField"
                                    :sortDirection="sortDirection"
                                />
                            </th>
                            <th @click="sortBy('intrRate')">
                                기본금리
                                <SortIndicator
                                    field="intrRate"
                                    :currentSortField="sortField"
                                    :sortDirection="sortDirection"
                                />
                            </th>
                            <th @click="sortBy('intrRate2')">
                                최고금리
                                <SortIndicator
                                    field="intrRate2"
                                    :currentSortField="sortField"
                                    :sortDirection="sortDirection"
                                />
                            </th>
                            <th></th>
                        </template>

                        <template v-else-if="selectedCategory === 'bond'">
                            <th @click="sortBy('bondIsurNm')">
                                발행자
                                <SortIndicator
                                    field="bondIsurNm"
                                    :currentSortField="sortField"
                                    :sortDirection="sortDirection"
                                />
                            </th>
                            <th @click="sortBy('isinCdNm')">
                                상품명
                                <SortIndicator
                                    field="isinCdNm"
                                    :currentSortField="sortField"
                                    :sortDirection="sortDirection"
                                />
                            </th>
                            <th @click="sortBy('bondIssuDt')">
                                채권발행일자
                                <SortIndicator
                                    field="bondIssuDt"
                                    :currentSortField="sortField"
                                    :sortDirection="sortDirection"
                                />
                            </th>
                            <th @click="sortBy('bondSrfcInrt')">
                                채권금리
                                <SortIndicator
                                    field="bondSrfcInrt"
                                    :currentSortField="sortField"
                                    :sortDirection="sortDirection"
                                />
                            </th>
                            <th></th>
                        </template>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="sortedProducts.length === 0 && searchQuery.length >= 2 && !isLoading">
                        <td colspan="6">검색 결과가 없습니다.</td>
                    </tr>
                    <tr
                        v-for="product in sortedProducts"
                        :key="product.productId"
                        :class="{ 'in-cart': isProductInCart(product.productId) }"
                    >
                        <!-- 회사명, 금융회사명 또는 발행자 -->
                        <template v-if="selectedCategory === 'fund'">
                            <td>
                                <v-avatar size="22" class="mr-2"
                                    ><i class="fas fa-chart-line"></i></v-avatar
                                >{{ product.companyNm }}
                            </td>
                        </template>
                        <template
                            v-else-if="
                                selectedCategory === 'deposit' || selectedCategory === 'saving'
                            "
                        >
                            <td>
                                <!-- 로고 데이터 존재 시 -->
                                <div v-if="logoExists(product.korCoNm)" class="financial-logo-bank">
                                    <img
                                        :src="getLogoPath(product.korCoNm)"
                                        alt="Logo"
                                        class="financial-logo"
                                    />
                                </div>

                                <!-- 로고 데이터 없을 시 -->
                                <div v-else class="financal-nonlogo-bank">
                                    <v-avatar size="22" class="mr-2">
                                        <i class="fas fa-wallet"></i>
                                    </v-avatar>
                                    {{ product.korCoNm }}
                                </div>
                            </td>
                        </template>

                        <template v-else-if="selectedCategory === 'bond'">
                            <td>
                                <v-avatar
                                    v-if="product.bondIsurNm === '대한민국'"
                                    size="22"
                                    class="mr-2"
                                    ><i class="fas fa-landmark"></i>
                                </v-avatar>
                                <v-avatar v-else size="22"
                                    ><i class="fas fa-puzzle-piece"></i
                                ></v-avatar>

                                {{ product.bondIsurNm }}
                            </td>
                        </template>

                        <!-- 상품명 -->
                        <td @click="gotoDetail(product.productId)" class="Detail-Link">
                            {{ getProductName(product) }}
                        </td>

                        <!-- 펀드 정보 -->
                        <template v-if="selectedCategory === 'fund'">
                            <td>{{ product.fundType }}</td>
                            <td>{{ product.riskLevel }}</td>
                            <td>{{ product.yield12 }}%</td>
                        </template>

                        <!-- 예금 및 적금 정보 -->
                        <template
                            v-else-if="
                                selectedCategory === 'deposit' || selectedCategory === 'saving'
                            "
                        >
                            <td>{{ getRate(product.productId, 12).intrRate }}%</td>
                            <td>{{ getRate(product.productId, 12).intrRate2 }}%</td>
                        </template>

                        <!-- 채권 정보 -->
                        <template v-else-if="selectedCategory === 'bond'">
                            <td>{{ formatDate(product.bondIssuDt) }}</td>
                            <td>{{ product.bondSrfcInrt }}%</td>
                        </template>

                        <!-- 장바구니 버튼 -->
                        <td>
                            <v-btn
                                icon
                                @click="toggleCartAndIncreaseHit(product)"
                                :color="isProductInCart(product.productId) ? 'primary' : 'default'"
                            >
                                <v-icon>{{
                                    isProductInCart(product.productId)
                                        ? 'mdi-cart-check'
                                        : 'mdi-cart'
                                }}</v-icon>
                            </v-btn>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- 페이지네이션 -->
            <div id="Pagination" class="mt-4 pagination-buttons">
                <div class="pagination-container">
                    <button
                        :disabled="currentPage === 1"
                        @click="changePageWithScroll(1, $event)"
                        class="pagination-btn"
                    >
                        처음
                    </button>

                    <button
                        :disabled="currentPage === 1"
                        @click="changePageWithScroll(currentPage - 1, $event)"
                        class="pagination-btn"
                    >
                        이전
                    </button>

                    <span v-if="currentPage > 4" class="pagination-ellipsis">...</span>

                    <button
                        v-for="page in visiblePages"
                        :key="page"
                        @click="changePageWithScroll(page, $event)"
                        :class="['pagination-btn', { active: currentPage === page }]"
                    >
                        {{ page }}
                    </button>

                    <span v-if="currentPage < totalPages - 3" class="pagination-ellipsis">...</span>

                    <button
                        :disabled="currentPage === totalPages"
                        @click="changePageWithScroll(currentPage + 1, $event)"
                        class="pagination-btn"
                    >
                        다음
                    </button>

                    <button
                        :disabled="currentPage === totalPages"
                        @click="changePageWithScroll(totalPages, $event)"
                        class="pagination-btn"
                    >
                        끝
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue';
import { useBondStore } from '@/store/modules/bond.js'; // Pinia bond store 사용
import { useFundStore } from '@/store/modules/fund.js'; // Pinia fund store 사용
import { useCartStore } from '@/store/modules/cart.js'; // Pinia cart store 사용
import { useRouter, useRoute } from 'vue-router';
import { increaseAgeGroupProductHit, increasePreferenceProductHit } from '@/api/hit';
import * as financeApi from '@/api/financeApi';
import StockList from '@/views/stock/StockList.vue';
import StockSearch from '@/views/stock/StockSearch.vue';
import SortIndicator from '@/components/SortIndicator.vue'; // SortIndicator 컴포넌트 임포트
import bankData from '@/assets/banks.json';

export default {
    name: 'FinancialProducts',
    components: {
        StockList,
        StockSearch,
        SortIndicator, // SortIndicator 컴포넌트 등록
    },

    setup() {
        const bondStore = useBondStore(); // Pinia bond store 호출
        const fundStore = useFundStore(); // Pinia fund store 호출
        const cartStore = useCartStore(); // Pinia cart store 호출

        const searchQuery = ref('');
        const selectedCategory = ref('deposit');

        const cartItem = ref({
            productId: '',
            productType: '',
            provider: '',
            productName: '',
            expectedReturn: '',
            rsrvType: '',
        });

        const cart = ref([]);

        const displayedProducts = ref([]);
        const currentPage = ref(1);
        const pageSize = ref(8);
        const totalPages = ref(1);
        const isLoading = ref(false);
        const error = ref(null);
        const isSearched = ref(false);

        const router = useRouter();
        const route = useRoute();

        const tabs = [
            { label: '예금', value: 'deposit' },
            { label: '적금', value: 'saving' },
            { label: '채권', value: 'bond' },
            { label: '펀드', value: 'fund' },
            { label: '주식', value: 'stock' },
        ];

        const activeButtonStyle = {
            backgroundColor: '#3961e4',
            color: 'white',
        };

        // 은행 로고 받아오기 경로
        const logoBasePath = new URL('@/assets/img/bankLogo/', import.meta.url).href;

        // 정렬 상태 관리
        const sortField = ref(''); // 현재 정렬 기준 필드
        const sortDirection = ref('asc'); // 현재 정렬 방향: 'asc' 또는 'desc'

        // 테이블 헤더 클릭 시 정렬 처리 함수
        const sortBy = (field) => {
            if (sortField.value === field) {
                // 같은 필드를 클릭하면 정렬 방향 토글
                sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
            } else {
                // 새로운 필드를 클릭하면 정렬 기준 변경 및 기본 방향 설정
                sortField.value = field;
                sortDirection.value = 'asc';
            }
        };

        // 정렬된 상품 목록 계산
        const sortedProducts = computed(() => {
            if (!sortField.value) return filteredProducts.value;

            return [...filteredProducts.value].sort((a, b) => {
                let aValue = getSortValue(a, sortField.value);
                let bValue = getSortValue(b, sortField.value);

                // 숫자 정렬 처리
                if (typeof aValue === 'number' && typeof bValue === 'number') {
                    return sortDirection.value === 'asc' ? aValue - bValue : bValue - aValue;
                }

                // 문자열 정렬 처리
                aValue = aValue ? aValue.toString().toLowerCase() : '';
                bValue = bValue ? bValue.toString().toLowerCase() : '';

                if (aValue < bValue) return sortDirection.value === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortDirection.value === 'asc' ? 1 : -1;
                return 0;
            });
        });

        // 정렬 기준에 따라 값을 반환하는 헬퍼 함수
        const getSortValue = (product, field) => {
            switch (selectedCategory.value) {
                case 'fund':
                    if (field === 'companyNm') return product.companyNm;
                    if (field === 'productNm') return product.productNm;
                    if (field === 'fundType') return product.fundType;
                    if (field === 'riskLevel') return product.riskLevel;
                    if (field === 'yield12') return product.yield12;
                    break;
                case 'deposit':
                case 'saving':
                    if (field === 'korCoNm') return product.korCoNm;
                    if (field === 'finPrdtNm') return product.finPrdtNm;
                    if (field === 'intrRate') return getRate(product.productId, 12).intrRate;
                    if (field === 'intrRate2') return getRate(product.productId, 12).intrRate2;
                    break;
                case 'bond':
                    if (field === 'bondIsurNm') return product.bondIsurNm;
                    if (field === 'isinCdNm') return product.isinCdNm;
                    if (field === 'bondIssuDt') return product.bondIssuDt;
                    if (field === 'bondSrfcInrt') return product.bondSrfcInrt;
                    break;
                default:
                    return '';
            }
        };

        // 상품 이름을 가져오는 함수
        const getProductName = (product) => {
            if (selectedCategory.value === 'bond') {
                return product.isinCdNm || '상품명 없음';
            } else if (selectedCategory.value === 'fund') {
                return product.productNm || '상품명 없음';
            } else {
                return product.finPrdtNm || '상품명 없음';
            }
        };

        // 상품 금리를 가져오는 함수
        const getRate = (productId, term) => {
            const product = displayedProducts.value.find((p) => p.productId === productId);
            if (product && product.yield) {
                const rate = product.yield.find((r) => r.saveTrm === term);
                return rate || {};
            }
            return {};
        };

        // 상품 리스트 가져오기 (로드)
        const loadProducts = async () => {
            if (selectedCategory.value === 'stock') return;

            isLoading.value = true;
            error.value = null;

            try {
                let data;

                if (searchQuery.value) {
                    if (selectedCategory.value === 'bond') {
                        data = await financeApi.searchBondProduct(searchQuery.value);
                    } else if (selectedCategory.value === 'fund') {
                        data = await financeApi.searchFundProduct(searchQuery.value);
                    } else if (selectedCategory.value === 'deposit') {
                        data = await financeApi.searchDepositProduct(searchQuery.value);
                    } else if (selectedCategory.value === 'saving') {
                        data = await financeApi.searchSavingProduct(searchQuery.value);
                    }
                } else {
                    if (selectedCategory.value === 'bond') {
                        data = await financeApi.fetchBondProducts(
                            currentPage.value,
                            pageSize.value
                        );
                    } else if (selectedCategory.value === 'fund') {
                        data = await financeApi.fetchFundProducts(
                            currentPage.value,
                            pageSize.value
                        );
                    } else if (
                        selectedCategory.value === 'deposit' ||
                        selectedCategory.value === 'saving'
                    ) {
                        // 예금/적금 상품과 관련 금리를 함께 가져옴
                        data =
                            selectedCategory.value === 'deposit'
                                ? await financeApi.fetchDepositProducts(
                                      currentPage.value,
                                      pageSize.value
                                  )
                                : await financeApi.fetchSavingProducts(
                                      currentPage.value,
                                      pageSize.value
                                  );

                        // 금리가 포함되어 있는지 확인하고 productId로 매핑
                        if (data.products && data.rates) {
                            const productRatesMap = data.rates.reduce((acc, rate) => {
                                if (!acc[rate.productId]) acc[rate.productId] = [];
                                acc[rate.productId].push(rate);
                                return acc;
                            }, {});

                            // 각 상품에 'yield' 속성으로 금리 매핑
                            data.products = data.products.map((product) => ({
                                ...product,
                                yield: productRatesMap[product.productId] || [],
                            }));
                        }
                    }
                }

                // 모든 상품에 카테고리 추가
                if (data.products || data.items) {
                    const productsWithCategory = (data.products || data.items).map((product) => ({
                        ...product,
                        type: selectedCategory.value,
                    }));

                    displayedProducts.value = productsWithCategory;
                    filteredProducts.value = displayedProducts.value;
                    totalPages.value = data.totalPages || 1;

                    console.log(
                        'Updated displayedProducts with category:',
                        displayedProducts.value
                    );
                } else {
                    displayedProducts.value = [];
                    filteredProducts.value = [];
                }
            } catch (err) {
                console.error('Error fetching products:', err);
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
        const changePageWithScroll = (page, event) => {
            currentPage.value = page;
            loadProducts();
            event.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        };

        const gotoDetail = (productId) => {
            const productTypeMap = {
                saving: 'saving',
                bond: 'bond',
                fund: 'fund',
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

        const isProductInCart = computed(() => {
            return (productId) => {
                if (Array.isArray(cartStore.cartItems)) {
                    return cartStore.cartItems.some((item) => item.productId === productId);
                }
                return false;
            };
        });

        // 장바구니 버튼 누를 시 나오는 alert
        const alertCartAndIncreaseHit = async (product) => {
            const inCart = isInCart(product.productId); // 상품이 장바구니에 있는지 확인
            const message = inCart
                ? '장바구니에서 제거하시겠습니까?'
                : '장바구니에 담으시겠습니까?';

            const userConfirmed = window.confirm(message);
            if (userConfirmed) {
                await toggleCartAndIncreaseHit(product); // 장바구니 추가/제거 수행
                window.location.reload(); // 페이지 새로고침
            }
        };

        // 장바구니 담는 메서드
        const toggleCartAndIncreaseHit = async (product) => {
            try {
                await updateCart();
                const isInCart = isProductInCart.value(product.productId);
                console.log('isInCart:', isInCart);

                if (isInCart) {
                    // 장바구니에서 제거
                    const cartItemToRemove = cartStore.cartItems.find(
                        (item) => item.productId === product.productId
                    );
                    console.log('cartItemToRemove:', cartItemToRemove);

                    if (cartItemToRemove && cartItemToRemove.cartId) {
                        await cartStore.removeCartItem(cartItemToRemove.cartId);
                        updateCart();
                        alert(`상품 ID ${product.productId}이 장바구니에서 제거되었습니다.`);
                    } else {
                        console.error('cartItemToRemove가 존재하지 않습니다.');
                    }
                } else {
                    // 장바구니에 추가
                    const newCartItem = {
                        productId: product.productId,
                        productType: getProductType(product.type),
                        provider: getProvider(product),
                        productName: getProductName(product),
                        expectedReturn: getExpectedReturn(product),
                        rervType: product.type === 'saving' ? 'S' : '',
                    };

                    const addedItem = await cartStore.addCartItem(newCartItem);
                    if (addedItem) {
                        updateCart();
                        alert(`상품 ID ${product.productId}이 장바구니에 추가되었습니다.`);
                    }
                }

                // 조회수 증가
                await increaseAgeGroupProductHit(product.productId);
                await increasePreferenceProductHit(product.productId);
            } catch (error) {
                console.error('장바구니 상태 업데이트 또는 조회수 증가 오류 발생:', error);
                alert('장바구니 작업 중 오류가 발생했습니다.');
            }
        };

        // 각 타입별 정보 추출 함수
        const getProductType = (type) => {
            const typeMap = { saving: 'S', deposit: 'S', bond: 'B', fund: 'F' };
            return typeMap[type] || '';
        };

        const getProvider = (product) => {
            const providerMap = {
                saving: product.korCoNm,
                deposit: product.korCoNm,
                bond: product.bondIsurNm,
                fund: product.companyNm,
            };
            return providerMap[product.type] || '';
        };

        const getExpectedReturn = (product) => {
            if (product.type === 'saving' || product.type === 'deposit') {
                return getRate(product.productId, 12).intrRate2;
            } else if (product.type === 'bond') {
                return product.bondSrfcInrt;
            } else if (product.type === 'fund') {
                return product.yield12;
            }
            return '';
        };

        const filteredProducts = ref([]); // 필터링된 결과를 저장할 ref

        const handleSearch = () => {
            if (searchQuery.value.length >= 2) {
                currentPage.value = 1;
                loadProducts();
                isSearched.value = true;
            } else {
                alert('검색어는 2글자 이상이어야 합니다.');
            }
        };

        const eraseFilter = () => {
            searchQuery.value = '';
            filteredProducts.value = displayedProducts.value;
            isSearched.value = false; // 검색 상태 초기화
            loadProducts(); // 지우기, 되돌리기 시 다시 로드
        };

        const selectTab = (category) => {
            searchQuery.value = '';
            selectedCategory.value = category;
            currentPage.value = 1;
            sortField.value = ''; // 정렬 기준 초기화
            sortDirection.value = 'asc'; // 정렬 방향 초기화
            router.push({
                name: 'Products',
                params: { category },
                query: { page: 1, pageSize: pageSize.value },
            });
        };

        const formatDate = (dateStr) => {
            if (typeof dateStr !== 'string' || dateStr.length !== 8) {
                return dateStr; // 형식이 맞지 않으면 원래 문자열 반환
            }
            const year = dateStr.slice(0, 4);
            const month = dateStr.slice(4, 6);
            const day = dateStr.slice(6, 8);
            return `${year}-${month}-${day}`;
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

        const updateCart = async () => {
            await cartStore.fetchCartItems();
            console.log('cartStore.cartItems:', cartStore.cartItems);
            cart.value = cartStore.cartItems;
            console.log('cart:', cart.value);
        };

        const logoExists = (financialInstitution) => {
            return bankData.some((bank) => bank.name === financialInstitution);
        };

        // 은행 이름에 맞는 로고 경로를 가져오는 함수
        const getLogoPath = (financialInstitution) => {
            const bank = bankData.find((bank) => bank.name === financialInstitution);
            const logoPath = bank ? `${logoBasePath}/${bank.logo}` : '';
            console.log('logoBasePath:', logoBasePath);
            console.log('financialInstitution:', financialInstitution);
            console.log('logoPath:', logoPath);
            return logoPath;
        };

        // 컴포넌트가 마운트될 때 장바구니 아이템을 불러옵니다.
        onMounted(async () => {
            await cartStore.getCartItems();
            await loadProducts();
        });

        // 라우트 변경 감지 및 상품 로드
        watch(
            () => [route.params.category, route.query.page, route.query.pageSize],
            async ([newCategory, newPage, newPageSize]) => {
                console.log('watch로 경로 변경 감지:', newCategory, newPage, newPageSize);
                selectedCategory.value = newCategory || 'all';
                currentPage.value = parseInt(newPage) || 1;
                pageSize.value = parseInt(newPageSize) || 8;

                loadProducts(currentPage.value);
                await updateCart();
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
            changePageWithScroll,
            isLoading,
            error,
            handleSearch,
            selectTab,
            activeButtonStyle,
            getProductName, // getProductName 함수 반환
            getRate,
            cart: cartStore.cartItems, // Pinia Store의 cartItems
            visiblePages,
            toggleCartAndIncreaseHit,
            isSearched,
            formatDate,
            sortBy, // sortBy 메서드 반환
            sortedProducts, // sortedProducts 계산 속성 반환
            sortField, // SortIndicator용 sortField 반환
            sortDirection, // SortIndicator용 sortDirection 반환
            alertCartAndIncreaseHit, // 장바구니에 담을지 여부 묻는 창
            isProductInCart,
            logoExists,
            getLogoPath,
        };
    },
};
</script>

<style scoped>
.financial-products-container {
    width: 70%;
    padding: 20px;
    margin: 0 auto;
}

.tabs {
    display: flex;
    margin-bottom: 20px;
}

.nav-button {
    text-align: center;
    width: 20%;
    margin: 0;
}

.v-btn--active {
    background-color: #7bd5c3 !important;
    color: white !important;
}

.search-box {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
}

.search-input {
    width: 60%; /* 버튼과 나란히 배치되도록 너비 설정 */
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
    transition: border-color 0.3s ease;
}

.search-input:focus {
    border-color: #5bc0de;
    outline: none;
}

.search-btn {
    padding: 10px 15px;
    margin-left: 10px;
    background-color: #7bd5c3;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.search-btn:hover {
    background-color: #589f91;
}

.erase-filter-btn {
    padding: 10px 15px;
    margin-left: 10px;
    background-color: #f0f0f0;
    color: #000;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.erase-filter-btn:hover {
    background-color: #ddd;
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

.table tbody tr:hover {
    background-color: #f1f1f1;
}

.Detail-Link {
    cursor: pointer;
    color: #007bff;
}

.Detail-Link:hover {
    text-decoration: underline;
}

.pagination-container {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 600px; /* 페이지네이션 너비 고정 */
    margin: 0 auto;
}

.pagination-btn {
    padding: 10px 20px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    cursor: pointer;
    font-size: 14px;
    margin: 0 5px;
    border-radius: 5px;
    transition: background-color 0.3s;
}

.pagination-btn.active {
    background-color: #7bd5c3;
    color: white;
}

.pagination-btn:hover {
    background-color: #007bff;
    color: white;
}

.pagination-btn:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

/* 페이지네이션의 ... 표시 */
.pagination-ellipsis {
    margin: 0 8px;
    font-size: 16px;
    color: #333;
}

/* 정렬 가능한 헤더 스타일 */
th {
    cursor: pointer; /* 헤더가 클릭 가능함을 나타내기 위해 커서 변경 */
    user-select: none; /* 텍스트 선택 방지 */
    position: relative;
}

.sort-indicator {
    margin-left: 5px;
    font-size: 12px;
    vertical-align: middle;
}

/* 장바구니 있는 상품 하이라이트 강조 */
.in-cart {
    background-color: #ffeeba; /* 예: 연한 노란색 배경 */
}

/* 금융사 로고 스타일 */
.financial-logo-bank {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%; /* 테이블 셀 전체 너비 사용 */
    height: 60px; /* 고정 높이 설정 */
    padding: 8px 0; /* 패딩 추가로 여백 확보 */
    overflow: hidden; /* 부모 요소가 초과하는 내용 숨기기 */
}

.financial-logo {
    width: auto; /* 가로는 자동 조정 */
    height: 100%; /* 부모 요소 높이에 맞추기 */
    object-fit: contain; /* 이미지가 잘 맞도록 설정 */
    max-height: 40px; /* 로고의 최대 높이 설정 */
}

/* 로고가 없을 시 기본 아이콘 스타일 */
.financal-nonlogo-bank {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 0; /* 여백 추가 */
}

.financal-nonlogo-bank v-avatar {
    margin-right: 5px; /* 아이콘과 이름 간격 */
}
</style>
