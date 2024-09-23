<template>
    <div>
        <h2>테스트 종료 설명</h2>
        <button @click.prevent="finish">완료</button>
    </div>
</template>

<script>
export default {
    methods: {
        finish() {
            this.$emit('finish'); // Notify parent to close modal and set flag
        },
    },
};
</script>
