<template>
  <div id="wrap">
    <div id="wrap-center">
      <h1 class="header">포트폴리오 만들기</h1>
      <div>
        <label for="nameInput"><h3>포트폴리오 이름</h3></label>
        <input type="text" v-model="portfolioName" id="nameInput" placeholder="포트폴리오 이름 입력">
      </div>

      <!-- 추천 포트폴리오 구성 비율 -->
      <div class="recommendProportion">
        <div class="PortfolioChartsContainer">
          <!-- 추천 차트 (왼쪽) -->
          <div class="PortfolioChart">
            <h3>추천 포트폴리오</h3>
            <div class="SelectionChar">
              <div class="CharCheck-radio">
                <label>
                  <input
                      type="radio"
                      name="InvestChar"
                      value="char1"
                      v-model="chart"
                  />
                  공격투자형
                </label>
                <label>
                  <input
                      type="radio"
                      name="InvestChar"
                      value="char2"
                      v-model="chart"
                  />
                  적극투자형
                </label>
                <label>
                  <input
                      type="radio"
                      name="InvestChar"
                      value="char3"
                      v-model="chart"
                  />
                  위험중립형
                </label>
                <label>
                  <input
                      type="radio"
                      name="InvestChar"
                      value="char4"
                      v-model="chart"
                  />
                  위험회피형
                </label>
                <label>
                  <input
                      type="radio"
                      name="InvestChar"
                      value="char5"
                      v-model="chart"
                  />
                  안정형
                </label>
              </div>
            </div>
            <apexchart
                type="pie"
                width="380"
                :options="chartOptions"
                :series="series"
            ></apexchart>
          </div>

          <!-- 현재 차트 (오른쪽) -->
          <div class="RealTimeProportionChart">
            <h3>나의 포트폴리오 </h3>
            <br>
            <apexchart
                type="pie"
                width="380"
                :options="chartOptions"
                :series="dynamicChartSeries"
            ></apexchart>
          </div>
        </div>
      </div>

      <!-- 상품 종류 섹션 -->
      <div class="ProductSelection">
        <h1>금융상품</h1>
        <div class="table-container">
          <table class="table">
            <thead>
            <tr>
              <th>
                <div class="Product-filter">
                  <select v-model="selectedCategory" class="styled-select">
                    <option value="">상품 종류</option>
                    <option value="S">예/적금</option>
                    <option value="B">채권</option>
                    <option value="F">펀드</option>
                  </select>
                </div>
              </th>
              <th>상품명</th>
              <th>상품 정보</th>
              <th>투자액</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            <template v-if="filteredProducts.length > 0">
              <!-- 단일 v-for로 필터링된 각 항목을 반복 -->
              <tr v-for="item in filteredProducts" :key="item.productId">
                <!-- 예금 타입 -->
                <template v-if="item.productType === 'S' && item.rates[0]?.rsrvType === 'null'">
                  <td>예금</td>
                  <td>{{ item.products[0]?.finPrdtNm }}</td>
                  <td>
                    은행명: {{ item.products[0]?.korCoNm }}<br/>
                    <!-- 상품명 중복 제거 -->
                    만기:
                    <select
                        v-model="item.selectedTerm"
                        class="styled-select"
                    >
                      <option
                          v-for="rate in item.rates"
                          :key="rate.saveTrm"
                          :value="rate.saveTrm"
                      >
                        {{ rate.saveTrm }}개월
                      </option>
                    </select>
                    <br/>
                    단리/복리: {{ getDepositInterestRate(item, 'intrRateTypeNm') }}
                    <br/>
                    기본 금리: {{ getDepositInterestRate(item, 'intrRate') }}%
                    <br/>
                    최고 금리: {{ getDepositInterestRate(item, 'intrRate2') }}%
                  </td>
                </template>

                <template v-if="item.productType === 'S' && item.rates[0]?.rsrvType != 'null'">
                  <td>적금</td>
                  <td>{{ item.products[0]?.finPrdtNm }}</td>
                  <td>
                    은행명: {{ item.products[0]?.korCoNm }}<br/>
                    <!-- 상품명 중복 제거 -->
                    만기:
                    <select
                        v-model="item.selectedTerm"
                        class="styled-select"
                    >
                      <option
                          v-for="saveTrm in getUniqueSaveTerms(item)"
                          :key="saveTrm"
                          :value="saveTrm"
                      >
                        {{ saveTrm }}개월
                      </option>
                    </select>
                    <br/>
                    적립방식:
                    <select
                        v-model="item.selectedrsrvTypeNm"
                        class="styled-select"
                    >
                      <option
                          v-for="rsrvType in getUniqueRsrvTypes(item)"
                          :key="rsrvType"
                          :value="rsrvType"
                      >
                        {{ rsrvType }}
                      </option>
                    </select>
                    <br/>
                    단리/복리: {{ getSavingInterestRate(item, 'intrRateTypeNm') }}
                    <br/>
                    기본 금리: {{ getSavingInterestRate(item, 'intrRate') }}%
                    <br/>
                    최고 금리: {{ getSavingInterestRate(item, 'intrRate2') }}%
                  </td>
                </template>


                <!-- 펀드 타입 -->
                <template v-if="item.productType === 'F'">
                  <td>펀드</td>
                  <td>{{ item.productNm }}</td>
                  <td>
                    회사명: {{ item.companyNm }}<br/>
                    1개월 수익률: {{ item.yield1 }}%<br/>
                    3개월 수익률: {{ item.yield3 }}%<br/>
                    6개월 수익률: {{ item.yield6 }}%<br/>
                    12개월 수익률: {{ item.yield12 }}%<br/>
                  </td>
                </template>

                <!-- 채권 타입 -->
                <template v-if="item.productType === 'B'">
                  <td>채권</td>
                  <td>{{ item.isinCdNm }}</td>
                  <td>
                    발행: {{ item.bondIsurNm }}<br/>
                    만기일: {{ item.bondExprDt }}<br/>
                    이자 지급 방식: {{ item.intPayCyclCtt }}<br/>
                  </td>
                </template>

                <td>
                  <input
                      type="number"
                      v-model.number="item.investmentAmount"
                      min="0"
                      :placeholder="getPlaceholder(item)"
                      class="styled-input"
                  />
                </td>
                <td>
                  <button @click="removeItem(item)">삭제</button>
                </td>
              </tr>
            </template>

            <!-- 빈 항목 표시 -->
            <template v-else>
              <tr v-for="n in 1" :key="n">
                <td colspan="5" class="empty-row">빈 항목</td>
              </tr>
            </template>
            </tbody>
          </table>
        </div>

        <div class="last-row">
          <v-btn class="cart-btn" @click="openModalCart">장바구니</v-btn>
          <!-- 장바구니 총 투자액 표시 -->
          <div class="totalInvestmentAmount">
            <h3>투자 금액: {{ formatCurrency(cartTotalInvestment) }}원</h3>
          </div>
        </div>
      </div>

      <ModalCart
          v-if="isModalCartOpen"
          @close="isModalCartOpen = false"
          @add-items="addItemsToPortfolio"
      />
    </div>

    <!-- 주식 종류 섹션 -->
    <div class="MakePortfolio-stockList-section">
      <h1>주식</h1>
      <div class="table-container">
        <table class="table">
          <thead>
          <tr>
            <th>주식 코드</th>
            <th>주식명</th>
            <th>카테고리</th>
            <th>종가</th>
            <th>수량</th>
            <th>총액</th>
          </tr>
          </thead>
          <tbody>
          <template v-if="portfolioStocks.length > 0">
            <tr
                v-for="stock in portfolioStocks"
                :key="stock.stockCode"
                class="stock-row"
            >
              <td>{{ stock.stockCode }}</td>
              <td>{{ stock.stockName }}</td>
              <td>{{ stock.mrktCtg }}</td>
              <td>{{ stock.clpr }}</td>
              <td>
                <input
                    type="number"
                    v-model.number="stock.quantity"
                    min="0"
                    placeholder="주식수"
                />
              </td>
              <td>
                {{
                  isNaN(stock.clpr * stock.quantity)
                      ? 0
                      : stock.clpr * stock.quantity
                }}원
              </td>
              <td>
                <button @click="removeStock(stock)">삭제</button>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr v-for="n in 1" :key="n">
              <td colspan="6" class="empty-row">빈 항목</td>
            </tr>
          </template>
          </tbody>
        </table>
      </div>

      <div class="last-row">
        <div class="MakePortfolio-btn">
          <v-btn @click="openModal">주식검색</v-btn>
        </div>
        <!-- 주식 총 투자액 표시 -->
        <div class="totalInvestmentAmount">
          <h3>투자 금액: {{ formatCurrency(totalInvestment) }}원</h3>
        </div>
      </div>


      <ModalStock
          v-if="isModalOpen"
          @close="isModalOpen = false"
          @add-stocks="addStocksToPortfolio"
          :existingStocks="isEditMode ? portfolioStocks : []"
      />
    </div>
    <div class="totalInvestmentAmount">
      <h3>투자 총액: {{ formatCurrency(stockTotalInvestment) }}원</h3>
    </div>

    <!-- 하단 버튼들 -->
    <div class="MakePortfolioEnd-btn">
      <v-btn type="submit" @click="savePortfolio">저장</v-btn>
      <v-btn @click="confirmCancel">취소</v-btn>
    </div>
  </div>
</template>

<script>
import {ref, computed, watch, onMounted} from 'vue';
import {useRouter, useRoute} from 'vue-router';
import VueApexCharts from 'vue3-apexcharts';
import {usePortfolioStore} from '@/store/modules/portfolio.js';
import * as financeApi from '@/api/financeApi';
import ModalStock from '@/components/Modal/ModalStock.vue';
import ModalCart from '@/components/Modal/ModalCart.vue';

export default {
  name: 'MakePortfolio',
  components: {apexchart: VueApexCharts, ModalStock, ModalCart},
  setup() {
    const router = useRouter();
    const route = useRoute();
    const portfolioStore = usePortfolioStore();

    const newPortfolio = computed(() => portfolioStore.newPortfolio);
    const selectedCategory = ref('');
    const selectedProducts = ref([]);
    const portfolioStocks = ref([]);
    const chart = ref('char1');
    const isModalOpen = ref(false);
    const isModalCartOpen = ref(false);
    const portfolioName = ref('');

    const fetchProductDetails = async () => {
      const productIds = JSON.parse(route.query.productIds);
      const productTypes = JSON.parse(route.query.productTypes);
      for (let index = 0; index < productIds.length; index++) {
        const productId = productIds[index];
        const productType = productTypes[index];
        try {
          let productDetail;
          switch (productType) {
            case 'B':
              productDetail = await financeApi.getBondProductDetail(productId);
              console.log(productDetail);
              break;
            case 'S':
              productDetail = await financeApi.getSavingProductDetail(productId);
              console.log(productDetail);
              break;
            case 'F':
              productDetail = await financeApi.getFundProductDetail(productId);
              console.log(productDetail);
              break;
            default:
              console.warn(`Unknown product type: ${productType}`);
              return;
          }
          filteredProducts.value.push({...productDetail, productType});
        } catch (error) {
          console.error('Failed to fetch product detail:', error);
        }
      }
    };

    // 선택된 상품들에 대한 필터링
    const filteredProducts = computed(() => {
      return selectedCategory.value
          ? selectedProducts.value.filter(
              (product) => product.productType === selectedCategory.value
          )
          : selectedProducts.value;
    });

    const getDepositInterestRate = (item, rateType) => {
      const selectedRate = item.rates.find((rate) => rate.saveTrm === item.selectedTerm);
      return selectedRate ? selectedRate[rateType] : '정보 없음';
    };

    const getSavingInterestRate = (item, rateType) => {
      const selectedRate = item.rates.find((rate) => rate.saveTrm === item.selectedTerm && rate.rsrvTypeNm === item.selectedrsrvTypeNm);
      return selectedRate ? selectedRate[rateType] : '정보 없음';
    }

    const getUniqueSaveTerms = (item) => {
      return [...new Set(item.rates.map((rate) => rate.saveTrm))];
    };

    const getUniqueRsrvTypes = (item) => {
      return [...new Set(item.rates.map((rate) => rate.rsrvTypeNm))];
    };


    // ModalCart에서 전달받은 상품들을 추가
    const addItemsToPortfolio = (items) => {
      items.forEach((item) => {
        if (!selectedProducts.value.some((product) => product.productId === item.productId) ||
            !selectedProducts.value.some((product) => product.productId === item.rates[0].productId)) {
          selectedProducts.value.push({
            ...item
          });
        }
      });
    };

    // ModalStock에서 전달받은 주식들을 추가
    const addStocksToPortfolio = (stocks) => {
      stocks.forEach((item) => {
        if (!portfolioStocks.value.some((product) => product.stockCode === item.stockCode)) {
          portfolioStocks.value.push(...stocks);
        }
      })
    };

    // 상품 삭제 함수
    const removeItem = (item) => {
      const index = selectedProducts.value.findIndex(
          (product) => product.productId === item.productId
      );
      if (index !== -1) {
        selectedProducts.value.splice(index, 1);
      }
    };

    //주식 삭제 함수
    const removeStock = (stocks) => {
      const index = portfolioStocks.value.findIndex(
          (stock) => stock.stockCode === stocks.stockCode
      );
      if (index !== -1) {
        portfolioStocks.value.splice(index, 1);
      }
    };

    // 장바구니 총 투자액 계산
    const cartTotalInvestment = computed(() => {
      return (
          depositInvestment.value +
          savingInvestment.value +
          bondInvestment.value +
          fundInvestment.value
      );
    });

    // 예금 총 투자액 계산
    const depositInvestment = computed(() => {
      return selectedProducts.value
          .filter(
              (item) =>
                  item.productType === 'S' &&
                  item.rates[0].rsrvType === 'null'
          )
          .reduce((total, item) => total + (Number(item.investmentAmount) || 0), 0);
    });

    // 적금 총 투자액 계산
    const savingInvestment = computed(() => {
      return selectedProducts.value
          .filter(
              (item) =>
                  item.productType === 'S' &&
                  item.rates[0].rsrvType != 'null'
          )
          .reduce((total, item) => total + (Number(item.investmentAmount) * Number(item.selectedTerm) || 0), 0);
    });

    // 채권 총 투자액 계산
    const bondInvestment = computed(() => {
      return selectedProducts.value
          .filter((item) => item.productType?.toUpperCase() === 'B')
          .reduce((total, item) => total + (Number(item.investmentAmount) || 0), 0);
    });

    // 펀드 총 투자액 계산
    const fundInvestment = computed(() => {
      return selectedProducts.value
          .filter((item) => item.productType?.toUpperCase() === 'F')
          .reduce((total, item) => total + (Number(item.investmentAmount) || 0), 0);
    });

    // 주식 총 투자액 계산
    const stockTotalInvestment = computed(() => {
      return portfolioStocks.value.reduce(
          (total, stock) =>
              total + (isNaN(Number(stock.clpr) * Number(stock.quantity)) ? 0 : Number(stock.clpr) * Number(stock.quantity)), 0);
    });

    // 총 투자금액 계산 (장바구니 총 투자액 + 주식 총 투자액)
    const totalInvestment = computed(() => {
      return cartTotalInvestment.value + stockTotalInvestment.value;
    });

    // 통화 형식으로 변환하는 함수
    const formatCurrency = (value) => {
      return Number(value).toLocaleString();
    };

    const getPlaceholder = (item) => {
      switch (item.productType) {
        case 'S':
          return item.rates[0]?.rsrvType === 'null' ? '총 납입액' : '월 납입액';
        case 'B':
          return '총 투자액';
        case 'F':
          return '총 투자액';
        default:
          return '투자액 입력';
      }
    };

    // 투자 비율 계산
    const investmentRatios = computed(() => {
      const total = totalInvestment.value || 1; // 0으로 나누는 것을 방지
      return {
        deposit: ((depositInvestment.value / total) * 100).toFixed(2),
        saving: ((savingInvestment.value / total) * 100).toFixed(2),
        bond: ((bondInvestment.value / total) * 100).toFixed(2),
        fund: ((fundInvestment.value / total) * 100).toFixed(2),
        stock: ((stockTotalInvestment.value / total) * 100).toFixed(2),
      };
    });

    // 차트 옵션
    const chartOptions = ref({
      chart: {
        type: 'pie',
        width: 380,
      },
      labels: ['예/적금', '채권', '펀드', '주식'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    });

    // 차트 데이터 시리즈 (예/적금, 채권, 펀드, 주식 순서)
    const series = computed(() => {
      switch (chart.value) {
        case 'char1':
          return [10, 10, 20, 60];
        case 'char2':
          return [15, 15, 20, 50];
        case 'char3':
          return [25, 25, 20, 30];
        case 'char4':
          return [35, 35, 20, 10];
        case 'char5':
          return [50, 30, 15, 5];
        default:
          return [0, 0, 0, 0];
      }
    });

    const openModal = () => {
      isModalOpen.value = true;
    };

    const openModalCart = () => {
      isModalCartOpen.value = true;
    };

    const goToMyPortfolio = () => router.push('/my-portfolio');
    const confirmCancel = () => {
      if (confirm('취소하시겠습니까?')) {
        router.push('/my-portfolio');
      }
    };

    const formatDataForSave = () => {
      const formattedProducts = selectedProducts.value
          .filter((product) => product.investmentAmount > 0)
          .map((product) => {
            let info = {};

            info.productType = product.productType;
            info.amount = product.investmentAmount;

            if (product.productType === 'S') {
              // 예금 (rsrvType이 null)
              if (product.rates[0]?.rsrvType === 'null') {
                const selectedRate = product.rates.find(
                    (rate) => rate.saveTrm === product.selectedTerm
                );
                info.productId = selectedRate ? selectedRate.productId : null;
                info.rsrvType = '예금'; // 예금으로 표시
                info.saveTerm = selectedRate ? selectedRate.saveTrm : null;
                info.intrType = selectedRate ? selectedRate.intrRateTypeNm : null;
                info.intrRate = selectedRate ? selectedRate.intrRate : null;

                // 적금 (rsrvType이 null이 아닌 경우)
              } else {
                const selectedRate = product.rates.find(
                    (rate) =>
                        rate.saveTrm === product.selectedTerm &&
                        rate.rsrvTypeNm === product.selectedrsrvTypeNm
                );
                info.productId = selectedRate ? selectedRate.productId : null;
                info.rsrvType = selectedRate ? selectedRate.rsrvTypeNm : null;
                info.saveTerm = selectedRate ? selectedRate.saveTrm : null;
                info.intrType = selectedRate ? selectedRate.intrRateTypeNm : null;
                info.intrRate = selectedRate ? selectedRate.intrRate : null;
              }
            } else if (product.productType === 'B') {
              info.productId = product.productId;
              info.bondExprDt = product.bondExprDt;
              info.irtChngDcdNm = product.irtChngDcdNm;
              info.bondSrfcInrt = product.bondSrfcInrt;
              info.intPayCyclCtt = product.intPayCyclCtt;
              info.clprPrc = product.clprPrc;
              info.kbpScrsItmsKcdNm = product.kbpScrsItmsKcdNm;
            } else if (product.productType === 'F') {
              info.productId = product.productId;
              info.yield1 = product.yield1;
              info.yield3 = product.yield3;
              info.yield6 = product.yield6;
              info.yield12 = product.yield12;
              info.riskLevel = product.riskLevel;
              info.advancedFee = product.advancedFee;
              info.totalPayoffRate = product.totalPayoffRate;
            }

            return {
              ...info,
            };
          });

      const formattedStocks = portfolioStocks.value
          .filter((stock) => stock.quantity > 0)
          .map((stock) => {
            let stockInfo = {};

            stockInfo.stockCode = stock.stockCode;
            stockInfo.amount = stock.quantity;

            return stockInfo;
          });

      return [...formattedProducts, ...formattedStocks];
    };

    // 저장 함수
    const savePortfolio = async () => {
      if (portfolioName.value === '') {
        alert("이름을 입력하세요!!");
      } else {
        if (selectedProducts.value.length === 0 && portfolioStocks.value.length === 0) {
          alert("아이템을 추가해주세요!!");
        } else {
          const newPortfolioItem = formatDataForSave();
          console.log(newPortfolioItem);
          if (newPortfolioItem.length > 0) {
            await portfolioStore.postPortfolioAction(formatDataForSave(), portfolioName.value);
            const id = newPortfolio.value.portfolioId;
            router.push(`/portfolio/${id}`);
          }
        }
      }
    };

    onMounted(fetchProductDetails);

    const dynamicChartSeries = ref([100]);

    const chartOption = ref({
      chart: {
        type: 'pie',
      },
      labels: ['예금', '적금', '채권', '펀드', '주식'],
      responsive: [{breakpoint: 480, options: {chart: {width: 300}}}],
    });

    // 실시간 차트 업데이트
    watch(totalInvestment, (newTotal) => {
      if (newTotal > 0) {
        dynamicChartSeries.value = [
          depositInvestment.value + savingInvestment.value,
          bondInvestment.value,
          fundInvestment.value,
          stockTotalInvestment.value,
        ];
      }
    });

    watch(portfolioName, (newVal) => {
      if (newVal.trim() === '') {
        portfolioName.value = '';
      }
    });

    return {
      selectedCategory,
      selectedProducts,
      portfolioStocks,
      chart,
      isModalOpen,
      isModalCartOpen,
      chartOptions,
      series,
      filteredProducts,
      addStocksToPortfolio,
      addItemsToPortfolio,
      openModal,
      openModalCart,
      confirmCancel,
      removeItem,
      getDepositInterestRate,
      getSavingInterestRate,
      getUniqueSaveTerms,
      getUniqueRsrvTypes,
      cartTotalInvestment,
      stockTotalInvestment,
      totalInvestment,
      formatCurrency,
      getPlaceholder,
      depositInvestment,
      savingInvestment,
      bondInvestment,
      fundInvestment,
      goToMyPortfolio,
      investmentRatios,
      savePortfolio,
      chartOption,
      dynamicChartSeries,
      removeStock,
      portfolioName
    };
  },
};
</script>

<style scoped>
#wrap {
  width: 100%;
  background-color: #fff;
}

#wrap-center {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 40px;
  background-color: #fff;
  border-radius: 8px;
}

.header {
  text-align: center;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 24px;
}

.v-btn {
  background-color: #4db6ac;
  color: white;
}

.MakePortfolioEnd-btn {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 15px;
}

.recommendProportion,
.ProductSelection,
.MakePortfolio-stockList-section {
  max-width: 1200px; /* 좌우 폭을 동일하게 설정 */
  margin: 20px auto; /* 가운데 정렬 */
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.Product-filter,
.CharCheck-radio {
  display: flex;
  gap: 15px;
  align-items: center;
  margin-bottom: 15px;
}

.table-container {
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.table th,
.table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.stock-row:hover {
  background-color: #f1f1f1;
}

.empty-row {
  color: #aaa;
  text-align: center;
  font-style: italic;
}

.table input[type='number'] {
  width: 70%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.table button {
  padding: 5px 10px;
  background-color: #f44336;
  color: #fff;
  border: none;
  cursor: pointer;
}

.table button:hover {
  background-color: #d32f2f;
}

.totalInvestmentAmount {
  margin-top: 20px;
  text-align: right;
  font-size: 16px;
  font-weight: bold;
  margin-left: auto;
}

.presentProportion_calc p {
  display: flex;
  justify-content: space-between;
}

.styled-select,
.styled-input {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.PortfolioChartsContainer {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px; /* 차트 간 간격 조정 */
}

.PortfolioChart,
.RealTimeProportionChart {
  flex: 1;
}

.last-row {
  display: flex;
}
</style>