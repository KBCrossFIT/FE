<template>
    <div class="uiNavAside">
        <ul class="nav-aside">
            <li class="menu1" @click="toggleDropdown(1)">
                <a href="javascript:void(0)">포트폴리오</a>
                <div v-if="activeDropdown === 1" class="dropdown-content">
                    <p>포트폴리오 관련 내용</p>
                </div>
            </li>
            <li class="menu2" @click="toggleDropdown(2)">
                <a href="javascript:void(0)">장바구니</a>
                <div v-if="activeDropdown === 2" class="dropdown-content">
                    <p>장바구니 관련 내용</p>
                </div>
            </li>
            <li class="menu3" @click="toggleDropdown(3)">
                <a href="javascript:void(0)">최근 본 상품</a>
                <div v-if="activeDropdown === 3" class="dropdown-content">
                    <p>최근 본 상품 관련 내용</p>
                </div>
            </li>
            <li class="menu4" @click="toggleDropdown(4)">
                <a href="./make-portfolio">포트폴리오 구성하기</a>

                <!-- <div v-if="activeDropdown === 4" class="dropdown-content">
                    <p>포트폴리오 구성 관련 내용</p>
                </div> -->
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'SideBar',
    data() {
        return {
            activeDropdown: null, // 활성화된 드롭다운 메뉴의 번호
        };
    },
    methods: {
        toggleDropdown(menuNumber) {
            if (this.activeDropdown === menuNumber) {
                this.activeDropdown = null; // 이미 활성화된 메뉴 클릭 시 닫음
            } else {
                this.activeDropdown = menuNumber; // 선택한 메뉴의 드롭다운 활성화
            }
        },
    },
};
</script>

<style scoped>
.uiNavAside {
    position: fixed;
    right: 0;
    top: 0;
    height: 100%;
    width: 60px;
    background-color: #333;
    display: flex;
    flex-direction: column;
    z-index: 9999;
}

.nav-aside {
    list-style-type: none;
    padding: 0;
    margin: 0;
    width: 100%;
}

.nav-aside li {
    width: 100%;
    text-align: right;
}

.nav-aside a {
    display: block;
    color: white;
    padding: 15px;
    text-align: right;
    text-decoration: none;
    background-color: #333;
    width: 100%;
}

.nav-aside li:hover a {
    background-color: #575757;
}

.dropdown-content {
    position: absolute;
    right: 60px;
    top: 0;
    background-color: #444;
    color: white;
    padding: 10px;
    text-align: left;
    width: 300px; /* 드롭다운이 확장되는 폭 */
    height: 100%;
    border-left: 1px solid #575757;
    display: flex;
    align-items: center; /* 수직 가운데 정렬 */
    justify-content: center; /* 수평 가운데 정렬 */
}

.dropdown-content p {
    margin: 0;
}
</style>
