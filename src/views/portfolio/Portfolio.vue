<template>
    <div class="portfolio-container">
        <!-- 포트폴리오 상단 헤더 -->
        <header class="portfolio-header">
            <h1>포트폴리오 상세정보</h1>
            <h2>{{ portfolioDetail.portfolioName }}</h2>
            <div class="creation-date-container">
                <h3>생성일:</h3>
                <span class="creation-date">({{ formattedCreationDate }})</span>
            </div>
        </header>

        <main class="portfolio-main">
            <section class="portfolio-summary">
                <h2>포트폴리오 요약</h2>

                <!-- 투자 비중 파이 차트 -->
                <h4>포트폴리오 투자 비중</h4>
                <div class="chart-container">
                    <VueApexCharts
                        type="pie"
                        width="380"
                        :options="chartOptions"
                        :series="series"
                    ></VueApexCharts>
                </div>
                <!-- 포트폴리오 요약 정보 -->
                <div class="portfolio-summary-info">
                    <div class="summary-item">
                        <p>총 투자금액</p>
                        <p style="color: black;">{{ formattedTotalInvestment }}원</p>
                    </div>
                    <div class="summary-item">
                        <p>예상 수익률</p>
                        <p :style="{ color: portfolioDetail.expectedReturn < 0 ? 'blue' : 'red' }">
                            {{ portfolioDetail.expectedReturn }}%
                        </p>
                    </div>
                    <div class="summary-item">
                        <p>예상 투자손익</p>
                        <p :style="{ color: expectedProfit < 0 ? 'blue' : 'red' }">
                            {{ expectedProfit.toLocaleString() }}원
                        </p>
                    </div>
                    <div class="summary-item">
                        <p>위험도</p>
                        <p>
                            <span :class="getRiskLevelClass(portfolioDetail.riskLevel)">
                                {{ getRiskLevelLabel(portfolioDetail.riskLevel) }}
                            </span>
                            <span class="risk-grade">({{ portfolioDetail.riskLevel }}등급)</span>
                        </p>
                    </div>
                    <div class="summary-item">
                        <p>총 평가금액</p>
                        <p :style="{ color: totalEvaluation > portfolioDetail.total ? 'red' : 'blue' }">
                            {{ totalEvaluation.toLocaleString() }}원
                        </p>
                    </div>
                </div>
            </section>

            <section class="portfolio-details">
                <h2>포트폴리오 상세 내역</h2>
                <div class="portfolio-items">
                    <div v-for="item in portfolioItemsWithNames" :key="item.portfolioItemId" class="portfolio-item">
                        <span class="item-type">{{ getProductTypeLabel(item.productType) }}</span>
                        <span class="item-name"><strong>{{ item.productName || stockDetails[item.stockCode] || '로딩 중...' }}</strong></span>
                        <span class="item-amount">
                            <span class="label">투자 금액:</span>
                            <span class="value">{{ item.amount.toLocaleString() }}원</span>
                        </span>
                        <span class="item-return">
                            <span class="label">예상 수익률:</span>
                            <span class="value" :style="{ color: item.expectedReturn < 0 ? 'blue' : 'red' }">
                                {{ item.expectedReturn }}%
                            </span>
                        </span>
                        <span class="item-risk">
                            <span class="label">위험도:</span>
                            <span class="value" :class="getRiskLevelClass(item.riskLevel)">
                                {{ getRiskLevelLabel(item.riskLevel) }}
                                <span class="risk-grade">({{ item.riskLevel }}등급)</span>
                            </span>
                        </span>
                    </div>
                </div>
            </section>

            <section class="portfolio-actions">
                <v-btn color="primary" @click="goToPortfolioList">포트폴리오 리스트</v-btn>
                <v-btn color="red" @click="deletePortfolio(portfolioId)">삭제하기</v-btn>
            </section>
        </main>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'; // Composition API
import { useRoute, useRouter } from 'vue-router'; // 라우트 정보 접근을 위한 useRoute import
import { usePortfolioStore } from '@/store/modules/portfolio'; // Pinia 스토어 가져오기
import { useBondStore } from '@/store/modules/bond';
import { useFundStore } from '@/store/modules/fund';
import { useSavingStore } from '@/store/modules/saving';
import { useDepositStore } from '@/store/modules/deposit';
import VueApexCharts from 'vue3-apexcharts'; // ApexCharts 컴포넌트 import
import {
    getBondProductDetail,
    getSavingProductDetail,
    getFundProductDetail
} from '@/api/financeApi';
import { searchStock } from '@/api/stock';

// 현재 라우트에서 포트폴리오 ID를 가져옴
const route = useRoute();
const router = useRouter();
const portfolioId = route.params.id; // 라우트 파라미터에서 포트폴리오 ID 추출

// Pinia 스토어 가져오기
const portfolioStore = usePortfolioStore();
const bondStore = useBondStore();
const fundStore = useFundStore();
const savingStore = useSavingStore();
const depositStore = useDepositStore();
const portfolioItemsWithNames = ref([]);
const stockDetails = ref({});

// 포트폴리오 상세 정보를 가져와 저장할 상태
const portfolioDetail = ref({});

// 예상 투자손익 계산
const expectedProfit = computed(() => {
    const total = portfolioDetail.value.total || 0;
    const expectedReturn = portfolioDetail.value.expectedReturn || 0;
    return Math.round((total * expectedReturn) / 100);
});

// 총 평가금액 계산
const totalEvaluation = computed(() => {
    return (portfolioDetail.value.total || 0) + expectedProfit.value;
});

// 총 투자금액을 3자리마다 콤마로 표시
const formattedTotalInvestment = computed(() => {
    return (portfolioDetail.value.total || 0).toLocaleString();
});

const getPortfolioDetailAction = async (portfolioId) => {
    try {
        await portfolioStore.getPortfolioDetailAction(portfolioId);
        portfolioDetail.value = portfolioStore.portfolioDetail;
        console.log('Portfolio Detail:', portfolioDetail.value);
    } catch (error) {
        console.error('Error fetching portfolio detail:', error);
    }
};

const fetchStockDetails = async () => {
    for (const item of portfolioItemsWithNames.value) {
        if (item.stockCode) {
            stockDetails.value[item.stockCode] = await getStockDetail(item.stockCode);
        }
    }
}

const getProductName = async (productId, productType) => {
    try {
        let productDetail;
        let productName;
        switch (productType) {
            case 'S':
                productDetail = await getSavingProductDetail(productId);
                productName = productDetail.products[0].finPrdtNm;
                break;
            case 'B':
                productDetail = await getBondProductDetail(productId);
                console.log(productDetail);
                productName = productDetail.isinCdNm; // 채권 상품명 필드에 맞게 수정
                break;
            case 'F':
                productDetail = await getFundProductDetail(productId);
                console.log(productDetail);
                productName = productDetail.productNm; // 펀드 상품명 필드에 맞게 수정
                break;
            default:
                productDetail = null;
        }

        console.log('Product Name:', productName);
        return productName; // 상품 이름 반환
    } catch (error) {
        console.error('Error fetching product name:', error);
        return '���품명 조회 실패'; // 에러 발생 시 기본값 반환
    }
}

const getStockDetail = async (searchTerm) => {
    try {
        const stockDetail = await searchStock(searchTerm);
        return stockDetail[0].stockName;
    } catch (error) {
        console.error('주식 정보 조회 중 오류 발생 : ', error);
        return '주식 정보 조회 실패';
    }
}

// 생성 날짜를 사람이 읽을 수 있는 형식으로 변환
const formattedCreationDate = computed(() => {
    if (!portfolioDetail.value.creationDate) return '';
    const date = new Date(portfolioDetail.value.creationDate);
    return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
});

// 컴포넌트가 마운트될 때 포트폴리오 데이터를 가져오기
onMounted(() => {
    getPortfolioDetailAction(portfolioId); // 포트폴리오 데이터 가져오기
    getProductName
});

// 상품 종류를 라벨로 변환
const getProductTypeLabel = (type) => {
    switch (type) {
        case 'S':
            return '예/적금';
        case 'B':
            return '채권';
        case 'F':
            return '펀드';
        default:
            return '주식';
    }
};

// 차트 설정
const chartOptions = ref({
    chart: {
        width: 380,
        type: 'pie',
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

// 차트 시리즈 데이터
const series = ref([]);

// 차트 데이터를 위한 computed 속성
const chartData = computed(() => {
    if (!portfolioDetail.value.portion) return [];
    return [
        portfolioDetail.value.portion.totalSaving || 0,
        portfolioDetail.value.portion.totalBond || 0,
        portfolioDetail.value.portion.totalFund || 0,
        portfolioDetail.value.portion.totalStock || 0,
    ];
});

// 포트폴리오 수정 함수
const editPortfolio = (id) => {
    console.log(`Editing portfolio with ID: ${id}`);
};

// 포트폴리오 삭제 함수
const deletePortfolio = (id) => {
    console.log(`Deleting portfolio with ID: ${id}`);
};

// 위험도를 텍스트로 매핑하는 함수
const getRiskLevelLabel = (riskLevel) => {
    switch (riskLevel) {
        case 6:
            return '매우 안전';
        case 5:
            return '안전';
        case 4:
            return '보통';
        case 3:
            return '약간 위험';
        case 2:
            return '위험';
        case 1:
            return '매우 위험';
        default:
            return '알 수 없음';
    }
};

// 위험도에 따른 CSS 클래스를 반환하는 함수
const getRiskLevelClass = (riskLevel) => {
    switch (riskLevel) {
        case 6:
            return 'risk-very-safe';
        case 5:
            return 'risk-safe';
        case 4:
            return 'risk-moderate';
        case 3:
            return 'risk-slightly-dangerous';
        case 2:
            return 'risk-dangerous';
        case 1:
            return 'risk-very-dangerous';
        default:
            return 'risk-unknown';
    }
};

watch(
    () => portfolioDetail.value,
    () => {
        series.value = chartData.value;
    },
    { deep: true }
);

const goToPortfolioList = async () => {
    // 현재 포트폴리오 데이터를 스토어에 추가
    await portfolioStore.addPortfolioToList(portfolioDetail.value);
    router.push({ name: 'MyPortfolio' });
};

const fetchProductNames = async () => {
    if (portfolioDetail.value.portfolioItems) {
        try {
            portfolioItemsWithNames.value = await Promise.all(
                portfolioDetail.value.portfolioItems.map(async (item) => ({
                    ...item,
                    productName: await getProductName(item.productId, item.productType)
                }))
            );
        } catch (error) {
            console.error('Error fetching product names:', error);
        }
    }
};

watch(() => portfolioDetail.value, fetchProductNames, { immediate: true });
watch(portfolioItemsWithNames, fetchStockDetails, { immediate: true });
</script>

<style scoped>
.portfolio-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f8f9fa; /* 페이지 배경 색 */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* 부드러운 그림자 효과 */
    border-radius: 10px; /* 둥근 모서리 */
}

.portfolio-header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center; /* 텍스트 중앙 정렬 */
    margin-bottom: 20px;
}

.portfolio-header h1 {
    font-size: 2.5rem; /* 큰 헤딩 */
    color: #343a40; /* 진한 텍스트 색상 */
    margin-bottom: 10px;
    text-align: left; /* 왼쪽 정렬 */
    width: 100%;
}

.portfolio-header h2 {
    font-size: 1.5rem; /* 서브 헤딩 */
    color: #6c757d; /* 회색 서브 텍스트 */
    margin-bottom: 5px;
}

.portfolio-main {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.portfolio-summary,
.portfolio-details {
    background-color: white; /* 섹션 배경 */
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); /* 부드러운 그림자 */
}

.chart-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px; /* 차트와 제목 간격 조정 */
}

.portfolio-summary h2,
.portfolio-details h2 {
    font-size: 1.75rem;
    color: #495057;
    margin-bottom: 15px;
}

.portfolio-summary h4 {
    text-align: center;
    margin-bottom: 15px;
}

.portfolio-summary h4,
.portfolio-details p {
    font-size: 1.125rem;
    color: #212529;
}

.portfolio-summary h4 {
    margin-top: 20px;
    margin-bottom: 15px;
    font-weight: 600;
}

.portfolio-summary-info {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background-color: #f1f3f5;
    border-radius: 8px;
}

.summary-item {
    text-align: center;
    flex: 1;
}

.summary-item p:first-child {
    font-size: 1rem;
    color: #495057;
}

.summary-item p:last-child {
    font-size: 1.25rem;
    color: #007bff;
    font-weight: bold;
}

.portfolio-details h2 {
    margin-bottom: 20px;
}

.portfolio-items {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.portfolio-item {
    display: flex;
    align-items: center;
    background-color: #ffffff;
    border-radius: 10px;
    padding: 15px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    margin-bottom: 15px;
}

.item-type {
    width: 10%;
    font-weight: bold;
    color: #007bff;
    font-size: 1.1em;
}

.item-name {
    width: 25%;
    color: #333;
    font-size: 1em;
}

.item-amount,
.item-return,
.item-risk {
    width: 20%;
    display: flex;
    align-items: center;
}

.label {
    color: #6c757d;
    font-size: 0.9em;
    margin-right: 5px;
}

.value {
    font-weight: bold;
    font-size: 1em;
}

.item-amount .value {
    color: black;
}

.risk-grade {
    font-size: 0.8em;
    color: #6c757d;
    margin-left: 5px;
}

.portfolio-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}

.v-btn {
    font-size: 1rem;
    padding: 10px 20px;
    border-radius: 6px;
}

.v-btn.primary {
    background-color: #007bff;
    color: white;
}

.v-btn.red {
    background-color: #dc3545;
    color: white;
}

.v-btn.primary:hover,
.v-btn.red:hover {
    opacity: 0.85;
    cursor: pointer;
}

.creation-date-container {
    display: inline-flex;
    align-items: center;
    gap: 5px;
}

.creation-date {
    font-size: 1rem;
    color: #6c757d;
}

.risk-very-safe {
    color: #28a745; /* 초록색 */
}

.risk-safe {
    color: #20c997; /* 밝은 초록색 */
}

.risk-moderate {
    color: #ffc107; /* 노란색 */
}

.risk-slightly-dangerous {
    color: #fd7e14; /* 주황색 */
}

.risk-dangerous {
    color: #e83e8c; /* 분홍색 (덜 빨간색) */
}

.risk-very-dangerous {
    color: #dc3545; /* 빨간색 */
}

.risk-unknown {
    color: #6c757d; /* 회색 */
}

@media (max-width: 768px) {
    .portfolio-container {
        padding: 15px;
    }

    .portfolio-header h1 {
        font-size: 2rem;
    }

    .portfolio-header h2 {
        font-size: 1.25rem;
    }

    .portfolio-item {
        flex-direction: column;
        align-items: flex-start;
    }

    .item-type,
    .item-name,
    .item-amount,
    .item-return,
    .item-risk {
        width: 100%;
        margin-bottom: 10px;
    }
}

@media (max-width: 1200px) {
    .portfolio-item {
        width: calc(33.33% - 15px); /* 3개씩 한 줄에 표시 */
    }
}

@media (max-width: 900px) {
    .portfolio-item {
        width: calc(50% - 15px); /* 2개씩 한 줄에 표시 */
    }
}

@media (max-width: 600px) {
    .portfolio-item {
        width: 100%; /* 1개씩 한 줄에 표시 */
    }
}
</style>