<template>
    <div class="portfolio-page">
        <Header />
        <DevBtnSection />
        <CarouselSection />
        <ComparisonSection />
        <ProductListSection />
        <Footer />
    </div>
</template>

<script>
import Header from './Header.vue';
import CarouselSection from './Carousel.vue';
import DevBtnSection from './DevBtn.vue';
import ComparisonSection from './ComparisonSection.vue';
import ProductListSection from './ProductList.vue';
import Footer from './Footer.vue';

export default {
    name: 'HomePage',
    components: {
        Header,
        CarouselSection,
        DevBtnSection,
        ComparisonSection,
        ProductListSection,
        Footer,
    },
};
</script>

<style scoped>
.home-container {
    display: flex;
    flex-direction: column;
    margin-left: 250px; /* Adjust this value based on your sidebar width */
    padding: 20px;
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
