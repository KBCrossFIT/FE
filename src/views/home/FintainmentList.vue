<template>
  <div class="slider-container">
    <div class="slider-text">
      <h2 class="text1">날 선택해 줄 줄은 몰랐어!</h2>
      <p class="text2">다양한 인플루언서들과</p>
      <p class="text3">빠르게 만나보세요.</p>
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
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <div class="slider-item" v-for="(image, index) in images" :key="index">
          <img :src="image" alt="슬라이드 이미지" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 이미지 배열
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

// 현재 슬라이드 인덱스
const currentIndex = ref(0);

// 이전 슬라이드로 이동
const prevSlide = () => {
  currentIndex.value =
    currentIndex.value === 0 ? images.length - 1 : currentIndex.value - 1;
};

// 다음 슬라이드로 이동
const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % images.length;
};
</script>

<style>
.slider-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(
    to right,
    #d3d3d35c 10%,
    white 30%,
    white 70%,
    #d3d3d35c 100%
  );
}
.button {
  margin-top: 20px;
}

.slider-text {
  padding: 54px;
  flex: 1;
  margin-right: 20px;
}

.slider-text h2 {
  font-size: 24px;
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
  right: 103px;
}

.nextSlide {
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
  flex: 0 0 34%;
}

.slider-item img {
  width: 70%;
  border-radius: 10px;
  object-fit: cover;
  height: 222px;
}

.slider-btn {
  margin-top: 20px;
  border: none;
  background-color: white;
  width: 40px;
  height: 40px;
  font-size: 20px;
  border-radius: 50%;
  cursor: pointer;
}

.prev-btn {
  /* 스타일 동일 */
}

.next-btn {
  /* 스타일 동일 */
}
</style>
