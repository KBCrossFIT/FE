<template>
  <div class="menu-item" @click="openRecentProducts">
    <a href="javascript:void(0)" class="sidebar-link">
      <i class="fas fa-history icon"></i>
      <span class="menu-text">최근 본 상품</span>
    </a>
  </div>
</template>

<script>
import { useRecentViewStore } from '@/store/modules/recentView.js';

export default {
  name: 'RecentProductsSection',
  methods: {
    async openRecentProducts() {
      const recentViewStore = useRecentViewStore();
      if (!recentViewStore.recentItemsLoaded) {
        await recentViewStore.fetchRecentItems();
      }
      this.$emit('openSidePanel', {
        title: '최근 본 상품',
        section: 'RecentProductsSection',
        data: recentViewStore.recentItems,
      });
    },
  },
};
</script>

<style scoped>
.menu-item {
  position: relative;
}

.sidebar-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  padding: 10px;
  text-decoration: none;
  background-color: #575757;
  border-radius: 5px;
  width: 100%;
  height: 6vh;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: background-color 0.3s ease;
}

.sidebar-link:hover {
  background-color: #d7dbde;
}

.icon {
  font-size: 24px;
  margin-bottom: 5px;
}

.menu-text {
  font-size: 0.7rem;
  opacity: 1;
  transition: none;
}
</style>
