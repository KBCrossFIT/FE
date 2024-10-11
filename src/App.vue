// App.vue
<template>
  <v-app>
    <DefaultLayout>
      <router-view />
    </DefaultLayout>
  </v-app>
</template>

<script>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'App',
  setup() {
    const router = useRouter();

    // 로그인 정보 초기화 로직
    // onMounted(() => {
    //   // 로그인 상태 확인 후 초기화
    //   if (localStorage.getItem('user') != null) {
    //     localStorage.removeItem('user');
    //     const cookies = document.cookie.split("; ");
    //     for (const cookie of cookies) {
    //       const cookieName = cookie.split("=")[0];
    //       document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    //     }
    //   }
    // });
  },
};
</script>
