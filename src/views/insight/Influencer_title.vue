<template>
  <div class="influencer-list">
    <!-- 로딩 중 상태 표시 -->
    <v-container v-if="loading">
      <v-row>
        <p>Loading personas...</p>
      </v-row>
    </v-container>

    <!-- 페르소나 데이터가 없을 때 표시 -->
    <v-container v-else-if="personas.length === 0">
      <v-row>
        <p>No personas available.</p>
      </v-row>
    </v-container>

    <!-- 페르소나 데이터를 정상적으로 로드했을 때 -->
    <v-container v-else>
      <v-row>
        <v-col v-for="persona in paginatedPersonas" :key="persona.personaId" cols="12" md="4">
          <v-card class="influencer-card my-3" @click="openModal(persona)">
            <!-- 이미지 경로가 있으면 이미지 표시, 없으면 기본 이미지 표시 -->
            <v-img
              :src="
                persona.imagePath
                  ? `http://localhost:8080/api/personas/crossfit_images/${persona.imagePath.split('/').pop()}`
                  : '/default_image.jpg'
              "
              class="image-box"
              style="width: 150px; height: 150px"
              @error="onImageError"
            />
            <v-card-title class="card-title">
              <h3 class="post-name">{{ persona.personaName || "이름 없음" }}</h3>
            </v-card-title>
            <div class="content">
              <p class="post-field">{{ persona.job || "직업 정보 없음" }}</p>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- 페이지네이션 -->
    <div id="Pagination">
      <v-container>
        <v-pagination v-model="page" :length="totalPages" @input="onPageChange"></v-pagination>
      </v-container>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, computed, onMounted, defineComponent } from "vue";

export default defineComponent({
  name: "InfluencerList",
  setup(props, { emit }) {
    const personas = ref([]);
    const loading = ref(true);
    const page = ref(1);
    const pageSize = 6;

    const loadPersonas = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/personas/get");
        personas.value = response.data;
      } catch (error) {
        console.error("Error loading personas:", error);
      } finally {
        loading.value = false;
      }
    };

    const paginatedPersonas = computed(() => {
      const start = (page.value - 1) * pageSize;
      const end = start + pageSize;
      return personas.value.slice(start, end);
    });

    const totalPages = computed(() => {
      return Math.ceil(personas.value.length / pageSize);
    });

    const onPageChange = (newPage) => {
      page.value = newPage;
    };

    const onImageError = (event) => {
      event.target.src = "/default_image.jpg"; // 이미지 로드 실패 시 기본 이미지로 대체
      // event.target.src = "@/assets/img/1second.jpg";
    };

    const openModal = (persona) => {
      emit("openModal", persona);
    };

    onMounted(() => {
      loadPersonas();
    });

    return {
      personas,
      paginatedPersonas,
      totalPages,
      page,
      onPageChange,
      loading,
      onImageError,
      openModal,
    };
  },
});
</script>

<style scoped>
.influencer-list {
  padding: 20px;
  background-color: #f9f9f9; /* 배경색 */
  max-width: 1200px;
  margin: 0 auto; /* 중앙 정렬 */
}

.influencer-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 부드러운 그림자 */
  margin-bottom: 20px;
  transition: box-shadow 0.3s ease-in-out, transform 0.3s ease; /* 호버 애니메이션 추가 */
}

.influencer-card:hover {
  box-shadow: 0 0 20px 10px #77e077;
  cursor: pointer;
  transform: translateY(-5px); /* 마우스 오버 시 카드 살짝 위로 이동 */
}

.image-box {
  object-fit: cover; /* 이미지 비율을 유지하며 부모 요소에 맞게 채움 */
  width: 150px; /* 고정된 너비 */
  height: 150px; /* 고정된 높이 */
  border-radius: 50%; /* 이미지 둥글게 처리 */
  margin-bottom: 15px;
}

.card-title {
  text-align: center;
  font-size: 1.4em;
  margin-bottom: 10px;
  color: #2a9d8f;
  font-weight: bold;
}

.content {
  text-align: center;
  padding: 10px;
}

.post-name {
  font-size: 1.2em;
  margin: 0;
  font-weight: bold;
}

.post-field {
  font-size: 0.9em;
  color: #000;
  margin: 5px 0;
}

@media (max-width: 768px) {
  .influencer-card {
    padding: 15px;
  }

  .image-box {
    width: 100px; /* 작은 화면에서 이미지 크기 줄임 */
    height: 100px;
  }

  .card-title {
    font-size: 1.3em;
  }

  .post-name {
    font-size: 1.1em;
  }

  .post-field {
    font-size: 0.85em;
  }
}
</style>
