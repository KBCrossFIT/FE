<template>
  <!-- <div class="portfolio-page"> -->
  <!-- <div class="nonHeader"> -->
  <!-- <DevBtnSection /> -->
  <CarouselSection />
  <ComparisonSection />
  <FintainmentList />
  <ProductListSection />
  <!-- </div> -->
  <!-- </div> -->
</template>

<script>
import CarouselSection from './Carousel.vue';
import DevBtnSection from './DevBtn.vue';
import ComparisonSection from './ComparisonSection.vue';
import ProductListSection from './ProductList.vue';
import FintainmentList from './FintainmentList.vue';

export default {
  name: 'HomePage',
  components: {
    CarouselSection,
    DevBtnSection,
    ComparisonSection,
    ProductListSection,
    FintainmentList,
  },
};
</script>

<style scoped>
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
  margin-bottom: 1px;
}

.comparison-section {
  margin-bottom: 1px;
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
