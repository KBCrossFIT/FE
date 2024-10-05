// portfolio.js에서 'default export'로 변경
import { reactive, toRefs } from 'vue';
import {
  fetchPortfolioList,
  getPortfolioDetail,
  postPortfolio,
  deletePortfolio,
} from '@/api/portfolioApi';

const usePortfolio = () => {
  const state = reactive({
    portfolioList: [],
    portfolioListLoaded: false,
    portfolioDetail: null,
    newPortfolio: null,
    newPortfolioItems: [],
  });

  const fetchPortfolioListAction = async () => {
    if (!state.portfolioListLoaded) {
      try {
        const data = await fetchPortfolioList();
        state.portfolioList = data;
        state.portfolioListLoaded = true;
      } catch (error) {
        console.error('Error fetching portfolio list:', error);
      }
    }
  };

  const getPortfolioDetailAction = async (portfolioId) => {
    try {
      const data = await getPortfolioDetail(portfolioId);
      state.portfolioDetail = data;
    } catch (error) {
      console.error('Error fetching portfolio detail:', error);
    }
  };

  const postPortfolioAction = async (portfolio) => {
    try {
      const data = await postPortfolio(portfolio);
      state.newPortfolio = data;
      state.portfolioList.push(data);
    } catch (error) {
      console.error('Error posting portfolio:', error);
    }
  };

  const deletePortfolioAction = async (portfolioId) => {
    try {
      await deletePortfolio(portfolioId);
      state.portfolioList = state.portfolioList.filter(
        (portfolio) => portfolio.id !== portfolioId
      );
    } catch (error) {
      console.error('Error deleting portfolio:', error);
    }
  };

  return {
    ...toRefs(state),
    fetchPortfolioListAction,
    getPortfolioDetailAction,
    postPortfolioAction,
    deletePortfolioAction,
  };
};

// 'default' export로 함수 내보내기
export default usePortfolio;
