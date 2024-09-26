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
                            <th v-if="selectedTab !== '펀드'">상품종류</th>
                            <th v-if="selectedTab === '펀드'">상품종류</th>
                            <th v-if="selectedTab === '펀드'">펀드유형</th>
                            <th>상품명</th>
                            <th v-if="selectedTab !== '펀드'">기본금리</th>
                            <th v-if="selectedTab !== '펀드'">최고금리</th>
                            <th v-if="selectedTab === '펀드'">수익률</th>
                            <th>장바구니</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in filteredProducts" :key="product.id">
                            <td>{{ product.type }}</td>
                            <td v-if="selectedTab === '펀드'">{{ product.fundType }}</td>
                            <td>{{ product.name }}</td>
                            <td v-if="selectedTab !== '펀드'">{{ product.baseRate }}</td>
                            <td v-if="selectedTab !== '펀드'">{{ product.maxRate }}</td>
                            <td v-if="selectedTab === '펀드'">{{ product.yield }}</td>
                            <td>
                                <v-btn
                                    icon
                                    :class="{ 'in-cart': cart.includes(product.id) }"
                                    @click="toggleCart(product.id)"
                                    :style="cart.includes(product.id) ? 'background-color: #4caf50; color: white;' : ''"
                                >
                                    <v-icon>mdi-cart</v-icon>
                                </v-btn>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div v-if="filteredProducts.length === 0" class="no-products">상품이 없습니다.</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectedTab: '예금',
            searchQuery: '',
            tabs: ['예금', '적금', '펀드', '채권', '주식'],
            products: [
                {
                    id: 1,
                    type: '예금',
                    bank: '우리은행',
                    name: '정기예금 A',
                    baseRate: '2.5%',
                    maxRate: '3.0%',
                },
                {
                    id: 2,
                    type: '적금',
                    bank: '신한은행',
                    name: '정기적금 B',
                    baseRate: '3.0%',
                    maxRate: '3.5%',
                },
                {
                    id: 3,
                    type: '펀드',
                    fundType: '주식형',
                    name: '펀드 C',
                    yield: '5.0%',
                },
                {
                    id: 5,
                    type: '주식',
                    bank: 'NH농협은행',
                    name: '주식 E',
                    baseRate: '6.0%',
                    maxRate: '7.0%',
                },
            ],
            activeButtonStyle: {
                backgroundColor: '#4db6ac',
                color: 'white',
            },
            cart: [] // Array to keep track of cart items
        };
    },
    computed: {
        filteredProducts() {
            return this.products.filter((product) => {
                if (this.selectedTab === '펀드') {
                    return product.type === this.selectedTab && product.name.includes(this.searchQuery);
                }
                return product.type === this.selectedTab && product.name.includes(this.searchQuery);
            });
        },
    },
    methods: {
        selectTab(tab) {
            this.selectedTab = tab;
        },
        toggleCart(productId) {
            const index = this.cart.indexOf(productId);
            if (index === -1) {
                this.cart.push(productId); // Add to cart
            } else {
                this.cart.splice(index, 1); // Remove from cart
            }
        },
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
    border-collapse: collapse; /* Remove grid */
}

.products-table th,
.products-table td {
    text-align: left;
    padding: 10px;
}

.products-table th {
    border-bottom: 2px solid #ddd; /* Keep the horizontal line under the header */
}

.no-products {
    color: #ff5722;
}

/* New styles for cart button */
.in-cart {
    background-color: #4caf50; /* Change button background to green when in cart */
    color: white; /* Ensure the text is readable */
}
</style>
