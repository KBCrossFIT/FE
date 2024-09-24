<template>
    <div class="CandidatesPick-container">
        <h1>상품 비교 페이지</h1>
        <div class="search-filter">
            <input
                v-model="searchQuery"
                type="text"
                class="form-control"
                placeholder="상품명 검색..."
            />

            <div class="button-group">
                <v-btn
                    :class="{ active: selectedCategory === 'savings' }"
                    @click="selectCategory('savings')"
                >
                    예/적금
                </v-btn>
                <v-btn
                    :class="{ active: selectedCategory === 'bonds' }"
                    @click="selectCategory('bonds')"
                >
                    채권
                </v-btn>
                <v-btn
                    :class="{ active: selectedCategory === 'funds' }"
                    @click="selectCategory('funds')"
                >
                    펀드
                </v-btn>
            </div>
        </div>

        <div class="product-list">
            <div v-for="product in paginatedProducts" :key="product.id" class="product-card card">
                <div class="card-body" @click="addToCompare(product)">
                    <h5 class="card-title">{{ product.name }}</h5>
                    <p class="card-text">
                        <strong>수익률:</strong><br />
                        <span v-if="product.type === 'bonds'">
                            3개월: {{ product.yield[0] }}%<br />
                            6개월: {{ product.yield[1] }}%<br />
                            12개월: {{ product.yield[2] }}%</span
                        >
                        <span v-else-if="product.type === 'funds'">
                            3개월: {{ product.yield[0] }}%<br />
                            6개월: {{ product.yield[1] }}%<br />
                            12개월: {{ product.yield[2] }}%</span
                        >
                        <span v-else>수익률 정보 없음<br /><br /><br /></span>
                    </p>
                </div>
            </div>
        </div>

        <div class="text-center">
            <v-pagination v-model="page" :length="totalPages" :total-visible="4"></v-pagination>
        </div>
    </div>

    <div class="CandidatesCompare-container">
        <h1>비교군 목록</h1>
        <div class="CandidatesCompare-body">
            <h3>최대 세 카드(compare) 담을 수 있는 박스</h3>
            <div class="compare-cards">
                <div
                    v-for="(product, index) in compareProducts"
                    :key="product.id"
                    class="compare-card"
                    @click="removeFromCompare(index)"
                >
                    <h5 class="card-title">{{ product.name }}</h5>
                    <p class="card-text">
                        <strong>수익률:</strong><br />
                        <span v-if="product.type === 'bonds'">
                            3개월: {{ product.yield[0] }}%<br />
                            6개월: {{ product.yield[1] }}%<br />
                            12개월: {{ product.yield[2] }}%</span
                        >
                        <span v-else-if="product.type === 'funds'">
                            3개월: {{ product.yield[0] }}%<br />
                            6개월: {{ product.yield[1] }}%<br />
                            12개월: {{ product.yield[2] }}%</span
                        >
                        <span v-else>수익률 정보 없음</span>
                    </p>
                </div>
                <div v-if="compareProducts.length === 0" class="no-cards">
                    <p>비교할 카드를 선택하세요.</p>
                </div>
            </div>
        </div>
        <div class="CandidatesCompare-desc">
            <h3>열 기준 설명(상품 별 정보) 페이지 + 막대 그래프 비교</h3>
            <div id="chart">
                <apexchart
                    type="bar"
                    height="350"
                    :options="chartOptions"
                    :series="series"
                ></apexchart>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, inject } from 'vue';
import { dummyProducts } from '@/dummyfinancial.js'; // 더미 데이터 가져오기

export default {
    name: 'ProductComparison',
    setup() {
        const searchQuery = ref('');
        const selectedCategory = ref('savings');
        const compare = ref([]);
        const page = ref(1);
        const itemsPerPage = 4; // 페이지당 아이템 수

        const products = ref(dummyProducts); // 더미 데이터 사용

        const filteredProducts = computed(() => {
            return products.value.filter((product) => {
                const matchesCategory = selectedCategory.value
                    ? product.type === selectedCategory.value
                    : true;
                const matchesSearch = product.name
                    .toLowerCase()
                    .includes(searchQuery.value.toLowerCase());
                return matchesCategory && matchesSearch;
            });
        });

        const selectCategory = (category) => {
            selectedCategory.value = category;
        };

        const paginatedProducts = computed(() => {
            const start = (page.value - 1) * itemsPerPage;
            return filteredProducts.value.slice(start, start + itemsPerPage);
        });

        const totalPages = computed(() => {
            return Math.ceil(filteredProducts.value.length / itemsPerPage);
        });

        const addToCompare = (product) => {
            if (compare) {
                compare.value.push(product);
                alert(`${product.name}이 비교리스트에 추가되었습니다.`);
            }
        };
        const compareProducts = computed(() => {
            return compare ? compare.value : [];
        });

        const removeFromCompare = (index) => {
            if (compare) {
                compare.value.splice(index, 1);
                alert('비교 목록에서 카드가 제거되었습니다.');
            }
        };

        return {
            searchQuery,
            selectedCategory,
            filteredProducts,
            paginatedProducts,
            totalPages,
            addToCompare,
            page,
            selectCategory,
            compareProducts,
            removeFromCompare,
        };
    },
};
</script>

<style scoped>
.financial-products-container {
    padding: 20px;
}

.search-filter {
    margin-bottom: 20px;
    display: flex;
    gap: 10px;
}

.form-control {
    flex: 1;
}

.form-select {
    flex: 0.3;
}

.product-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.product-card {
    flex: 0 1 300px; /* 최소 너비를 300px로 설정 */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
}

.card-body {
    padding: 20px;
}

.product-card:hover {
    box-shadow: 0 0 20px 10px #e9f5e9;
    cursor: pointer;
}

.btn-primary {
    background-color: #007bff;
    border: none;
}

.btn-primary:hover {
    background-color: #0056b3;
}

.compare-cards {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.compare-card {
    flex: 0 1 200px; /* 최소 너비를 200px로 설정 */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 20px;
    cursor: pointer;
    transition: box-shadow 0.3s;
}

.compare-card:hover {
    box-shadow: 0 0 20px 10px #e9f5e9;
}

.no-cards {
    flex: 0 1 300px; /* 카드와 동일한 최소 너비 설정 */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
    border-radius: 8px; /* 모서리 둥글게 */
    padding: 20px; /* 내부 여백 */
    text-align: center; /* 텍스트 가운데 정렬 */
    background-color: #f9f9f9; /* 배경 색상 */
    margin: 20px; /* 카드 간의 간격 */
}
</style>
