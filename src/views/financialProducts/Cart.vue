<template>
<<<<<<< HEAD
    <div class="Cart-container">
        <v-progress-circular v-if="loading" indeterminate></v-progress-circular>
        <div v-else-if="cart.length === 0" class="empty-cart">
            장바구니가 비어 있습니다.
            <router-link to="/login" class="sidebar-link">
                <i class="fas fa-sign-in-alt icon"></i>
                <span class="menu-text">로그인</span>
            </router-link>
=======
  <div class="Cart-container">
    <v-progress-circular v-if="loading" indeterminate></v-progress-circular>
    <div v-else-if="cart.length === 0" class="empty-cart">
      장바구니가 비어 있습니다.
      <router-link to="/login" class="sidebar-link">
        <i class="fas fa-sign-in-alt icon"></i>
        <span class="menu-text">로그인</span>
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
                    :value="{ productId: item.productId, productType: item.productType }"
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
>>>>>>> fc7414edef10c73cabd5689dbc2219b8fb77a97d
        </div>
        <v-card v-else>
            <v-card-title class="d-flex justify-space-between align-center">
                <h2 class="text-h5">장바구니 목록</h2>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-row class="header-row">
                    <v-col class="text-h6">상품 종류</v-col>
                    <v-col class="text-h6">제공자</v-col>
                    <v-col class="text-h6">상품 이름</v-col>
                    <v-col class="text-h6">기대 수익률</v-col>
                    <v-col class="text-h6"></v-col>
                    <!-- For the delete button -->
                </v-row>
                <v-divider></v-divider>

<<<<<<< HEAD
                <div v-for="item in paginatedCart" :key="item.cartId" class="cart-item">
                    <v-card elevation="2" class="cart-item-card mb-2">
                        <v-card-text>
                            <v-row>
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
                <v-pagination
                    v-model="currentPage"
                    :length="totalPages"
                    @input="updatePagination"
                    class="mt-4"
                ></v-pagination>
            </v-card-text>

            <div class="Cart-Btn-Set mt-4">
                <v-btn class="cart-Btn-Gotocompare" @click="goToCompare" color="primary"
                    >상품 비교해보기</v-btn
                >
                <v-btn class="cart-Btn-GotoPortfolio" @click="goToMakePortfolio" color="secondary"
                    >포트폴리오 구성하기</v-btn
                >
            </div>
        </v-card>
    </div>
=======
      <div class="Cart-Btn-Set mt-4">
        <v-btn
          class="cart-Btn-Gotocompare"
          @click="goToCompare"
          color="primary"
        >
          상품 비교해보기
        </v-btn>
        <v-btn
          class="cart-Btn-GotoPortfolio"
          @click="goToMakePortfolio"
          color="secondary"
        >
          포트폴리오 구성하기
        </v-btn>
      </div>
    </v-card>
  </div>
>>>>>>> fc7414edef10c73cabd5689dbc2219b8fb77a97d
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/store/modules/cart';
import { getCartList, deleteCartItem } from '@/api/cartApi';

export default {
<<<<<<< HEAD
    name: 'Cart',
    setup() {
        const router = useRouter();
        const cart = ref([]);
        const itemsPerPage = 5;
        const currentPage = ref(1);
        const loading = ref(true); // 로딩 상태

        // 초기 장바구니 데이터 가져오기
        onMounted(async () => {
            try {
                cart.value = await getCartList(); // 장바구니 데이터 가져오기
                if (cart.value == null) {
                    alert('장바구니');
                }
                cart.value.forEach((item) => {
                    item.showDetails = false; // 세부 정보의 초기 상태 설정
                });
            } catch (error) {
                console.error('장바구니 목록을 가져오는 데 실패했습니다:', error);
                alert('장바구니 정보를 불러오는 중 오류가 발생했습니다.');
            } finally {
                loading.value = false; // 가져오기 후 로딩 중지
            }
        });

        const totalPages = computed(() => Math.ceil(cart.value.length / itemsPerPage)); // 총 페이지 수 계산

        const paginatedCart = computed(() => {
            const start = (currentPage.value - 1) * itemsPerPage; // 현재 페이지에 따른 시작 인덱스
            return cart.value.slice(start, start + itemsPerPage); // 페이지에 맞게 슬라이스
        });

        const removeFromCart = async (cartId) => {
            try {
                console.log(cartId);
                await deleteCartItem(cartId); // 장바구니 항목 삭제
                cart.value = cart.value.filter((item) => item.cartId !== cartId); // 삭제된 항목 필터링
            } catch (error) {
                console.error('장바구니에서 항목을 제거하는 데 실패했습니다:', error);
                alert('장바구니에서 항목을 제거하는 중 오류가 발생했습니다.');
            }
        };

        const updatePagination = (page) => {
            currentPage.value = page; // 페이지 업데이트
        };

        const goToCompare = () => {
            router.push('/productcomparison'); // 상품 비교 페이지로 이동
        };

        const goToMakePortfolio = () => {
            router.push('/make-portfolio'); // 포트폴리오 구성 페이지로 이동
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
=======
  name: 'Cart',
  setup() {
    const router = useRouter();
    const cart = ref([]);
    const itemsPerPage = 5;
    const currentPage = ref(1);
    const loading = ref(true);
    const selectedProducts = ref([]);
    const cartStore = useCartStore();

    onMounted(async () => {
      try {
        cart.value = await getCartList();
        cart.value.forEach((item) => {
          item.showDetails = false;
        });
      } catch (error) {
        console.error('장바구니 목록을 가져오는 데 실패했습니다:', error);
        alert('장바구니 정보를 불러오는 중 오류가 발생했습니다.');
      } finally {
        loading.value = false;
      }
    });

    const totalPages = computed(() => Math.ceil(cart.value.length / itemsPerPage));
    const paginatedCart = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      return cart.value.slice(start, start + itemsPerPage);
    });

    const removeFromCart = async (cartId) => {
      try {
        await deleteCartItem(cartId);
        cart.value = cart.value.filter((item) => item.cartId !== cartId);
      } catch (error) {
        console.error('장바구니에서 항목을 제거하는 데 실패했습니다:', error);
        alert('장바구니에서 항목을 제거하는 중 오류가 발생했습니다.');
      }
    };

    const updatePagination = (page) => {
      currentPage.value = page;
    };

    const goToCompare = () => {
      router.push('/productcomparison');
    };

    const goToMakePortfolio = () => {
      if (selectedProducts.value.length === 0) {
        alert('포트폴리오를 구성할 상품을 선택하세요.');
        return;
      }

      const productIds = selectedProducts.value.map(item => item.productId);
      const productTypes = selectedProducts.value.map(item => item.productType);

      // MakePortfolio 페이지로 이동
        router.push({
          name: 'MakePortfolio',
          query: { productIds: JSON.stringify(productIds), productTypes: JSON.stringify(productTypes)}
        });
    };

    const handleSelectionChange = (item) => {
      if (selectedProducts.value.length > 3) {
        alert('최대 3개의 상품만 선택할 수 있습니다.');
        selectedProducts.value = selectedProducts.value.filter(
          (product) => product.productId !== item.productId
        );
      } else {
        console.log('선택된 상품 목록:', selectedProducts.value);
      }
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
    };
  },
};
</script>
>>>>>>> fc7414edef10c73cabd5689dbc2219b8fb77a97d
