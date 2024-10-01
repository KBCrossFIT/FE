// store/modules/fund.js
import { fetchFundProducts, searchFundProduct } from '@/api/financeApi';

const fundModule = {
    namespaced: true,
    state: () => ({
        fundProducts: [],
        fundListLoaded: false,
        searchFundProducts: [],
    }),

    mutations: {
        setFundList(state, funds) {
            state.fundProducts = funds;
            state.fundListLoaded = true;
        },

        setSearchFundList(state, searchResults) {
            state.searchFundProducts = searchResults; // 검색 결과 저장
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
    },

    getters: {
        getFundList(state) {
            return state.fundProducts;
        },
        getSearchFundList(state) {
            return state.searchFundProducts;
        },
        getFundProductDetail: (state) => (productId) => {
            // 상품 ID로 세부 정보 필터링
            return state.fundProducts.find((product) => product.productID === productId) || null;
        },
    },
};

export default fundModule;
