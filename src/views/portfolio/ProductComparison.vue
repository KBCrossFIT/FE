<template>
    <div class="CandidatesPick-container">
        <h1>상품 비교 페이지</h1>
        <div class="search-filter">
            <!-- 상품 필터 -->
            <div class="button-group">
                <v-btn
                    :class="{ active: selectedCategory === 'saving' }"
                    @click="selectCategory('saving')"
                >
                    예/적금
                </v-btn>
                <v-btn
                    :class="{ active: selectedCategory === 'bond' }"
                    @click="selectCategory('bond')"
                >
                    채권
                </v-btn>
                <v-btn
                    :class="{ active: selectedCategory === 'fund' }"
                    @click="selectCategory('fund')"
                >
                    펀드
                </v-btn>
            </div>
        </div>

        <!-- 경고창 컨테이너 -->
        <div class="alert-container">
            <!-- 경고 메세지 박스 -->
            <div v-if="warningMessage" class="alert-warning">
                {{ warningMessage }}
            </div>

            <!-- 확인 메세지 박스-->
            <div v-if="confirmMessage" class="alert-confirm">
                {{ confirmMessage }}
            </div>
        </div>

        <!-- 장바구니 상품 카드 표시 위치 -->
        <div class="product-list">
            <div v-for="product in paginatedProducts" :key="product.id" class="product-card card">
                <div class="card-body" @click="addToCompare(product)">
                    <h5 class="card-title">{{ product.productName }}</h5>
                    <p class="card-text">
                        <span v-if="product.type === 'deposit' || product.type === 'saving'">
                            금융회사명: {{ product.korCoNm }} <br />
                            기본금리: {{ getRate(product.productId, 12).intrRate }}%<br />
                            최고금리: {{ getRate(product.productId, 12).intrRate2 }}%<br />
                        </span>

                        <span v-else-if="product.type === 'bond'">
                            ISIN 코드명: {{ product.isinCdNm }}<br />
                            채권발행일자: {{ product.bondIssuDt }}<br />
                            채권금리: {{ product.bondSrfcInrt }}%<br />
                        </span>

                        <span v-else-if="product.type === 'fund'">
                            회사명: {{ product.companyNm }}<br />
                            펀드유형: {{ product.fundType }}<br />
                            위험도: {{ product.riskLevel }}<br />
                            12개월 수익률: {{ product.yield12 }}%<br />
                        </span>

                        <span v-else> 수익률 정보 없음<br /><br /><br /> </span>
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
            <v-btn @click="clearAllProducts">일괄 비우기</v-btn>
            <div class="compare-cards">
                <div
                    v-for="(product, index) in compare"
                    :key="product.id"
                    class="compare-card"
                    @click="removeFromCompare(index)"
                >
                    <h5 class="card-title">{{ product.productName }}</h5>
                    <p class="card-text">
                        <span v-if="product.type === 'deposit' || product.type === 'saving'">
                            금융회사명: {{ product.korCoNm }} <br />
                            기본금리: {{ getRate(product.productId, 12).intrRate }}%<br />
                            최고금리: {{ getRate(product.productId, 12).intrRate2 }}%<br />
                        </span>

                        <span v-else-if="product.type === 'bond'">
                            ISIN 코드명: {{ product.isinCdNm }}<br />
                            채권발행일자: {{ product.bondIssuDt }}<br />
                            채권금리: {{ product.bondSrfcInrt }}%<br />
                        </span>

                        <span v-else-if="product.type === 'fund'">
                            회사명: {{ product.companyNm }}<br />
                            펀드유형: {{ product.fundType }}<br />
                            위험도: {{ product.riskLevel }}<br />
                            12개월 수익률: {{ product.yield12 }}%<br />
                        </span>

                        <span v-else> 수익률 정보 없음<br /><br /><br /> </span>
                    </p>
                </div>
                <div v-if="compare.length === 0" class="no-cards">
                    <p>비교할 카드를 선택하세요.</p>
                </div>
            </div>
        </div>
        <div class="CandidatesCompare-desc">
            <h3>열 기준 설명(상품 별 정보) 페이지 + 막대 그래프 비교</h3>
            <div id="chart">
                <VueApexCharts
                    type="bar"
                    height="350"
                    :options="chartOptions"
                    :series="series"
                ></VueApexCharts>
            </div>
            <!-- 비교한 상품들의 상세 정보 카드 -->
            <div v-if="compare.length > 0" class="product-details-container">
                <h3>비교한 상품 상세 정보</h3>
                <div class="card-container">
                    <v-card
                        v-for="(product, index) in compare"
                        :key="product.id"
                        class="desc-card"
                        elevation="3"
                    >
                        <v-card-title
                            >{{ product.productName }} (ID: {{ product.id }})</v-card-title
                        >
                        <v-card-text>
                            <p>상품 종류: {{ product.type }}</p>
                            <p v-if="product.yield && product.yield.length > 0">
                                수익률: {{ product.yield.join(', ') }}%
                            </p>
                            <p v-else>수익률 정보 없음</p>
                        </v-card-text>
                    </v-card>
                </div>
            </div>
            <div v-else>
                <p>비교할 상품이 없습니다.</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import { useCartStore } from '@/store/modules/cart';

// 상태 변수 선언
const searchQuery = ref('');
const selectedCategory = ref('saving');
const compare = ref([]);
const currentProductType = ref(null); // 현재 선택된 상품의 타입 저장
const page = ref(1);
const itemsPerPage = ref(4); // 페이지당 아이템 수
const warningMessage = ref('');
const confirmMessage = ref('');
const loading = ref(true); // 로딩 상태

// Pinia 스토어 사용
const cartStore = useCartStore();

// 장바구니 아이템을 가져오는 메서드 호출
onMounted(async () => {
    try {
        await cartStore.getCartItems(); // 데이터 가져오기
        console.log('Cart Items:', cartStore.cartItems); // 데이터 로드 후 출력
    } catch (error) {
        console.error('Error fetching cart items:', error);
    } finally {
        loading.value = false; // 로딩 상태 업데이트
    }
});

// 차트 옵션 및 시리즈 생성
const chartOptions = ref({
    chart: {
        type: 'bar',
        height: 350,
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '55%',
        },
    },
    xaxis: {
        categories: ['3개월', '6개월', '12개월'],
    },
    dataLabels: {
        enabled: false,
    },
    yaxis: {
        title: {
            text: '수익률 (%)',
        },
    },
});

// 비교한 상품의 수익률 데이터를 차트에 표시
const series = computed(() => {
    return compare.value.map((product) => {
        const productYield =
            product.yield && product.yield.length > 0
                ? product.yield.map((y) => y.intrRate || y.yield12 || 0)
                : [0, 0, 0];
        return {
            name: product.productName,
            data: productYield,
        };
    });
});

// 필터링된 제품 목록
const filteredProducts = computed(() => {
    return cartStore.cartItems.filter((product) => {
        const matchesCategory = selectedCategory.value
            ? product.type === selectedCategory.value
            : true;
        const matchesSearch = searchQuery.value
            ? product.productName.toLowerCase().includes(searchQuery.value.toLowerCase())
            : true;
        return matchesCategory && matchesSearch;
    });
});

// 카테고리 선택
const selectCategory = (category) => {
    selectedCategory.value = category;
    page.value = 1; // 페이지 초기화
};

// 페이지네이션된 제품 목록
const paginatedProducts = computed(() => {
    const start = (page.value - 1) * itemsPerPage.value;
    return filteredProducts.value.slice(start, start + itemsPerPage.value);
});

// 전체 페이지 수
const totalPages = computed(() => {
    return Math.ceil(filteredProducts.value.length / itemsPerPage.value);
});

// 비교 리스트에 상품을 추가하는 함수
const addToCompare = (product) => {
    if (compare.value.length >= 3) {
        warningMessage.value = '비교 리스트가 가득 찼습니다.(최대 3 상품)';
        confirmMessage.value = '';
        return;
    }

    if (compare.value.find((item) => item.id === product.id)) {
        warningMessage.value = '이미 비교 리스트에 있는 상품입니다.';
        confirmMessage.value = '';
        return;
    }

    if (compare.value.length === 0) {
        currentProductType.value = product.type;
    }

    if (product.type !== currentProductType.value) {
        warningMessage.value = '같은 종류의 상품만 비교할 수 있습니다.';
        confirmMessage.value = '';
        return;
    }

    compare.value.push(product);
    warningMessage.value = '';
    confirmMessage.value = `${product.productName}이(가) 비교 리스트에 추가되었습니다.`;
};

// 비교 리스트에서 상품을 제거하는 함수
const removeFromCompare = (index) => {
    const removedProduct = compare.value[index];
    compare.value.splice(index, 1);
    confirmMessage.value = `${removedProduct.productName}이(가) 비교 목록에서 제거되었습니다.`;
    warningMessage.value = '';

    if (compare.value.length === 0) {
        currentProductType.value = null;
    }
};

// 비교 리스트 비우기
const clearAllProducts = () => {
    compare.value = [];
    currentProductType.value = null;
    warningMessage.value = '';
    confirmMessage.value = '';
};

// getRate 함수 수정: save_trm이 없을 경우 기본값 반환
const getRate = (productId, term) => {
    const product = cartStore.cartItems.find((p) => p.productId === productId);
    if (product && product.yield) {
        // save_trm을 숫자로 변환하여 비교
        const rate = product.yield.find((r) => Number(r.save_trm) === Number(term));
        return rate || { intrRate: 0, intrRate2: 0 };
    }
    return { intrRate: 0, intrRate2: 0 };
};
</script>

<style scoped>
.CandidatesPick-container {
    width: 100%;
    padding: 20px;
}

.search-filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.button-group {
    display: flex;
    gap: 10px;
}

.button-group .v-btn.active {
    background-color: #3961e4;
    color: white;
}

.alert-container {
    margin-bottom: 20px;
}

.alert-warning {
    color: #856404;
    background-color: #fff3cd;
    border-color: #ffeeba;
    padding: 10px;
    border: 1px solid transparent;
    border-radius: 4px;
}

.alert-confirm {
    color: #155724;
    background-color: #d4edda;
    border-color: #c3e6cb;
    padding: 10px;
    border: 1px solid transparent;
    border-radius: 4px;
}

.product-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.product-card {
    width: calc(25% - 20px);
    cursor: pointer;
}

.product-card .card-body {
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    transition: box-shadow 0.3s;
}

.product-card .card-body:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.compare-cards {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    margin-top: 20px;
}

.compare-card {
    width: calc(33.333% - 20px);
    padding: 20px;
    background-color: #f1f1f1;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.compare-card:hover {
    background-color: #e2e2e2;
}

.no-cards {
    flex: 1;
    text-align: center;
    color: #777;
}

.product-details-container {
    margin-top: 40px;
}

.card-container {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
}

.desc-card {
    width: calc(33.333% - 20px);
}
</style>
