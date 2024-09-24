<template>
    <div class="cart-container">
        <h1>장바구니</h1>
        <div v-if="cart.length === 0" class="empty-cart">
            <p>장바구니가 비어 있습니다.</p>
        </div>
        <div v-else>
            <ul class="cart-items">
                <li v-for="item in cart" :key="item.id" class="cart-item">
                    <h5>{{ item.name }}</h5>
                    <button @click="removeFromCart(item)" class="btn btn-danger">제거</button>
                </li>
            </ul>
            <div class="cart-total">
                <h3>총합: {{ totalAmount }}원</h3>
            </div>
        </div>
    </div>
</template>

<script>
import { inject, computed } from 'vue';

export default {
    name: 'Cart',
    setup() {
        const cart = inject('cart');

        if (!cart) {
            throw new Error('Cart not provided');
        }

        const removeFromCart = (item) => {
            const index = cart.value.indexOf(item);
            if (index > -1) {
                cart.value.splice(index, 1);
            }
        };

        const totalAmount = computed(() => {
            // Assuming items have a price property
            return cart.value.reduce((sum, item) => sum + (item.price || 0), 0);
        });

        return {
            cart,
            removeFromCart,
            totalAmount,
        };
    },
};
</script>

<style scoped>
.cart-container {
    padding: 20px;
}

.empty-cart {
    text-align: center;
    margin-top: 50px;
}

.cart-items {
    list-style: none;
    padding: 0;
}

.cart-item {
    margin-bottom: 20px;
}

.cart-total {
    margin-top: 20px;
    font-size: 20px;
    font-weight: bold;
}
</style>
