import { fetchSavingProducts, searchSavingProduct } from '@/api/financeApi';

const savingModule = {
  namespaced: true,
  state: () => ({
    savingProducts: [],
    savingListLoaded: false,
    searchSavingProducts: [],
  }),

  mutations: {
    setSavingList(state, savings) {
      state.savingProducts = savings;
      state.savingListLoaded = true;
    },
    
    setSearchSavingList(state, searchResults) {
      state.searchSavingProducts = searchResults;
    },
  },

  actions: {
    async fetchSavingList({ commit, state }) {
      if (!state.savingListLoaded) {
        try {
          const savings = await fetchSavingProducts();
          commit('setSavingList', savings);
        } catch (error) {
          console.error('Error fetching saving list:', error);
        }
      }
    },

    async searchSavingList({ commit }, keyword) {
      try {
        const searchResults = await searchSavingProduct(keyword);
        commit('setSearchSavingList', searchResults);
      } catch (error) {
        console.error('Error searching saving list: ', error);
      }
    },
  },
  getters: {
    getSavingList(state) {
      return state.savingProducts;
    },

    getSearchSavingList(state) {
      return state.searchSavingProducts;
    },
  },
};

export default savingModule;