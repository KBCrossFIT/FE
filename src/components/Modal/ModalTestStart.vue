<template>
    <div>
        <h2>테스트 시작 설명</h2>
        <div class="InvestmentTest-body">
            <div class="InvestmentTest-content">
                <div class="InvestmentTest-text">
                    투자성향분석 결과는 12개월간 재사용이 가능합니다. 다만 당일이 아닐 경우 재사용을
                    하더라도 일부 문항에 대한 답변은 필수입니다...
                </div>
                <v-btn class="ModalTest-btn" @click="startTest">시작하기</v-btn>
                <v-btn class="ModalTest-btn" @click="closeModal">취소 </v-btn>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, toRefs } from 'vue';

export default defineComponent({
    props: {
        // 필요한 props를 여기에 추가하세요
    },
    setup(props, { emit }) {
        const startTest = () => {
            emit('next'); // 다음 컴포넌트로 이동
            emit('investMentTestStarted'); // InvestMentTest 상태를 true로 설정하는 이벤트 전달
            console.log('진짜이동함??');
        };

        const closeModal = () => {
            console.log('모달 닫기');
            emit('close');
        };

        return {
            startTest,
            closeModal,
        };
    },
});
</script>
