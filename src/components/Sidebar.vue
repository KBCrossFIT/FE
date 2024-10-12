<template>
  <div class="app-container" ref="sidebarContainer">
    <div class="uiNavAside" ref="sidebar">
      <ul class="nav-aside">
        <div class="button-container">
          <!-- Sidebar Menu Components -->
          <SidebarMenu1
            :portfolios="portfolios"
            @openSidePanel="toggleSidePanel"
          />
          <SidebarMenu2 :cart="cart" @openSidePanel="toggleSidePanel" />
          <SidebarMenu3
            :recentProducts="recentProducts"
            @openSidePanel="toggleSidePanel"
          />
        </div>
      </ul>
    </div>

    <!-- Side Panel Component -->
    <SidePanel
      v-if="isSidePanelOpen"
      :title="panelTitle"
      :data="panelData"
      :section="activeSection"
      @close="isSidePanelOpen = false"
    />
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import SidebarMenu1 from './sideBar/PortfolioSection.vue';
import SidebarMenu2 from './sideBar/CartSection.vue';
import SidebarMenu3 from './sideBar/RecentProductsSection.vue';
import SidePanel from './sideBar/SidePanel.vue';
import router from '@/router/index.js';

export default {
  name: 'SideBar',
  components: {
    SidebarMenu1,
    SidebarMenu2,
    SidebarMenu3,
    SidePanel,
  },
  setup() {
    const portfolios = ref([]);
    const cart = ref([]);
    const recentProducts = ref([]);

    const isSidePanelOpen = ref(false);
    const panelTitle = ref('');
    const activeSection = ref('');
    const panelData = ref([]);
    const sidebarContainer = ref(null);

    // 패널 열기/닫기 함수 (클릭한 메뉴와 동일한 섹션이 열려 있으면 닫음)
    const toggleSidePanel = (payload) => {
      if (isSidePanelOpen.value && activeSection.value === payload.section) {
        isSidePanelOpen.value = false;
      } else {
        panelTitle.value = payload.title;
        activeSection.value = payload.section;
        panelData.value = payload.data;
        isSidePanelOpen.value = true;
      }
    };

    // 라우터 이동 후 사이드 패널 닫기
    onMounted(() => {
      router.afterEach(() => {
        isSidePanelOpen.value = false;
      });
      document.addEventListener('click', handleClickOutside);
    });

    onBeforeUnmount(() => {
      document.removeEventListener('click', handleClickOutside);
    });

    // 사이드바 외부 클릭 시 닫기
    const handleClickOutside = (event) => {
      if (
        sidebarContainer.value &&
        !sidebarContainer.value.contains(event.target)
      ) {
        isSidePanelOpen.value = false;
      }
    };

    return {
      portfolios,
      cart,
      recentProducts,
      isSidePanelOpen,
      panelTitle,
      activeSection,
      panelData,
      toggleSidePanel,
      sidebarContainer,
    };
  },
};
</script>

<style scoped>
.app-container {
  display: flex;
}
.uiNavAside {
  position: fixed;
  right: -4px;
  top: 120px;
  width: 90px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  z-index: 9999;
  /* border-radius: 5px; */
  border: 1px solid #7bd5c3;
  padding: 10px;
  /* background-color: rgb(233, 233, 233); */
}
.button-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

/* .overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
} */
</style>
