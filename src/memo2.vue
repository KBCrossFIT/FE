<template>
  <div class="carousel">
    <!-- Left Arrow -->
    <div class="carousel-arrow left" @click="prevImage">&#10094;</div>

    <!-- Images -->
    <div class="carousel-images">
      <div class="image-container" :style="imageContainerStyle">
        <img
          v-for="(image, index) in images"
          :key="index"
          :src="image"
          alt="Carousel Image"
          @click="handleImageClick"
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
import image1 from '@/assets/img/1first.jpg';
import image2 from '@/assets/img/1second.jpg';
import image3 from '@/assets/img/1third.png';

export default {
  data() {
    return {
      currentImage: 0,
      images: [image1, image2, image3],
    };
  },
  computed: {
    imageContainerStyle() {
      return {
        transform: `translateX(-${this.currentImage * 100}%)`,
      };
    },
  },
  methods: {
    handleImageClick() {
      switch (this.currentImage) {
        case 0:
          this.gotoPage('/my-portfolio');
          break;
        case 1:
          this.gotoPage('/investment-test-start');
          break;
        case 2:
          break;
        default:
          break;
      }
    },
    gotoPage(page) {
      this.$router.push(page);
    },
    changeImage(index) {
      this.currentImage = index;
    },
    nextImage() {
      this.currentImage = (this.currentImage + 1) % this.images.length;
    },
    prevImage() {
      this.currentImage =
        (this.currentImage - 1 + this.images.length) % this.images.length;
    },
  },
  mounted() {
    setInterval(() => {
      this.nextImage();
    }, 10000);
  },
};
</script>

<style scoped>
.carousel {
  position: relative;
  height: 450px; /* 원하는 높이 설정 */
  overflow: hidden;
  margin-bottom: 0px;
  background-color: black;
}

.carousel-images {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.image-container {
  display: flex;
  transition: transform 0.5s ease-in-out; /* 부드러운 슬라이드 효과 */
  height: 100%;
}

.image-container img {
  width: 100%; /* 슬라이드 영역에 맞춰 이미지 너비 조정 */
  height: auto; /* 자동 높이 조정 */
  object-fit: cover; /* 이미지 비율 유지 */
}

.carousel-arrow {
  position: absolute;
  top: 50%; /* 중앙 정렬 */
  transform: translateY(-50%); /* 중앙 정렬 보정 */
  width: 50px; /* 화살표 너비 */
  font-size: 30px;
  color: transparent;
  cursor: pointer;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}

.carousel-arrow.left {
  left: 0;
}

.carousel-arrow.right {
  right: 0;
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

.carousel:hover {
  cursor: pointer;
}
</style>
