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
        this.$router.push('/profile'); // Adjust to your profile route
      },
      handleLogout() {
        localStorage.removeItem('user'); // Clear user data
        this.updateUserProfile(); // Update state
        this.navigateToHome(); // Redirect to homepage
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
      }
    },
    watch: {
      // Watch for changes to the user profile in local storage
      '$route'(to, from) {
        this.updateUserProfile(); // Check user profile on route change
      }
    },
    mounted() {
      this.updateUserProfile(); // Check user profile on mount
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

  
  
  
  