<template>
    <div class="top">
        <img src="@/assets/img/2first.jpg" alt="배너 이미지" class="banner" />
    </div>
    <div class="All"></div>
    <div id="All">
        <!-- 왼쪽 메뉴 바 -->
        <div id="left">
            <v-card class="pa-4" elevation="2" style="height: 100%">
                <v-card-text>
                    <div class="list-container">
                        <span
                            v-for="item in menuItems"
                            :key="item.path"
                            @click="navigateTo(item.path)"
                            :class="['list-item', { active: isActive(item.path) }]"
                        >
                            {{ item.text }}
                        </span>
                    </div>
                </v-card-text>
            </v-card>
        </div>

        <!-- 상품명 검색, 제목 -->
        <div id="right">
            <v-container>
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
            menuItems: [
                { text: '인플루언서', path: '/influencer' },
                { text: '유튜브', path: '/youtube' },
                { text: '뉴스', path: '/news' },
            ],
        };
    },
    methods: {
        navigateTo(path) {
            this.$router.push(path);
        },
        isActive(path) {
            return this.$route.path.toLowerCase() === path.toLowerCase();
        },
    },
};
</script>

<style scoped>
.top {
    width: 100%; /* 상단 영역의 너비를 전체 화면에 맞춤 */
}

.banner {
    width: 100%;
    height: 238px;
}

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
    border-radius: 10px; /* active 상태에서 둥글게 설정 */
}

.list-item:hover {
    background-color: #5fc3b1;
    color: white;
    border-radius: 10px; /* hover 상태에서 둥글게 설정 */
}

.list-item.active:hover {
    background-color: #5fc3b1;
    color: white;
    border-radius: 10px; /* active이면서 hover 상태일 때도 둥글게 유지 */
}

.search-container {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    justify-content: space-between;
    justify-content: flex-end; /* 오른쪽 정렬로 변경 */
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
</style>
