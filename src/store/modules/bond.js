import { fetchBondProducts, searchBondProduct } from "@/api/financeApi";

const bondModule = {
    namespaced: true,
    state: () => ({
        bondList: [],
        bondListLoaded: false,
        searchBondProducts: [],
    }),

    mutations: {
        setBondList(state, bonds) {
            state.bondList = bonds;
            state.bondListLoaded = true;
        },

        setSearchBondList(state, searchResults) {
            state.searchBondProducts = searchResults;
        },
    },

    actions: {
        async fetchBondList({ commit, state }) {
            if (!state.bondListLoaded) {
                try {
                    const bonds = await fetchBondProducts();
                    commit('setBondList', bonds);
                } catch (error) {
                    console.error('Error fetching bond list : ', error);
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
    },
    getters: {
        getBondList(state) {
            return state.bondList;
        },
        getSearchBondList(state) {
            return state.searchBondProducts;
        },
    },
};

export default bondModule;