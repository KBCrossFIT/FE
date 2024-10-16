<template>
  <div class="carousel">
    <!-- Left Arrow -->
    <div class="carousel-arrow left" @click="prevImage">&#10094;</div>

    <!-- Images -->
    <div class="carousel-images">
      <div
        class="image-container"
        :style="imageContainerStyle"
        @transitionend="handleTransitionEnd"
      >
        <!-- 복제된 마지막 이미지 -->
        <img
          v-for="(image, index) in displayImages"
          :key="index"
          :src="image"
          alt="Carousel Image"
        />
      </div>
    </div>

    <!-- Right Arrow -->
    <div class="carousel-arrow right" @click="nextImage">&#10095;</div>

    <!-- Dots for navigation -->
    <div class="carousel-nav">
      <span
        class="dot"
        v-for="(image, index) in images"
        :key="index"
        :class="{ active: currentImage === index }"
        @click="changeImage(index)"
      ></span>
    </div>
  </div>
</template>

<script>
import image1 from '@/assets/img/1first.png';
import image2 from '@/assets/img/1second.png';
import image3 from '@/assets/img/1third.png';

export default {
  data() {
    return {
      currentImage: 0,
      images: [image1, image2, image3],
      isTransitioning: true, // 애니메이션 상태 확인
    };
  },
  computed: {
    displayImages() {
      // 첫 번째와 마지막 이미지의 복제본 추가
      return [
        this.images[this.images.length - 1],
        ...this.images,
        this.images[0],
      ];
    },
    imageContainerStyle() {
      return {
        transform: `translateX(-${(this.currentImage + 1) * 100}%)`,
        transition: this.isTransitioning
          ? 'transform 0.5s ease-in-out'
          : 'none',
      };
    },
  },
  methods: {
    handleTransitionEnd() {
      // 첫 번째에서 마지막으로 넘어갔을 때 애니메이션 없이 순간 이동
      if (this.currentImage === -1) {
        this.isTransitioning = false;
        this.currentImage = this.images.length - 1;
      }

      // 마지막에서 첫 번째로 넘어갔을 때 애니메이션 없이 순간 이동
      if (this.currentImage === this.images.length) {
        this.isTransitioning = false;
        this.currentImage = 0;
      }
      setTimeout(() => {
        this.isTransitioning = true; // 애니메이션 재활성화
      }, 0);
    },
    nextImage() {
      if (this.currentImage < this.images.length) {
        this.currentImage++;
      } else {
        this.currentImage = 0;
      }
    },
    prevImage() {
      if (this.currentImage > -1) {
        this.currentImage--;
      } else {
        this.currentImage = this.images.length - 1;
      }
    },
    changeImage(index) {
      this.currentImage = index;
    },
  },
  mounted() {
    setInterval(() => {
      this.nextImage();
    }, 9000);
  },
};
</script>

<style scoped>
.carousel {
  position: relative;
  height: 450px;
  overflow: hidden;
  margin-bottom: 0px;
}

.image-container {
  display: flex;
  height: 100%;
}

.carousel-images img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-arrow {
  position: absolute;
  top: 50%; /* 수직 중앙에 배치 */
  transform: translateY(-50%);
  height: 100%;
  width: 100px;
  font-size: 30px;
  cursor: pointer;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  z-index: 10; /* 다른 요소들 위에 표시되도록 z-index 설정 */
}

.carousel-arrow.left {
  left: 0;
  height: 100%;
  /* background-color: transparent; 배경 투명하게 */
  opacity: 0.1; /* 완전히 투명하게 */
}

.carousel-arrow.right {
  right: 0;
  height: 100%;
  /* background-color: transparent; 배경 투명하게 */
  opacity: 0.1; /* 완전히 투명하게 */
}

.carousel-nav {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}

.dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  background-color: #ddd;
  border-radius: 50%;
  margin: 5px;
  cursor: pointer;
}

.dot.active {
  background-color: #007bff;
}
</style>
