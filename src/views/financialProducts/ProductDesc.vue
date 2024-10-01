<template>
    <div class="product-desc-wrapper">
        <div class="product-desc-container">
            <h2>상품 상세 정보</h2>
            <div v-if="product">
                <h3>{{ product.name }}</h3>
                <p><strong>상품종류:</strong> {{ getProductTypeName(product.ProductType) }}</p>

                <!-- Conditional rendering based on the product's properties -->
                <p v-if="product.bank"><strong>은행:</strong> {{ product.bank }}</p>
                <p v-if="product.baseRate"><strong>기본금리:</strong> {{ product.baseRate }}</p>
                <p v-if="product.maxRate"><strong>최고금리:</strong> {{ product.maxRate }}</p>
                <p v-if="product.fundType"><strong>펀드유형:</strong> {{ product.fundType }}</p>
                <p v-if="product.yield"><strong>수익률:</strong> {{ product.yield }}</p>

                <v-btn @click="goBack">
                    <span>{{ backButtonText }}</span>
                </v-btn>
            </div>
            <div v-else>
                <p>상품 정보를 불러오는 중입니다...</p>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export default {
    data() {
        return {
            product: null, // To store the selected product details
        };
    },
    created() {
        this.fetchProductDetails();
    },
    setup() {
        const router = useRouter();
        const route = useRoute();

        // Determine the source from query parameters
        const source = route.query.source || 'list'; // Default to 'list' if not specified

        // Back button text based on source
        const backButtonText = computed(() => {
            return source === 'cart' ? '장바구니로 돌아가기' : '상품리스트로 돌아가기';
        });

        // Go back function
        const goBack = () => {
            if (source === 'cart') {
                router.push('/cart'); // Navigate to cart if coming from cart
            } else {
                router.push('/financial-products'); // Navigate to product list otherwise
            }
        };

        return {
            backButtonText,
            goBack,
        };
    },
    methods: {
        async fetchProductDetails() {
            const productId = this.$route.params.id; // Get the product ID from route parameters
            const products = this.getProducts(); // Retrieve the product list
            this.product = products.find((product) => product.id == productId); // Find the product by ID
        },
        getProducts() {
            // 추후 API 연결
            return [
                {
                    id: 1,
                    ProductType: 'a',
                    bank: '우리은행',
                    name: '정기예금 A',
                    baseRate: '2.5%',
                    maxRate: '3.0%',
                },
                {
                    id: 2,
                    ProductType: 'b',
                    bank: '신한은행',
                    name: '정기적금 B',
                    baseRate: '3.0%',
                    maxRate: '3.5%',
                },
                {
                    id: 3,
                    ProductType: 'c',
                    fundType: '주식형',
                    name: '펀드 C',
                    yield: '5.0%',
                },
                {
                    id: 5,
                    ProductType: 'd',
                    bank: 'NH농협은행',
                    name: '채권 E',
                    baseRate: '6.0%',
                    maxRate: '7.0%',
                },
            ];
        },
        getProductTypeName(productType) {
            const typeNames = {
                a: '예금',
                b: '적금',
                c: '펀드',
                d: '채권',
                e: '주식',
            };
            return typeNames[productType] || '알 수 없음'; // Default value if not found
        },
    },
};
</script>

<style scoped>
.product-desc-wrapper {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    flex: 1;
}

.product-desc-container {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 80%; /* Adjust width as necessary */
}

.back-button {
    display: inline-block;
    margin-top: 20px;
    color: #4db6ac; /* Style your back button */
}
</style>
