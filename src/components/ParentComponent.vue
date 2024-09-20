<template>
  <div>
    <router-view></router-view> <!-- This will render the matched route component -->
  </div>
</template>

<script>
import { ref, provide } from 'vue';

export default {
  setup() {
    const cart = ref([]);  // Reactive cart array

    provide('cart', cart);  // Make the cart available to child components

    return {
      cart,  // Return the cart in case you need it in the template
    };
  },
};
</script>
