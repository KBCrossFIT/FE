<template>
    <div class="products-wrapper">
        <div class="products-container">
            <div class="products-box">
                <!-- 검색 바 -->
                <v-text-field
                    v-model="searchQuery"
                    label="금융 상품을 검색하세요"
                    clearable
                    append-icon="mdi-magnify"
                    class="search-bar"
                ></v-text-field>
                <v-btn @click="searchProducts">검색</v-btn>

                <!-- 탭 버튼 -->
                <div class="tabs">
                    <v-btn
                        v-for="tab in tabs"
                        :key="tab"
                        :class="{ 'v-btn--active': selectedTab === tab }"
                        @click="selectTab(tab)"
                        class="nav-button"
                        :style="selectedTab === tab ? activeButtonStyle : {}"
                    >
                        {{ tab }}
                    </v-btn>
                </div>

                <!-- 상품 테이블 -->
                <table class="products-table">
                    <thead>
                        <tr>
                            <!-- 예금과 적금 헤더 -->
                            <template v-if="selectedTab === '예금' || selectedTab === '적금'">
                                <th>상품명</th>
                                <th>금융회사명</th>
                                <th>기본금리</th>
                                <th>최고금리</th>
                            </template>

                            <!-- 채권 헤더 -->
                            <template v-else-if="selectedTab === '채권'">
                                <th>ISIN 코드명</th>
                                <th>채권발행일자</th>
                                <th>채권금리</th>
                            </template>

                            <!-- 펀드 헤더 -->
                            <template v-else-if="selectedTab === '펀드'">
                                <th>상품명</th>
                                <th>회사명</th>
                                <th>펀드유형</th>
                                <th>위험도</th>
                                <th>1개월 수익률</th>
                            </template>

                            <th>장바구니</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- 예금과 적금 리스트 -->
                        <template v-if="selectedTab === '예금' || selectedTab === '적금'">
                            <tr
                                v-for="product in displayedProducts.products"
                                :key="product.productId"
                            >
                                <td
                                    @click="onProductClick(product.productId, selectedTab)"
                                    class="Detail-Link"
                                >
                                    {{ product.finPrdtNm }}
                                </td>
                                <td>{{ product.korCoNm }}</td>
                                <!-- 기본금리와 최고금리 출력 (저축 기간 12개월 기준) -->
                                <td>
                                    {{
                                        getRateByTerm(
                                            displayedProducts.rates,
                                            product.productId,
                                            12
                                        )?.intrRate
                                    }}%
                                </td>
                                <td>
                                    {{
                                        getRateByTerm(
                                            displayedProducts.rates,
                                            product.productId,
                                            12
                                        )?.intrRate2
                                    }}%
                                </td>
                                <td>
                                    <v-btn
                                        icon
                                        :class="{ 'in-cart': cart.includes(product.productId) }"
                                        @click="toggleCart(product.productId)"
                                        :style="
                                            cart.includes(product.productId)
                                                ? 'background-color: #4caf50; color: white;'
                                                : ''
                                        "
                                    >
                                        <v-icon>mdi-cart</v-icon>
                                    </v-btn>
                                </td>
                            </tr>
                        </template>

                        <!-- 채권 리스트 -->
                        <template v-else-if="selectedTab === '채권'">
                            <tr v-for="product in displayedProducts" :key="product.id">
                                <td
                                    @click="onProductClick(product.productId, selectedTab)"
                                    class="Detail-Link"
                                >
                                    {{ product.isinCdNm }}
                                </td>
                                <td>{{ product.bondIssuDt }}</td>
                                <td>{{ product.bondSrfcInrt }}</td>
                                <td>
                                    <v-btn
                                        icon
                                        :class="{ 'in-cart': cart.includes(product.id) }"
                                        @click="toggleCart(product.id)"
                                        :style="
                                            cart.includes(product.id)
                                                ? 'background-color: #4caf50; color: white;'
                                                : ''
                                        "
                                    >
                                        <v-icon>mdi-cart</v-icon>
                                    </v-btn>
                                </td>
                            </tr>
                        </template>

                        <!-- 펀드 리스트 -->
                        <template v-else-if="selectedTab === '펀드'">
                            <tr v-for="product in displayedProducts" :key="product.id">
                                <td
                                    @click="onProductClick(product.productId, selectedTab)"
                                    class="Detail-Link"
                                >
                                    {{ product.productNm }}
                                </td>
                                <td>{{ product.companyNm }}</td>
                                <td>{{ product.fundType }}</td>
                                <td>{{ product.riskLevel }}</td>
                                <td>{{ product.yield1 }}%</td>
                                <td>
                                    <v-btn
                                        icon
                                        :class="{ 'in-cart': cart.includes(product.id) }"
                                        @click="toggleCart(product.id)"
                                        :style="
                                            cart.includes(product.id)
                                                ? 'background-color: #4caf50; color: white;'
                                                : ''
                                        "
                                    >
                                        <v-icon>mdi-cart</v-icon>
                                    </v-btn>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>

                <!-- 페이지네이션 컴포넌트 -->
                <div id="Pagination">
                    <v-container>
                        <v-pagination
                            v-model="page"
                            :length="totalPages"
                            @input="onPageChange"
                        ></v-pagination>
                    </v-container>
                </div>

                <!-- 상품이 없을 때 메시지 -->
                <div
                    v-if="
                        (selectedTab === '예금' || selectedTab === '적금') &&
                        displayedProducts.products.length === 0
                    "
                    class="no-products"
                >
                    상품이 없습니다.
                </div>
                <div v-else-if="displayedProducts.length === 0" class="no-products">
                    상품이 없습니다.
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    data() {
        return {
            selectedTab: '예금',
            searchQuery: '',
            searchMode: false,
            tabs: ['예금', '적금', '펀드', '채권'],
            activeButtonStyle: {
                backgroundColor: '#4db6ac',
                color: 'white',
            },
            cart: [],
            productType: 'D',
            page: 1, // 현재 페이지 번호
            totalPages: 1, // 총 페이지 수
            itemsPerPage: 10, // 페이지당 보여줄 아이템 수
        };
    },
    watch: {
        page(newPage) {
            this.updateRoute();
        },
        selectedTab(newTab) {
            this.setProductType(newTab);
            this.fetchProductsForTab();
            this.page = 1; // 페이지 번호 초기화
            this.updateRoute();
        },
        '$route.params.pageNumber'(newPageNumber) {
            this.page = parseInt(newPageNumber) || 1;
        },
        '$route.params.productType'(newProductType) {
            const tab = this.getTabFromProductType(newProductType);
            if (tab) {
                this.selectedTab = tab;
                this.setProductType(this.selectedTab);
                this.fetchProductsForTab();
            }
        },
    },

    computed: {
        displayedProducts() {
            let data = {};
            if (this.searchMode) {
                if (this.selectedTab === '예금') {
                    data = this.getSearchDepositList;
                } else if (this.selectedTab === '적금') {
                    data = this.getSearchSavingList;
                } else if (this.selectedTab === '채권') {
                    data = this.getSearchBondList;
                } else if (this.selectedTab === '펀드') {
                    data = this.getSearchFundList;
                }
            } else {
                if (this.selectedTab === '예금') {
                    data = this.getDepositList;
                } else if (this.selectedTab === '적금') {
                    data = this.getSavingList;
                } else if (this.selectedTab === '채권') {
                    data = this.getBondList;
                } else if (this.selectedTab === '펀드') {
                    data = this.getFundList;
                }
            }

            let products = [];
            if (this.selectedTab === '예금' || this.selectedTab === '적금') {
                if (data && data.products) {
                    products = data.products;
                }
            } else {
                products = data || [];
            }

            // 총 페이지 수 계산
            this.totalPages = Math.ceil(products.length / this.itemsPerPage);

            // 현재 페이지에 해당하는 상품들만 반환
            if (this.selectedTab === '예금' || this.selectedTab === '적금') {
                // 예금과 적금은 객체 형태로 반환
                return {
                    products: products.slice(
                        (this.page - 1) * this.itemsPerPage,
                        this.page * this.itemsPerPage
                    ),
                    rates: data.rates, // rates는 전체를 그대로 전달
                };
            } else {
                // 채권과 펀드는 배열만 반환
                return products.slice(
                    (this.page - 1) * this.itemsPerPage,
                    this.page * this.itemsPerPage
                );
            }
        },
        ...mapGetters('bond', ['getBondList', 'getSearchBondList', 'getBondProductDetail']),
        ...mapGetters('deposit', [
            'getDepositList',
            'getSearchDepositList',
            'getDepositProductDetail',
        ]),
        ...mapGetters('saving', ['getSavingList', 'getSearchSavingList', 'getSavingProductDetail']),
        ...mapGetters('fund', ['getFundList', 'getSearchFundList', 'getFundProductDetail']),
    },
    methods: {
        onPageChange(newPage) {
            this.page = newPage;
            // displayedProducts는 computed 속성이므로 자동으로 업데이트됩니다.
            this.updateRoute();
        },

        fetchProductsForTab() {
            if (this.selectedTab === '예금') {
                this.fetchDepositList();
            } else if (this.selectedTab === '적금') {
                this.fetchSavingList();
            } else if (this.selectedTab === '펀드') {
                this.fetchFundList();
            } else if (this.selectedTab === '채권') {
                this.fetchBondList();
            }
        },

        fetchDepositList() {
            this.$store.dispatch('deposit/fetchDepositList');
        },

        fetchSavingList() {
            this.$store.dispatch('saving/fetchSavingList');
        },

        fetchFundList() {
            this.$store.dispatch('fund/fetchFundList');
        },

        fetchBondList() {
            this.$store.dispatch('bond/fetchBondList');
        },

        selectTab(tab) {
            this.selectedTab = tab;
            this.setProductType(tab);
            this.fetchProductsForTab();
            this.page = 1; // 페이지 번호 초기화
            this.updateRoute();
        },

        toggleCart(productId) {
            const index = this.cart.indexOf(productId);
            if (index === -1) {
                this.cart.push(productId); // 장바구니에 추가
            } else {
                this.cart.splice(index, 1); // 장바구니에서 제거
            }
        },

        searchProducts() {
            console.log('현재 선택된 탭:', this.selectedTab);
            console.log('displayedProducts:', this.displayedProducts);

            if (this.searchQuery.trim().length < 2) {
                alert('검색어는 2자 이상 입력해야 합니다.');
                return;
            }

            this.searchMode = true; // 검색 모드를 활성화
            this.page = 1; // 페이지 번호 초기화
            if (this.selectedTab === '채권') {
                this.searchBondList(this.searchQuery);
            } else if (this.selectedTab === '예금') {
                this.searchDepositList(this.searchQuery);
            } else if (this.selectedTab === '적금') {
                this.searchSavingList(this.searchQuery);
            } else if (this.selectedTab === '펀드') {
                this.searchFundList(this.searchQuery);
            }
            this.updateRoute();
        },

        onProductClick(productId, tab) {
            console.log('onProductClick 이벤트 발생', productId, 'Tab:', tab);
            this.setProductType(tab);
            this.gotoDetail(productId);
        },

        setProductType(tab) {
            if (tab === '예금') {
                this.productType = 'D';
            } else if (tab === '적금') {
                this.productType = 'S';
            } else if (tab === '펀드') {
                this.productType = 'F';
            } else if (tab === '채권') {
                this.productType = 'B';
            }

            console.log('Setting productType to:', this.productType);
        },

        gotoDetail(productId) {
            console.log('productId:', productId);
            console.log('productType:', this.productType);
            if (!this.productType) {
                console.error('productType이 설정되지 않았습니다.');
                return;
            }
            console.log('Navigating to:', `/List/${productId}`);

            this.$router.push({ path: `/List/${productId}` });
        },

        updateRoute() {
            const productType = this.getProductTypeFromTab(this.selectedTab);
            this.$router.push({
                name: 'FinancialProducts',
                params: {
                    productType: productType,
                    pageNumber: this.page,
                },
            });
        },

        getProductTypeFromTab(tab) {
            switch (tab) {
                case '예금':
                    return 'deposit';
                case '적금':
                    return 'saving';
                case '펀드':
                    return 'fund';
                case '채권':
                    return 'bond';
                default:
                    return '';
            }
        },

        getTabFromProductType(productType) {
            switch (productType) {
                case 'deposit':
                    return '예금';
                case 'saving':
                    return '적금';
                case 'fund':
                    return '펀드';
                case 'bond':
                    return '채권';
                default:
                    return '';
            }
        },

        ...mapActions('bond', ['fetchBondList', 'searchBondList', 'bondProductDetail']),
        ...mapActions('deposit', ['fetchDepositList', 'searchDepositList']),
        ...mapActions('saving', ['fetchSavingList', 'searchSavingList']),
        ...mapActions('fund', ['fetchFundList', 'searchFundList']),
        getRateByTerm(rates, productId, saveTrm) {
            if (!rates) return null;
            return rates.find((rate) => rate.productId === productId && rate.saveTrm === saveTrm);
        },
    },

    created() {
        const productTypeParam = this.$route.params.productType;
        const pageNumberParam = this.$route.params.pageNumber;

        this.selectedTab = this.getTabFromProductType(productTypeParam) || '예금';
        this.setProductType(this.selectedTab);

        this.page = parseInt(pageNumberParam) || 1;

        this.fetchProductsForTab();
    },
};
</script>

<style scoped>
.products-wrapper {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    flex: 1;
}

.products-container {
    display: flex;
    width: 100%;
    margin: 0 auto;
    background: linear-gradient(to bottom, #e0f2f1, #ffffff);
    align-items: center;
    flex-direction: column;
    justify-content: center;
    height: 100%;
}

.search-bar {
    width: 100%;
    margin-bottom: 20px;
}

.products-box {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
}

.nav-button {
    text-align: center;
    width: 20%;
    margin: 0;
}

.tabs {
    display: flex;
    margin-bottom: 20px;
}

.products-table {
    width: 100%;
    border-collapse: collapse;
}

.products-table th,
.products-table td {
    text-align: left;
    padding: 10px;
}

.products-table th {
    border-bottom: 2px solid #ddd;
}

.no-products {
    color: #ff5722;
}

.in-cart {
    background-color: #4caf50;
    color: white;
}

.Detail-Link:hover {
    cursor: pointer;
    color: blue;
    text-decoration: underline;
}
</style>
