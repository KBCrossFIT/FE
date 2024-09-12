<template>
    <div>
      <!-- Header Section -->
      <header>
        <div class="header-container">
          <nav class="main-nav">
            <ul>
              <li><a href="#portfolio">포트폴리오</a></li>
              <li><a href="#products">금융상품</a></li>
              <li><a href="#education">교육</a></li>
            </ul>
          </nav>
          <div class="user-actions">
            <a @click="goToLogin" class="login">로그인</a>
            <a @click="goToMyPage" class="mypage">마이페이지</a>
          </div>
        </div>
      </header>
  
      <!-- Main Section -->
      <main>
        <!-- Portfolio Section -->
        <section id="portfolio" class="portfolio-section">
          <h2>포트폴리오</h2>
          <p>예금, 적금, 펀드, 대출, 주식 등의 투자 포트폴리오를 구성하세요.</p>
        </section>
  
        <!-- Financial Products Section -->
        <section id="products" class="products-section">
          <h2>금융상품</h2>
          <p>추천 금융상품을 구성하고 비교하세요.</p>
          <ul>
            <li><a href="#deposit">예금</a></li>
            <li><a href="#fund">적금</a></li>
            <li><a href="#loan">대출</a></li>
            <li><a href="#stocks">주식</a></li>
          </ul>
        </section>
  
        <!-- Education Section -->
        <section id="education" class="education-section">
          <h2>교육</h2>
          <p>뉴스, 영상, 사전 및 전문가 Q&A를 통해 금융 지식을 배우세요.</p>
        </section>
      </main>
  
      <!-- Footer Section -->
      <footer>
        <div class="footer-container">
          <p>&copy; 2024 CrossFit 금융 서비스</p>
        </div>
      </footer>
    </div>
  </template>
  
  <script>
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const router = useRouter();
  
      const goToLogin = () => {
        router.push('/login');
      };
  
      const goToMyPage = () => {
        router.push('/mypage');
      };
  
      return {
        goToLogin,
        goToMyPage
      };
    },
  };
  </script>
  
  <style scoped>
  /* General Styles */
  body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
  }
  
  h2 {
    color: #004990;
    margin-bottom: 10px;
  }
  
  p {
    font-size: 16px;
    color: #333;
  }
  
  /* Header Styles */
  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 30px;
    background-color: #004990;
  }
  
  .main-nav ul {
    display: flex;
    gap: 30px;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  .main-nav ul li {
    font-size: 18px;
  }
  
  .main-nav ul li a {
    color: white;
    text-decoration: none;
  }
  
  .user-actions {
    display: flex;
    gap: 15px;
  }
  
  .user-actions .login, .user-actions .mypage {
    color: white;
    text-decoration: none;
    cursor: pointer; /* Indicate that these are clickable */
  }
  
  /* Main Section Styles */
  main {
    padding: 50px 30px;
    text-align: center;
  }
  
  .portfolio-section, .products-section, .education-section {
    background-color: #fff;
    padding: 50px;
    margin: 20px 0;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .products-section ul {
    list-style: none;
    padding: 0;
    margin-top: 10px;
  }
  
  .products-section ul li {
    display: inline-block;
    margin: 0 15px;
    font-size: 18px;
  }
  
  .products-section ul li a {
    color: #004990;
    text-decoration: none;
  }
  
  /* Footer Styles */
  .footer-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 30px;
    background-color: #333;
    color: white;
  }
  </style>
      