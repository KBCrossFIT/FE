<template>
  <div class="carousel">
    <!-- Left Arrow -->
    <div class="carousel-arrow left" @click="prevImage">
      &#10094; <!-- Unicode left arrow -->
    </div>

    <!-- Images -->
    <div class="carousel-images">
      <img :src="images[currentImage]" alt="Carousel Image" />
    </div>

    <!-- Right Arrow -->
    <div class="carousel-arrow right" @click="nextImage">
      &#10095; <!-- Unicode right arrow -->
    </div>

    <!-- Dots for navigation -->
    <div class="carousel-nav">
      <span 
        class="dot" 
        v-for="(image, index) in images" 
        :key="index" 
        :class="{ active: currentImage === index }" 
        @click="changeImage(index)">
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentImage: 0,
      images: [
        // Add your image URLs here
        '/path-to-your-image1.jpg',
        '/path-to-your-image2.jpg',
        '/path-to-your-image3.jpg'
      ]
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
      this.currentImage = (this.currentImage - 1 + this.images.length) % this.images.length;
    }
  },
  mounted() {
    // Automatically swap images every 10 seconds
    setInterval(() => {
      this.nextImage();
    }, 10000);
  }
};
</script>

<style scoped>
.carousel {
  position: relative;
  height: 400px; /* Adjust this to make the carousel smaller */
  overflow: hidden;
}

.carousel-images img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
