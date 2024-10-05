<template>
    <div class="influencer-list">
        <v-container>
            <v-row>
                <v-col v-for="(post, index) in paginatedPosts" :key="index" cols="12" md="4">
                    <v-card class="influencer-card my-3">
                        <v-img :src="post.image" aspect-ratio="1.5" class="image-box"></v-img>
                        <v-card-title class="card-title">
                            <h3 class="post-name">{{ post.name }}</h3>
                        </v-card-title>
                        <div class="content">
                            <p class="post-field">{{ post.field }}</p>
                            <p class="post-summary">{{ post.summary }}</p>
                        </div>
                        <v-card-subtitle class="post-date">{{ post.date }}</v-card-subtitle>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>

        <!-- 페이지네이션 -->
        <div id="Pagination">
            <v-container>
                <v-pagination
                    v-model="page"
                    :length="totalPages"
                    @input="onPageChange"
                ></v-pagination>
            </v-container>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
    name: 'Influencer_title',
    setup() {
        const page = ref(1);
        const pageSize = 9;

        // posts 데이터 정의
        const posts = ref([
            {
                image: '', // 이미지 경로 비워둠
                name: '홍길동',
                field: '재테크 전문가',
                summary: '최신 재테크 트렌드를 소개합니다.',
                date: '2024-09-28',
            },
            {
                image: '', // 이미지 경로 비워둠
                name: '김영32432432희',
                field: '주식 투자자',
                summary: '주식 투자에서의 성공 노하우를 공유합니다.',
                date: '2024-09-27',
            },
            {
                image: '', // 이미지 경로 비워둠
                name: '이철435수',
                field: '금융 분석가',
                summary: '금융 시장의 최근 동향을 분석합니다.',
                date: '2024-09-26',
            },
            {
                image: '', // 이미지 경로 비워둠
                name: '홍32432길동',
                field: '재테크 전문가',
                summary: '최신 재테크 트렌드를 소개합니다.',
                date: '2024-09-28',
            },
            {
                image: '', // 이미지 경로 비워둠
                name: '김영12희',
                field: '주식 투자자',
                summary: '주식 투자에서의 성공 노하우를 공유합니다.',
                date: '2024-09-27',
            },
            {
                image: '', // 이미지 경로 비워둠
                name: '이철33344수',
                field: '금융 분석가',
                summary: '금융 시장의 최근 동향을 분석합니다.',
                date: '2024-09-26',
            },
            {
                image: '', // 이미지 경로 비워둠
                name: '홍길1234동',
                field: '재테크 전문가',
                summary: '최신 재테크 트렌드를 소개합니다.',
                date: '2024-09-28',
            },
            {
                image: '', // 이미지 경로 비워둠
                name: '김21영희',
                field: '주식 투자자',
                summary: '주식 투자에서의 성공 노하우를 공유합니다.',
                date: '2024-09-27',
            },
            {
                image: '', // 이미지 경로 비워둠
                name: '이철23수',
                field: '금융 분석가',
                summary: '금융 시장의 최근 동향을 분석합니다.',
                date: '2024-09-26',
            },
            {
                image: '', // 이미지 경로 비워둠
                name: '홍길동3',
                field: '재테크 전문가',
                summary: '최신 재테크 트렌드를 소개합니다.',
                date: '2024-09-28',
            },
            {
                image: '', // 이미지 경로 비워둠
                name: '김영희2',
                field: '주식 투자자',
                summary: '주식 투자에서의 성공 노하우를 공유합니다.',
                date: '2024-09-27',
            },
            {
                image: '', // 이미지 경로 비워둠
                name: '이철421수',
                field: '금융 분석가',
                summary: '금융 시장의 최근 동향을 분석합니다.',
                date: '2024-09-26',
            },
            // ... 추가 데이터
        ]);

        // 페이지네이션을 위한 slice 처리
        const paginatedPosts = computed(() => {
            const start = (page.value - 1) * pageSize;
            const end = start + pageSize;
            return posts.value.slice(start, end);
        });

        // 전체 페이지 계산
        const totalPages = computed(() => {
            return Math.ceil(posts.value.length / pageSize);
        });

        // 페이지 변경 처리
        const onPageChange = (newPage) => {
            page.value = newPage;
        };

        return { paginatedPosts, totalPages, page, onPageChange };
    },
};
</script>

<style scoped>
.influencer-list {
    padding: 20px;
}

.title {
    font-size: 1.5em;
    margin-bottom: 20px;
    text-align: center; /* 제목 중앙 정렬 */
}

.influencer-card {
    display: flex;
    flex-direction: column; /* 세로 방향으로 정렬 */
    height: 300px; /* 카드의 높이 줄임 */
    justify-content: center; /* 카드 내용 중앙 정렬 */
    align-items: center; /* 카드 내용 중앙 정렬 */
}

.influencer-card:hover {
    box-shadow: 0 0 20px 10px #77e077;
    cursor: pointer;
}

.image-box {
    height: 150px; /* 이미지 박스 높이 줄임 */
}

.card-title {
    text-align: center; /* 제목 중앙 정렬 */
}

.content {
    flex: 1; /* 내용 부분이 남은 공간을 차지 */
    text-align: center; /* 내용 중앙 정렬 */
    padding: 10px;
}

.post-name {
    font-size: 1.2em;
    margin: 0;
}

.post-field {
    font-size: 0.9em;
    color: #888;
    margin: 5px 0; /* 필드와 설명 사이의 여백 */
}

.post-summary {
    font-size: 0.9em;
    color: #666;
    margin: 5px 0; /* 설명 사이 여백 줄임 */
}

.post-date {
    font-size: 0.8em;
    color: #aaa;
    text-align: center; /* 날짜 중앙 정렬 */
    margin-top: 10px; /* 날짜와 카드 내용 사이의 여백 */
}

#Pagination {
    margin-top: 20px; /* 페이지네이션과 카드 사이의 여백 */
    text-align: center; /* 페이지네이션 중앙 정렬 */
}
</style>
