<template>
    <header class="header">
        <div class="logoBox" @click="navigateToHome()">
            <div class="logo">ProPortFolio</div>
        </div>

        <nav>
            <ul>
                <li>포트폴리오</li>
                <li>금융상품</li>
                <li>Insight</li>
                <li>My Investment</li>
            </ul>
        </nav>

        <div class="user-controls">
            <template v-if="isLoggedIn">
                <div class="profile-info" @click="navigateToProfile">
                    <img :src="userProfile.picture" alt="Profile Picture" class="profile-picture" />
                    <span class="username">{{ userProfile.username }}</span>
                </div>
                <button class="logout-btn" @click="handleLogout">로그아웃</button>
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
                picture: 'path/to/default/profile/pic.png'
            }
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
            this.$router.push('/profile');
        },
        handleLogout() {
            this.isLoggedIn = false;
            this.userProfile = { username: '', picture: 'path/to/default/profile/pic.png' };
            localStorage.removeItem('user'); // Clear user data from local storage
            this.navigateToHome(); // Redirect to homepage
        },
        updateUserProfile(username, picture) {
            this.userProfile.username = username;
            this.userProfile.picture = picture;
            this.isLoggedIn = true;
        }
    },
    mounted() {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            this.updateUserProfile(storedUser.username, storedUser.picture || this.userProfile.picture);
        }
    }
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

nav ul {
    display: flex;
    list-style: none;
    gap: 20px;
    margin: 0;
    padding: 0;
}

nav ul li {
    cursor: pointer;
    padding: 10px;
    transition: background-color 0.3s, color 0.3s;
}

nav ul li:hover {
    background-color: #1b4332;
    color: white;
    border-radius: 5px;
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
    width: 40px;
    height: 40px;
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

.user-controls .logout-btn {
    background-color: #ff4d4d; /* Red background for logout */
    color: white;
}

.user-controls .logout-btn:hover {
    background-color: #cc0000; /* Darker red on hover */
}
</style>
