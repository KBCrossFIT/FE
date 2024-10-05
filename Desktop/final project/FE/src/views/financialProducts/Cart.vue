<template>
    <div class="Cart-container">
        <div v-if="cart.length === 0" class="empty-cart">장바구니가 비어 있습니다.</div>
        <v-card v-else>
            <v-card-title>
                <h2>장바구니 목록</h2>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <div v-for="item in paginatedCart" :key="item.id" class="cart-item">
                    <div class="cart-row">
                        <h3 class="cart-itemId">{{ item.id }}</h3>
                        <h3 class="cart-itemName" @click="gotoProductDesc(item.productType, item.id)">
                            {{ item.name }}
                        </h3>
                        <div class="item-details">
                            <p v-if="item.productType === 'a' || item.productType === 'b'">
                                기본금리: {{ item.baseRate }} / 최고금리: {{ item.maxRate }}
                            </p>
                            <p v-if="item.productType === 'c'">
                                {{ item.fundType }} - 수익률: {{ item.yield }}
                            </p>
                            <p v-if="item.productType === 'd'">
                                기본금리: {{ item.baseRate }} / 최고금리: {{ item.maxRate }}
                            </p>
                        </div>
                        <v-btn class="cart-trashcanBtn" @click="removeFromCart(item.id)" icon>
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                    </div>
                    <v-divider></v-divider>
                </div>
                <v-pagination
                    v-model="currentPage"
                    :length="totalPages"
                    @input="updatePagination"
                ></v-pagination>
            </v-card-text>

            <div class="Cart-Btn-Set">
                <v-btn class="cart-Btn-Gotocompare" @click="goToCompare">상품 비교해보기</v-btn>
                <v-btn class="cart-Btn-GotoPortfolio" @click="goToMakePortfolio">포트폴리오 구성하기</v-btn>
            </div>
        </v-card>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import CartService from '@/views/cart/CartItem.vue'; // Import the service

export default {
    name: 'Cart',
    setup() {
        const router = useRouter();
        const cart = ref([]);
        const itemsPerPage = 5;
        const currentPage = ref(1);

        const totalPages = computed(() => Math.ceil(cart.value.length / itemsPerPage));

        const paginatedCart = computed(() => {
            const start = (currentPage.value - 1) * itemsPerPage;
            return cart.value.slice(start, start + itemsPerPage);
        });

        const fetchCartItems = async () => {
            try {
                const response = await CartService.getCartItems();
                cart.value = response.data; // Assuming response.data contains the cart items
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        const removeFromCart = async (itemId) => {
            try {
                await CartService.removeCartItem(itemId);
                // Re-fetch the cart items after removing
                await fetchCartItems();
            } catch (error) {
                console.error('Error removing item from cart:', error);
            }
        };

        const updatePagination = (page) => {
            currentPage.value = page;
        };

        const gotoProductDesc = (productType, id) => {
            router.push({
                name: 'ProductDetail',
                params: { id: id },
                query: { productType: productType },
            });
        };

        const goToCompare = () => {
            router.push('/product-comparison');
        };

        const goToMakePortfolio = () => {
            router.push('/make-portfolio');
        };

        // Fetch cart items when the component is mounted
        onMounted(fetchCartItems);

        return {
            cart,
            removeFromCart,
            currentPage,
            totalPages,
            paginatedCart,
            updatePagination,
            gotoProductDesc,
            goToCompare,
            goToMakePortfolio,
        };
    },
};
</script>

<style scoped>
/* Your existing styles */
</style>
