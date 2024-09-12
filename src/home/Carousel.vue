<template>
  <section class="carousel">
    <div class="carousel-content">
      <h2>Lessons and insights <span>from 8 years</span></h2>
      <p>Where to grow your business as a marketplace seller or social media?</p>
      <button class="register-btn">Register</button>
    </div>
    <div class="carousel-nav">
      <span class="dot"></span>
      <span class="dot active"></span>
      <span class="dot"></span>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CarouselSection'
};
</script>

<style scoped>
.carousel {
  background-color: #e9f5e9; /* Light minty green */
  text-align: center;
  padding: 50px 0;
}

.carousel-content h2 {
  font-size: 32px;
  margin-bottom: 10px;
  color: #2d6a4f; /* Minty green color */
}

.carousel-content p {
  font-size: 18px;
  margin-bottom: 20px;
}

.register-btn {
  background-color: #2d6a4f; /* Minty green color */
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.carousel-nav .dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  background-color: #ddd;
  border-radius: 50%;
  margin: 5px;
}

.carousel-nav .dot.active {
  background-color: #2d6a4f; /* Minty green color */
}
</style>
