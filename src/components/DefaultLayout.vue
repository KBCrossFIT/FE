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
.wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    box-sizing: border-box;

    /* x축 스크롤 활성화 */
    overflow-x: scroll;
    min-width: 1300px; /* 최소 너비 설정 */
}

.container {
    display: flex;
    width: 100%;
    max-width: 1300px; /* 기본 좌우 여백 유지 */
    margin: 0 auto; /* 가운데 정렬 */
    box-sizing: border-box;
    padding: 0 20px; /* 좌우 여백 추가 */
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
    max-width: 1300px;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
}

/* 화면 축소 시 여백 제거 및 강제 스크롤 설정 */
@media (max-width: 1300px) {
    .wrapper {
        min-width: 1300px; /* 최소 너비 강제 설정 */
        overflow-x: scroll; /* 축소 시 스크롤 활성화 */
    }

    .container {
        max-width: none; /* 여백 제거 */
        padding: 0; /* 패딩 제거 */
        flex-shrink: 0; /* 요소 축소 방지 */
    }

    .exceptSide {
        max-width: none; /* 여백 제거 */
        padding: 10px; /* 약간의 여백 유지 */
        flex-shrink: 0; /* 축소 방지 */
    }
}

/* 푸터는 항상 하단 */
footer {
    margin-top: auto;
    width: 100%;
}
</style>
