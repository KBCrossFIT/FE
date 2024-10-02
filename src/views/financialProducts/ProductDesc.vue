<template>
    <div class="product-desc-wrapper">
        <div class="product-desc-container">
            <!-- Display the name of the product if the details are available -->
            <h1>{{ productDetails ? productDetails.productNm : 'Loading...' }}</h1>

            <!-- Display loading message if productDetails is still null -->
            <div v-if="!productDetails">
                <p>Loading product details...</p>
            </div>

            <!-- Detailed information for Bonds -->
            <div v-if="productType === 'B' && productDetails">
                <p>ISIN 코드명: {{ productDetails.isinCdNm }}</p>
                <p>채권발행일자: {{ productDetails.bondIssuDt }}</p>
                <p>채권금리: {{ productDetails.bondSrfcInrt }}%</p>
            </div>

            <!-- Detailed information for Deposits -->
            <div v-if="productType === 'D' && productDetails">
                <p>상품명: {{ productDetails.finPrdtNm }}</p>
                <p>금융회사명: {{ productDetails.korCoNm }}</p>
                <p>기본금리: {{ productDetails.baseRate }}%</p>
                <p>최고금리: {{ productDetails.maxRate }}%</p>
            </div>

            <!-- Detailed information for Funds -->
            <div v-if="productType === 'F' && productDetails">
                <p>상품명: {{ productDetails.productNm }}</p>
                <p>회사명: {{ productDetails.companyNm }}</p>
                <p>펀드유형: {{ productDetails.fundType }}</p>
                <p>위험도: {{ productDetails.riskLevel }}</p>
                <p>1개월 수익률: {{ productDetails.yield1 }}%</p>
            </div>

            <!-- Detailed information for Savings -->
            <div v-if="productType === 'S' && productDetails">
                <p>상품명: {{ productDetails.finPrdtNm }}</p>
                <p>금융회사명: {{ productDetails.korCoNm }}</p>
                <p>기본금리: {{ productDetails.baseRate }}%</p>
                <p>최고금리: {{ productDetails.maxRate }}%</p>
            </div>

            <v-btn @click="goBack">뒤로가기</v-btn>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            productDetails: null,
            productType: '', // to store the type of the product (D, S, F, B)
        };
    },
    created() {
        this.fetchProductDetails();
    },
    methods: {
        async fetchProductDetails() {
            // Fetch the product details based on productId and productType from route params
            const productId = this.$route.params.productId;
            const productType = this.$route.params.productType;
            this.productType = productType;

            // Depending on the type, fetch from the appropriate getter
            if (productType === 'D') {
                this.productDetails = await this.$store.dispatch(
                    'deposit/fetchDepositProductDetail',
                    productId
                );
            } else if (productType === 'S') {
                this.productDetails = await this.$store.dispatch(
                    'saving/fetchSavingProductDetail',
                    productId
                );
            } else if (productType === 'B') {
                this.productDetails = await this.$store.dispatch(
                    'bond/fetchBondProductDetail',
                    productId
                );
            } else if (productType === 'F') {
                this.productDetails = await this.$store.dispatch(
                    'fund/fetchFundProductDetail',
                    productId
                );
            }
        },
        goBack() {
            this.$router.push('/financial-products');
        },
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
