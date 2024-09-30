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
                            <th>상품종류</th>
                            <th>상품명</th>
                            <th v-if="selectedTab === '펀드'">펀드유형</th>
                            <th v-if="selectedTab !== '펀드'">기본금리</th>
                            <th v-if="selectedTab !== '펀드'">최고금리</th>
                            <th v-if="selectedTab === '펀드'">수익률</th>
                            <th>장바구니</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in filteredProducts" :key="product.id">
                            <td>{{ getProductTypeName(product.ProductType) }}</td>

                            <!-- 상품명 클릭시 상품 상세로 이동. -->
                            <td
                                class="products-desc-row"
                                @click="gotoProductDesc(product.ProductType, product.id)"
                            >
                                {{ product.name }}
                            </td>
                            <td v-if="selectedTab === '펀드'">{{ product.fundType }}</td>
                            <td v-if="selectedTab !== '펀드'">{{ product.baseRate }}</td>
                            <td v-if="selectedTab !== '펀드'">{{ product.maxRate }}</td>
                            <td v-if="selectedTab === '펀드'">{{ product.yield }}</td>
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
                    </tbody>
                </table>

                <div v-if="filteredProducts.length === 0" class="no-products">상품이 없습니다.</div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export default {
    setup() {
        const router = useRouter(); // Initialize router here
        const searchQuery = ref('');
        const selectedTab = ref('예금');
        const tabs = ['예금', '적금', '펀드', '채권', '주식'];
        const products = ref([
            {
                id: 1,
                ProductType: 'a',
                bank: '우리은행',
                name: '정기예금 A',
                baseRate: '2.5%',
                maxRate: '3.0%',
            },
            {
                id: 2,
                ProductType: 'b',
                bank: '신한은행',
                name: '정기적금 B',
                baseRate: '3.0%',
                maxRate: '3.5%',
            },
            {
                id: 3,
                ProductType: 'c',
                fundType: '주식형',
                name: '펀드 C',
                yield: '5.0%',
            },
            {
                id: 5,
                ProductType: 'd',
                bank: 'NH농협은행',
                name: '채권 E',
                baseRate: '6.0%',
                maxRate: '7.0%',
            },
        ]);
        const activeButtonStyle = {
            backgroundColor: '#4db6ac',
            color: 'white',
        };
        const cart = ref([]); // Array to keep track of cart items

        const filteredProducts = computed(() => {
            return products.value.filter((product) => {
                // Check if the product matches the selected tab
                let isProductTypeMatched;
                switch (selectedTab.value) {
                    case '예금':
                        isProductTypeMatched = product.ProductType === 'a';
                        break;
                    case '적금':
                        isProductTypeMatched = product.ProductType === 'b';
                        break;
                    case '펀드':
                        isProductTypeMatched = product.ProductType === 'c';
                        break;
                    case '채권':
                        isProductTypeMatched = product.ProductType === 'd';
                        break;
                    case '주식':
                        isProductTypeMatched = product.ProductType === 'e';
                        break;
                    default:
                        isProductTypeMatched = false;
                }

                // Check if the product name includes the search query
                const isNameMatched = product.name.includes(searchQuery.value);

                return isProductTypeMatched && isNameMatched;
            });
        });

        const selectTab = (tab) => {
            selectedTab.value = tab;
        };

        const toggleCart = (productId) => {
            const index = cart.value.indexOf(productId);
            if (index === -1) {
                cart.value.push(productId); // Add to cart
            } else {
                cart.value.splice(index, 1); // Remove from cart
            }
        };

        const gotoProductDesc = (productType, id) => {
            const source = 'list'; // Indicate that the source is the product list
            switch (productType) {
                case 'a':
                    router.push(`/productDesc/a/${id}?source=${source}`);
                    break;
                case 'b':
                    router.push(`/productDesc/b/${id}?source=${source}`);
                    break;
                case 'c':
                    router.push(`/productDesc/c/${id}?source=${source}`);
                    break;
                case 'd':
                    router.push(`/productDesc/d/${id}?source=${source}`);
                    break;
                case 'e':
                    console.log('주식 상품에 대한 상세 페이지가 없습니다.');
                    break;
                default:
                    console.log('해당 상품 유형에 대한 페이지가 없습니다.');
            }
        };

        const getProductTypeName = (productType) => {
            const typeNames = {
                a: '예금',
                b: '적금',
                c: '펀드',
                d: '채권',
                e: '주식',
            };
            return typeNames[productType] || '알 수 없음'; // 기본값 추가
        };

        return {
            searchQuery,
            selectedTab,
            tabs,
            products,
            activeButtonStyle,
            cart,
            filteredProducts,
            selectTab,
            toggleCart,
            gotoProductDesc,
            getProductTypeName,
        };
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

.products-desc-row:hover {
    cursor: pointer;
    text-decoration: underline;
    color: blue;
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
