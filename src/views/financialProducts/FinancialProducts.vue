<template>
    <div class="products-wrapper">
        <div class="products-container">
            <div class="products-header">
                <h1>금융상품 페이지</h1>
            </div>
            <div class="products-box">
                <div class="tabs">
                    <v-btn
                        v-for="tab in tabs"
                        :key="tab"
                        :class="{ 'v-btn--active': selectedTab === tab }"
                        @click="selectTab(tab)"
                        class="nav-button"
                    >
                        {{ tab }}
                    </v-btn>
                </div>

                <table class="products-table">
                    <thead>
                        <tr>
                            <th>상품종류</th>
                            <th>은행</th>
                            <th>상품명</th>
                            <th>기본금리</th>
                            <th>최고금리</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in filteredProducts" :key="product.id">
                            <td>{{ product.name }}</td>
                            <td>{{ product.rate }}</td>
                            <td>{{ product.term }}</td>
                            <td>{{ product.riskLevel }}</td>
                            <td>
                                <v-btn icon @click="addToCart(product)">
                                    <v-icon>mdi-cart</v-icon>
                                    <!-- 장바구니 아이콘 -->
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
            tabs: ['예금', '적금', '펀드', '채권', '주식'], // 탭 목록
            products: [
                {
                    id: 1,
                    name: '예금 상품 A',
                    rate: '2.5%',
                    term: '1년',
                    riskLevel: '안전형',
                    category: '예금',
                },
                {
                    id: 2,
                    name: '적금 상품 B',
                    rate: '3.0%',
                    term: '2년',
                    riskLevel: '위험중립형',
                    category: '적금',
                },
                {
                    id: 3,
                    name: '펀드 상품 C',
                    rate: '5.0%',
                    term: '3년',
                    riskLevel: '적극투자형',
                    category: '펀드',
                },
                // 필요에 따라 더 많은 상품 추가
            ],
        };
    },
    computed: {
        filteredProducts() {
            return this.products.filter((product) => product.category === this.selectedTab);
        },
    },
    methods: {
        selectTab(tab) {
            this.selectedTab = tab;
        },
        addToCart(product) {
            // 상품을 장바구니에 담는 로직 구현
            console.log('장바구니에 담기:', product.name);
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

.products-header {
    margin-bottom: 20px;
}

.products-header h1 {
    font-size: 2.5rem;
    color: #4db6ac;
    text-align: center;
}

.products-box {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%; /* 레이아웃 개선을 위한 조정 */
}

/* 각각 버튼 스타일 */
.nav-button {
    text-align: center;
    width: 20%;
    margin: 0; /* 버튼 사이의 마진 제거 */
    border-radius: 40px, 40px, 0, 0;
    /* flex-grow: 1; */
}

/* 버튼 묶음 스타일 */
.tabs {
    display: flex;
    margin-bottom: 20px;
    /* flex-wrap: wrap; */
    /* gap: 20px; */
}

.v-btn--active {
    background-color: #ca207b; /* 선택된 버튼 색상 */
}
.v-btn {
    border: none; /* 기본 테두리 제거 */
}
.nav-tabs {
    display: flex;
    justify-content: center;
}

.nav-item {
    margin: 0 10px;
}

.nav-link {
    color: #4db6ac;
    cursor: pointer;
}

.nav-link.active {
    font-weight: bold;
    border-bottom: 2px solid #4db6ac;
}

.products-table {
    width: 100%;
    border-collapse: collapse;
}

.products-table th,
.products-table td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

.no-products {
    color: #ff5722; /* 상품 없음 메시지에 대한 빨간색 */
}
</style>
