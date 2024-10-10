<template>
    <li class="menu-item" @click="openSidePanel">
        <a href="javascript:void(0)" class="sidebar-link">
            <i class="fas fa-shopping-cart icon"></i>
            <span class="menu-text">장바구니</span>
        </a>
    </li>
</template>

<script>
export default {
    name: 'CartSection',
    props: {
        cart: {
            type: Array,
            required: true,
        },
        removeFromCart: {
            type: Function,
            required: true,
        },
    },
    methods: {
        openSidePanel() {
            this.$emit('openSidePanel', {
                title: '장바구니',
                section: 'CartSection',
                data: this.cart, // Pass the cart data
            });
        },
    },
};
</script>

<style scoped>
.menu-item {
    width: 100%;
    margin-bottom: 10px;
    text-align: center;
}

.sidebar-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    padding: 15px;
    text-decoration: none;
    background-color: #575757;
    border-radius: 5px;
    margin-bottom: 5px;
    width: 100%;
    height: 5vh;
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: background-color 0.3s ease;
}

.sidebar-link:hover {
    background-color: #645f5f;
}

.icon {
    font-size: 24px;
    position: relative;
    margin-bottom: 5px;
}

.menu-text {
    font-size: 0.8rem;
    opacity: 1; /* Always fully visible */
}
</style>
