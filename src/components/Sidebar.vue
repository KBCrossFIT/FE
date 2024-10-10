<template>
  <div class="app-container">
    <div class="uiNavAside" ref="sidebar">
      <ul class="nav-aside">
        <div class="button-container">
          <!-- Sidebar Menu Components -->
          <SidebarMenu1 :portfolios="portfolios" @openSidePanel="openSidePanel" />
          <SidebarMenu2 :cart="cart" @openSidePanel="openSidePanel" />
          <SidebarMenu3 :recentProducts="recentProducts" @openSidePanel="openSidePanel" />
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
import {onMounted, ref} from 'vue';
import SidebarMenu1 from './sideBar/PortfolioSection.vue';
import SidebarMenu2 from './sideBar/CartSection.vue';
import SidebarMenu3 from './sideBar/RecentProductsSection.vue';
import SidePanel from './sideBar/SidePanel.vue';
import router from "@/router/index.js";

export default {
  name: 'SideBar',
  components: {
    SidebarMenu1,
    SidebarMenu2,
    SidebarMenu3,
    SidePanel,
  },
  setup() {
    const portfolios = ref([]);          // 포트폴리오 데이터
    const cart = ref([]);                // 장바구니 데이터
    const recentProducts = ref([]);      // 최근 본 상품 데이터

    const isSidePanelOpen = ref(false);  // 사이드 패널 표시 여부
    const panelTitle = ref('');          // 사이드 패널 제목
    const activeSection = ref('');       // 활성 섹션 ID
    const panelData = ref([]);           // 사이드 패널에 표시할 데이터

    // 라우터 이동 후 사이드 패널을 닫기 위한 감시 설정
    onMounted(() => {
      router.afterEach(() => {
        isSidePanelOpen.value = false;
      });
    });

    // 사이드 패널을 열고 데이터 및 설정을 갱신하는 함수
    const openSidePanel = (payload) => {
      panelTitle.value = payload.title;
      activeSection.value = payload.section;
      panelData.value = payload.data;
      isSidePanelOpen.value = true;
    };

    return {
      portfolios,
      cart,
      recentProducts,
      isSidePanelOpen,
      panelTitle,
      activeSection,
      panelData,
      openSidePanel,
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
  right: 0;
  top: 0;
  width: 90px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  z-index: 9999;
  border-radius: 5px;
  padding: 10px;
  background-color: rgb(233, 233, 233);
}
.button-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>
