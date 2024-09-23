<template>
    <div id="app">
        <DefaultLayout>
            <router-view />
        </DefaultLayout>
    </div>
</template>

<script>
import { provide, reactive } from 'vue';

export default {
    name: 'App',
    setup() {
        // Use reactive to make the cart reactive
        const cart = reactive([]);

        // Provide the cart to child components
        provide('cart', cart);

        return {
            cart,
        };
    },
};
</script>

<style>
/* Add your styles here */
</style>

<!-- 커밋 컨벤션 -->
