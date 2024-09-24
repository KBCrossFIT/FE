<template>
  <div id="seartext" class="search-container">
    <h1 class="sixth">인플루언서 포트폴리오</h1>

    <div id="search" class="search-filter">
      <input
        v-model="searchQuery"
        type="text"
        class="form-control"
        placeholder="상품명 검색..."
      />
    </div>
  </div>

  <div id="main">
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

    <div id="right">
      <v-container>
        <div id="Influencer1">
          <v-row justify="center">
            <v-col v-for="n in 4" :key="n" cols="auto">
              <v-card class="my-4" max-width="344">
                <v-img
                  height="200px"
                  src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                  cover
                ></v-img>
                <v-card-title>Top Western Road Trips</v-card-title>
                <v-card-subtitle>1,000 miles of wonder</v-card-subtitle>
                <v-card-actions>
                  <v-btn color="orange lighten-2" text>Explore</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    :icon="show[n - 1] ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                    @click="toggleShow(n - 1)"
                    :aria-label="show[n - 1] ? 'Collapse' : 'Expand'"
                  ></v-btn>
                </v-card-actions>
                <v-expand-transition>
                  <div v-show="show[n - 1]">
                    <v-divider></v-divider>
                  </div>
                </v-expand-transition>
              </v-card>
            </v-col>
          </v-row>
        </div>

        <div id="Influencer2">
          <v-row justify="center">
            <v-col v-for="n in 4" :key="n" cols="auto">
              <v-card class="my-4" max-width="344">
                <v-img
                  height="200px"
                  src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                  cover
                ></v-img>
                <v-card-title>Top Western Road Trips</v-card-title>
                <v-card-subtitle>1,000 miles of wonder</v-card-subtitle>
                <v-card-actions>
                  <v-btn color="orange lighten-2" text>Explore</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    :icon="show[n - 1] ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                    @click="toggleShow(n - 1)"
                    :aria-label="show[n - 1] ? 'Collapse' : 'Expand'"
                  ></v-btn>
                </v-card-actions>
                <v-expand-transition>
                  <div v-show="show[n - 1]">
                    <v-divider></v-divider>
                  </div>
                </v-expand-transition>
              </v-card>
            </v-col>
          </v-row>
        </div>

        <div id="Influencer3">
          <v-row justify="center">
            <v-col v-for="n in 4" :key="n" cols="auto">
              <v-card class="my-4" max-width="344">
                <v-img
                  height="200px"
                  src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                  cover
                ></v-img>
                <v-card-title>Top Western Road Trips</v-card-title>
                <v-card-subtitle>1,000 miles of wonder</v-card-subtitle>
                <v-card-actions>
                  <v-btn color="orange lighten-2" text>Explore</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    :icon="show[n - 1] ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                    @click="toggleShow(n - 1)"
                    :aria-label="show[n - 1] ? 'Collapse' : 'Expand'"
                  ></v-btn>
                </v-card-actions>
                <v-expand-transition>
                  <div v-show="show[n - 1]">
                    <v-divider></v-divider>
                  </div>
                </v-expand-transition>
              </v-card>
            </v-col>
          </v-row>
        </div>

        <!-- 페이지 넘기는 코드 -->
      </v-container>
      <div id="Pagination">
        <v-container>
          <v-pagination
            v-model="page"
            :length="5"
            @input="onPageChange"
          ></v-pagination>
        </v-container>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Influencer',
  components: {},
  data() {
    return {
      searchQuery: '', // 검색어 데이터 추가
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

<style scoped>
.my-4 {
  margin-top: 16px; /* 카드 사이의 여백 조정 */
}
#main {
  display: flex;
  align-items: stretch; /* 왼쪽과 오른쪽 영역을 세로로 늘림 */
  padding-left: 100px;
}
#left {
  width: 300px; /* 고정된 너비 (300px) */
}
#right {
  flex: 1; /* 오른쪽 영역은 남은 공간을 모두 차지 */
  align-items: flex-start; /* 수직 정렬 */
  margin-right: 250px;
}
.search-container {
  display: flex;
  align-items: center; /* 수직 정렬 */
  margin-bottom: 20px; /* 아래 여백 추가 */
}
#search {
  margin-left: 6px; /* 제목과의 간격 조정 */
}
#seartext {
  justify-content: space-between;
}
.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.portfolio-title {
  font-size: 24px; /* 글꼴 크기 조정 */
}
h1.sixth {
  position: relative;
}

h1.sixth:before,
h1.sixth:after {
  content: '[';
  display: inline-block;
  position: relative;
  top: 1px;
  height: 100%;
  font-size: 1.25em;
  color: black;

  transition: all 0.5s ease;
}

h1.sixth:after {
  content: ']';
}

h1.sixth:hover:before {
  transform: translateX(-5px);
}

h1.sixth:hover:after {
  transform: translateX(5px);
}
</style>
