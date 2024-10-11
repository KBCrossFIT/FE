<template>
  <div class="Cart-container">
    <div v-if="loading" class="loading-indicator">Loading...</div>
    <div v-else-if="cart.length === 0" class="empty-cart">
      장바구니가 비어 있습니다.
    </div>
    <div v-else class="cart-card">
      <div class="cart-title">
        <h2>장바구니 목록</h2>
      </div>
      <hr />
      <div class="cart-text">
        <div 
          v-for="item in paginatedCart" 
          :key="item.cartID" 
          class="cart-item"
        >
          <div class="cart-row">
            <button
              class="cart-checkBtn">
              체크
            </button>
            <p>상품 종류: {{ getProductType(item.productType) }}</p>
            <p>제공자: {{ item.provider }}</p>
            <p>상품 이름: {{ item.productName }}</p>
            <p>기대 수익률: {{ item.expectedReturn }}%</p>
            <p>적금 여부: {{ item.rsrvType === 'S' ? '적금' : '예금' }}</p>
            <button
              class="cart-trashcanBtn"
              @click="removeFromCart(item.cartID)"
            >
              삭제
            </button>
          </div>
          <hr />
          <div v-if="item.showDetails" class="item-details">
            <p>추가 세부정보: {{ item.additionalInfo }}</p>
          </div>
        </div>

        <div class="pagination">
          <button @click="updatePagination(currentPage - 1)" :disabled="currentPage === 1">이전</button>
          <span>{{ currentPage }} / {{ totalPages }}</span>
          <button @click="updatePagination(currentPage + 1)" :disabled="currentPage === totalPages">다음</button>
        </div>
      </div>

      <div class="Cart-Btn-Set">
        <button class="cart-Btn-Gotocompare" @click="goToCompare">상품 비교해보기</button>
        <button class="cart-Btn-GotoPortfolio" @click="goToMakePortfolio">포트폴리오 구성하기</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getCartList, deleteCartItem } from '@/api/cartApi';

export default {
  name: 'Cart',
  setup() {
    const router = useRouter();
    const cart = ref([]);
    const itemsPerPage = 5;
    const currentPage = ref(1);
    const loading = ref(true);
    const selectedItems = ref([]);

    onMounted(async () => {
      try {
        cart.value = await getCartList();
        cart.value.forEach((item) => {
          item.showDetails = false;
        });
      } catch (error) {
        console.error('Failed to fetch cart list:', error);
        alert('장바구니 정보를 불러오는 중 오류가 발생했습니다.');
      } finally {
        loading.value = false;
      }
    });

    const totalPages = computed(() =>
      Math.ceil(cart.value.length / itemsPerPage)
    );

    const paginatedCart = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      return cart.value.slice(start, start + itemsPerPage);
    });

    const removeFromCart = async (cartID) => {
      try {
        await deleteCartItem(cartID);
        cart.value = cart.value.filter((item) => item.cartID !== cartID);
      } catch (error) {
        console.error('Failed to remove item from cart:', error);
        alert('장바구니에서 항목을 제거하는 중 오류가 발생했습니다.');
      }
    };

    const updatePagination = (page) => {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
      }
    };

    const goToCompare = () => {
      router.push('/product-comparison');
    };

    const goToMakePortfolio = () => {
      router.push('/make-portfolio');
    };

    const getProductType = (type) => {
      switch (type) {
        case 'S':
          return '예적금';
        case 'B':
          return '채권';
        case 'F':
          return '펀드';
        default:
          return '기타';
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
      getProductType,
      selectedItems,
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

.cart-item {
  display: flex;
  flex-direction: column;
  padding: 5px 0; /* 기존 10px에서 줄임 */
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.cart-item:hover {
  background-color: #f0f0f0;
  transform: scale(1.02);
}

.cart-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-wrap: wrap; /* 줄 바꿈 허용 */
}

.cart-row > p {
  flex: 1 1 100px; /* 항목 크기 조정 */
  margin: 5px;
}

.cart-checkBtn,
.cart-trashcanBtn {
  flex: 0 0 auto;
  margin-left: 5px;
}

.loading-indicator {
  text-align: center;
  font-size: 1.5em;
  margin: 20px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  margin: 0 10px;
}

.Cart-Btn-Set {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

/* Additional styles can be added as needed */
</style>