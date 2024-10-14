import { defineStore } from 'pinia';
import { ref } from 'vue';
import portfolioApi from '@/api/portfolioApi.js';

export const usePortfolioStore = defineStore('portfolio', () => {
  // 상태 정의
  const portfolioList = ref([]); // 포트폴리오 목록
  const portfolioListLoaded = ref(false); // 포트폴리오 목록이 로드되었는지 여부
  const portfolioDetail = ref(null); // 개별 포트폴리오 상세 정보
  const newPortfolio = ref(null); // 새로 생성된 포트폴리오
  const newPortfolioItems = ref([]); // 새로운 포트폴리오 항목

  // 포트폴리오 목록을 가져오는 함수
  const fetchPortfolioListAction = async (forceRefresh = false) => {
    if (!portfolioListLoaded.value || forceRefresh) {
      try {
        const data = await portfolioApi.fetchPortfolioList(); // API 호출
        portfolioList.value = data; // 목록 저장
        portfolioListLoaded.value = true; // 로드 완료 표시
      } catch (error) {
        console.error('Error fetching portfolio list:', error);
      }
    }
  };

  // 개별 포트폴리오 상세 정보를 가져오는 함수
  const getPortfolioDetailAction = async (portfolioId) => {
    try {
      const data = await portfolioApi.getPortfolioDetail(portfolioId); // 상세 정보 가져오기
      portfolioDetail.value = data; // 상태에 저장
    } catch (error) {
      console.error('Error fetching portfolio detail:', error);
    }
  };

  // 새로운 포트폴리오를 생성하는 함수
  const postPortfolioAction = async (portfolioItems, portfolioName) => {
    try {
      const data = await portfolioApi.postPortfolio(portfolioItems, portfolioName); // 새 포트폴리오 생성
      newPortfolio.value = data;
      // return data;
    } catch (error) {
      console.error('Error posting portfolio:', error);
    }
  };

  // 포트폴리오를 삭제하는 함수
  const deletePortfolioAction = async (portfolioId) => {
    console.log(`Attempting to delete portfolio: ${portfolioId}`);
    try {
      await portfolioApi.deletePortfolio(portfolioId); // 삭제 요청
      portfolioList.value = portfolioList.value.filter(
        (portfolio) => portfolio.id !== portfolioId
      );
      console.log(`Portfolio ${portfolioId} deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting portfolio: ${portfolioId}`, error);
      throw error; // 오류를 상위로 던져서 처리
    }
  };

  // 새로운 포트폴리오를 목록에 추가하는 함수
  const addPortfolioToList = async (portfolio) => {
    // 이미 목록에 있는지 확인
    const existingIndex = portfolioList.value.findIndex(p => p.portfolioId === portfolio.portfolioId);
    if (existingIndex !== -1) {
      // 이미 존재하면 업데이트
      portfolioList.value[existingIndex] = portfolio;
    } else {
      // 존재하지 않으면 새로 추가
      portfolioList.value.push(portfolio);
    }
    portfolioListLoaded.value = true;
  };

  return {
    portfolioList,
    portfolioListLoaded,
    portfolioDetail,
    newPortfolio,
    newPortfolioItems,
    fetchPortfolioListAction,
    getPortfolioDetailAction,
    postPortfolioAction,
    deletePortfolioAction,
    addPortfolioToList,
  };
});

export default usePortfolioStore; // 추가된 default export
