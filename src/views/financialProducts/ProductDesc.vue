<template>
    <div class="product-desc">
        <h1>{{ productData?.name || '상품명' }}</h1>
        <!-- 상품 이름 -->

        <div class="product-details">
            <!-- 예적금 정보 -->
            <div v-if="productType === 'savings'">
                <h2>예/적금 정보</h2>
                <div v-for="(info, index) in savingsInfo" :key="index">
                    <p>정보 {{ index + 1 }}: {{ productData[info] || '정보 없음' }}</p>
                </div>
            </div>

            <!-- 채권 정보 -->
            <div v-else-if="productType === 'bond'">
                <h2>채권 정보</h2>
                <div v-for="(info, index) in bondInfo" :key="index">
                    <p>정보 {{ index + 1 }}: {{ productData[info] || '정보 없음' }}</p>
                </div>
            </div>

            <!-- 펀드 정보 -->
            <div v-else-if="productType === 'fund'">
                <h2>펀드 정보</h2>
                <div v-for="(info, index) in fundInfo" :key="index">
                    <p>정보 {{ index + 1 }}: {{ productData[info] || '정보 없음' }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            productData: null, // 상품 데이터
            productType: '', // 상품 종류 (채권, 펀드, 예/적금 등)
            savingsInfo: ['interestRate', 'term', 'minimumDeposit'], // 예/적금 필드 목록
            bondInfo: ['referenceDate', 'corporateRegistrationNumber', 'securityCode'], // 채권 필드 목록
            fundInfo: ['fundType', 'assetManager', 'expenseRatio'], // 펀드 필드 목록
        };
    },
    created() {
        const productId = this.$route.params.id;
        this.fetchProductData(productId); // 상품 데이터 가져오는 메서드 호출
    },
    methods: {
        async fetchProductData(id) {
            // API 호출하여 상품 정보를 가져오는 로직
            // 예시로 아래와 같이 데이터 설정
            const response = await fetch(`/api/product/${id}`);
            const data = await response.json();
            this.productData = data;
            this.productType = data.type; // 상품 종류 설정
        },
    },
};
</script>

<style scoped>
.product-desc {
    padding: 20px;
}
.product-details {
    margin-top: 20px;
}
</style>
