import { createStore } from 'vuex';
import { fetchBondProducts, fetchDepositProducts, fetchSavingProducts , fetchFundProducts} from '@/api/financeApi';

const store = createStore({
  state: {
    bondList: [],         // 채권 리스트
    depositProducts: [],  // 예금 리스트
    savingProducts: [],   // 적금 리스트
    fundProducts: [],     // 펀드 리스트
    bondListLoaded: false, // 채권 리스트가 로드되었는지 여부
    depositListLoaded: false, // 예금 리스트가 로드되었는지 여부
    savingListLoaded: false,  // 적금 리스트가 로드되었는지 여부
    fundListLoaded: false,    // 펀드 리스트가 로드되었는지 여부
  },
  mutations: {
    setBondList(state, bonds) {
      state.bondList = bonds;
      state.bondListLoaded = true; // 데이터를 로드한 상태로 변경
    },
    setDepositList(state, deposits) {
      state.depositProducts = deposits;
      state.depositListLoaded = true; // 데이터를 로드한 상태로 변경
    },
    setSavingList(state, savings) {
      state.savingProducts = savings;
      state.savingListLoaded = true; // 데이터를 로드한 상태로 변경
    },
    setFundList(state, funds) {
      state.fundProducts = funds;
      state.fundListLoaded = true; // 데이터를 로드한 상태로 변경
    }
  },
  actions: {
    async fetchBondList({ commit, state }) {
      // 데이터가 이미 로드되었는지 확인
      if (!state.bondListLoaded) {
        try {
          const bonds = await fetchBondProducts();  // response.data 대신 직접 데이터로 접근
          commit('setBondList', bonds);  // 응답 데이터 설정
        } catch (error) {
          console.error('Error fetching bond list:', error);
        }
      }
    },
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
    async fetchFundList({ commit, state }) {
      if (!state.fundListLoaded) {
        try {
          const funds = await fetchFundProducts();
          commit('setFundList', funds);
        } catch (error) {
          console.error('Error fetching fund list:', error);
        }
      }
    },
  },
  getters: {
    getBondList(state) {
      return state.bondList;
    },
    getDepositList(state) {
      return state.depositProducts;
    },
    getSavingList(state) {
      return state.savingProducts;
    },
    getFundList(state) {
      return state.fundProducts;
    },
  },
});

export default store;