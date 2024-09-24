<template>
    <header class="header">
        <div class="logoBox" @click="navigateToHome()">
            <div class="logo">ProPortFolio</div>
        </div>

        <nav>
            <v-menu v-for="(item, index) in navItems" :key="index" open-on-hover>
                <template v-slot:activator="{ props }">
                    <v-btn color="primary" v-bind="props">{{ item.title }}</v-btn>
                </template>

                <v-list>
                    <v-list-item
                        v-for="(subItem, subIndex) in item.subItems"
                        :key="subIndex"
                        @click="$router.push(subItem.link)"
                    >
                        <v-list-item-title>{{ subItem.name }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </nav>

        <div class="user-controls">
            <template v-if="isLoggedIn">
                <div class="profile-info" @click="navigateToProfile">
                    <img :src="userProfile.picture" alt="Profile Picture" class="profile-picture" />
                    <span class="username">{{ userProfile.username }}</span>
                    <button @click.stop="handleLogout">로그아웃</button>
                </div>
            </template>
            <template v-else>
                <button class="login-btn" @click="navigateToLogin">로그인</button>
                <button class="signup-btn" @click="navigateToSignup">회원가입</button>
            </template>
        </div>
    </header>
</template>

<script>
export default {
    name: 'Header',
    data() {
        return {
            isLoggedIn: false,
            userProfile: {
                username: '',
                picture: 'path/to/default/profile/pic.png',
            },
            navItems: [
                {
                    title: '포트폴리오',
                    subItems: [
                        { name: '내 포트폴리오', link: '/my-portfolio' },
                        { name: '포트폴리오 구성하기', link: '/make-portfolio' },
                    ],
                },
                {
                    title: '금융상품',
                    subItems: [
                        { name: '상품 리스트', link: '/financial-products' },
                        { name: '장바구니', link: '/cart' },
                    ],
                },
                {
                    title: 'Insight',
                    subItems: [
                        { name: '뉴스', link: '/news' },
                        { name: '유튜브', link: '/youtube' },
                        { name: '인플루언서', link: '/influencer' },
                    ],
                },
                {
                    title: 'My Investment',
                    subItems: [
                        { name: '내 투자성향 분석', link: '/my-investment-analyze' },
                        { name: '투자성향 분석하기', link: '/investment-test-start' },
                    ],
                },
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
        handleLogout() {
            localStorage.removeItem('user');
            this.updateUserProfile();
            this.navigateToHome();
        },
        updateUserProfile() {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser) {
                this.isLoggedIn = true;
                this.userProfile.username = storedUser.username;
                this.userProfile.picture = storedUser.picture || this.userProfile.picture;
            } else {
                this.isLoggedIn = false;
                this.userProfile.username = '';
                this.userProfile.picture = 'path/to/default/profile/pic.png';
            }
        },
    },
    watch: {
        $route(to, from) {
            this.updateUserProfile();
        },
    },
    mounted() {
        this.updateUserProfile();
    },
};
</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #2d6a4f;
    color: white;
    border-bottom: 2px solid #1b4332;
}

.logoBox {
    width: 200px;
    height: 65px;
}

.logo {
    font-size: 24px;
    font-weight: bold;
}

.logoBox:hover {
    cursor: pointer;
}

nav {
    display: flex;
    gap: 20px;
}

.v-btn {
    padding: 10px;
    background-color: #2d6a4f !important; /* !important를 사용하여 우선권 부여 */
    color: white;
    transition: background-color 0.1s, color 0.1s;
}

.v-btn:hover {
    background-color: #1b4332 !important; /* !important를 사용하여 우선권 부여 */
    color: white;
}

.v-list {
    background-color: #ffffff;
}

.v-list-item {
    padding: 10px;
    transition: background-color 0.1s, color 0.1s;
}

.v-list-item:hover {
    background-color: #e0e0e0;
    color: #333;
}

.user-controls {
    display: flex;
    gap: 10px;
    align-items: center;
}

.profile-info {
    display: flex;
    align-items: center;
    cursor: pointer;
}

.profile-picture {
    width: 40px; /* Adjust size as needed */
    height: 40px; /* Adjust size as needed */
    border-radius: 50%;
    margin-right: 8px;
}

.user-controls button {
    border: none;
    padding: 8px 12px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
}

.user-controls .logout-btn {
    background-color: #d9534f; /* Red color for logout */
    color: white;
}

.user-controls .login-btn {
    background-color: transparent;
    color: white;
    border: 1px solid white;
}

.user-controls .signup-btn {
    background-color: #1b4332;
    color: white;
}

.user-controls .signup-btn:hover {
    background-color: #163d2a;
}
</style>
