<template>
  <div class="portfolio-page">
    <Header />
    <CarouselSection />
    <ComparisonSection />
    <ProductListSection />
    <Footer />
  </div>
</template>

<script>
import Header from './Header.vue';
import CarouselSection from './Carousel.vue';
import ComparisonSection from './ComparisonSection.vue';
import ProductListSection from './ProductList.vue';
import Footer from './Footer.vue';

export default {
  name: 'HomePage',
  components: {
    Header,
    CarouselSection,
    ComparisonSection,
    ProductListSection,
    Footer
  }
};
</script>

<style scoped>
/* Home.vue specific styling if needed */
.portfolio-page {
  font-family: Arial, sans-serif;
}
</style>
