<template>
  <header class="header">
    <!-- 로고 -->
    <div class="logoBox" @click="navigateToHome()">
      <img
        src="/src/assets/img/LogoMVP2.png"
        alt="ProPortFolio Logo"
        class="logo-img"
      />
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
      <!-- 드랍다운 메뉴 -->
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
                class="in"
                :class="{ active: isActive('/influencer') }"
                @click="$router.push('/influencer')"
              >
                인플루언서
              </li>
              <li
                class="in"
                :class="{ active: isActive('/youtube') }"
                @click="$router.push('/youtube')"
              >
                유튜브
              </li>

              <li
                class="in"
                :class="{ active: isActive('/news') }"
                @click="$router.push('/news')"
              >
                뉴스
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
                                :class="{ active: isActive('/investment-test') }"
                                @click="$router.push('/investment-test')"
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
                    <div class="usernames" @click="navigateToProfile">
                        <i class="fa-solid fa-user-tie"></i>
                        <span class="username">{{ userProfile.username }}</span>
                    </div>
                    <but유튜브ton @click.stop="handleLogout">로그아웃</but유튜브ton>
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
      showDropdown: false, // 드롭다운 표시 제어
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

      //로그아웃 오류 잠시 주석
      //await instance.post('/member/logout');

      // Clear cookies and local storage
      cookies.remove('Authorization');
      cookies.remove('Refresh-Token');
      localStorage.removeItem('user');

      // Update user profile state
      await this.updateUserProfile(); // Update the state
      this.navigateToHome(); // Redirect to home
    },
    updateUserProfile() {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        this.isLoggedIn = true;
        this.userProfile.username = storedUser.username;
        this.userProfile.picture =
          storedUser.picture || this.userProfile.picture;
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
/* 메뉴 컨테이너와 네비게이션 스타일 */
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
  gap: 120px;
  align-items: center;
  width: 100%;
}

.menu-item {
    font-size: 24px;
    font-weight: bold;
}

.menu-item:hover {
  color: #3961e4;
}

/* 드롭다운 메뉴 스타일 */
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
  position: relative;
  left: 5px;
}

/* dropdown-section 스타일 */
.dropdown-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 10px;
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
  text-align: left !important; /* 강제 적용 */
  width: 100%; /* 강제 적용하여 왼쪽 정렬 유지 */
}

.dropdown-section ul li:hover {
  background-color: #f0f0f0;
}

.dropdown-section ul li.active {
  color: #2d6a4f;
  font-weight: bold;
  background-color: #e9f9f5;
}

/* 드롭다운 내부 정렬 스타일 */
.inn {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 사용자 컨트롤 스타일 */
.user-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  position: absolute;
  right: 4%;
  width: 200px;
}

.profile-info,
.nonLogin {
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  justify-content: flex-end;
}

.profile-picture {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 8px;
}

/* 버튼 및 상호작용 스타일 */
.user-controls button {
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  background-color: #fcfcfc;
  color: rgb(19, 18, 18);
  border-radius: 5px;
  transition: background-color 0.2s, color 0.2s;
}

.user-controls button:hover {
  background-color: #7bd5c3;
  color: white;
}

.profile-info,
.login-btn,
.signup-btn {
  display: flex;
  align-items: center;
  gap: 5px;
}

.usernames,
.user-controls button {
  padding: 8px 12px; /* 동일한 padding 적용 */
  height: 40px; /* 동일한 높이 설정 */
  display: flex;
  align-items: center;
  border-radius: 5px;
  transition: background-color 0.2s, color 0.2s;
}

/* 비로그인 상태 버튼 스타일 (로그인/회원가입) */
.login-btn,
.signup-btn {
  display: flex;
  align-items: center;
  padding: 8px 12px; /* 버튼과 동일한 padding 적용 */
  height: 40px; /* 동일한 높이 설정 */
  border-radius: 5px;
}

.usernames i {
  margin-right: 6px;
}

.usernames:hover {
  background-color: #7bd5c3;
  color: white;
  border-radius: 5px;
  transition: background-color 0.2s, color 0.2s;
}
</style>
