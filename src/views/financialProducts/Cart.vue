<template>
    <div class="cart-container">
        <!-- 로딩 상태 -->
        <div v-if="loading" class="loading-spinner">
            <div class="spinner"></div>
        </div>

        <!-- 로그인하지 않은 상태 -->
        <div v-else-if="!isAuthenticated" class="empty_login_data">
            <h1>로그인 정보가 없습니다.</h1>
            <p>로그인하고 금융상품을 담아보세요.</p>
            <router-link to="/login" class="btn btn-primary">
                <i class="fas fa-sign-in-alt icon"></i>
                <span class="menu-text"> 로그인하러 가기</span>
            </router-link>
        </div>

        <!-- 빈 장바구니 상태 -->
        <div v-else-if="cart.length === 0" class="empty-cart">
            <h1>장바구니가 비어 있습니다.</h1>
            <router-link to="/products/deposit?page=1&pageSize=10">상품 보러가기</router-link>
        </div>

        <!-- 장바구니 목록 -->
        <div v-else class="cart-card">
            <div class="card-title-container">
                <h2 class="card-title">장바구니 목록</h2>
            </div>
            <hr class="divider" />

            <div class="table-container">
                <!-- 테이블 헤더 -->
                <div class="header-row">
                    <div class="header-cell checkbox-column">선택</div>
                    <div class="header-cell product-type">상품 종류</div>
                    <div class="header-cell product-name">상품 이름</div>
                    <div class="header-cell provider">제공자</div>
                    <div class="header-cell expected-return">기대 수익률</div>
                    <div class="header-cell text-center"></div>
                </div>
                <hr class="divider" />

                <!-- 테이블 바디 -->
                <div v-for="item in paginatedCart" :key="item.cartId" class="cart-item">
                    <div class="cart-item-row">
                        <div class="col checkbox-column">
                            <input
                                type="checkbox"
                                :checked="isSelected(item)"
                                @change="handleSelectionChange($event, item)"
                                class="product-checkbox"
                            />
                        </div>
                        <div class="col product-type">
                            <span v-if="item.productType === 'S'">
                                {{ item.rsrvType === 'S' ? '적금' : '예금' }}
                            </span>
                            <span v-else-if="item.productType === 'B'"> 채권 </span>
                            <span v-else> 펀드 </span>
                        </div>

                        <div
                            class="col product-name"
                            @click="
                                goToProductDetail(item.productId, item.productType, item.rsrvType)
                            "
                        >
                            {{ item.productName }}
                        </div>
                        <div class="col provider">{{ item.provider }}</div>
                        <div
                            class="col expected-return"
                            :style="getColorStyle(item.expectedReturn)"
                        >
                            {{ item.expectedReturn }}%
                        </div>
                        <div class="col text-center">
                            <button
                                class="btn btn-danger cart-trashcanBtn"
                                @click.stop="removeFromCart(item.cartId)"
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

        const isSelected = (item) => {
            return selectedProducts.value.some((product) => product.productId === item.productId);
        };

        const handleSelectionChange = (event, item) => {
            if (event.target.checked) {
                if (!isSelected(item)) {
                    selectedProducts.value.push({
                        productId: item.productId,
                        productType: item.productType,
                    });
                }
            } else {
                selectedProducts.value = selectedProducts.value.filter(
                    (product) => product.productId !== item.productId
                );
            }
            console.log('선택된 상품 목록:', selectedProducts.value);
        };

        const goToProductDetail = (productId, productType, rsrvType = null) => {
            const type = getProductTypeReturn(productType, rsrvType);
            router.push(`/list/${productId}?productType=${type}`);
        };

        const getProductTypeReturn = (productType, rsrvType) => {
            switch (productType) {
                case 'S':
                    if (rsrvType != null) return 'saving';
                    return 'deposit';
                case 'F':
                    return 'fund';
                default:
                    return 'bond';
            }
        };

        function getColorStyle(value) {
            return {
                color: value > 0 ? 'red' : value < 0 ? 'blue' : 'black',
            };
        }

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
            isSelected,
            goToProductDetail,
            getProductTypeReturn,
            getColorStyle,
        };
    },
};
</script>

<style scoped>
/* 기본 설정 */
* {
    box-sizing: border-box;
}

.cart-container {
    padding: 20px;
    max-width: 90%;
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

/* 빈 장바구니 스타일 */
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

/* 장바구니 카드 스타일 */
.cart-card {
    padding: 40px;
    background-color: #fff;
    border: 1px solid #dee2e6;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
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

/* 테이블 바디,헤더 공통 스타일 */
.header-row .checkbox-column,
.header-row .product-type,
.header-row .provider,
.header-row .expected-return,
.cart-item-row .checkbox-column,
.cart-item-row .product-type,
.cart-item-row .provider,
.cart-item-row .expected-return {
    text-align: center;
}

.header-row .product-name,
.cart-item-row .product-name {
    text-align: left;
}

.header-row,
.cart-item-row {
    display: flex;
    padding: 15px 0;
    align-items: center;
    border-bottom: 1px solid #dee2e6;
    font-size: 16px;
    background-color: #f8f9fa;
}

.header-row .header-cell,
.cart-item-row .col {
    display: flex;
    align-items: center;
    padding: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* 테이블 헤더 스타일 */
.header-row {
    display: flex;
    background-color: #f8f9fa;
    border-bottom: 2px solid #dee2e6;
    padding: 20px 0;
    font-size: 18px;
    cursor: pointer;
}

.header-row .sortable-header {
    display: flex;
    align-items: center;
}

/* 열 너비 및 정렬 설정 */
.header-row .checkbox-column,
.cart-item-row .checkbox-column {
    flex: 0 0 10%;
    text-align: center;
}

.header-row .product-type,
.cart-item-row .product-type {
    flex: 0 0 15%;
    text-align: center;
}

.header-row .product-name,
.cart-item-row .product-name {
    flex: 1; /* 가장 넓게 설정하여 남은 공간을 활용 */
    text-align: left;
}

.header-row .provider,
.cart-item-row .provider {
    flex: 0 0 20%;
    text-align: center;
}

.header-row .expected-return,
.cart-item-row .expected-return {
    flex: 0 0 15%;
    text-align: right;
}

.header-row .text-center,
.cart-item-row .text-center {
    flex: 0 0 10%;
    text-align: center;
}

/* 테이블 바디 스타일 */
.cart-item-row {
    display: flex;
    padding: 20px 0;
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid #dee2e6;
}

.cart-item-row .col {
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

/* 상품 이름 hover 효과 */
.product-name:hover {
    text-decoration: underline;
    cursor: pointer;
}

/* 버튼 스타일 */
.btn {
    padding: 10px 20px;
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

.btn-primary:hover,
.btn-secondary:hover {
    transform: scale(1.1);
}

.btn-danger {
    background-color: #dc3545;
    color: white;
}

.btn-danger:hover {
    background-color: #c82333;
}

/* 삭제 버튼 스타일 */
.cart-trashcanBtn {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0; /* 내부 여백 제거 */
    background-color: #dc3545;
    color: white;
    border-radius: 4px;
    cursor: pointer;
}

.cart-trashcanBtn .mdi-delete {
    font-size: 24px;
    margin: 0; /* 아이콘의 여백을 제거 */
}

/* 페이지네이션 스타일 */
.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
}

.pagination-btn {
    padding: 10px 20px;
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

.empty_login_data {
    position: absolute;
    top: 40%; /* 조금 위로 올림 */
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    padding: 50px; /* 여백을 살짝 늘림 */
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 350px; /* 필요에 따라 너비 조정 */
}

.empty_login_data h1 {
    margin-bottom: 20px;
    color: #343a40;
    font-size: 1.8rem; /* 글자 크기 키움 */
    font-weight: bold;
}

.empty_login_data p {
    margin-bottom: 20px;
    color: #6c757d;
    font-size: 1.2rem; /* 본문 글자 크기 조정 */
}

.empty_login_data .btn {
    font-size: 1.1rem; /* 버튼 글자 크기 조정 */
    padding: 10px 20px;
}

/* 반응형 디자인 */
@media (max-width: 1200px) {
    .cart-card {
        padding: 30px;
    }

    .header-row,
    .cart-item-row {
        font-size: 16px;
        padding: 15px 0;
    }

    .btn,
    .pagination-btn {
        padding: 8px 16px;
        font-size: 14px;
    }

    .cart-item-row .col {
        padding: 0 15px;
    }
}

@media (max-width: 768px) {
    .cart-card {
        padding: 20px;
    }

    .header-row,
    .cart-item-row {
        font-size: 14px;
        padding: 10px 0;
    }

    .btn,
    .pagination-btn {
        padding: 6px 12px;
        font-size: 12px;
    }

    .cart-item-row .col {
        padding: 0 10px;
    }
}
</style>
