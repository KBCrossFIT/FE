<template>
    <header class="header">
        <!-- 로고 -->
        <div class="logoBox" @click="navigateToHome()">
            <img src="/src/assets/img/LogoMVP2.png" alt="ProPortFolio Logo" class="logo-img" />
        </div>

        <div
            class="menu-container"
            @mouseover="showDropdown = true"
            @mouseleave="showDropdown = false"
        >
            <!-- 메뉴 -->
            <nav>
                <div class="menu">
                    <span class="menu-item">포트폴리오</span>
                    <span class="menu-item">금융상품</span>
                    <span class="menu-item">핀테인먼트</span>
                    <span class="menu-item">투자성향</span>
                </div>
            </nav>
            <!-- 드롭다운 메뉴 -->
            <div v-if="showDropdown" class="dropdown">
                <div class="dropdown-container">
                    <div class="dropdown-section">
                        <ul class="inn">
                            <li
                                class="in"
                                :class="{ active: isActive('/my-portfolio') }"
                                @click="$router.push('/my-portfolio')"
                            >
                                나의 포트폴리오
                            </li>
                            <li
                                class="in"
                                :class="{ active: isActive('/make-portfolio') }"
                                @click="$router.push('/make-portfolio')"
                            >
                                포트폴리오 만들기
                            </li>
                            <li
                                class="in"
                                :class="{ active: isActive('/cart') }"
                                @click="$router.push('/cart')"
                            >
                                장바구니
                            </li>
                        </ul>
                    </div>

                    <div class="dropdown-section">
                        <ul class="inn">
                            <li
                                class="in"
                                :class="{ active: isActive('/products/deposit') }"
                                @click="navigateToProductList('deposit')"
                            >
                                예금
                            </li>
                            <li
                                class="in"
                                :class="{ active: isActive('/products/saving') }"
                                @click="navigateToProductList('saving')"
                            >
                                적금
                            </li>
                            <li
                                class="in"
                                :class="{ active: isActive('/products/bond') }"
                                @click="navigateToProductList('bond')"
                            >
                                채권
                            </li>
                            <li
                                class="in"
                                :class="{ active: isActive('/products/fund') }"
                                @click="navigateToProductList('fund')"
                            >
                                펀드
                            </li>
                            <li
                                class="in"
                                :class="{ active: isActive('/products/stock') }"
                                @click="navigateToProductList('stock')"
                            >
                                주식
                            </li>
                        </ul>
                    </div>

                    <div class="dropdown-section">
                        <ul class="inn">
                            <li
                                v-for="item in fintainmentItems"
                                :key="item.route"
                                class="in"
                                :class="{ active: $route.path === item.route }"
                                @click="navigateTo(item.route)"
                            >
                                {{ item.text }}
                            </li>
                        </ul>
                    </div>

                    <div class="dropdown-section">
                        <ul class="inn">
                            <li
                                class="in"
                                :class="{ active: isActive('/my-investment-analyze') }"
                                @click="$router.push('/my-investment-analyze')"
                            >
                                나의 투자성향
                            </li>
                            <li
                                class="in"
                                :class="{ active: isActive('/investment-test-start') }"
                                @click="$router.push('/investment-test-start')"
                            >
                                투자성향 분석하기
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- 로그인/로그아웃 -->
        <div class="user-controls">
            <template v-if="isLoggedIn">
                <div class="profile-info">
                    <button class="usernames" @click="navigateToProfile">
                        <i class="fa-solid fa-user-tie"></i>
                        <span class="username">{{ userProfile.username }}</span>
                    </button>
                    <button class="logout-btn" @click.stop="handleLogout">로그아웃</button>
                </div>
            </template>

            <template v-else>
                <div class="nonLogin">
                    <button class="login-btn" @click="navigateToLogin">
                        <i class="fa-solid fa-key"></i> 로그인
                    </button>
                    <button class="signup-btn" @click="navigateToSignup">회원가입</button>
                </div>
            </template>
        </div>
    </header>
</template>

<script>
import { useCookies } from 'vue3-cookies';
import instance from '@/api';

export default {
    name: 'Header',
    data() {
        return {
            isLoggedIn: false,
            userProfile: {
                username: '',
            },
            showDropdown: false,
            fintainmentItems: [
                { text: '인플루언서', route: '/influencer' },
                { text: '유튜브', route: '/youtube' },
                { text: '뉴스', route: '/news' },
            ],
        };
    },
    methods: {
        navigateToHome() {
            this.$router.push('/');
        },
        navigateToLogin() {
            this.$router.push('/login');
        },
        navigateToSignup() {
            this.$router.push('/signup');
        },
        navigateToProfile() {
            this.$router.push('/myPage');
        },
        navigateToProductList(category) {
            this.$router.push({
                name: 'Products',
                params: { category },
                query: { page: 1, pageSize: 10 },
            });
        },
        navigateTo(route) {
            this.$router.push(route);
        },
        async handleLogout() {
            const { cookies } = useCookies();

            // 로그아웃 처리
            // await instance.post('/member/logout');

            // Clear cookies and local storage
            cookies.remove('Authorization');
            cookies.remove('Refresh-Token');
            localStorage.removeItem('user');

            // Update user profile state
            await this.updateUserProfile();
            this.navigateToHome();
        },
        updateUserProfile() {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser) {
                this.isLoggedIn = true;
                this.userProfile.username = storedUser.username;
            } else {
                this.isLoggedIn = false;
                this.userProfile.username = '';
            }
        },
        isActive(route) {
            return this.$route.path === route;
        },
    },
    watch: {
        $route() {
            this.updateUserProfile();
        },
    },
    mounted() {
        this.updateUserProfile();
    },
};
</script>

<style scoped>
/* 헤더 스타일 */
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #ffffff;
    color: rgb(10, 1, 1);
    width: 100%;
    height: 120px;
    border-bottom: 1px solid #ddd;
    position: relative;
    box-sizing: border-box;
    z-index: 10;
}

.logoBox {
    z-index: 11;
}

.logoBox:hover {
    cursor: pointer;
}

.logo-img {
    width: 201px;
    height: auto;
    position: relative;
    top: 5px;
    left: 38%;
}

.menu-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 0;
    height: 100%;
    width: 100%;
}

nav {
    display: flex;
    align-items: center;
    height: 100%;
    width: 55%;
}

.menu {
    display: flex;
    justify-content: center;
    /* gap: 120px; */
    align-items: center;
    width: 100%;
}

.menu-item {
    font-size: 24px;
    font-weight: bold;
    flex-basis: 20%;
    text-align: center;
}

.menu-item:hover {
    color: #3961e4;
}

.dropdown {
    display: flex;
    justify-content: center;
    position: absolute;
    width: 100%;
    top: 100%;
    background-color: white;
    padding: 10px 0;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
    z-index: 10;
}

.dropdown-container {
    display: flex;
    justify-content: space-around;
    max-width: 1200px;
    width: 55%;
    /* position: relative;
    left: 5px; */
}

.dropdown-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 10px;
    flex-basis: 20%;
    border-left: 1px solid #ddd;
    flex-grow: 1;
    flex-basis: 0;
    gap: 20px;
}

.dropdown-section:first-child {
    border-left: none;
}

.dropdown-section ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.dropdown-section ul li {
    font-weight: bold;
    padding: 10px 15px;
    cursor: pointer;
    transition: background-color 0.2s ease, color 0.2s ease;
    border-radius: 4px;
    text-align: center;
    width: 100%;
}

.dropdown-section ul li:hover {
    background-color: #f0f0f0;
}

.dropdown-section ul li.active {
    color: #2d6a4f;
    font-weight: bold;
    background-color: #e9f9f5;
}

.inn {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

/* 모든 버튼의 기본 스타일 */
button {
    font-size: 16px; /* 모든 버튼의 텍스트 크기를 일관되게 설정 */
    padding: 8px 16px; /* 텍스트 크기에 맞게 패딩 설정 */
    border-radius: 5px;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s;
}

.user-controls {
    display: flex;
    align-items: center;
    gap: 10px;
    position: absolute;
    right: 4%;
    width: 200px;
    justify-content: flex-end;
}

.profile-info,
.nonLogin {
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    justify-content: flex-end;
}

.profile-info button,
.login-btn,
.signup-btn,
.logout-btn {
    padding: 8px 12px;
    height: 40px;
    font-size: 16px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s;
}

.profile-info button:hover,
.login-btn:hover,
.signup-btn:hover,
.logout-btn:hover {
    background-color: #7bd5c3;
    color: white;
}

.username {
    font-size: 16px;
}
</style>