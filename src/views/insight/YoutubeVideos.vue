<template>
  <div class="youtube-videos-container">
    <!-- 이달의 추천 영상 섹션 -->
    <h2 class="section-title">이달의 추천 영상</h2>

    <!-- 관리자인 경우에 추가하기 버튼 표시 -->
    <v-btn
      v-if="isAdmin"
      color="primary"
      @click="goToAddYoutubePage"
      class="add-button"
    >
      추가하기
    </v-btn>

    <!-- 이달의 추천 영상 2개 -->
    <div class="featured-videos">
      <div
        v-for="(video, index) in featuredVideos.slice(0, 2)"
        :key="index"
        class="video-card featured"
      >
        <div class="video-content">
          <div
            class="video-wrapper"
            @click="goToYoutubeDetail(video.youtubeNum)"
          >
            <iframe
              :src="getYoutubeEmbedUrl(video.youtubeUrl)"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <h3 class="video-title" @click="goToYoutubeDetail(video.youtubeNum)">
            {{ video.youtubeTitle }}
          </h3>
        </div>
      </div>
    </div>

    <!-- 다른 영상들 리스트 -->
    <h2 class="section-title">다른 영상들</h2>
    <div class="videos-grid other-videos">
      <div
        v-for="(video, index) in otherVideos"
        :key="index"
        class="video-card"
        @click="goToYoutubeDetail(video.youtubeNum)"
      >
        <div class="video-content">
          <div class="video-wrapper">
            <iframe
              :src="getYoutubeEmbedUrl(video.youtubeUrl)"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <h3 class="video-title">{{ video.youtubeTitle }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useYoutubeStore } from '@/store/youtubeStore';
import { useAuthStore } from '@/store/authStore';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'YoutubeVideos',
  setup() {
    const youtubeStore = useYoutubeStore();
    const authStore = useAuthStore();
    const router = useRouter();

    const featuredVideos = ref([]);
    const otherVideos = ref([]);

    onMounted(async () => {
      await youtubeStore.fetchAllYoutubeData();
      await authStore.checkAuth(); // 사용자 인증 상태 및 역할 확인

      featuredVideos.value = youtubeStore.featuredVideos;
      otherVideos.value = youtubeStore.otherVideos;
    });

    // 유튜브 URL에서 v= 뒤의 ID 값을 추출해 임베드 주소를 생성하는 함수
    const getYoutubeEmbedUrl = (youtubeUrl) => {
      const urlParams = new URLSearchParams(new URL(youtubeUrl).search);
      const videoId = urlParams.get('v');
      return `https://www.youtube.com/embed/${videoId}`;
    };

    const goToAddYoutubePage = () => {
      router.push('/add-youtube'); // 유튜브 추가 페이지로 이동
    };

    const goToYoutubeDetail = (youtubeNum) => {
      router.push(`/youtube/${youtubeNum}`); // 유튜브 상세 페이지로 이동
    };

    return {
      featuredVideos,
      otherVideos,
      getYoutubeEmbedUrl,
      isAdmin: authStore.userRole === 'admin',
      goToAddYoutubePage,
      goToYoutubeDetail,
    };
  },
};
</script>

<style scoped>
.youtube-videos-container {
  padding: 20px;
  /* background-color: #f9f9f9; */
  margin: 0 auto;
}

.section-title {
  font-size: 2rem;
  font-weight: bold;
  margin: 30px 0;
  color: #333;
}

.add-button {
  display: block;
  margin: 20px auto;
}

.featured-videos {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin-bottom: 40px;
}

.videos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.video-card {
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out, transform 0.3s ease;
  cursor: pointer;
}

.video-card:hover {
  box-shadow: 0 0 20px 10px #77e077;
  transform: translateY(-5px);
}

.video-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.video-wrapper {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 비율 */
  height: 0;
  overflow: hidden;
}

.video-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.video-title {
  font-size: 1.1rem;
  font-weight: bold;
  padding: 15px;
  color: #2a9d8f;
  margin: 0;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 768px) {
  .featured-videos,
  .videos-grid {
    grid-template-columns: 1fr;
  }

  .video-card {
    margin-bottom: 20px;
  }

  .video-title {
    font-size: 1em;
  }
}
</style>
