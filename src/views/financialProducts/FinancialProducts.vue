<template>
    <div class="products-wrapper">
        <div class="products-container">
            <div class="products-box">
                <!-- Search bar -->
                <v-text-field
                    v-model="searchQuery"
                    label="금융 상품을 검색하세요"
                    clearable
                    append-icon="mdi-magnify"
                    class="search-bar"
                ></v-text-field>
                <v-btn @click="searchProducts">검색</v-btn>

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

                <!-- Combined table with headers and items -->
                <table class="products-table">
                    <thead>
                        <tr>
                            <!-- 예금과 적금은 상품명, 상품종류, 기본금리, 최고금리, 장바구니 -->
                            <th v-if="selectedTab === '예금' || selectedTab === '적금'">상품명</th>
                            <th v-if="selectedTab === '예금' || selectedTab === '적금'">
                                금융회사명
                            </th>
                            <th v-if="selectedTab === '예금' || selectedTab === '적금'">
                                기본금리
                            </th>
                            <th v-if="selectedTab === '예금' || selectedTab === '적금'">
                                최고금리
                            </th>

                            <!-- 채권은 ISIN 코드명, 채권발행일자, 채권금리, 장바구니 -->
                            <th v-if="selectedTab === '채권'">ISIN 코드명</th>
                            <th v-if="selectedTab === '채권'">채권발행일자</th>
                            <th v-if="selectedTab === '채권'">채권금리</th>

                            <!-- 펀드는 상품명, 회사명, 펀드유형, 위험도, 1개월 수익률 -->
                            <th v-if="selectedTab === '펀드'">상품명</th>
                            <th v-if="selectedTab === '펀드'">회사명</th>
                            <th v-if="selectedTab === '펀드'">펀드유형</th>
                            <th v-if="selectedTab === '펀드'">위험도</th>
                            <th v-if="selectedTab === '펀드'">1개월 수익률</th>

                            <th>장바구니</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- 예금과 적금 리스트 -->
                        <template v-if="selectedTab === '예금' || selectedTab === '적금'">
                            <!-- Check if displayedProducts and products exist before iterating -->
                            <tr
                                v-if="displayedProducts && displayedProducts.products"
                                v-for="product in displayedProducts.products"
                                :key="product.productId"
                            >
                                <td
                                    @click="gotoDetail(product.productId, product.fin_prdt_cd)"
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
                        <template v-if="selectedTab === '채권'">
                            <tr v-for="product in displayedProducts" :key="product.id">
                                <td
                                    @click="gotoDetail(product.productId, product.fin_prdt_cd)"
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
                        <template v-if="selectedTab === '펀드'">
                            <tr v-for="product in displayedProducts" :key="product.id">
                                <td
                                    @click="gotoDetail(product.productId, product.fin_prdt_cd)"
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

                <div v-if="displayedProducts.length === 0" class="no-products">
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
            selectedTab: '예금', // 기본 탭은 '예금'
            searchQuery: '', // 검색어
            searchMode: false, // 검색 모드
            tabs: ['예금', '적금', '펀드', '채권'], // 탭 항목
            activeButtonStyle: {
                backgroundColor: '#4db6ac',
                color: 'white',
            },
            cart: [], // 장바구니
        };
    },
    computed: {
        // 선택된 탭과 검색 상태에 따라 필터링된 상품을 반환
        displayedProducts() {
            if (this.searchMode) {
                if (this.selectedTab === '채권') {
                    return this.getSearchBondList;
                } else if (this.selectedTab === '예금') {
                    return this.getSearchDepositList;
                } else if (this.selectedTab === '적금') {
                    return this.getSearchSavingList;
                } else if (this.selectedTab === '펀드') {
                    return this.getSearchFundList;
                }
            }

            // 검색 모드가 아닐 때는 기본 리스트를 반환
            if (this.selectedTab === '채권') {
                return this.getBondList;
            } else if (this.selectedTab === '예금') {
                return this.getDepositList;
            } else if (this.selectedTab === '적금') {
                return this.getSavingList;
            } else if (this.selectedTab === '펀드') {
                return this.getFundList;
            }

            return []; // 다른 탭은 빈 배열 반환
        },
        ...mapGetters('bond', ['getBondList', 'getSearchBondList', 'getBondProductDetail']),
        ...mapGetters('deposit', ['getDepositList', 'getSearchDepositList']),
        ...mapGetters('saving', ['getSavingList', 'getSearchSavingList']),
        ...mapGetters('fund', ['getFundList', 'getSearchFundList']),
    },
    methods: {
        selectTab(tab) {
            this.selectedTab = tab;
            this.searchMode = false; // 탭을 선택하면 검색 모드 해제

            if (tab === '채권') {
                this.fetchBondList();
            } else if (tab === '예금') {
                this.fetchDepositList();
            } else if (tab === '적금') {
                this.fetchSavingList();
            } else if (tab === '펀드') {
                this.fetchFundList();
            }
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
            if (this.searchQuery.trim().length < 2) {
                alert('검색어는 2자 이상 입력해야 합니다.');
                return;
            }

            this.searchMode = true; // 검색 모드를 활성화
            if (this.selectedTab === '채권') {
                this.searchBondList(this.searchQuery);
            } else if (this.selectedTab === '예금') {
                this.searchDepositList(this.searchQuery);
            } else if (this.selectedTab === '적금') {
                this.searchSavingList(this.searchQuery);
            } else if (this.selectedTab === '펀드') {
                this.searchFundList(this.searchQuery);
            }
        },

        gotoDetail(productId, finPrdtCd) {
            // URL 동적 생성
            this.$router.push({ path: `/productDesc/${finPrdtCd}/${productId}` });
        },

        ...mapActions('bond', ['fetchBondList', 'searchBondList', 'bondProductDeatil']),
        ...mapActions('deposit', ['fetchDepositList', 'searchDepositList']),
        ...mapActions('saving', ['fetchSavingList', 'searchSavingList']),
        ...mapActions('fund', ['fetchFundList', 'searchFundList']),
        getRateByTerm(rates, productId, saveTrm) {
            // rates 배열에서 productId와 saveTrm이 일치하는 항목을 찾음
            return rates.find((rate) => rate.productId === productId && rate.saveTrm === saveTrm);
        },
    },

    created() {
        // 금융 상품 페이지에 처음 들어오면 예금 데이터를 기본적으로 불러옴
        this.fetchDepositList();
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
