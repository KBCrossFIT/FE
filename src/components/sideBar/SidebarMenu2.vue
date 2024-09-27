<template>
    <li class="menu2" @click="toggleDropdown(2)">
        <a href="javascript:void(0)" class="sidebar-link">
            <i class="fas fa-shopping-cart"></i>
            <span class="menu-text">장바구니</span>
        </a>
        <div
            v-if="activeDropdown === 2"
            :class="['dropdown-content', { active: activeDropdown === 2 }]"
        >
            <div class="cart-dropdown">
                <h3 class="section-title">장바구니</h3>
                <table class="cart-table">
                    <thead>
                        <tr>
                            <th>상품명</th>
                            <th>가격</th>
                            <th>수량</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in cartItems" :key="index">
                            <td class="item-name">{{ item.name }}</td>
                            <td class="item-price">{{ item.price }}원</td>
                            <td class="item-quantity">{{ item.quantity }}</td>
                        </tr>
                    </tbody>
                </table>

                <div class="action-buttons">
                    <button @click="goToCheckout">버튼1</button>
                </div>
            </div>
        </div>
    </li>
</template>

<script>
export default {
    props: ['activeDropdown', 'cartItems'],
    methods: {
        toggleDropdown(menuNumber) {
            this.$emit('toggleDropdown', menuNumber);
        },
        goToCheckout() {
            this.$emit('#');
        },
    },
};
</script>

<style scoped>
.sidebar-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    padding: 15px;
    text-decoration: none;
    background-color: #575757;
    border-radius: 5px;
    margin-bottom: 5px;
    width: 100%;
}

.sidebar-link:hover {
    background-color: #645f5f;
}

.dropdown-content {
    position: absolute;
    left: -300px; /* 버튼의 왼쪽에 펼쳐지도록 조정 */
    top: 0;
    background-color: #bab3b3;
    color: white;
    padding: 10px;
    width: 300px; /* 드롭다운 너비 */
    height: 320px; /* 버튼 그룹과 동일한 높이 */
    border-radius: 5px; /* 모서리 둥글게 */
    overflow-y: auto; /* 내용이 많을 경우 스크롤 가능 */
    z-index: 5555;
    transform: translateX(-100%); /* 기본적으로 숨기기 */
    transition: transform 0.5s ease; /* 애니메이션 효과 */
}

.dropdown-content.active {
    transform: translateX(0); /* 드롭다운을 보이게 하기 위해 원위치 */
}

.portfolio-dropdown {
    padding: 20px;
}

.section-title {
    font-size: 1.2rem;
    margin-bottom: 20px;
    color: #2d6a4f;
}

.portfolio-table {
    width: 100%;
    border-collapse: collapse;
}

.portfolio-table th,
.portfolio-table td {
    text-align: left;
    padding: 8px;
    border-bottom: 1px solid #ddd;
    font-size: 0.9rem;
}

.portfolio-table th {
    font-weight: bold;
    color: #2d6a4f;
}

.portfolio-name {
    color: #2d6a4f;
}

.portfolio-table td.positive {
    color: red;
}

.portfolio-table td.negative {
    color: blue;
}

.risk-level {
    color: #ffcc00;
}

.action-buttons {
    display: flex;
    justify-content: flex-start;
    gap: 10px;
}

.action-buttons button {
    background-color: #2d6a4f;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
}

.action-buttons button:hover {
    background-color: #1b4633;
}
</style>
