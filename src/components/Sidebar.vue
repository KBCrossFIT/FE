<template>
    <div class="uiNavAside" ref="sidebar">
        <ul class="nav-aside">
            <div class="button-container">
                <SidebarMenu1
                    :activeDropdown="activeDropdown"
                    :portfolios="portfolios"
                    @toggleDropdown="toggleDropdown"
                    @goToCreatePortfolio="goToCreatePortfolio"
                />
                <SidebarMenu2 :activeDropdown="activeDropdown" @toggleDropdown="toggleDropdown" />
                <SidebarMenu3 :activeDropdown="activeDropdown" @toggleDropdown="toggleDropdown" />
            </div>
        </ul>
    </div>
</template>

<script>
import SidebarMenu1 from './sideBar/PortfolioSection.vue';
import SidebarMenu2 from './sideBar/CartSection.vue';
import SidebarMenu3 from './sideBar/RecentProductsSection.vue';
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
    name: 'SideBar',
    components: {
        SidebarMenu1,
        SidebarMenu2,
        SidebarMenu3,
    },
    setup() {
        const portfolios = ref([
            { name: '포트폴리오 1', returns: 10.3, risk: 8.74 },
            { name: '포트폴리오 2', returns: -3.0, risk: 4.0 },
            { name: '포트폴리오 3', returns: 10.3, risk: 8.74 },
        ]);

        const activeDropdown = ref(null);
        const router = useRouter();
        const sidebar = ref(null);

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
                activeDropdown.value = null;
            }
        };

        onMounted(() => {
            document.addEventListener('click', handleClickOutside);
        });

        onUnmounted(() => {
            document.removeEventListener('click', handleClickOutside);
        });

        return {
            portfolios,
            activeDropdown,
            toggleDropdown,
            goToCreatePortfolio,
            sidebar,
        };
    },
};
</script>

<style scoped>
.uiNavAside {
    position: fixed;
    right: 0; /* Position at the right end */
    top: 0; /* Stick to the top of the page */
    width: 90px; /* Set width */
    height: 100vh; /* Full viewport height */
    display: flex; /* Use flexbox */
    flex-direction: column; /* Arrange items in a column */
    z-index: 9999;
    border-radius: 5px;
    padding: 10px;
    /* background-color: #2d6a4f;  */
}

.nav-aside {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex; /* Use flexbox for the list */
    flex-direction: column; /* Arrange list items in a column */
    flex-grow: 1; /* Allow it to grow to fill the available space */
}

.button-container {
    display: flex;
    flex-direction: column; /* Arrange buttons vertically */
    flex-grow: 1; /* Ensure the button container fills the available height */
}

.nav-aside li {
    text-align: center;
    flex-grow: 0; /* Prevent the list items from growing */
    margin: 0; /* Remove margins */
}

.nav-aside a {
    display: flex;
    flex-direction: column; /* Stack icon and text */
    align-items: center; /* Center icon and text */
    color: white;
    padding: 10px; /* Padding for buttons */
    text-decoration: none;
    background-color: #e2dfdf; /* Button background color */
    width: 100%;
    border-radius: 5px;
    box-sizing: border-box; /* Include padding and border in total width/height */
}

.nav-aside li:hover a {
    background-color: #575757; /* Change background on hover */
}

.menu-text {
    font-size: 0.9rem;
    margin-top: 5px; /* Space between icon and text */
}
</style>
