<template>
  <div class="news-list">
    <v-container class="news-container">
      <v-row>
        <v-col v-for="(news, index) in paginatedNews" :key="index" cols="12">
          <!-- 뉴스 항목 -->
          <v-card class="news-card">
            <v-row>
              <v-col cols="3">
                <v-img
                  :src="news.image"
                  aspect-ratio="2"
                  class="news-image"
                ></v-img>
              </v-col>
              <v-col cols="9">
                <!-- 제목을 링크로 표시하여 클릭 시 뉴스 페이지로 이동 -->
                <v-card-title class="news-title">
                  <a :href="news.link" target="_blank">{{ news.title }}</a>
                </v-card-title>
                <v-card-subtitle class="news-summary">{{
                  truncateSummary(news.summary)
                }}</v-card-subtitle>
                <v-card-subtitle class="news-date">{{
                  news.date
                }}</v-card-subtitle>
              </v-col>
            </v-row>
          </v-card>

          <!-- 구분선 -->
          <v-divider v-if="index < paginatedNews.length - 1"></v-divider>
        </v-col>
      </v-row>
    </v-container>

    <!-- 페이지네이션 -->
    <v-container class="pagination-container">
      <v-pagination
        v-model="page"
        :length="totalPages"
        @input="onPageChange"
        circle
      ></v-pagination>
    </v-container>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'News_title',
  setup() {
    const page = ref(1);
    const pageSize = 5; // 페이지당 7개의 뉴스 표시
    const newsList = ref([]); // API에서 불러올 뉴스 데이터
    const loading = ref(true);

    // API 호출하여 뉴스 데이터 가져오기
    const fetchNews = async () => {
      const today = new Date();
      const lastMonth = new Date();
      lastMonth.setMonth(today.getMonth() - 1); // 한 달 전으로 설정

      const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      const fromDate = formatDate(lastMonth); // 한 달 전 날짜
      const toDate = formatDate(today); // 오늘 날짜

      try {
        const response = await axios.get('https://newsapi.org/v2/everything', {
          params: {
            q: '경제 OR 주식 OR 주가 OR 금리 OR 실적 OR 은행 OR 증권', // 검색어
            apiKey: '9f09451a9a664e5b9cfdd14f301bccad', // API 키
            from: fromDate, // 한 달 전 날짜
            to: toDate, // 오늘 날짜
            sortBy: 'publishedAt', // 최신순으로 정렬
            pageSize: 40, // 결과 개수 제한
          },
        });

        console.log('API 응답 데이터:', response.data);

        if (
          response.data &&
          response.data.articles &&
          response.data.articles.length > 0
        ) {
          const newsItems = response.data.articles;

          // 뉴스 데이터를 처리합니다.
          newsList.value = newsItems.map((newsItem) => ({
            title: newsItem.title,
            summary: newsItem.description,
            date: newsItem.publishedAt,
            link: newsItem.url, // 뉴스 페이지로 이동할 링크
            image: newsItem.urlToImage || '', // 이미지가 없을 경우 빈 값
          }));
        } else {
          console.error('검색 결과가 없습니다.');
          newsList.value = [];
        }
      } catch (error) {
        console.error('뉴스 데이터를 불러오는 중 오류가 발생했습니다.', error);
      } finally {
        loading.value = false; // 로딩 완료
      }
    };

    const paginatedNews = computed(() => {
      const start = (page.value - 1) * pageSize;
      const end = start + pageSize;
      return newsList.value.slice(start, end);
    });

    const totalPages = computed(() => {
      return Math.ceil(newsList.value.length / pageSize);
    });

    const truncateSummary = (summary) => {
      const maxLength = 120; // 최대 글자 수 설정
      return summary.length > maxLength
        ? summary.substring(0, maxLength) + '...'
        : summary;
    };

    const onPageChange = (newPage) => {
      page.value = newPage;
    };

    onMounted(() => {
      fetchNews();
    });

    return {
      paginatedNews,
      totalPages,
      page,
      onPageChange,
      truncateSummary,
      loading,
    };
  },
};
</script>

<style scoped>
.news-list {
  padding: 20px;
  /* background-color: #f9f9f9; 배경색 */
  /* max-width: 1200px; */
  margin: 0 auto; /* 중앙 정렬 */
}

.title {
  font-size: 2em;
  margin-bottom: 30px;
  text-align: center;
  color: #333;
  font-weight: bold;
}

.news-container {
  padding: 0;
}

.news-card {
  display: flex;
  flex-direction: row;
  align-items: stretch; /* 이미지와 텍스트 높이 맞춤 */
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  transition: transform 0.2s ease;
}

.news-card:hover {
  transform: translateY(-5px);
}

.news-image {
  height: 180px; /* 뉴스 이미지 크기 */
}

.news-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1; /* 텍스트 영역이 이미지 높이에 맞춰 확장 */
}

.news-title {
  font-size: 1.4em;
  margin-bottom: 10px;
  color: #2a9d8f;
  font-weight: bold;
}

.news-title a {
  text-decoration: none;
  color: inherit;
}

.news-title a:hover {
  text-decoration: underline;
}

.news-summary {
  font-size: 1.1em;
  color: #666;
  line-height: 1.5;
  margin-bottom: 10px;
  white-space: normal; /* 여러 줄 표시 */
}

.news-date {
  font-size: 0.9em;
  color: #888;
  margin-top: auto; /* 날짜를 하단에 고정 */
}

.pagination-container {
  margin-top: 30px;
  text-align: center;
}

.pagination-container .v-pagination {
  font-size: 1.2em;
  color: #2a9d8f;
}

@media (max-width: 768px) {
  .news-card {
    flex-direction: column; /* 작은 화면에서 이미지와 텍스트를 세로로 정렬 */
    align-items: center;
    padding: 15px;
  }

  .news-image {
    width: 100%; /* 가로 너비를 100%로 설정 */
    height: 250px; /* 고정된 높이 */
    margin-bottom: 15px;
    object-fit: cover; /* 이미지가 카드 영역에 맞춰 꽉 차게 */
  }

  .news-title {
    font-size: 1.3em;
    text-align: center;
  }

  .news-summary {
    text-align: center;
  }
}
</style>
