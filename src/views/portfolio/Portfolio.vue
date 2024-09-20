<template>
    <div class="portfolio-container">
      <header class="portfolio-header">
        <h1>포트폴리오</h1>
      </header>
      <main class="portfolio-main">
        <section class="portfolio-summary">
          <h2>포트폴리오 요약</h2>
          <!-- Summary content goes here -->
        </section>
        <section class="portfolio-details">
          <h2>상세 정보</h2>
          <!-- Detailed portfolio content goes here -->
        </section>
        <section class="portfolio-actions">
          <h2>작업</h2>
          <!-- Actions or interactive components go here -->
        </section>
      </main>
      <footer class="portfolio-footer">
        <!-- Footer content goes here -->
        <p>Footer content here</p>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Portfolio',
  };
  </script>
  
  <style scoped>
  .portfolio-container {
    display: flex;
    flex-direction: column;
    margin-left: 250px; /* Adjust based on sidebar width */
    padding: 20px;
  }
  
  .portfolio-header {
    background-color: #e9ecef;
    padding: 20px;
    border-bottom: 1px solid #ddd;
  }
  
  .portfolio-main {
    flex: 1;
    margin-top: 20px;
  }
  
  .portfolio-summary, .portfolio-details, .portfolio-actions {
    margin-bottom: 20px;
  }
  
  .portfolio-footer {
    background-color: #e9ecef;
    padding: 20px;
    border-top: 1px solid #ddd;
  }
  </style>
  