<template>
    <div>
        <h2>본 테스트 지문 표시</h2>
        <!-- Add test content -->
        <button @click.prevent="$emit('next')">테스트 완료</button>
        <button @click.prevent="closeModal">취소</button>
    </div>
</template>

<script>
export default {
    methods: {
        closeModal() {
            this.$emit('close'); // 모달 닫기
        },
    },
};
</script>
