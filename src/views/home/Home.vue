<template>
  <div class="portfolio-page">
    <div class="nonHeader">
      <DevBtnSection />
      <CarouselSection />
      <ComparisonSection />
      <ProductListSection />
    </div>
</template>

<script>
import CarouselSection from './Carousel.vue';
import DevBtnSection from './DevBtn.vue';
import ComparisonSection from './ComparisonSection.vue';
import ProductListSection from './ProductList.vue';

export default {
  name: 'HomePage',
  components: {
    CarouselSection,
    DevBtnSection,
    ComparisonSection,
    ProductListSection,
  },
};
</script>

<style scoped>
/* .portfolio-page {
  display: flex; 
  margin: 0 220px 0 220px; 
  padding: 20px;
} */

.nonHeader {
    margin: 0 220px 0 220px;
}

.home-header {
    background-color: #e9ecef;
    padding: 20px;
    border-bottom: 1px solid #ddd;
}

.home-main {
    flex: 1;
    margin-top: 20px;
}

.carousel {
    margin-bottom: 20px;
}

.comparison-section {
    margin-bottom: 20px;
}

.product-list-section {
    margin-bottom: 20px;
}

.home-footer {
    background-color: #e9ecef;
    padding: 20px;
    border-top: 1px solid #ddd;
}
</style>
