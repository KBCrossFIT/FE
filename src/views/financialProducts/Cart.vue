<template>
    <div class="cart-container">
        <!-- 로딩 상태 -->
        <div v-if="loading" class="loading-spinner">
            <div class="spinner"></div>
        </div>

        <!-- 빈 장바구니 상태 -->
        <div v-else-if="cart.length === 0" class="empty-cart">
            <h1>장바구니가 비어 있습니다.</h1>
            <a href="http://localhost:5174/products/deposit?page=1&pageSize=10">상품 보러가기</a>

            <br />
            <span v-if="!authStore.isAuthenticated">로그인하고 금융상품을 담아보세요.</span>
            <router-link
                v-if="!authStore.isAuthenticated"
                to="/login"
                class="btn btn-primary sidebar-link"
            >
                <i class="fas fa-sign-in-alt icon"></i>
                <span class="menu-text"> 로그인하러 가기</span>
            </router-link>
        </div>

        <!-- 장바구니 목록 -->
        <div v-else class="cart-card">
            <div class="card-title-container">
                <h2 class="card-title">장바구니 목록</h2>
            </div>
            <hr class="divider" />

            <div class="table-container">
                <!-- 테이블 헤더 -->
                <div class="header-row table-responsive">
                    <div class="checkbox-column center">선택</div>
                    <div class="sortable-header">상품 종류</div>
                    <div class="sortable-header">상품 이름</div>
                    <div class="sortable-header">제공자</div>
                    <div class="sortable-header">기대 수익률</div>
                    <div class="text-center"></div>
                </div>
                <hr class="divider" />

                <!-- 테이블 바디 -->
                <div v-for="item in paginatedCart" :key="item.cartId" class="cart-item">
                    <div class="cart-item-row">
                        <div class="col checkbox-column">
                            <input
                                type="checkbox"
                                :value="{
                                    productId: item.productId,
                                    productType: item.productType,
                                }"
                                v-model="selectedProducts"
                                @change="handleSelectionChange($event, item)"
                                class="product-checkbox"
                            />
                        </div>
                        <div class="col product-type">
                            <span>
                                <span v-if="item.productType === 'S'">
                                    {{ item.rsrvType === 'S' ? '적금' : '예금' }}
                                </span>
                                <span v-else-if="item.productType === 'B'">채권</span>
                                <span v-else-if="item.productType === 'F'">펀드</span>
                                <span v-else>기타</span>
                            </span>
                        </div>
                        <div class="col product-name">{{ item.productName }}</div>
                        <div class="col provider">{{ item.provider }}</div>
                        <div class="col expected-return">{{ item.expectedReturn }}%</div>
                        <div class="col text-center">
                            <button
                                class="btn btn-danger cart-trashcanBtn"
                                @click="removeFromCart(item.cartId)"
                                aria-label="삭제"
                            >
                                <i class="mdi mdi-delete mdi-24px"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- 페이지네이션 컨트롤 -->
                <div class="pagination" v-if="totalPages > 1">
                    <button
                        @click="currentPage--"
                        :disabled="currentPage === 1"
                        class="pagination-btn btn"
                        aria-label="이전 페이지"
                    >
                        <i class="mdi mdi-chevron-left"></i>
                    </button>
                    <span>{{ currentPage }} / {{ totalPages }}</span>
                    <button
                        @click="currentPage++"
                        :disabled="currentPage >= totalPages"
                        class="pagination-btn btn"
                        aria-label="다음 페이지"
                    >
                        <i class="mdi mdi-chevron-right"></i>
                    </button>
                </div>

                <!-- 액션 버튼 그룹 -->
                <div class="button-group">
                    <button class="btn btn-primary cart-Btn-Gotocompare" @click="goToCompare">
                        <i class="fas fa-exchange-alt"></i>
                        상품 비교해보기
                    </button>
                    <button
                        class="btn btn-secondary cart-Btn-GotoPortfolio"
                        @click="goToMakePortfolio"
                    >
                        <i class="fas fa-chart-pie"></i>
                        포트폴리오 구성하기
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/store/modules/cart';
import { useAuthStore } from '@/store/authStore.js';

export default {
    name: 'Cart',
    setup() {
        const router = useRouter();
        const cart = ref([]);
        const itemsPerPage = 5;
        const currentPage = ref(1);
        const loading = ref(true);
        const selectedProducts = ref([]);
        const cartStore = useCartStore();
        const authStore = useAuthStore();

        const isAuthenticated = computed(() => authStore.isAuthenticated);

        onMounted(async () => {
            await authStore.checkAuth();
            await loadCartItems();
        });

        const loadCartItems = async () => {
            try {
                loading.value = true;
                await cartStore.fetchCartItems();
                cart.value = [...cartStore.cartItems];
                console.log('loadCartItems:', cart.value);
            } catch (error) {
                console.error('장바구니 목록을 불러오는 데 실패했습니다:', error);
            } finally {
                loading.value = false;
            }
        };

        const paginatedCart = computed(() => {
            const start = (currentPage.value - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            console.log('paginatedCart:', cart.value.slice(start, end));
            return cart.value.slice(start, end);
        });

        const totalPages = computed(() => Math.ceil(cart.value.length / itemsPerPage));

        const removeFromCart = async (cartId) => {
            try {
                await cartStore.removeCartItem(cartId);
                await loadCartItems();
            } catch (error) {
                console.error('장바구니에서 항목을 제거하는 데 실패했습니다:', error);
                alert('장바구니에서 항목을 제거하는 중 오류가 발생했습니다.');
            }
        };

        const goToCompare = () => {
            router.push('/productcomparison');
        };

        const goToMakePortfolio = () => {
            if (selectedProducts.value.length === 0) {
                alert('포트폴리오를 구성할 상품을 선택하세요.');
                return;
            }

            const productIds = selectedProducts.value.map((item) => item.productId);
            const productTypes = selectedProducts.value.map((item) => item.productType);

            // MakePortfolio 페이지로 이동
            router.push({
                name: 'MakePortfolio',
                query: {
                    productIds: JSON.stringify(productIds),
                    productTypes: JSON.stringify(productTypes),
                },
            });
        };

        const handleSelectionChange = (event, item) => {
            if (event.target.checked) {
                selectedProducts.value.push({
                    productId: item.productId,
                    productType: item.productType,
                });
            } else {
                selectedProducts.value = selectedProducts.value.filter(
                    (product) => product.productId !== item.productId
                );
            }
            console.log('선택된 상품 목록:', selectedProducts.value);
        };

        return {
            cart,
            removeFromCart,
            currentPage,
            totalPages,
            paginatedCart,
            goToCompare,
            goToMakePortfolio,
            loading,
            selectedProducts,
            handleSelectionChange,
            isAuthenticated,
            authStore,
            itemsPerPage,
        };
    },
};
</script>

<style scoped>
/* 전체 요소에 box-sizing 적용 */
* {
    box-sizing: border-box;
}

.cart-container {
    padding: 20px;
    max-width: 80%;
    margin: 0 auto;
}

/* 로딩 스피너 스타일 */
.loading-spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
}

.spinner {
    border: 8px solid #f3f3f3; /* Light grey */
    border-top: 8px solid #007bff; /* Blue */
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

.empty-cart {
    text-align: center;
    padding: 40px;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    color: #343a40;
}

.empty-cart h1 {
    margin-bottom: 20px;
    color: #343a40;
}

.empty-cart a {
    display: inline-block;
    margin-top: 10px;
    color: #007bff;
    text-decoration: none;
    font-weight: bold;
}

.empty-cart a:hover {
    text-decoration: underline;
}

.cart-card {
    padding: 40px;
    background-color: #fff;
    border: 1px solid #dee2e6;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 0; /* border-radius 제거 */
}

.card-title-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card-title {
    margin-bottom: 0;
    color: #343a40;
    font-size: 32px;
    font-weight: bold;
}

.divider {
    border: none;
    border-top: 1px solid #dee2e6;
    margin: 20px 0;
}

.table-container {
    width: 100%;
}

/* 테이블 헤더 */
.header-row {
    display: flex;
    background-color: #f8f9fa;
    border-bottom: 2px solid #dee2e6;
    padding: 20px 0; /* 행 높이 증가 */
    font-size: 18px;
    cursor: pointer;
}

.header-row .sortable-header {
    display: flex;
    align-items: center;
}

.header-row .checkbox-column {
    flex: 0 0 15%; /* 1번째 열: 10% */
    max-width: 15%;
    text-align: center;
}

.header-row .sortable-header:nth-child(2) {
    flex: 0 0 15%; /* 2번째 열: 15% */
    max-width: 15%;
    text-align: center;
}

.header-row .sortable-header:nth-child(3) {
    flex: 0 0 30%; /* 3번째 열: 35% */
    max-width: 30%;
    text-align: center;
}

.header-row .sortable-header:nth-child(4) {
    flex: 0 0 15%; /* 4번째 열: 15% */
    max-width: 15%;
    text-align: center;
}

.header-row .sortable-header:nth-child(5) {
    flex: 0 0 15%; /* 5번째 열: 15% */
    max-width: 15%;
    text-align: center;
}

.header-row .text-center {
    flex: 0 0 10%; /* 6번째 열: 10% */
    max-width: 10%;
    text-align: center;
}

/* 테이블 바디 */
.cart-item-row {
    display: flex;
    padding: 20px 0;
    align-items: center;
    background-color: #fff;
    border-radius: 0;
}

.cart-item-row .col {
    flex: 1;
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

/* 수정된 데이터 컬럼 너비: 헤더와 동일하게 설정 */
.cart-item-row .checkbox-column {
    flex: 0 0 15%; /* 헤더와 일치 */
    max-width: 15%;
    text-align: center;
}

.cart-item-row .product-type {
    flex: 0 0 15%; /* 헤더와 일치 */
    max-width: 15%;
}

.cart-item-row .product-name {
    flex: 0 0 30%; /* 헤더와 일치 */
    max-width: 30%;
}

.cart-item-row .provider {
    flex: 0 0 15%; /* 헤더와 일치 */
    max-width: 15%;
}

.cart-item-row .expected-return {
    flex: 0 0 15%; /* 헤더와 일치 */
    max-width: 15%;
}

.cart-item-row .text-center {
    flex: 0 0 10%; /* 헤더와 일치 */
    max-width: 10%;
    text-align: center;
}

/* 버튼 스타일 */
.btn {
    padding: 10px 20px; /* 버튼 높이 조정 */
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
}

.btn i {
    margin-right: 8px;
}

.pagination-btn {
    background-color: #007bff;
    color: white;
}

.pagination-btn:hover {
    background-color: #0056b3;
}

.btn-primary:hover {
    scale: 1.3;
}

.btn-secondary:hover {
    scale: 1.3;
}

.btn-danger {
    background-color: #dc3545;
    color: white;
}

.btn-danger:hover {
    background-color: #c82333;
}

.cart-trashcanBtn {
    width: 40px; /* 버튼의 너비 조정 */
    height: 40px; /* 버튼의 높이 조정 */
    display: flex; /* Flexbox 사용 */
    justify-content: center; /* 수평 중앙 정렬 */
    align-items: center; /* 수직 중앙 정렬 */
    padding: 0; /* 패딩 제거 */
    border: none; /* 테두리 제거 */
    background-color: #dc3545; /* btn-danger 색상 */
    color: white; /* 아이콘 색상 */
    cursor: pointer; /* 마우스 포인터 변경 */
    border-radius: 4px; /* 버튼의 둥근 모서리 */
}

.cart-trashcanBtn .mdi-delete {
    font-size: 24px; /* 아이콘 크기 조정 */
    margin: 0; /* 불필요한 마진 제거 */
    padding: 0; /* 불필요한 패딩 제거 */
    line-height: 1; /* 라인 높이 조정 */
}

/* 페이지네이션 버튼 */
.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
}

.pagination-btn {
    padding: 10px 20px; /* 버튼 높이 조정 */
    font-size: 16px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
}

.pagination-btn:hover {
    background-color: #0056b3;
}

/* 액션 버튼 그룹 */
.button-group {
    margin-top: 40px;
    display: flex;
    justify-content: flex-end;
    gap: 20px;
}

/* 반응형 디자인 */
@media (max-width: 1200px) {
    .cart-card {
        padding: 30px;
    }

    .header-row,
    .cart-item-row {
        font-size: 16px;
        padding: 15px 0; /* 행 높이 조정 */
    }

    .btn,
    .pagination-btn {
        padding: 8px 16px;
        font-size: 14px;
    }

    .cart-item-row .col {
        padding: 0 15px; /* 데이터 레이블 간 간격 조정 */
    }
}

@media (max-width: 768px) {
    .cart-card {
        padding: 20px;
    }

    .header-row,
    .cart-item-row {
        font-size: 14px;
        padding: 10px 0; /* 행 높이 조정 */
    }

    .btn,
    .pagination-btn {
        padding: 6px 12px;
        font-size: 12px;
    }

    .cart-item-row .col {
        padding: 0 10px; /* 데이터 레이블 간 간격 조정 */
    }
}
</style>
