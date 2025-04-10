<script setup>
import Header from './Header.vue';
import Footer from './Footer.vue';
import SideBar from './Sidebar.vue';
</script>

<template>
    <div class="wrapper">
        <Header />
        <div class="container">
            <div class="main">
                <div class="rightside">
                    <SideBar />
                </div>
                <div class="exceptSide">
                    <slot></slot>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>

<style scoped>
/* 최상위 wrapper에 고정된 너비와 X축 스크롤 추가 */
.wrapper {
    display: flex;
    flex-direction: column;
    min-width: 1500px; /* 전체 레이아웃의 최소 너비 고정 */
    width: 100%;
    min-height: 100vh;
    box-sizing: border-box;
    position: relative;
    overflow-x: auto; /* X축 스크롤 활성화 */
    overflow-y: hidden; /* Y축 스크롤 유지 */
}

.container {
    display: flex;
    width: 100%;
    max-width: 1500px; /* 고정 너비 */
    margin: 0 auto;
    box-sizing: border-box;
    padding: 0 20px;
}

.main {
    display: flex;
    justify-content: center;
    width: 100%;
    box-sizing: border-box;
}

.rightside {
    z-index: 1000;
}

.exceptSide {
    max-width: 100%;
    width: 100%;
    padding: 20px 90px 20px 100px;
    margin: 130px auto 0;
    box-sizing: border-box;
}

/* 반응형 조건 제거 */
@media (max-width: 1300px) {
    /* 해당 섹션 제거 */
}

@media (max-width: 900px) {
    /* 해당 섹션 제거 */
}

@media (max-width: 600px) {
    /* 해당 섹션 제거 */
}

/* 푸터는 항상 하단 */
footer {
    margin-top: auto;
    width: 100%;
}
</style>
