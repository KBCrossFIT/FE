<template>
    <div class="add-youtube-container">
      <h1>유튜브 영상 추가하기</h1>
  
      <v-form @submit.prevent="submitForm">
        <v-text-field
          v-model="youtubeUrl"
          label="유튜브 URL"
          placeholder="유튜브 영상 링크를 입력하세요"
          required
        ></v-text-field>
  
        <v-text-field
          v-model="youtubeTitle"
          label="유튜브 제목"
          placeholder="영상의 제목을 입력하세요"
          required
        ></v-text-field>
  
        <v-btn type="submit" color="primary">추가하기</v-btn>
      </v-form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AddYoutube',
    data() {
      return {
        youtubeUrl: '',
        youtubeTitle: '',
      };
    },
    methods: {
      submitForm() {
        // 유튜브 URL과 제목을 제출하는 로직 추가
        console.log('유튜브 추가:', { youtubeUrl: this.youtubeUrl, youtubeTitle: this.youtubeTitle });
      },
    },
  };
  </script>
  
  <style scoped>
  .add-youtube-container {
    padding: 40px;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #007acc;
  }
  </style>