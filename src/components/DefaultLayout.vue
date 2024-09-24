<script setup>
import Header from './Header.vue';
import Footer from './Footer.vue';
import SideBar from './Sidebar.vue';
</script>

<template>
  <div class="container">
    <SideBar />
    <div class="main">
      <Header />
      <div class="content my-5 px-3">
        <slot></slot>
      </div>
      <Footer />
    </div>
  </div>
</template>

<style scoped>
.container {
    /* display: flex;  */
    /* background: linear-gradient(to bottom, #e0f2f1, #ffffff); */
}

.main {
    margin-right: 60px;
    display: flex;
    flex-direction: column; /* Arrange children in a column */
    margin-right: 60px;
    min-height: 100vh; /* Ensure it takes at least full viewport height */
}

.content {
    flex: 1;
    padding: 20px;
}
</style>
