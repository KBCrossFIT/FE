<template>
  <div class="slider-container">
    <div class="slider-text">
      <h2 class="text1">AI 인플루언서의 투자전략</h2>
      <p class="text2">다양한 인플루언서들과 빠르게 만나보세요</p>

      <router-link to="influencer">
        <button class="button">만나러가기</button>
      </router-link>
      <div class="slider-controls">
        <button class="slider-btn prev-btn" @click="prevSlide">&larr;</button>
        <button class="slider-btn next-btn" @click="nextSlide">&rarr;</button>
      </div>
    </div>

    <div class="slider-wrapper">
      <div
        class="slider"
        :style="{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }"
      >
        <div class="slider-item" v-for="(image, index) in images" :key="index">
          <img :src="image" alt="슬라이드 이미지" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const images = [
  '/src/assets/img/mainpage/id_1.jpg',
  '/src/assets/img/mainpage/id_2.jpg',
  '/src/assets/img/mainpage/id_3.jpg',
  '/src/assets/img/mainpage/id_4.jpg',
  '/src/assets/img/mainpage/id_5.jpg',
  '/src/assets/img/mainpage/id_6.jpg',
  '/src/assets/img/mainpage/id_7.jpg',
  '/src/assets/img/mainpage/id_8.jpg',
  '/src/assets/img/mainpage/id_9.jpg',
  '/src/assets/img/mainpage/id_10.jpg',
];

const currentIndex = ref(0);

let slideInterval;

const prevSlide = () => {
  currentIndex.value =
    currentIndex.value === 0 ? images.length - 3 : currentIndex.value - 3;
};

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 3) % images.length;
};

const startSlideShow = () => {
  slideInterval = setInterval(() => {
    nextSlide();
  }, 3000);
};

onMounted(() => {
  startSlideShow();
});
</script>

<style>
.slider-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 305px;
  background: linear-gradient(
    to right,
    #d3d3d35c 10%,
    white 30%,
    white 70%,
    #d3d3d35c 100%
  );
}

.button {
  margin-top: 25px;
  /* margin-left: 20px; */
  padding: 10px 20px;
  background-color: #7bd5c3;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  position: relative;
  left: 500px;
}

.slider-text {
  padding: 25px 40px 18px 120px;
  flex: 1;
  margin-right: 20px;
}

.slider-text h2 {
  font-size: 37px;
  margin-bottom: 10px;
}

.slider-text p {
  color: gray;
}

.slider-controls {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  position: absolute;
  right: 112px;
  top: 1279px;
  background-color: transparent;
  z-index: 100;
}

.slider-wrapper {
  flex: 2;
  overflow: hidden;
  max-width: 800px;
}

.slider {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.slider-item {
  flex: 0 0 33.33%; /* 슬라이드 아이템 너비를 1/3로 설정 */
}

.slider-item img {
  width: 100%;
  border-radius: 10px;
  object-fit: cover;
  height: 222px;
}

.slider-btn {
  border: none;
  background-color: white;
  width: 40px;
  height: 40px;
  font-size: 20px;
  border-radius: 50%;
  cursor: pointer;
  gap: 20px;
}

.slider-item img {
  width: 90%; /* 이미지 너비를 슬라이드 아이템의 90%로 설정 */
  height: 250px; /* 이미지 높이를 250px로 설정 */
  border-radius: 10px;
  object-fit: cover; /* 이미지 비율을 유지하며 컨테이너에 맞춰 자르기 */
  margin: 0 auto; /* 이미지가 중앙에 오도록 설정 */
}
</style>
