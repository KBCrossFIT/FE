<template>
    <div>
        <h1>투자성향분석 페이지</h1>
        <v-btn class="InvestmentTest-btn" @click="navigateTo('/investment-test-end'), cancel()">
            제출하기
        </v-btn>
    </div>
</template>

<script>
export default {
    name: 'MyInvestmentTest',

    methods: {
        navigateTo(path) {
            this.$router.push(path);
        },
    },
};
</script>

<style scoped></style>
