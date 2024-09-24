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
.main {
  margin-right: 60px;
}
</style>
