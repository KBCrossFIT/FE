<template>
    <li class="menu2" @click="toggleDropdown(2)">
        <a href="javascript:void(0)" class="sidebar-link">
            <i class="fas fa-shopping-cart icon"></i>
            <!-- <span class="menu-text">장바구니</span> -->
            <span v-if="cart.length > 0" class="item-count">{{ cart.length }}</span>
        </a>
        <div
            v-if="activeDropdown === 2"
            :class="['dropdown-content', { active: activeDropdown === 2 }]"
        >
            <div class="cart-dropdown">
                <h3 class="section-title">장바구니</h3>
                <div v-if="cart.length === 0" class="empty-cart">장바구니가 비어 있습니다.</div>
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

        const totalPages = computed(() => Math.ceil(cart.value.length / itemsPerPage));
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
    width: 100%; /* Full width within the sidebar */
    height: 5vh; /* Maintain the height ratio for each button */
    position: relative; /* Position for item count */
    white-space: nowrap; /* Prevent text from wrapping */
    overflow: hidden; /* Hide overflowed text */
    text-overflow: ellipsis; /* Add ellipsis for overflowed text */
}

.sidebar-link:hover {
    background-color: #645f5f;
}

.dropdown-content {
    position: absolute;
    left: -300px;
    top: 0;
    background-color: #f8f8f8; /* Changed to a lighter color for contrast */
    color: #333; /* Darker text for better readability */
    padding: 10px;
    width: 300px;
    height: auto; /* Auto height for dynamic content */
    border-radius: 5px;
    overflow-y: auto;
    z-index: 5555;
    transform: translateX(-100%);
    transition: transform 0.5s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Added shadow for depth */
}

.dropdown-content.active {
    transform: translateX(0);
}

.cart-dropdown {
    padding: 20px;
}

.section-title {
    font-size: 1.4rem; /* Slightly larger for emphasis */
    margin-bottom: 15px; /* Reduced margin for better spacing */
    color: #2d6a4f;
    border-bottom: 2px solid #2d6a4f; /* Added underline for separation */
    padding-bottom: 10px; /* Padding for spacing */
}

.empty-cart {
    text-align: center; /* Center the message */
    font-size: 1.1rem; /* Increased font size for visibility */
    color: #777; /* Lighter color for empty state */
    margin-top: 20px; /* Spacing above */
}

.cart-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px; /* Space above the table */
}

.cart-table th,
.cart-table td {
    padding: 12px; /* Increased padding for readability */
    border-bottom: 1px solid #ddd;
    font-size: 0.9rem;
    text-align: left;
}

.item-name {
    color: #2d6a4f;
}

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
    justify-content: space-between; /* Align buttons on both sides */
    margin-top: 20px;
}

.action-buttons button {
    background-color: #2d6a4f;
    color: white;
    border: none;
    padding: 10px 15px; /* Adjusted padding for smaller buttons */
    border-radius: 5px;
    cursor: pointer;
    width: 48%; /* Set button width to 48% for spacing */
    transition: background-color 0.3s; /* Smooth transition for hover effect */
}

.action-buttons button:hover {
    background-color: #1b4633;
}

.menu-text {
    font-size: 0.6rem;
    white-space: nowrap; /* Prevent text from wrapping */
    overflow: hidden; /* Hide overflowed text */
    text-overflow: ellipsis; /* Add ellipsis for overflowed text */
}

.icon {
    position: relative; /* Position for item count */
    font-size: 24px; /* Adjust icon size if needed */
}
</style>
