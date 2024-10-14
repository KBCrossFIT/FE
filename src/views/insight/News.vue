<template>
    <div id="All">
        <!-- 왼쪽 메뉴 바 -->
        <div id="left">
            <v-card class="pa-4" elevation="2" style="height: 100%">
                <v-card-text>
                    <div class="list-container">
                        <span @click="navigateTo('/Influencer')" class="list-item" :class="{ active: $route.path === '/Influencer' }">
                            인플루언서
                        </span>
                        <span @click="navigateTo('/Youtube')" class="list-item" :class="{ active: $route.path === '/Youtube' }">
                            유튜브
                        </span>
                        <span @click="navigateTo('/News')" class="list-item" :class="{ active: $route.path === '/News' }">
                            뉴스
                        </span>
                    </div>
                </v-card-text>
            </v-card>
        </div>

        <!-- 상품명 검색, 제목 -->
        <div id="right">
            <v-container>
                <div id="seartext" class="search-container">
                    <h1 class="sixth">_</h1>

                    <div id="search" class="search-filter">
                        <i class="fa-solid fa-magnifying-glass" style="font-size: 24px"></i>
                        <input
                            v-model="searchQuery"
                            type="text"
                            class="form-control"
                            placeholder="검색어를 입력해 주세요"
                        />
                    </div>
                </div>
                <!-- 상품명 검색, 제목 -->
                <div id="right">
                    <v-container>
                        <div id="seartext" class="search-container">
                            <!-- 메인 -->
                            <News_title />
                        </div>
                    </v-container>
                </div>
            </v-container>
        </div>
    </div>
</template>

<script>
import News_title from './News_title.vue';

export default {
    name: 'News',
    components: {
        News_title,
    },
    data() {
        return {
            searchQuery: '', // 검색어 데이터
            page: 1, // 현재 페이지
        };
    },
    methods: {
        navigateTo(path) {
            this.$router.push(path);
        },
        methods: {
            navigateTo(path) {
                this.$router.push(path);
            },
            onPageChange(newPage) {
                this.page = newPage; // 페이지가 변경될 때 호출되는 메서드
                console.log(`Current page: ${newPage}`);
            },
        },
    },
};
</script>

<style scoped>
#All {
    display: flex;
    align-items: stretch;
    padding-left: 0; /* 왼쪽 패딩 제거 */
}

#left {
    width: 250px; /* 너비 조정 */
    background-color: #f0f0f0; /* 배경색 변경 */
}

#right {
    flex: 1;
    padding-left: 20px; /* 오른쪽 컨텐츠에 왼쪽 패딩 추가 */
}

.list-container {
    display: flex;
    flex-direction: column;
}

.list-item {
    display: block;
    padding: 15px 20px;
    cursor: pointer;
    color: #333333;
    font-size: 16px;
    transition: background-color 0.2s, color 0.2s, border-radius 0.2s;
    border-radius: 0; /* 기본 상태에서는 둥글지 않게 설정 */
}

.list-item.active {
    background-color: #7bd5c3;
    color: white;
    border-radius: 20px; /* active 상태에서 둥글게 설정 */
}

.list-item:hover {
    background-color: #5fc3b1;
    color: white;
    border-radius: 20px; /* hover 상태에서 둥글게 설정 */
}

.list-item.active:hover {
    background-color: #5fc3b1;
    color: white;
    border-radius: 20px; /* active이면서 hover 상태일 때도 둥글게 유지 */
}

.search-container {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    justify-content: space-between;
}

#search {
    display: flex;
    align-items: center;
    gap: 10px;
}

.form-control {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

/* News.vue의 h1.sixth 스타일 */
h1.sixth {
    position: relative;
    color: #333333;
}

h1.sixth:before,
h1.sixth:after {
    content: '금융 ';
    display: inline-block;
    position: relative;
    top: 1px;
    height: 100%;
    font-size: 1.25em;
    color: black;
    transition: all 0.5s ease;
}

h1.sixth:after {
    content: ' 뉴스';
}

h1.sixth:hover:before {
    transform: translateX(-5px);
}

h1.sixth:hover:after {
    transform: translateX(5px);
}

/* Youtube.vue의 h1.titleYoutube 스타일 */
h1.titleYoutube {
    position: relative;
    color: #333333;
}

h1.titleYoutube:before,
h1.titleYoutube:after {
    content: '금융 ';
    display: inline-block;
    position: relative;
    top: 1px;
    height: 100%;
    font-size: 1.25em;
    color: black;
    transition: all 0.5s ease;
}

h1.titleYoutube:after {
    content: '유튜브';
}

h1.titleYoutube:hover:before {
    transform: translateX(-5px);
}

h1.titleYoutube:hover:after {
    transform: translateX(5px);
}
</style>
