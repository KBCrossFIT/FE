<script setup>
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import SideBar from "./Sidebar.vue";
</script>

<template>
  <div class="container">
    <Header />
    <!-- Header를 main 밖으로 이동 -->
    <div class="main">
      <div class="exceptSide">
        <div class="content my-5 px-3">
          <slot></slot>
        </div>
        <Footer />
      </div>
      <SideBar />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */

  height: 100vh;
  padding-top: 4rem; /* 헤더 높이만큼 상단 여백 추가 */
}

.main {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  max-width: 90%; /* 최대 너비를 퍼센트로 설정 */
  padding: 0px;
  position: relative; /* 추가: Header의 절대 위치를 위한 기준 */
}

.content {
  flex: 1;
  padding: 2rem; /* rem 단위로 변경 */
}

#sidebar {
}

.exceptSide {
  position: relative; /* 추가: Header의 절대 위치를 위한 기준 */
  padding: 0; /* 추가: 공백 제거 */
  margin: 0; /* 추가: 공백 제거 */
}

@media (max-width: 768px) {
  .main {
    flex-direction: column;
    max-width: 100%;
  }
}
</style>
