<template>
  <Header />

  <div id="left">
    <v-card class="pa-4" elevation="2" style="height: 100%">
      <v-card-text>
        <v-list>
          <v-list-item @click="navigateTo('/Youtube')">
            <v-list-item-content>
              <v-list-item-title>금융 유튜브</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="navigateTo('/Influencer')">
            <v-list-item-content>
              <v-list-item-title>인플루언서</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="navigateTo('/News')">
            <v-list-item-content>
              <v-list-item-title>뉴스</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </div>

  <Footer />
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'Influencer',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      show: Array(4).fill(false), // 4개의 카드에 대한 show 상태 초기화
      page: 1, // 현재 페이지
    };
  },
  methods: {
    toggleShow(index) {
      this.show[index] = !this.show[index]; // 배열의 값을 직접 토글
    },
    navigateTo(path) {
      this.$router.push(path);
    },
    onPageChange(newPage) {
      this.page = newPage; // 페이지가 변경될 때 호출되는 메서드
      console.log(`Current page: ${newPage}`); // 현재 페이지 출력
    },
  },
};
</script>

<style scoped></style>
