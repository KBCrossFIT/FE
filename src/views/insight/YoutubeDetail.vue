<template>
  <div class="youtube-detail-container" v-if="isLoading">
    <div class="loading-message">데이터를 불러오는 중입니다...</div>
  </div>

  <div class="youtube-detail-container" v-else-if="videoDetail && !isLoading">
    <div class="content-wrapper">
      <div class="intro-section">
        <h1 class="video-title">{{ videoDetail.youtubeTitle }}</h1>
        <div class="intro-content">
          <!-- 영상 부분 -->
          <div class="video-section">
            <iframe
              :src="getYoutubeEmbedUrl(videoDetail.youtubeUrl)"
              width="100%"
              height="300"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>

          <!-- 설명 부분 -->
          <div class="description-section">
            <div class="intro-box" v-html="introContent"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 핵심주제 제목 출력 -->
    <div class="title-section">
      <h2 class="section-title">핵심주제</h2>
    </div>

    <!-- 핵심주제 슬라이드 -->
    <div v-if="mainTopics.length > 0" class="slider-container">
      <div class="card-slider">
        <button @click="prevSlide" :disabled="currentSlide === 0">
          <span class="material-icons">arrow_back</span>
        </button>
        <div class="topic-card" v-html="mainTopics[currentSlide]"></div>
        <button @click="nextSlide" :disabled="currentSlide === mainTopics.length - 1">
          <span class="material-icons">arrow_forward</span>
        </button>
      </div>
    </div>

    <!-- 타임라인 제목 출력 -->
    <div v-if="timelineContent.length > 0" class="title-section">
      <h2 class="section-title">타임라인</h2>
    </div>

    <!-- 타임라인 내용 출력 -->
    <div v-if="timelineContent.length > 0" class="video-content">
      <div v-for="(paragraph, index) in timelineContent" :key="index" class="content-box">
        <div v-html="paragraph"></div>
      </div>
    </div>
  </div>

  <div v-else class="loading-message">
    데이터를 찾을 수 없습니다.
  </div>
</template>

<script>
import { useYoutubeStore } from '@/store/youtubeStore';
import { onMounted, watch, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { marked } from 'marked';

export default {
  name: 'YoutubeDetail',
  setup() {
    const youtubeStore = useYoutubeStore();
    const route = useRoute();
    const isLoading = ref(true);
    const introContent = ref('');
    const mainTopics = ref([]); // 핵심주제 한 줄 제목들
    const timelineContent = ref([]);
    const currentSlide = ref(0);

    const loadVideoDetail = async (youtubeNum) => {
      isLoading.value = true;
      await youtubeStore.fetchYoutubeDetail(youtubeNum);
      processContent();
      isLoading.value = false;
    };

    const processContent = () => {
      const content = youtubeStore.selectedVideoDetail?.youtubeContext || '';
      const cleanedContent = content.replace(/<<.*?>>/g, ''); // <<>> 패턴 제거
      const [intro, mainPart] = cleanedContent.split('### 핵심주제');
      const [main, timeline] = mainPart.split('### 타임라인');

      introContent.value = marked(intro.trim());

      // 한 줄 주제를 mainTopics에 저장하고 ###을 추가하여 marked 처리
      mainTopics.value = main
        .split('### ')
        .filter((section) => section.trim() !== '')
        .map((section) => marked(`### ${section.split('\n')[0].trim()}`)); // 첫 줄만 가져오고 ### 추가

      if (timeline) {
        timelineContent.value = timeline
          .split('\n\n')
          .map((paragraph) => marked(paragraph.trim()));
      } else {
        timelineContent.value = [];
      }
    };

    const prevSlide = () => {
      if (currentSlide.value > 0) {
        currentSlide.value--;
      }
    };

    const nextSlide = () => {
      if (currentSlide.value < mainTopics.value.length - 1) {
        currentSlide.value++;
      }
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

    const videoDetail = computed(() => youtubeStore.selectedVideoDetail);

    return {
      videoDetail,
      getYoutubeEmbedUrl,
      isLoading,
      introContent,
      mainTopics,
      timelineContent,
      currentSlide,
      prevSlide,
      nextSlide,
    };
  }
};
</script>

<style scoped>
.youtube-detail-container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content-wrapper {
  width: 80%;
}

.intro-section {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.video-title {
  text-align: center;
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

.intro-content {
  display: flex;
  gap: 20px;
  align-items: center;
}

.video-section {
  flex: 1;
}

.description-section {
  flex: 1;
}

.intro-box {
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  height: 350px;
  overflow-y: auto;
  line-height: 1.8;
}

.slider-container {
  width: 80%;
  margin: 30px 0;
  display: flex;
  justify-content: center;
}

.card-slider {
  display: flex;
  align-items: center;
  gap: 15px;
}

.topic-card {
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  width: 80%;
  text-align: center;
}

.title-section {
  text-align: center;
  margin: 20px 0;
}

.section-title {
  font-size: 2rem;
  font-weight: bold;
  background-color: #e6f7ff;
  padding: 10px;
  border-radius: 10px;
  display: inline-block;
  color: #333;
}

.loading-message {
  text-align: center;
  font-size: 1.5rem;
  color: #888;
  margin-top: 50px;
}

/* 아이콘 버튼 스타일 */
.material-icons {
  font-size: 2rem;
  cursor: pointer;
}
</style>