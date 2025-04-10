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
                                v-for="item in portfolioItems"
                                :key="item.route"
                                class="in"
                                :class="{ active: $route.path === item.route }"
                                @click="navigateTo(item.route)"
                            >
                                {{ item.label }}
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
                                @click="navigateTo('/my-investment-analyze')"
                            >
                                나의 투자성향
                            </li>
                            <li
                                class="in"
                                :class="{ active: isActive('/investment-test-start') }"
                                @click="navigateTo('/investment-test-start')"
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
                    <div class="usernames">
                        <i class="fa-solid fa-user-tie"></i>
                        <span class="username">{{ userProfile.username }}</span>
                    </div>
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
import axios from 'axios';
import { useCookies } from 'vue3-cookies';
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/authStore';

export default {
    name: 'Header',

    setup() {
        const router = useRouter();
        const authStore = useAuthStore();

        const navigateTo = (route) => {
            router.push(route);
        };

        return {
            navigateTo,
        };
    },

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
            portfolioItems: [
                { label: '나의 포트폴리오', route: '/my-portfolio' },
                { label: '포트폴리오 만들기', route: '/make-portfolio' },
                { label: '장바구니', route: '/cart' },
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
        async handleLogout() {
            const { cookies } = useCookies();

            cookies.remove('Authorization');
            cookies.remove('Refresh-Token');
            localStorage.removeItem('user');
            localStorage.removeItem('isTested');

            console.log('before!!!!!!!');

            await axios.post(
                'http://localhost:8080/api/member/logout',
                {},
                {
                    withCredentials: true,
                }
            );

            console.log('after!!!!!!!');

            this.updateUserProfile();
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
    min-width: 1500px;
    height: 120px;
    border-bottom: 1px solid #ddd;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    box-sizing: border-box;
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

/* 메뉴 컨테이너 */
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
    justify-content: space-around; /* 메뉴 항목 간 간격 균일 */
    align-items: center;
    width: 100%;
}

.menu-item {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    flex: 1; /* 각 항목이 같은 비율로 공간을 차지하도록 */
}

.menu-item:hover {
    color: #3961e4;
}

/* 드롭다운 */
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
}

.dropdown-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-basis: 20%;
    border-left: 1px solid #ddd;
    flex-grow: 1;
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
    width: 300px;
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
    font-size: 18px; /* 원하는 크기로 설정 */
    font-weight: bold; /* 필요 시 추가 */
}

.user .investment-test-dialog {
    background-color: white !important;
    border-radius: 8px;
}

.v-dialog > .v-overlay__content > .v-card {
    box-shadow: none;
    border: 1px solid;
}

::v-deep .v-overlay__scrim {
    backdrop-filter: blur(2px);
    background-color: rgba(255, 255, 255, 0.5) !important;
}
</style>
