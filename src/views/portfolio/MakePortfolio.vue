<template>
    <div id="wrap">
        <div id="wrap-center">
            <h1 class="header">포트폴리오 구성페이지</h1>
            <v-btn @click="startTutorial">튜토리얼 시작</v-btn>
            <hr />

            <div v-if="isTutorialActive" class="overlay"></div>

            <!-- 튜토리얼 안내 박스 -->
            <div v-if="isTutorialActive" class="tutorial-message" :style="tutorialStyles">
                {{ currentStep.text }}
                <div class="tutorial-buttons">
                    <v-btn @click="nextStep">다음</v-btn>
                    <v-btn @click="endTutorial">종료</v-btn>
                </div>
            </div>

            <!-- 추천 포트폴리오 구성 비율 -->
            <div class="recommendProportion">
                <h3>유형 별 추천 포트폴리오 구성 비율</h3>
                <div class="PortfolioChart">
                    <div class="SelectionChar">
                        <label>유형 선택 라디오 버튼</label>
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
                    <div class="ProportionChart">
                        <apexchart
                            type="pie"
                            width="380"
                            :options="chartOptions"
                            :series="series"
                        ></apexchart>
                    </div>
                </div>
            </div>

            <!-- 현재 포트폴리오 구성 비율 -->

            <!-- 각 투자액 표시 -->
            <div class="presentProportion_calc">
                <p>
                    예금 투자액: {{ formatCurrency(depositInvestment) }}원
                    {{ investmentRatios.deposit }} %
                </p>
                <p>
                    적금 투자액: {{ formatCurrency(savingInvestment) }}원
                    {{ investmentRatios.saving }} %
                </p>
                <p>
                    채권 투자액: {{ formatCurrency(bondInvestment) }}원
                    {{ investmentRatios.bond }} %
                </p>
                <p>
                    펀드 투자액: {{ formatCurrency(fundInvestment) }}원
                    {{ investmentRatios.fund }} %
                </p>
                <p>
                    주식 투자액: {{ formatCurrency(stockTotalInvestment) }}원
                    {{ investmentRatios.stock }} %
                </p>
            </div>

            <!-- 총 투자금액 표시 -->
            <div class="totalInvestmentAmount">
                <h3>총 투자금액: {{ formatCurrency(totalInvestment) }}원</h3>
            </div>

            <!-- 상품 종류 섹션 -->
            <div class="ProductSelection">
                <h1>상품종류</h1>
                <v-btn class="cart-btn" @click="openModalCart">장바구니에서 가져오기</v-btn>
                <hr />
                <div class="Product-filter">
                    <select v-model="selectedCategory">
                        <option value="">모든 카테고리</option>
                        <option value="S">예/적금</option>
                        <option value="B">채권</option>
                        <option value="F">펀드</option>
                    </select>
                </div>
                <div class="table-container">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>상품명</th>
                                <th>카테고리</th>
                                <th>상품 정보</th>
                                <th>투자액</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-if="filteredProducts.length > 0">
                                <tr v-for="item in filteredProducts" :key="item.productId">
                                    <td>{{ item.productName }}</td>
                                    <td>
                                        <span v-if="item.productType === 'S'">
                                            {{ item.rsrvType === 'S' ? '적금' : '예금' }}
                                        </span>
                                        <span v-else-if="item.productType === 'B'">채권</span>
                                        <span v-else-if="item.productType === 'F'">펀드</span>
                                        <span v-else>기타</span>
                                    </td>
                                    <td>
                                        제공자: {{ item.provider }}<br />
                                        기대 수익률: {{ item.expectedReturn }}%
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            v-model.number="item.investmentAmount"
                                            min="0"
                                            placeholder="투자액 입력"
                                        />
                                    </td>
                                    <td>
                                        <button @click="removeItem(item)">삭제</button>
                                    </td>
                                </tr>
                            </template>
                            <template v-else>
                                <tr v-for="n in 3" :key="n">
                                    <td colspan="5" class="empty-row">빈 항목</td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>

                <!-- 장바구니 총 투자액 표시 -->
                <div class="totalInvestmentAmount">
                    <h3>장바구니 총 투자액: {{ formatCurrency(cartTotalInvestment) }}원</h3>
                </div>

                <ModalCart
                    v-if="isModalCartOpen"
                    @close="isModalCartOpen = false"
                    @add-items="addItemsToPortfolio"
                />
            </div>

            <!-- 주식 종류 섹션 -->
            <div class="MakePortfolio-stockList-section">
                <h1>주식 종류</h1>
                <div class="MakePortfolio-btn">
                    <v-btn @click="openModal">{{ modalButtonLabel }}</v-btn>
                </div>
                <hr />
                <div class="table-container">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>주식 코드</th>
                                <th>주식명</th>
                                <th>카테고리</th>
                                <th>종가</th>
                                <th>수량</th>
                                <th>주식 투자액</th>
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
                                    <td>{{ stock.category }}</td>
                                    <td>{{ stock.clpr }}</td>
                                    <td>{{ stock.quantity }}</td>
                                    <td>{{ stock.clpr * stock.quantity }}</td>
                                </tr>
                            </template>
                            <template v-else>
                                <tr v-for="n in 3" :key="n">
                                    <td colspan="6" class="empty-row">빈 항목</td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>

                <!-- 주식 총 투자액 표시 -->
                <div class="totalInvestmentAmount">
                    <h3>주식 총 투자액: {{ formatCurrency(stockTotalInvestment) }}원</h3>
                </div>

                <ModalStock
                    v-if="isModalOpen"
                    @close="isModalOpen = false"
                    @add-stocks="addStocksToPortfolio"
                    :existingStocks="isEditMode ? portfolioStocks : []"
                />
            </div>

            <!-- 하단 버튼들 -->
            <div class="MakePortfolioEnd-btn">
                <v-btn type="submit" @click="goToMyPortfolio">저장</v-btn>
                <v-btn @click="confirmCancel">취소</v-btn>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import VueApexCharts from 'vue3-apexcharts';
import ModalStock from '@/components/Modal/ModalStock.vue';
import ModalCart from '@/components/Modal/ModalCart.vue';

export default {
    name: 'MakePortfolio',
    components: { apexchart: VueApexCharts, ModalStock, ModalCart },
    setup() {
        const selectedCategory = ref('');
        const selectedProducts = ref([]);
        const portfolioStocks = ref([]);
        const chart = ref('char1');
        const isModalOpen = ref(false);
        const isModalCartOpen = ref(false);

        // 튜토리얼 관련 상태
        const isTutorialActive = ref(false);
        const currentStepIndex = ref(0);
        const tutorialStyles = ref({});

        // 튜토리얼 단계 정의
        const tutorialSteps = [
            {
                element: 'wrap-center',
                text: '포트폴리오 구성페이지에 오신 것을 환영합니다! 이곳에서 포트폴리오를 구성할 수 있습니다.',
            },
            {
                element: 'PortfolioChart',
                text: '여기서는 추천 포트폴리오 구성 비율을 확인할 수 있습니다. 투자 유형을 선택하세요.',
            },
            {
                element: 'presentProportion',
                text: '현재 포트폴리오의 구성 비율을 확인할 수 있습니다.',
            },
            {
                element: 'ProductSelection',
                text: '상품종류 섹션에서는 장바구니에서 상품을 가져오거나, 카테고리에 따라 상품을 필터링할 수 있습니다.',
            },
            {
                element: 'MakePortfolio-stockList-section',
                text: '주식 종류 섹션에서는 주식을 추가하거나 수정할 수 있습니다.',
            },
            {
                element: 'MakePortfolioEnd-btn',
                text: '모든 구성이 완료되면 저장 버튼을 눌러 포트폴리오를 저장하세요.',
            },
        ];

        const currentStep = computed(() => tutorialSteps[currentStepIndex.value]);

        const startTutorial = () => {
            isTutorialActive.value = true;
            highlightElement(currentStep.value.element);
        };

        const highlightElement = (elementId) => {
            const element = document.getElementById(elementId);
            if (element) {
                const rect = element.getBoundingClientRect();
                tutorialStyles.value = {
                    top: `${rect.top + window.scrollY}px`,
                    left: `${rect.left + window.scrollX}px`,
                    width: `${rect.width}px`,
                    height: `${rect.height}px`,
                };
            }
        };

        const nextStep = () => {
            if (currentStepIndex.value < tutorialSteps.length - 1) {
                currentStepIndex.value++;
                currentStep.value = tutorialSteps[currentStepIndex.value];
                highlightElement(currentStep.value.element);
            } else {
                endTutorial();
            }
        };

        const endTutorial = () => {
            isTutorialActive.value = false;
            currentStepIndex.value = 0;
        };

        // ModalCart에서 전달받은 상품들을 추가
        const addItemsToPortfolio = (items) => {
            items.forEach((item) => {
                // 중복 추가 방지
                if (
                    !selectedProducts.value.some((product) => product.productId === item.productId)
                ) {
                    selectedProducts.value.push({
                        ...item,
                        investmentAmount: item.investmentAmount || 0,
                    });
                }
            });
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

        // ModalStock에서 전달받은 주식들을 추가
        const addStocksToPortfolio = (stocks) => {
            if (isEditMode.value) {
                portfolioStocks.value = stocks;
            } else {
                portfolioStocks.value.push(...stocks);
            }
        };

        // 선택된 상품들에 대한 필터링
        const filteredProducts = computed(() => {
            return selectedProducts.value.filter(
                (product) =>
                    !selectedCategory.value || product.productType === selectedCategory.value
            );
        });

        const isEditMode = computed(() => portfolioStocks.value.length > 0);
        const modalButtonLabel = computed(() => (isEditMode.value ? '수정하기' : '추가하기'));

        // 장바구니 총 투자액 계산
        const cartTotalInvestment = computed(() => {
            return selectedProducts.value.reduce(
                (total, item) => total + (Number(item.investmentAmount) || 0),
                0
            );
        });

        // 예금 총 투자액 계산
        const depositInvestment = computed(() => {
            return selectedProducts.value
                .filter(
                    (item) =>
                        item.productType === 'S' &&
                        (item.rsrvType === null ||
                            item.rsrvType === undefined ||
                            item.rsrvType === '')
                )
                .reduce((total, item) => total + (Number(item.investmentAmount) || 0), 0);
        });

        // 적금 총 투자액 계산
        const savingInvestment = computed(() => {
            return selectedProducts.value
                .filter(
                    (item) =>
                        item.productType === 'S' &&
                        item.rsrvType !== null &&
                        item.rsrvType !== undefined &&
                        item.rsrvType !== ''
                )
                .reduce((total, item) => total + (Number(item.investmentAmount) || 0), 0);
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
                (total, stock) => total + Number(stock.clpr) * Number(stock.quantity),
                0
            );
        });

        // 총 투자금액 계산 (장바구니 총 투자액 + 주식 총 투자액)
        const totalInvestment = computed(() => {
            return cartTotalInvestment.value + stockTotalInvestment.value;
        });

        // 통화 형식으로 변환하는 함수
        const formatCurrency = (value) => {
            return Number(value).toLocaleString();
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

        const router = useRouter();
        const goToMyPortfolio = () => router.push('/my-portfolio');
        const confirmCancel = () => {
            if (confirm('취소하시겠습니까?')) {
                router.push('/my-portfolio');
            }
        };
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
            isEditMode,
            modalButtonLabel,
            isTutorialActive,
            currentStep,
            startTutorial,
            nextStep,
            endTutorial,
            tutorialStyles,
            confirmCancel,
            removeItem,
            cartTotalInvestment,
            stockTotalInvestment,
            totalInvestment,
            formatCurrency,
            depositInvestment,
            savingInvestment,
            bondInvestment,
            fundInvestment,
            goToMyPortfolio,
            investmentRatios,
        };
    },
};
</script>

<style scoped>
#wrap {
    width: 100%;
    background-color: black;
}

#wrap-center {
    max-width: 1280px;
    margin: 0 auto;
    padding: 20px 40px;
    background-color: #fff;
    border-radius: 8px;
}

.header {
    text-align: center;
    margin-bottom: 20px;
}

.v-btn {
    background-color: #4db6ac;
    color: white;
}

.tutorial-buttons,
.MakePortfolioEnd-btn {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    margin-top: 15px;
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
}

.tutorial-message {
    background-color: white;
    padding: 20px;
    border: 2px solid black;
    position: absolute;
    z-index: 2;
    right: 200px;
    max-width: 600px;
}

.recommendProportion,
.ProductSelection,
.MakePortfolio-stockList-section {
    margin-bottom: 30px;
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
    padding: 15px;
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

/* 투자액 입력 박스와 삭제 버튼 스타일 추가 */
.table input[type='number'] {
    width: 100%;
    padding: 5px;
    box-sizing: border-box;
}

.table button {
    padding: 5px 10px;
    background-color: #f44336;
    color: white;
    border: none;
    cursor: pointer;
}

.table button:hover {
    background-color: #d32f2f;
}

/* 총 투자금액 스타일 */
.totalInvestmentAmount {
    margin-top: 20px;
    text-align: right;
    font-size: 18px;
    font-weight: bold;
}

/* 각 투자액 및 퍼센티지 스타일 */
.presentProportion_calc {
    margin-top: 20px;
    font-size: 16px;
    line-height: 1.5;
}
.presentProportion_calc p {
    margin: 5px 0;
    display: flex;
    justify-content: space-between;
}
</style>
