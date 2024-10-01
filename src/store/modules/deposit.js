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
                    console.log('Fetched deposits:', deposits); // 로그 추가
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

        async fetchDepositProductDetail({ state }, productId) {
            if (!Array.isArray(state.depositProducts)) {
                console.error('depositProducts가 배열이 아닙니다:', state.depositProducts);
                return null; // 또는 적절한 에러 처리를 합니다.
            }
            return state.depositProducts.find((product) => product.productID === productId) || null;
        },
    },

    getters: {
        getDepositList(state) {
            return state.depositProducts;
        },
        getSearchDepositList(state) {
            return state.searchDepositProducts;
        },
        getDepositProductDetail: (state) => (productId) => {
            return state.depositProducts.find((product) => product.productID === productId) || null;
        },
    },
};

export default depositModule;
