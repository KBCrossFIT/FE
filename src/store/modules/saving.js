import { fetchSavingProducts } from '@/api/financeApi';

const savingModule = {
  namespaced: true,
  state: () => ({
    savingProducts: [],
    savingListLoaded: false,
  }),
  mutations: {
    setSavingList(state, savings) {
      state.savingProducts = savings;
      state.savingListLoaded = true;
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
  },
  getters: {
    getSavingList(state) {
      return state.savingProducts;
    },
  },
};

export default savingModule;