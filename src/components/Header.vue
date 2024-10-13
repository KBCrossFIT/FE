<template>
  <header class="header">
    <div class="logoBox" @click="navigateToHome">
      <img
        src="/src/assets/img/LogoMVP2.png"
        alt="ProPortFolio Logo"
        class="logo-img"
      />
    </div>

    <nav>
      <div
        class="menu"
        @mouseover="showDropdown = true"
        @mouseleave="showDropdown = false"
      >
        <span class="menu-item">포트폴리오</span>
        <span class="menu-item">금융상품</span>
        <span class="menu-item">핀테인먼트</span>
        <span class="menu-item">투자성향</span>

        <!-- Unified Dropdown -->
        <div v-if="showDropdown" class="dropdown">
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
            </ul>
          </div>

          <div class="dropdown-section">
            <ul class="inn">
              <li
                class="in"
                :class="{ active: isActive('/products/deposit') }"
                @click="navigateToProductList('deposit')"
              >
                금융상품
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
                :class="{ active: isActive('/investment-test-start') }"
                @click="$router.push('/investment-test-start')"
              >
                투자성향 분석하기
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>

    <div class="user-controls">
      <template v-if="isLoggedIn">
        <div class="profile-info" @click="navigateToProfile">
          <div class="usernames">
            <i class="fa-solid fa-user-tie"></i>
            <span class="username">{{ userProfile.username }}</span>
          </div>
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
import { useCookies } from 'vue3-cookies';
//import instance from '@/api/index';

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
        params: { category: 'deposit' },
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
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #ffffff;
  color: rgb(10, 1, 1);
  width: 100%;
  height: 120px;
  position: relative;
  box-sizing: border-box;
  /* margin-top: 20px; */
  border-bottom: 1px solid #ddd;

  z-index: 9999;
}
.logoBox:hover {
  cursor: pointer;
}

.logo-img {
  width: 155px;
  height: auto;
  position: relative;
  top: 20px;
  left: 40%;
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
  gap: 160px;
}

.menu-item {
  font-size: 13px;
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
  top: 100%; /* 헤더 바로 아래 정렬 */
  left: -5px; /* 헤더 왼쪽 가장자리에 정렬 */
  width: 105%; /* 헤더의 전체 너비 */
  background-color: white;
  padding: 10px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  z-index: 10;
  gap: 70px; /* 각 섹션 간격 */
}

.dropdown-section {
  flex-direction: column;
  padding: 0 10px;
  /* border-left: 1px solid #ddd;  */
  flex-grow: 1; /* 각 섹션이 동일한 크기로 늘어나도록 */
  width: 160px;
}

.inn {
  width: 160px;
}

.dropdown-section:first-child {
  border-left: none; /* 첫 번째 섹션의 선 제거 */
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
  /* position: absolute; */
  right: 4%;
}

.profile-info {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 10px;
  position: absolute;
  right: 4%;
  gap: 5px;
}

.profile-picture {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 8px;
}

.user-controls button {
  border: none;
  padding: 10px;
  margin-left: 10px;
  cursor: pointer;
  background-color: #fcfcfc;
  color: rgb(19, 18, 18);
  border-radius: 5px;
  transition: background-color 0.2s;
}

.user-controls button:hover {
  background-color: #7bd5c3;
  color: white;
}

.login-btn button:hover {
  background-color: #7bd5c3;
  color: white;
}
.signup-btn button:hover {
  background-color: #7bd5c3;
  color: white;
}
.usernames i {
  margin-right: 6px; /* 아이콘과 텍스트 사이의 간격 설정 */
}

.usernames:hover {
  background-color: #7bd5c3;
  color: white;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.2s;
}

.in {
  width: 160px;
  text-align: center;
  font-size: 15px;
  text-align: left;
}
</style>
