<template>
    <div>
        <h2>테스트 시작 설명</h2>
        <div class="InvestmentTest-body">
            <div class="InvestmentTest-content">
                <div class="InvestmentTest-text">
                    투자성향분석 결과는 12개월간 재사용이 가능합니다. 다만 당일이 아닐 경우 재사용을
                    하더라도 일부 문항에 대한 답변은 필수입니다...
                </div>
                <button type="button" @click="startTest">시작하기</button>
                <button type="button" @click="closeModal">취소</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        startTest() {
            this.$emit('next'); // 다음 컴포넌트로 이동
            this.$emit('investMentTestStarted'); // InvestMentTest 상태를 true로 설정하는 이벤트 전달
            console.log('진짜이동함??');
        },
        closeModal() {
            this.$emit('close'); // 모달 닫기
            console.log('진짜닫힘??');
        },
    },
};
</script>
