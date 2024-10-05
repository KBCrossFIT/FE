<template>
  <li class="menu2" @click="toggleDropdown(2)">
    <a href="javascript:void(0)" class="sidebar-link">
      <i class="fas fa-shopping-cart"></i>
      <span class="menu-text">장바구니</span>
      <span v-if="cart.length > 0" class="item-count">{{ cart.length }}</span>
    </a>
    <div
      v-if="activeDropdown === 2"
      :class="['dropdown-content', { active: activeDropdown === 2 }]"
    >
      <div class="cart-dropdown">
        <h3 class="section-title">장바구니</h3>
        <div v-if="cart.length === 0" class="empty-cart">
          장바구니가 비어 있습니다.
        </div>
        <table v-else class="cart-table">
          <thead>
            <tr>
              <th>상품명</th>
              <th>가격</th>
              <th>수량</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in paginatedCart" :key="index">
              <td class="item-name">{{ item.name }}</td>
              <td class="item-price">{{ item.price }}원</td>
              <td class="item-quantity">{{ item.quantity }}</td>
              <td>
                <button class="cart-trashcanBtn" @click="removeFromCart(item)">
                  삭제
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <v-pagination
          v-model="currentPage"
          :length="totalPages"
          @input="updatePagination"
        ></v-pagination>
        <div class="action-buttons">
          <button @click="goToCompare">상품 비교해보기</button>
          <button @click="goToMakePortfolio">포트폴리오 구성하기</button>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

export default {
  props: ['activeDropdown', 'cartItems'],
  setup(props, { emit }) {
    const cart = ref([
      { id: 1, name: '상품 A', price: 5000, quantity: 1 },
      { id: 2, name: '상품 B', price: 3000, quantity: 2 },
    ]);

    const currentPage = ref(1);
    const itemsPerPage = 5;

    const totalPages = computed(() =>
      Math.ceil(cart.value.length / itemsPerPage)
    );
    const paginatedCart = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      return cart.value.slice(start, start + itemsPerPage);
    });

    const removeFromCart = (item) => {
      const index = cart.value.indexOf(item);
      if (index > -1) {
        cart.value.splice(index, 1);
      }
    };

    const updatePagination = (page) => {
      currentPage.value = page;
    };

    const toggleDropdown = (menuNumber) => {
      emit('toggleDropdown', menuNumber);
    };

    const router = useRouter();

    const goToCompare = () => {
      router.push('/product-comparison');
    };

    const goToMakePortfolio = () => {
      router.push('/make-portfolio');
    };

    return {
      cart,
      currentPage,
      paginatedCart,
      totalPages,
      removeFromCart,
      updatePagination,
      toggleDropdown,
      goToCompare,
      goToMakePortfolio,
    };
  },
};
</script>

<style scoped>
.sidebar-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  padding: 15px;
  text-decoration: none;
  background-color: #575757;
  border-radius: 5px;
  margin-bottom: 5px;
  width: 100%;
  position: relative; /* Added to position the item count */
}

.sidebar-link:hover {
  background-color: #645f5f;
}

.dropdown-content {
  position: absolute;
  left: -300px;
  top: 0;
  background-color: #bab3b3;
  color: white;
  padding: 10px;
  width: 300px;
  height: 320px;
  border-radius: 5px;
  overflow-y: auto;
  z-index: 5555;
  transform: translateX(-100%);
  transition: transform 0.5s ease;
}

.dropdown-content.active {
  transform: translateX(0);
}

.cart-dropdown {
  padding: 20px;
}

.section-title {
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: #2d6a4f;
}

.cart-table {
  width: 100%;
  border-collapse: collapse;
}

.cart-table th,
.cart-table td {
  padding: 8px;
  border-bottom: 1px solid #ddd;
  font-size: 0.9rem;
  text-align: left;
}

.item-name {
  color: #2d6a4f;
}

/* 아이콘 우상단 개수 표시 스타일 */
.item-count {
  position: absolute;
  top: 5px; /* Adjust this value to position it correctly */
  right: 5px; /* Adjust this value to position it correctly */
  background-color: red; /* Background color for visibility */
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.8rem; /* Font size for the count */
}

.action-buttons {
  display: flex;
  justify-content: space-between; /* 버튼을 양쪽에 정렬 */
  margin-top: 20px;
}

.action-buttons button {
  background-color: #2d6a4f;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  width: 48%; /* 버튼의 너비를 48%로 설정해 여백을 맞춤 */
}

.action-buttons button:hover {
  background-color: #1b4633;
}

.menu-text {
  font-size: 0.6rem;
}
</style>
