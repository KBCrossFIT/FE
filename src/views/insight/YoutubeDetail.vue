<template>
  <v-container class="youtube-detail-container" v-if="isLoading">
    <v-row>
      <v-col>
        <div class="loading-message">데이터를 불러오는 중입니다...</div>
      </v-col>
    </v-row>
  </v-container>

  <v-container class="youtube-detail-container" v-else-if="videoDetail && !isLoading">
    <v-row class="content-wrapper">
      <v-col>
        <v-card class="intro-section">
          <v-card-title>
            <h1 class="video-title">{{ videoDetail.youtubeTitle }}</h1>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="intro-content">
            <v-col class="video-section" cols="5">
              <v-responsive :aspect-ratio="16/9">
                <iframe
                  :src="getYoutubeEmbedUrl(videoDetail.youtubeUrl)"
                  width="100%"
                  height="100%"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </v-responsive>
            </v-col>
            <v-col class="description-section" cols="7">
              <v-card class="intro-box" v-html="introContent"></v-card>
            </v-col>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="title-section">
      <v-col>
        <h2 class="section-title">핵심주제</h2>
      </v-col>
    </v-row>

    <!-- 핵심주제 리스트 세로 배치 -->
    <v-row v-if="mainTopics.length > 0" class="main-topic-list">
    <v-col v-for="(topic, index) in mainTopics" :key="index" cols="12" md="6">
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-title>
            <template v-slot:default="{ expanded }">
              <div class="d-flex align-center">
                <v-icon :icon="expanded ? 'mdi-chevron-down' : 'mdi-chevron-right'" class="mr-2"></v-icon>
                <span v-html="formatContent(topic.title)"></span>
              </div>
            </template>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <ol>
              <li v-for="(detail, detailIndex) in topic.details" :key="detailIndex">
                <span v-html="formatContent(detail)"></span>
              </li>
            </ol>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
  </v-row>

  <v-row v-if="timelineContent.length > 0" class="timeline-section">
    <v-col cols="12">
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-title>
            <template v-slot:default="{ expanded }">
              <div class="d-flex align-center">
                <v-icon :icon="expanded ? 'mdi-chevron-down' : 'mdi-chevron-right'" class="mr-2"></v-icon>
                <span class="font-weight-bold">타임라인 보기</span>
              </div>
            </template>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <div v-for="(paragraph, index) in timelineContent" :key="index" class="timeline-content">
              <div v-html="paragraph"></div>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
  </v-row>
  </v-container>

  <v-container v-else>
    <div class="loading-message">데이터를 찾을 수 없습니다.</div>
  </v-container>

  <v-btn class="back-button" @click="goBack">뒤로가기</v-btn>
</template>

<script>
import { useYoutubeStore } from '@/store/youtubeStore';
import { onMounted, watch, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { marked } from 'marked';

export default {
  name: 'YoutubeDetail',
  setup() {
    const youtubeStore = useYoutubeStore();
    const route = useRoute();
    const router = useRouter();
    const isLoading = ref(true);
    const introContent = ref('');
    const mainTopics = ref([]);
    const timelineContent = ref([]);

    const loadVideoDetail = async (youtubeNum) => {
      isLoading.value = true;
      await youtubeStore.fetchYoutubeDetail(youtubeNum);
      processContent();
      isLoading.value = false;
    };

    const processContent = () => {
      const content = youtubeStore.selectedVideoDetail?.youtubeContext || '';
      const cleanedContent = content.replace(/<<.*?>>/g, '');
      const [intro, mainPart] = cleanedContent.split('### 핵심주제');
      const [main, timeline] = mainPart.split('### 타임라인');

      introContent.value = marked(intro.trim());

      mainTopics.value = main
        .split('### ')
        .filter((section) => section.trim() !== '')
        .map((section) => {
          const [title, ...details] = section.split('\n').filter(line => line.trim() !== '');
          return {
            title: title.trim(),
            details: details.filter(detail => detail.startsWith('-')).map(detail => detail.slice(1).trim())
          };
        });

        if (timeline) {
          timelineContent.value = timeline
            .split('\n\n')
            .map((paragraph) => marked(paragraph.trim()));
        } else {
          timelineContent.value = [];
        }
      };

    const formatTopicTitle = (title) => {
      return title.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    };

    const formatContent = (content) => {
      return content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    };

    const handleTopicClick = (index) => {
      console.log(`주제 ${index + 1} 클릭됨`);
    };

    onMounted(() => {
      const youtubeNum = route.params.youtubeNum;
      youtubeStore.selectedVideoDetail = null;
      loadVideoDetail(youtubeNum);
    });

    watch(() => route.params.youtubeNum, async (newYoutubeNum) => {
      if (newYoutubeNum) {
        youtubeStore.selectedVideoDetail = null;
        await loadVideoDetail(newYoutubeNum);
      }
    });

    const getYoutubeEmbedUrl = (youtubeUrl) => {
      const urlParams = new URLSearchParams(new URL(youtubeUrl).search);
      const videoId = urlParams.get('v');
      return `https://www.youtube.com/embed/${videoId}`;
    };

    const goBack = () => {
      router.go(-1); // 이전 페이지로 돌아가기
    };

    const videoDetail = computed(() => youtubeStore.selectedVideoDetail);

    return {
      videoDetail,
      getYoutubeEmbedUrl,
      isLoading,
      introContent,
      mainTopics,
      timelineContent,
      handleTopicClick,
      formatTopicTitle,
      formatContent,
      goBack
    };
  },
};
</script>

<style scoped>
.youtube-detail-container {
  padding: 20px;
}

.content-wrapper {
  width: 100%;
}

.intro-section {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 30px;
}

.intro-content {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.video-section {
  flex: 1;
  max-width: 100%;
}

.description-section {
  flex: 1;
  max-width: 100%;
}

.intro-box {
  height: auto;
  overflow-y: auto;
  line-height: 1.8;
  background-color: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  font-size: 1.3rem;
}

.main-topic-list {
  margin-top: 20px;
}

.topic-card {
  transition: all 0.3s ease;
  cursor: pointer;
  margin-bottom: 15px;
  padding: 15px;
  text-align: center;
  background-color: #9ef0b8;
  border-radius: 10px;
}

.hover-card {
  transform: scale(1.05);
  background-color: #7de0a0;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.topic-content {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
}

.topic-index {
  font-size: 1.5rem;
  margin-bottom: 5px;
  color: #1e8449;
}

.v-expansion-panel {
  background-color: transparent !important;
  box-shadow: none !important;
}

.v-expansion-panel-title {
  padding: 12px !important;
  min-height: 48px !important;
  background-color: transparent !important;
  transition: background-color 0.3s ease;
}

.v-expansion-panel-title:hover,
.v-expansion-panel-title--active {
  background-color: #e8f5e9 !important;
}

.v-expansion-panel-text__wrapper {
  padding: 0 12px 12px 36px !important;
}

ol {
  padding-left: 20px;
}

li {
  margin-bottom: 8px;
}

@media (max-width: 960px) {
  .v-col-md-6 {
    flex: 0 0 100%;
    max-width: 100%;
  }
}

.timeline-section {
  margin-top: 30px;
}

.timeline-content {
  margin-bottom: 15px;
}

.timeline-content:last-child {
  margin-bottom: 0;
}
/* 뒤로가기 버튼 스타일 */
.back-button {
  margin-top: 30px;
  background-color: #7bd5c3; /* 색상 변경 */
  color: #000000;
  border: none;
  border-radius: 6px;
  padding: 12px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  width: 100%;
  text-align: center;
}

.back-button:hover {
  background-color: #3dd4b6;
  transform: translateY(-2px);
}

.back-button:active {
  transform: translateY(0);
}

</style>