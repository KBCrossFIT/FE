<template>
    <div class="Cart-container">
        <v-progress-circular v-if="loading" indeterminate></v-progress-circular>
        <div v-else-if="cart.length === 0" class="empty-cart">
            <h1>장바구니가 비어 있습니다.</h1>
            로그인하고 금융상품을 담아보세요.
            <br>
            <router-link v-if="!authStore.isAuthenticated" to="/login" class="sidebar-link">
                <i class="fas fa-sign-in-alt icon"></i>
                <span class="menu-text">로그인하러 가기</span>
            </router-link>
        </div>
        <v-card v-else>
            <v-card-title class="d-flex justify-space-between align-center">
                <h2 class="text-h5">장바구니 목록</h2>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-row class="header-row">
                    <v-col class="text-h6">선택</v-col>
                    <v-col class="text-h6">상품 종류</v-col>
                    <v-col class="text-h6">제공자</v-col>
                    <v-col class="text-h6">상품 이름</v-col>
                    <v-col class="text-h6">기대 수익률</v-col>
                    <v-col class="text-h6"></v-col>
                </v-row>
                <v-divider></v-divider>

                <div v-for="item in paginatedCart" :key="item.cartId" class="cart-item">
                    <v-card elevation="2" class="cart-item-card mb-2">
                        <v-card-text>
                            <v-row>
                                <v-col>
                                    <v-checkbox
                                        :value="{
                                            productId: item.productId,
                                            productType: item.productType,
                                        }"
                                        v-model="selectedProducts"
                                        @change="handleSelectionChange(item)"
                                        class="product-checkbox"
                                        color="indigo"
                                    ></v-checkbox>
                                </v-col>
                                <v-col>
                                    <span>
                                        <span v-if="item.productType === 'S'">
                                            {{ item.rsrvType === 'S' ? '적금' : '예금' }}
                                        </span>
                                        <span v-else-if="item.productType === 'B'">채권</span>
                                        <span v-else-if="item.productType === 'F'">펀드</span>
                                        <span v-else>기타</span>
                                    </span>
                                </v-col>
                                <v-col>{{ item.provider }}</v-col>
                                <v-col>{{ item.productName }}</v-col>
                                <v-col>{{ item.expectedReturn }}%</v-col>
                                <v-col>
                                    <v-btn
                                        class="cart-trashcanBtn"
                                        @click="removeFromCart(item.cartId)"
                                        icon
                                    >
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </div>

                <!-- 페이지네이션 컨트롤 -->
                <div class="pagination" v-if="totalPages > 1">
                    <v-btn
                        @click="currentPage--"
                        :disabled="currentPage === 1"
                        icon
                    >
                        <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>
                    <span>{{ currentPage }} / {{ totalPages }}</span>
                    <v-btn
                        @click="currentPage++"
                        :disabled="currentPage >= totalPages"
                        icon
                    >
                        <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                </div>

                <v-btn class="cart-Btn-Gotocompare" @click="goToCompare" color="primary"
                    >상품 비교해보기
                </v-btn>
                <v-btn class="cart-Btn-GotoPortfolio" @click="goToMakePortfolio" color="secondary"
                    >포트폴리오 구성하기
                </v-btn>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/store/modules/cart';
import { getCartList, deleteCartItem } from '@/api/cartApi';
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

        const updatePagination = (page) => {
            if (page >= 1 && page <= totalPages.value) {
                currentPage.value = page;
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

        const handleSelectionChange = (item) => {
            console.log('선택된 상품 목록:', selectedProducts.value);
        };

        return {
            cart,
            removeFromCart,
            currentPage,
            totalPages,
            paginatedCart,
            updatePagination,
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
.Cart-container {
    padding: 20px;
}

.empty-cart {
    text-align: center;
    margin: 20px 0;
    color: #ff5722;
    font-weight: bold;
}

.header-row {
    font-weight: bold;
    margin-bottom: 10px; /* 간격 추가 */
}

.cart-item {
    display: flex;
    flex-direction: column;
    padding: 10px 0;
    margin-bottom: 15px; /* 각 카테고리 간격 추가 */
}

.cart-item-card {
    padding: 15px;
    transition: box-shadow 0.2s;
}

.cart-item-card:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.product-type-title {
    font-weight: bold;
    margin-bottom: 8px; /* 제목과 내용 간격 추가 */
}

.item-details {
    margin-bottom: 10px; /* 세부 정보와 버튼 간격 추가 */
}

.cart-trashcanBtn {
    flex: 0 0 auto;
    margin-left: auto;
}

.Cart-Btn-Set {
    display: flex;
    justify-content: space-between;
    margin-top: 20px; /* 버튼 간격 추가 */
}
</style>
