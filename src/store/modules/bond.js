import { fetchBondProducts, searchBondProduct, getBondProductDetail } from '@/api/financeApi';

const bondModule = {
    namespaced: true,
    state: () => ({
        bondList: [], // This will hold the list of bonds
        bondListLoaded: false,
        searchBondProducts: [], // This will hold the search results
        bondProductDetail: {}, // Change this to an object to hold detailed info
    }),

    mutations: {
        setBondList(state, bonds) {
            state.bondList = bonds;
            state.bondListLoaded = true;
        },

        setSearchBondList(state, searchResults) {
            state.searchBondProducts = searchResults;
        },

        setBondProductDetail(state, getDetail) {
            state.bondProductDetail = getDetail; // Keep as an object
        },
    },

    actions: {
        async fetchBondList({ commit, state }) {
            if (!state.bondListLoaded) {
                try {
                    const bonds = await fetchBondProducts();
                    commit('setBondList', bonds);
                } catch (error) {
                    console.error('Error fetching bond list: ', error);
                }
            }
        },

        async searchBondList({ commit }, keyword) {
            try {
                const searchResults = await searchBondProduct(keyword);
                commit('setSearchBondList', searchResults);
            } catch (error) {
                console.error('Error searching bond list: ', error);
            }
        },

        async fetchBondProductDetail({ commit }, productId) {
            try {
                const response = await getBondProductDetail(productId);
                // Assuming response contains an object with details and an array of bonds
                commit('setBondProductDetail', response); // response should be an object
            } catch (error) {
                console.error('Error fetching bond product detail: ', error);
            }
        },
    },
    getters: {
        getBondList(state) {
            return state.bondList;
        },
        getSearchBondList(state) {
            return state.searchBondProducts;
        },
        getProductDetail(state) {
            return state.bondProductDetail; // This will return the object with bond details
        },
    },
};

export default bondModule;
