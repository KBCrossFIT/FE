<template>
    <div class="top">
        <img src="@/assets/img/2first.jpg" alt="배너 이미지" class="banner" />
    </div>
    <div id="All">
        <!-- 왼쪽 메뉴 바 -->
        <div id="left">
            <v-card class="pa-4" elevation="2" style="height: 100%">
                <v-card-text>
                    <div class="list-container">
                        <span
                            @click="navigateTo('/influencer')"
                            class="list-item"
                            :class="{ active: $route.path === '/influencer' }"
                        >
                            인플루언서
                        </span>
                        <span
                            @click="navigateTo('/youtube')"
                            class="list-item"
                            :class="{ active: $route.path === '/youtube' }"
                        >
                            유튜브
                        </span>
                        <span
                            @click="navigateTo('/news')"
                            class="list-item"
                            :class="{ active: $route.path === '/news' }"
                        >
                            뉴스
                        </span>
                    </div>
                </v-card-text>
            </v-card>
        </div>

        <!-- 상품명 검색, 제목 -->
        <div id="right">
            <v-container>
                <!-- 메인 -->
                <Influencer_title :searchQuery="searchQuery" @openModal="openModal" />
            </v-container>
        </div>

        <!-- 모달 창 -->
        <!--    <ModalInfluencer
            v-if="isModalOpen"
            :isOpen="isModalOpen"
            :persona="selectedPersona"
            @close="closeModal"
        /> -->

        <ModalPersona :isOpen="isModalOpen" :persona="selectedPersona" @close="closeModal" />
    </div>
</template>

<script>
import Influencer_title from './Influencer_title.vue';
import ModalInfluencer from '@/components/Modal/ModalInfluencer.vue';
import ModalPersona from '@/components/Modal/ModalPersona.vue';

export default {
    name: 'Influencer',
    components: {
        Influencer_title,
        ModalInfluencer, // 모달 컴포넌트 추가
        ModalPersona,
    },
    data() {
        return {
            searchQuery: '', // 검색어 데이터
            page: 1, // 현재 페이지
            isModalOpen: false, // 모달 상태 관리
            selectedPersona: null, // 선택된 인플루언서 데이터
        };
    },
    methods: {
        navigateTo(path) {
            this.$router.push(path);
        },
        onPageChange(newPage) {
            this.page = newPage; // 페이지가 변경될 때 호출되는 메서드
            console.log(`Current page: ${newPage}`);
        },
        openModal(persona) {
            console.log('Opening modal with persona:', persona);
            document.body.style.overflow = 'hidden';
            this.selectedPersona = persona;
            this.isModalOpen = true;
        },
        closeModal() {
            this.isModalOpen = false;
            this.selectedPersona = null;
            document.body.style.overflow = '';
        },

        // 검색창 지우기 기능
        eraseSearch() {
            this.searchQuery = ''; // 검색어를 빈 문자열로 설정하여 검색창을 초기화
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

.erase-btn {
    margin-left: 10px;
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
</style>
