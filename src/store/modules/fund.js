// store/modules/fund.js
import { fetchFundProducts, searchFundProduct, getFundProductDetail } from '@/api/financeApi';

const fundModule = {
    namespaced: true,
    state: () => ({
        fundProducts: [], // This will hold the list of fund products
        fundListLoaded: false,
        searchFundProducts: [], // This will hold the search results
        fundProductDetail: {}, // Change this to an object to hold detailed info
    }),

    mutations: {
        setFundList(state, funds) {
            state.fundProducts = funds;
            state.fundListLoaded = true;
        },

        setSearchFundList(state, searchResults) {
            state.searchFundProducts = searchResults; // Store search results
        },

        setFundProductDetail(state, getDetail) {
            state.fundProductDetail = getDetail; // Keep as an object
        },
    },

    actions: {
        async fetchFundList({ commit, state }) {
            if (!state.fundListLoaded) {
                try {
                    const funds = await fetchFundProducts();
                    commit('setFundList', funds);
                } catch (error) {
                    console.error('Error fetching fund list: ', error);
                }
            }
        },

        async searchFundList({ commit }, keyword) {
            try {
                const searchResults = await searchFundProduct(keyword);
                commit('setSearchFundList', searchResults);
            } catch (error) {
                console.error('Error searching fund list: ', error);
            }
        },

        async fetchFundProductDetail({ commit }, productId) {
            try {
                const response = await getFundProductDetail(productId);
                // Assuming response contains an object with details about the fund
                commit('setFundProductDetail', response); // response should be an object
            } catch (error) {
                console.error('Error fetching fund product detail: ', error);
            }
        },
    },

    getters: {
        getFundList(state) {
            return state.fundProducts;
        },
        getSearchFundList(state) {
            return state.searchFundProducts;
        },
        getFundProductDetail(state) {
            return state.fundProductDetail; // This will return the object with fund details
        },
    },
};

export default fundModule;
