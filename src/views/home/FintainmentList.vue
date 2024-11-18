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
            <div class="slider" :style="{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }">
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
    currentIndex.value = currentIndex.value === 0 ? images.length - 3 : currentIndex.value - 3;
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

<style scoped>
/* 슬라이더 컨테이너의 기본 스타일 */
.slider-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 400px; /* 컨테이너 높이를 늘려서 이미지와 버튼이 겹치지 않도록 설정 */
    background: linear-gradient(to right, #d3d3d35c 10%, white 30%, white 70%, #d3d3d35c 100%);
    padding: 20px;
    position: relative; /* 슬라이더 컨트롤을 부모 컨테이너 기준으로 위치시킬 수 있게 설정 */
}

/* 버튼 스타일 */
.button {
    margin-top: 25px;
    padding: 10px 20px;
    background-color: #7bd5c3;
    color: white;
    border-radius: 5px;
    cursor: pointer;
}

/* 텍스트 영역 스타일 */
.slider-text {
    padding: 25px 40px 18px 120px;
    flex: 1;
    margin-right: 20px;
}

/* 제목 스타일 */
.slider-text h2 {
    font-size: 37px;
    margin-bottom: 10px;
}

/* 텍스트 스타일 */
.slider-text p {
    color: gray;
}

/* 슬라이더 버튼을 우하단에 배치 (슬라이드 카드 아래) */
.slider-controls {
    display: flex;
    gap: 10px;
    position: absolute; /* 버튼을 절대 위치로 설정 */
    bottom: 20px; /* 우하단 20px 위치 */
    right: 20px; /* 우하단 20px 위치 */
}

/* 슬라이더 영역 스타일 */
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
    flex: 0 0 33.33%; /* 각 슬라이드 아이템은 1/3 크기 */
}

/* 슬라이드 아이템 이미지 스타일 */
.slider-item img {
    width: 90%;
    height: 250px; /* 이미지 높이를 250px로 설정 */
    border-radius: 10px;
    object-fit: cover;
    margin: 0 auto;
}

/* 슬라이더 버튼이 슬라이드 영역 하단에 배치되도록 추가 조정 */
.slider-controls {
    bottom: 10px; /* 아래로 살짝 내려서 카드 영역 하단에 위치하게 조정 */
}

/* 버튼 스타일 */
.slider-btn {
    border: none;
    background-color: white;
    width: 40px;
    height: 40px;
    font-size: 20px;
    border-radius: 50%;
    cursor: pointer;
}
</style>
