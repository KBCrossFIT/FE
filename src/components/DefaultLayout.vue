<script setup>
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import SideBar from "./Sidebar.vue";
</script>

<template>

  <Header />

  <div class="container">
    <div class="main">
      <SideBar />

      <div class="exceptSide">
        <div class="content my-5 px-3">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */

  width: 100%;
  height: 100vh;
}

.main {
  display: flex; /* 가로로 나열하기 위한 플렉스 설정 */
  flex-direction: row; /* row로 변경하여 가로 정렬 */
  min-height: 100vh;
  width: 1900px; /* 원하는 고정 너비로 설정 */
  padding: 0px;
}

#sidebar {
  width: 250px; /* 사이드바의 고정 너비 */
  background-color: #f0f0f0; /* 사이드바 배경색 */
}

.exceptSide {
  width: calc(100% - 250px); /* 사이드바 제외한 나머지 영역 */
  padding: 20px;
}

.content {
  flex: 1;
  padding: 20px;
}
</style>
