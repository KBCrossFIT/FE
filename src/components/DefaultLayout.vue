<script setup>
import Header from './Header.vue';
import Footer from './Footer.vue';
import SideBar from './Sidebar.vue';
</script>

<template>
  <Header />

  <div class="container">
    <div class="main">
      <div class="leftside"></div>
      <SideBar />
      <div class="exceptSide">
        <slot></slot>
      </div>
    </div>
  </div>
  <Footer />
</template>

<style scoped>
.container {
  display: flex;
  width: 100%;
  height: 200vh;
}

.main {
  display: flex; /* 가로로 나열하기 위한 플렉스 설정 */
  flex-direction: row; /* row로 변경하여 가로 정렬 */
  min-height: 100vh;
  width: 100%; /* 페이지 전체 너비 사용 */
  padding: 0px;
  /* left: 20px; */
}

.leftside {
  flex-basis: 4.5%;
}

#sidebar {
  flex-basis: 4.5%; /* 사이드바가 30% 차지 */
  background-color: #f0f0f0; /* 사이드바 배경색 */
}

.exceptSide {
  flex-basis: 91%; /* exceptSide가 70% 차지 */
  background-color: #ffffff; /* 배경색을 추가해서 확인 가능 */
}

.footer {
  z-index: 9999;
}
</style>
