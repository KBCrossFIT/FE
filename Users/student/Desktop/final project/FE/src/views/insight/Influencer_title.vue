<template>
  <div class="influencer-list">
    <!-- 로딩 중 상태 표시 -->
    <v-container v-if="loading">
      <v-row>
        <p>Loading influencers...</p>
      </v-row>
    </v-container>

    <!-- 페르소나 데이터가 없을 때 표시 -->
    <v-container v-else-if="personas.length === 0">
      <v-row>
        <p>No influencers available.</p>
      </v-row>
    </v-container>

    <!-- 페르소나 데이터를 정상적으로 로드했을 때 -->
    <v-container v-else>
      <v-row>
        <v-col v-for="persona in filteredPersonas" :key="persona.personaId" cols="12" md="4">
          <v-card class="influencer-card my-3" @click="openModal(persona)">
            <v-img :src="persona.image || 'default.jpg'" aspect-ratio="1.5" class="image-box"></v-img>
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
import { ref, computed, onMounted } from "vue";

export default {
  name: "Influencer_title",
  props: {
    searchQuery: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const personas = ref([]);
    const loading = ref(true);
    const page = ref(1);
    const pageSize = 9;

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

    const filteredPersonas = computed(() => {
      const filtered = personas.value.filter(persona =>
        persona.personaName.toLowerCase().includes(props.searchQuery.toLowerCase())
      );
      const start = (page.value - 1) * pageSize;
      return filtered.slice(start, start + pageSize);
    });

    const totalPages = computed(() => {
      return Math.ceil(personas.value.filter(persona =>
        persona.personaName.toLowerCase().includes(props.searchQuery.toLowerCase())
      ).length / pageSize);
    });

    const onPageChange = (newPage) => {
      page.value = newPage;
    };

    onMounted(() => {
      loadPersonas();
    });

    return {
      personas,
      filteredPersonas,
      totalPages,
      page,
      onPageChange,
      loading,
    };
  },
  methods: {
    openModal(persona) {
      this.$emit('openModal', persona);
    },
  },
};
</script>

<style scoped>
.influencer-list {
  padding: 20px;
}

.influencer-card {
  display: flex;
  flex-direction: column;
  height: 300px;
  justify-content: center;
  align-items: center;
}

.influencer-card:hover {
  box-shadow: 0 0 20px 10px #77e077;
  cursor: pointer;
}

.image-box {
  height: 150px;
}

.card-title {
  text-align: center;
}

.content {
  text-align: center;
  padding: 10px;
}

.post-name {
  font-size: 1.2em;
  margin: 0;
}

.post-field {
  font-size: 0.9em;
  color: #000000;
  margin: 5px 0;
}
</style>
