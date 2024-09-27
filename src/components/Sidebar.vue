<template>
    <div class="uiNavAside" ref="sidebar">
        <ul class="nav-aside">
            <li class="menu1" @click="toggleDropdown(1)">
                <a href="javascript:void(0)">
                    <i class="fas fa-briefcase"></i>
                    <!-- Portfolio Icon -->
                    <span class="menu-text">포트폴리오</span>
                </a>
                <div v-if="activeDropdown === 1" class="dropdown-content">
                    <div class="portfolio-dropdown">
                        <h3 class="section-title">나의 포트폴리오</h3>
                        <table class="portfolio-table">
                            <thead>
                                <tr>
                                    <th>포트폴리오 명</th>
                                    <th>기대수익율</th>
                                    <th>위험도</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(portfolio, index) in portfolios" :key="index">
                                    <td class="portfolio-name">{{ portfolio.name }}</td>
                                    <td
                                        :class="{
                                            positive: portfolio.returns > 0,
                                            negative: portfolio.returns < 0,
                                        }"
                                    >
                                        {{ portfolio.returns }}%
                                    </td>
                                    <td class="risk-level">{{ portfolio.risk }}%</td>
                                </tr>
                            </tbody>
                        </table>

                        <div class="action-buttons">
                            <button @click="goToCreatePortfolio">포트폴리오 구성하기</button>
                        </div>
                    </div>
                </div>
            </li>
            <li class="menu2" @click="toggleDropdown(2)">
                <a href="javascript:void(0)">
                    <i class="fas fa-shopping-cart"></i>
                    <!-- Cart Icon -->
                    <span class="menu-text">장바구니</span>
                </a>
                <div v-if="activeDropdown === 2" class="dropdown-content">
                    <p>장바구니 관련 내용</p>
                </div>
            </li>
            <li class="menu3" @click="toggleDropdown(3)">
                <a href="javascript:void(0)">
                    <i class="fas fa-history"></i>
                    <!-- Recent Products Icon -->
                    <span class="menu-text">최근 본 상품</span>
                </a>
                <div v-if="activeDropdown === 3" class="dropdown-content">
                    <p>최근 본 상품 관련 내용</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
    name: 'SideBar',
    setup() {
        const portfolios = ref([
            { name: '포트폴리오 1', returns: 10.3, risk: 8.74 },
            { name: '포트폴리오 2', returns: -3.0, risk: 4.0 },
            { name: '포트폴리오 3', returns: 10.3, risk: 8.74 },
        ]);

        const activeDropdown = ref(null);
        const router = useRouter();
        const sidebar = ref(null); // Reference to the sidebar element

        const toggleDropdown = (menuNumber) => {
            if (activeDropdown.value === menuNumber) {
                activeDropdown.value = null;
            } else {
                activeDropdown.value = menuNumber;
            }
        };

        const goToCreatePortfolio = () => {
            console.log('포트폴리오 구성하기 버튼 클릭됨');
            router.push('/make-portfolio');
        };

        const handleClickOutside = (event) => {
            if (sidebar.value && !sidebar.value.contains(event.target)) {
                activeDropdown.value = null; // Close dropdown if clicking outside
            }
        };

        onMounted(() => {
            document.addEventListener('click', handleClickOutside); // Add click event listener
        });

        onUnmounted(() => {
            document.removeEventListener('click', handleClickOutside); // Clean up on unmount
        });

        return {
            portfolios,
            activeDropdown,
            toggleDropdown,
            goToCreatePortfolio,
            sidebar, // Return the reference
        };
    },
};
</script>

<style scoped>
.uiNavAside {
    position: fixed;
    right: 20px;
    top: 50%;
    transform: translateY(-50%); /* Vertical center alignment */
    width: 80px;
    background-color: #585654;
    display: flex;
    flex-direction: column;
    z-index: 9999;
    border-radius: 5px;
    padding: 10px;
}

.nav-aside {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between; /* Even spacing between buttons */
    height: 100%; /* Ensure full height usage */
}

.nav-aside li {
    text-align: center;
}

.nav-aside a {
    display: flex;
    flex-direction: column; /* Icon above text */
    align-items: center; /* Center icon and text */
    color: white;
    padding: 15px;
    text-decoration: none;
    background-color: #333;
    width: 100%;
    height: auto;
    margin-bottom: 5px;
    border-radius: 5px;
}

.nav-aside li:hover a {
    background-color: #575757;
}

.menu-text {
    font-size: 0.9rem;
    margin-top: 5px; /* Space between icon and text */
}

.dropdown-content {
    position: absolute;
    right: 80px;
    top: 0;
    background-color: #444;
    color: white;
    padding: 10px;
    width: 300px;
    border-left: 1px solid #575757;
    z-index: 9999;
}

.portfolio-dropdown {
    padding: 20px;
    background-color: #f0f8f4;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.section-title {
    font-size: 1.2rem;
    margin-bottom: 20px;
    color: #2d6a4f;
}

.portfolio-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
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
