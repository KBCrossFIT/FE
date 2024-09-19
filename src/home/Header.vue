<template>
    <header class="header">
        <div class="logo">ProPortFolio</div>
        <nav>
            <ul>
                <li>포트폴리오</li>
                <li>금융상품</li>
                <li>Insight</li>
                <li>My Investment</li>
            </ul>
        </nav>
        <div class="user-controls">
            <button class="login-btn" @click="navigateToLogin">로그인</button>
            <button class="signup-btn" @click="navigateToSignup">회원가입</button>
        </div>
    </header>
</template>

<script>
export default {
    name: 'Header',
    methods: {
        navigateToLogin() {
            this.$router.push('/login');
        },
        navigateToSignup() {
            this.$router.push('/signup');
        },
    },
};
</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #2d6a4f; /* Minty green color */
    color: white;
    border-bottom: 2px solid #1b4332; /* Darker green for border */
}

.logo {
    font-size: 24px;
    font-weight: bold;
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
    background-color: #1b4332; /* Darker green for hover */
    color: white;
    border-radius: 5px;
}

.user-controls {
    display: flex;
    gap: 10px;
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
    background-color: #1b4332; /* Darker green for signup button */
    color: white;
}

.user-controls .signup-btn:hover {
    background-color: #163d2a; /* Even darker green for hover */
}
</style>
