<template>
  <div class="slider-container">
    <div class="slider-text">
      <h2 class="text1">날 선택해 줄 줄은 몰랐어!</h2>
      <p class="text2">다양한 인플루언서들과 빠르게 만나보세요.</p>
      <p class="text3">다양한 인플루언서들과 빠르게 만나보세요.</p>
      <div class="slider-controls">
        <button class="slider-btn prev-btn">&larr;</button>
        <button class="slider-btn next-btn">&rarr;</button>
      </div>
    </div>

    <div class="slider">
      <div class="slider-item">
        <img src="" alt="아무무 1" />
      </div>
      <div class="slider-item">
        <img src="" alt="아무무 2" />
      </div>
      <div class="slider-item">
        <img src="" alt="아무무 3" />
      </div>
    </div>
  </div>
</template>
<script setup></script>

<style>
.slider-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 100%px;
  padding: 20px;
  height: 319px;
}

.slider-text {
  flex: 1;
  margin-right: 20px;
}

.slider-text h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.slider-text p {
  color: gray;
  margin-bottom: 20px; /* 문구와 버튼 사이의 간격 추가 */
}

.slider-controls {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
}

.slider {
  display: flex;
  gap: 20px;
  flex: 2;
  overflow: hidden;
  max-width: 800px;
}

.slider-item {
  flex: 1;
}

.slider-item img {
  width: 100%;
  border-radius: 10px;
}

.slider-btn {
  border: 2px solid black;
  border-radius: 50%;
  background-color: white;
  width: 40px;
  height: 40px;
  font-size: 18px;
  cursor: pointer;
}

.prev-btn {
  border: none;
  background-color: white;
  width: 40px;
  height: 40px;
  font-size: 20px;
  border-radius: 50%;
}

.next-btn {
  border: 2px solid black;
  background-color: white;
  width: 40px;
  height: 40px;
  font-size: 20px;
  border-radius: 50%;
}
</style>
