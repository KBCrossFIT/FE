<template>
    <header class="header">
      <div class="logoBox" @click="navigateToHome">
        <div class="logo">ProPortFolio</div>
      </div>
  
      <nav>
        <div class="menu" @mouseover="showDropdown = true" @mouseleave="showDropdown = false">
          <span class="menu-item">포트폴리오</span>
          <span class="menu-item">금융상품</span>
          <span class="menu-item">Insight</span>
          <span class="menu-item">My Investment</span>
  
          <!-- Unified Dropdown -->
          <div v-if="showDropdown" class="dropdown">
            <div class="dropdown-section">
              <ul>
                <li :class="{ 'active': isActive('/my-portfolio') }" @click="$router.push('/my-portfolio')">내 포트폴리오</li>
                <li :class="{ 'active': isActive('/make-portfolio') }" @click="$router.push('/make-portfolio')">포트폴리오 구성하기</li>
              </ul>
            </div>
  
            <div class="dropdown-section">
              <ul>
                <li :class="{ 'active': isActive('/financial-products') }" @click="$router.push('/financial-products')">상품 리스트</li>
                <li :class="{ 'active': isActive('/cart') }" @click="$router.push('/cart')">장바구니</li>
                <li :class="{ 'active': isActive('/recently-viewed') }" @click="$router.push('/recently-viewed')">최근 본 상품</li>
              </ul>
            </div>
  
            <div class="dropdown-section">
              <ul>
                <li :class="{ 'active': isActive('/news') }" @click="$router.push('/news')">뉴스</li>
                <li :class="{ 'active': isActive('/youtube') }" @click="$router.push('/youtube')">유튜브</li>
                <li :class="{ 'active': isActive('/influencer') }" @click="$router.push('/influencer')">인플루언서</li>
              </ul>
            </div>
  
            <div class="dropdown-section">
              <ul>
                <li :class="{ 'active': isActive('/my-investment-analyze') }" @click="$router.push('/my-investment-analyze')">내 투자성향 분석</li>
                <li :class="{ 'active': isActive('/investment-test-start') }" @click="$router.push('/investment-test-start')">투자성향 분석하기</li>
              </ul>
            </div>
          </div>
        </div>
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
        showDropdown: false, // Control the dropdown visibility
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
      isActive(route) {
        return this.$route.path === route;
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
  background-color: #80eebd;
  color: rgb(10, 1, 1);
  border-bottom: 2px solid #1b4332;
  position: relative; /* Added */
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
  position: relative;
  display: flex;
  justify-content: center;
}

.menu {
  position: relative;
  padding: 10px;
  cursor: pointer;
  display: flex;
  gap: 80px;
}

.menu-item {
  font-size: 18px;
  font-weight: bold;
  padding: 0 10px;
}

.menu-item:hover {
  color: #3961e4;
}

.dropdown {
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 100%; /* Align directly below the header */
  left: 0; /* Align dropdown to the left edge of the header */
  width: 100%; /* Full width of the header */
  background-color: white;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.dropdown-section {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 10px; /* Added padding to create space between sections */
  border-left: 1px solid #ddd; /* Vertical line between sections */
}

.dropdown-section:first-child {
  border-left: none; /* Remove line for the first section */
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
  text-align: middle;
}  

.dropdown-section ul li:hover {
  background-color: #f0f0f0;
}

.dropdown-section ul li.active {
  color: #2d6a4f;
  font-weight: bold;
  background-color: #e9f9f5;
}

.user-controls {
  display: flex;
  gap: 30px;
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

.user-controls .login-btn,
.user-controls .signup-btn {
  background-color: transparent;
  color: white;
  border: 1px solid white;
}
</style>