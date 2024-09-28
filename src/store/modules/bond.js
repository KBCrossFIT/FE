import { fetchBondProducts } from "@/api/financeApi";

const bondModule = {
    namespaced: true,
    state: () => ({
        bondList: [],
        bondListLoaded: false,
    }),
    mutations: {
        setBondList(state, bonds) {
            state.bondList = bonds;
            state.bondListLoaded = true;
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
    },
    getters: {
        getBondList(state) {
            return state.bondList;
        },
    },
};

export default bondModule;