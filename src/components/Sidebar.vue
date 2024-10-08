<template>
    <div class="uiNavAside" ref="sidebar">
        <ul class="nav-aside">
            <div class="button-container">
                <!-- 포트폴리오 메뉴 -->
                <SidebarMenu1
                    :activeDropdown="activeDropdown"
                    :portfolios="portfolios"
                    @toggleDropdown="toggleDropdown"
                    @goToCreatePortfolio="goToCreatePortfolio"
                />

                <!-- 장바구니 메뉴 -->
                <SidebarMenu2
                    :activeDropdown="activeDropdown"
                    :cart="cart"
                    @toggleDropdown="toggleDropdown"
                    @removeFromCart="removeFromCart"
                />

                <!-- 최근 본 상품 메뉴 -->
                <SidebarMenu3 :activeDropdown="activeDropdown" @toggleDropdown="toggleDropdown" />
            </div>
        </ul>
    </div>
</template>

<script>
import SidebarMenu1 from './sideBar/PortfolioSection.vue';
import SidebarMenu2 from './sideBar/CartSection.vue';
import SidebarMenu3 from './sideBar/RecentProductsSection.vue';
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
    name: 'SideBar',
    components: {
        SidebarMenu1,
        SidebarMenu2,
        SidebarMenu3,
    },
    setup() {
        const portfolios = ref([
            { name: '포트폴리오 1', returns: 10.3, risk: 8.74 },
            { name: '포트폴리오 2', returns: -3.0, risk: 4.0 },
            { name: '포트폴리오 3', returns: 10.3, risk: 8.74 },
        ]);

        const cart = ref([
            { name: '상품 1', price: 10000, quantity: 2 },
            { name: '상품 2', price: 20000, quantity: 1 },
        ]);

        const activeDropdown = ref(null);
        const router = useRouter();
        const sidebar = ref(null);

        const toggleDropdown = (menuNumber) => {
            if (activeDropdown.value === menuNumber) {
                activeDropdown.value = null;
            } else {
                activeDropdown.value = menuNumber;
            }
        };

        const goToCreatePortfolio = () => {
            console.log('포트폴리오 구성하기 버튼 클릭됨');
            router.push('/make-portfolio');
        };

        const removeFromCart = (item) => {
            cart.value = cart.value.filter((cartItem) => cartItem !== item);
        };

        const handleClickOutside = (event) => {
            if (sidebar.value && !sidebar.value.contains(event.target)) {
                activeDropdown.value = null;
            }
        };

        onMounted(() => {
            document.addEventListener('click', handleClickOutside);
        });

        onUnmounted(() => {
            document.removeEventListener('click', handleClickOutside);
        });

        return {
            portfolios,
            cart,
            activeDropdown,
            toggleDropdown,
            goToCreatePortfolio,
            removeFromCart,
            sidebar,
        };
    },
};
</script>

<style scoped>
.uiNavAside {
    position: fixed;
    right: 0;
    top: 0;
    width: 90px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    z-index: 9999;
    border-radius: 5px;
    padding: 10px;
    background-color: rgb(233, 233, 233);
}

.nav-aside {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.button-container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.nav-aside li {
    text-align: center;
    flex-grow: 0;
    margin: 0;
}

.nav-aside a {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    padding: 10px;
    text-decoration: none;
    background-color: #e2dfdf;
    width: 100%;
    border-radius: 5px;
    box-sizing: border-box;
}

.nav-aside li:hover a {
    background-color: #575757;
}

.menu-text {
    font-size: 0.9rem;
    margin-top: 5px;
}

.dropdown-content {
    position: absolute;
    top: 0;
    right: 100%; /* Change from left to right for opening to the left */
    background-color: #fff;
    padding: 10px;
    width: 220px;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.cart-dropdown {
    padding: 10px;
}

.section-title {
    font-size: 1.4rem;
    color: #2d6a4f;
}

.empty-cart {
    text-align: center;
    font-size: 1.1rem;
    color: #777;
}

.cart-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
}

.cart-table th,
.cart-table td {
    padding: 12px;
    border-bottom: 1px solid #ddd;
    font-size: 0.9rem;
}

.cart-table th {
    background-color: #f0f0f0;
    color: #333;
}

.cart-table tr:hover {
    background-color: #f9f9f9;
}

.cart-trashcanBtn {
    background-color: #e74c3c;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 3px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.cart-trashcanBtn:hover {
    background-color: #c0392b;
}
</style>
