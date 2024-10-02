<template>
  <div class="carousel">
    <!-- Left Arrow -->
    <div class="carousel-arrow left" @click="prevImage">
      &#10094;
    </div>

    <!-- Images -->
    <div class="carousel-images">
      <div
        class="image-container"
        :style="{ transform: `translateX(-${currentImage * 100}%)` }"
      >
        <img v-for="(image, index) in images" :src="image" :key="index" alt="Carousel Image" />
      </div>
    </div>

    <!-- Right Arrow -->
    <div class="carousel-arrow right" @click="nextImage">
      &#10095;
    </div>

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
import image1 from '@/assets/img/third.png';
import image2 from '@/assets/img/first.jpg';
import image3 from '@/assets/img/second.jpg';

export default {
  data() {
    return {
      currentImage: 0,
      images: [image1, image2, image3],
    };
  },
  methods: {
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
    // Automatically swap images every 10 seconds
    setInterval(() => {
      this.nextImage();
    }, 10000);
  },
};
</script>

<style scoped>
.carousel {
  position: relative;
  height: 400px;
  overflow: hidden;
}

.carousel-images {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.image-container {
  display: flex;
  transition: transform 0.5s ease-in-out; /* Smooth slide effect */
  height: 100%;
}

.carousel-images img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  flex-shrink: 0; /* Prevent the images from shrinking */
}

.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 30px;
  color: white;
  cursor: pointer;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  user-select: none;
  z-index: 10;
}

.carousel-arrow.left {
  left: 20px;
}

.carousel-arrow.right {
  right: 20px;
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
