// /components/LoadingDots.vue
<template>
    <div class="loading-dots"><span>.</span><span>.</span><span>.</span></div>
</template>

<style scoped>
@keyframes wave {
    0%,
    60%,
    100% {
        transform: initial;
    }
    30% {
        transform: translateY(-10px);
    }
}
.loading-dots {
    display: flex;
    font-weight: bold;
    justify-content: center;
    gap: 5px;
    font-size: 1.5rem;
}
.loading-dots span {
    display: inline-block;
    animation: wave 1s ease-in-out infinite;
}
.loading-dots span:nth-child(1) {
    animation-delay: 0s;
}
.loading-dots span:nth-child(2) {
    animation-delay: 0.2s;
}
.loading-dots span:nth-child(3) {
    animation-delay: 0.4s;
}
</style>
