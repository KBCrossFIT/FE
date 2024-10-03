// store/modules/deposit.js
import { fetchDepositProducts, searchDepositProduct } from '@/api/financeApi';

const depositModule = {
    namespaced: true,
    state: () => ({
        depositProducts: [],
        depositListLoaded: false,
        searchDepositProducts: [],
    }),

    mutations: {
        setDepositList(state, deposits) {
            state.depositProducts = deposits;
            state.depositListLoaded = true;
        },

        setSearchDepositList(state, searchResults) {
            state.searchDepositProducts = searchResults;
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

        async searchDepositList({ commit }, keyword) {
            try {
                const searchResults = await searchDepositProduct(keyword);
                commit('setSearchDepositList', searchResults);
            } catch (error) {
                console.error('Error searching deposit list: ', error);
            }
        },
    },

    getters: {
        getDepositList(state) {
            return state.depositProducts;
        },
        getSearchDepositList(state) {
            return state.searchDepositProducts;
        },
    },
};

export default depositModule;
