<template>
    <div class="product-desc-wrapper">
        <div class="product-desc-container">
            <h1>{{ productDetails.finPrdtNm }}</h1>
            <p>금융회사명: {{ productDetails.korCoNm }}</p>
            <p>상품 종류: {{ productDetails.productType }}</p>

            <!-- Display rates or other details depending on the product type -->
            <div v-if="isDepositOrSaving">
                <p>기본금리: {{ productRates?.intrRate }}%</p>
                <p>최고금리: {{ productRates?.intrRate2 }}%</p>
            </div>
            <div v-if="isBond">
                <p>ISIN 코드명: {{ productDetails.isinCdNm }}</p>
                <p>채권 발행일자: {{ productDetails.bondIssuDt }}</p>
                <p>채권금리: {{ productDetails.bondSrfcInrt }}%</p>
            </div>
            <div v-if="isFund">
                <p>펀드유형: {{ productDetails.fundType }}</p>
                <p>위험도: {{ productDetails.riskLevel }}</p>
                <p>1개월 수익률: {{ productDetails.yield1 }}%</p>
            </div>

            <v-btn @click="addToCart(productDetails.productId)">장바구니에 추가</v-btn>
            <v-btn @click="goBack">뒤로 가기</v-btn>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    data() {
        return {
            productId: this.$route.params.productId, // Get product ID from route parameters
        };
    },
    computed: {
        ...mapGetters('bond', ['getBondProductDetail']),
        ...mapGetters('deposit', ['getDepositProductDetail']),
        ...mapGetters('saving', ['getSavingProductDetail']),
        ...mapGetters('fund', ['getFundProductDetail']),

        productDetails() {
            return (
                this.getBondProductDetail(this.productId) ||
                this.getDepositProductDetail(this.productId) ||
                this.getSavingProductDetail(this.productId) ||
                this.getFundProductDetail(this.productId)
            );
        },

        productRates() {
            return this.$store.getters['rates/getRatesByProductId'](this.productId);
        },

        isDepositOrSaving() {
            return (
                this.productDetails.productType === '예금' ||
                this.productDetails.productType === '적금'
            );
        },
        isBond() {
            return this.productDetails.productType === '채권';
        },
        isFund() {
            return this.productDetails.productType === '펀드';
        },
    },
    methods: {
        addToCart(productId) {
            this.$store.dispatch('cart/addToCart', productId); // Dispatch an action to add product to cart
        },
        goBack() {
            this.$router.go(-1); // Go back to the previous page
        },
    },
    created() {
        // Fetch product details when component is created
        this.fetchProductDetails(this.productId);
    },
    methods: {
        ...mapActions('bond', ['fetchBondProductDetail']),
        ...mapActions('deposit', ['fetchDepositProductDetail']),
        ...mapActions('saving', ['fetchSavingProductDetail']),
        ...mapActions('fund', ['fetchFundProductDetail']),
    },
};
</script>

<style scoped>
.product-desc-wrapper {
    padding: 20px;
}

.product-desc-container {
    max-width: 600px;
    margin: auto;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 16px;
    background-color: #f9f9f9;
}
</style>
