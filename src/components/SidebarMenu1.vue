<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <!-- 사이드바 내용 -->
      <v-list dense>
        <v-list-item v-for="(item, index) in items" :key="index">
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>내 애플리케이션</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container>
        <!-- 메인 콘텐츠 -->
        <v-btn @click="drawer = !drawer"> 사이드바 토글 </v-btn>
        <p>여기에 메인 콘텐츠가 표시됩니다.</p>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      drawer: false,
      items: [
        { title: '홈' },
        { title: '프로필' },
        { title: '설정' },
        { title: '로그아웃' },
      ],
    };
  },
};
</script>
<style>
/* 추가적인 스타일이 필요하다면 여기에 작성하세요 */
</style>
