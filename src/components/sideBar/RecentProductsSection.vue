<template>
  <li class="menu-item">
    <a href="javascript:void(0)" class="sidebar-link" @click.stop="openRecentProducts">
      <i class="fas fa-history icon"></i>
      <span class="menu-text">최근 본 상품</span>
    </a>

    <!-- 최근 본 상품 목록 -->
    <ul v-if="recentItems.length > 0">
      <li v-for="item in recentItems" :key="item.productId" class="recent-product-item">
        <span>{{ getProductTypeLabel(item.productType) }} - {{ item.productName }}</span>
      </li>
    </ul>
    <p v-else>최근 본 상품이 없습니다.</p>
  </li>
</template>

<script>
import { useRecentViewStore } from '@/store/modules/recentView.js';

export default {
  name: 'RecentProductsSection',
  data() {
    return {
      recentItems: [],
    };
  },
  created() {
    this.loadRecentProducts();
  },
  methods: {
    async loadRecentProducts() {
      const recentViewStore = useRecentViewStore();
      if (!recentViewStore.recentItemsLoaded) {
        await recentViewStore.fetchRecentItems();
      }
      this.recentItems = recentViewStore.recentItems;
    },
    getProductTypeLabel(productType) {
      switch (productType) {
        case 'S':
          return '예/적금';
        case 'F':
          return '펀드';
        case 'B':
          return '채권';
        default:
          return '기타';
      }
    },
    openRecentProducts() {
      this.$emit('openSidePanel', {
        title: '최근 본 상품',
        section: 'RecentProductsSection',
        data: this.recentItems,
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
  padding: 15px;
  color: grey;
  text-decoration: none;
  width: 100%;
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