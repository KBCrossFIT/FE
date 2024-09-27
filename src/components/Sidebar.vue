<template>
    <div class="uiNavAside" ref="sidebar">
        <ul class="nav-aside">
            <SidebarMenu1
                :activeDropdown="activeDropdown"
                :portfolios="portfolios"
                @toggleDropdown="toggleDropdown"
                @goToCreatePortfolio="goToCreatePortfolio"
            />
            <SidebarMenu2 :activeDropdown="activeDropdown" @toggleDropdown="toggleDropdown" />
            <SidebarMenu3 :activeDropdown="activeDropdown" @toggleDropdown="toggleDropdown" />
        </ul>
    </div>
</template>

<script>
import SidebarMenu1 from './sideBar/SidebarMenu1.vue';
import SidebarMenu2 from './sideBar/SidebarMenu2.vue';
import SidebarMenu3 from './sideBar/SidebarMenu3.vue';
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
    right: 20px;
    top: 50%;
    transform: translateY(-50%); /* Vertical center alignment */
    width: 80px;
    height: 320px; /* 동일한 높이 */
    background-color: #785d42;
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
    background-color: #e2dfdf;
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
</style>
