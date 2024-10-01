// store/modules/deposit.js
import { fetchDepositProducts } from '@/api/financeApi';

const depositModule = {
  namespaced: true,  
  state: () => ({
    depositProducts: [],
    depositListLoaded: false,
  }),
  mutations: {
    setDepositList(state, deposits) {
      state.depositProducts = deposits;
      state.depositListLoaded = true;
    },
  },
  actions: {
    async fetchDepositList({ commit, state }) {
      if (!state.depositListLoaded) {
        try {
          const deposits = await fetchDepositProducts();
          commit('setDepositList', deposits);
        } catch (error) {
          console.error('Error fetching deposit list:', error);
        }
      }
    },
  },
  getters: {
    getDepositList(state) {
      return state.depositProducts;
    },
  },
};

export default depositModule;