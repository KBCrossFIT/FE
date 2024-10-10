import {defineStore} from 'pinia';
import {fetchRecentViewList, addRecentViewItem, resetRecentViewList} from '@/api/recentViewApi.js';

export const useRecentViewStore = defineStore('recentView', {
    state: () => ({
        recentItems: [],
        recentItemsLoaded: false,
        newRecentViewItem: null,
    }),
    actions: {
        async fetchRecentItems() {
            try {
                const data = await fetchRecentViewList();
                this.recentItems = data;
                this.recentItemsLoaded = true;
            } catch (error) {
                console.error('Error fetching recent items:', error);
            }
        },

        async addRecentViewItem(recentViewedItem) {
            try {
                await addRecentViewItem(recentViewedItem);
            } catch (error) {
                console.error('Error adding recent view item:', error);
            }
        },

        async resetRecentItems() {
            try {
                await resetRecentViewList(); // 상태를 초기화
            } catch (error) {
                console.error('Error resetting recent items:', error);
            }
        },
    },
});