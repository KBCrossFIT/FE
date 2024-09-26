<template>
    <div class="modal" v-if="isOpen">
        <div class="modal-content">
            <span class="close" @click="closeModal">&times;</span>
            <component
                :is="currentComponent"
                @next="emitNext"
                @finish="finishTest"
                ref="currentComponentRef"
            />
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        isOpen: {
            type: Boolean,
            required: true,
        },
        currentComponent: {
            type: Object,
            required: true,
        },
    },

    setup(props, { emit }) {
        const closeModal = () => {
            emit('close', props.isOpen); // isOpen 값도 함께 전달
        };

        const finishTest = () => {
            closeModal();
            emit('finished');
        };

        const emitNext = () => {
            console.log('Modal.vue에서 next 이벤트 발생'); // next 이벤트 발생 여부 확인
            emit('next'); // 부모에게 next 이벤트 전달
        };

        return {
            closeModal,
            finishTest,
            emitNext,
        };
    },
});
</script>

<style scoped>
.modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    position: relative;
}

.close {
    position: absolute;
    top: 10px;
    right: 20px;
    cursor: pointer;
}
</style>
