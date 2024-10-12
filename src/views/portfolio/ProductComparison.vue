<template>
    <div class="CandidatesPick-container">
        <h1>상품 비교 페이지</h1>
        <hr />
        <br />
        <div class="search-filter">
            <!-- 상품 필터 -->
            <div class="button-group">
                <v-btn :class="{ active: selectedCategory === 'S' }" @click="selectCategory('S')">
                    예/적금
                </v-btn>
                <v-btn :class="{ active: selectedCategory === 'B' }" @click="selectCategory('B')">
                    채권
                </v-btn>
                <v-btn :class="{ active: selectedCategory === 'F' }" @click="selectCategory('F')">
                    펀드
                </v-btn>
            </div>
        </div>

        <!-- 경고창 컨테이너 -->
        <div class="alert-container">
            <!-- 경고 메세지 박스 -->
            <div v-if="warningMessage" class="alert-warning">
                {{ warningMessage }}
            </div>

            <!-- 확인 메세지 박스-->
            <div v-else-if="confirmMessage" class="alert-confirm">
                {{ confirmMessage }}
            </div>

            <!-- 일반 메시지 박스 -->
            <div v-else class="alert-normal">
                {{ normalMessage }}
            </div>
        </div>

        <!-- 로딩 상태 표시 -->
        <div v-if="loading" class="loading">로딩 중...</div>

        <!-- 장바구니 상품 카드 표시 위치 -->
        <div v-else class="product-list">
            <div
                v-for="product in paginatedProducts"
                :key="product.productId"
                :class="['product-card', { isInCompare: isProductInCompare(product) }]"
            >
                <div class="card-body" @click="addToCompare(product)">
                    <!-- 카드 헤더(상품 유형, 제공자) -->
                    <div class="card-header">
                        <!-- 상품 유형 -->
                        <span class="product-type">
                            <span v-if="product.productType === 'S'">{{
                                product.rsrvType === '' ? '예금' : '적금'
                            }}</span>
                            <span v-else-if="product.productType === 'B'">채권</span>
                            <span v-else-if="product.productType === 'F'">펀드</span>
                        </span>

                        <!-- 제공자 명 -->
                        <span class="korconm">
                            <span v-if="product.productType === 'S'">
                                {{
                                    detailedProducts[product.productId]?.products[0]?.korCoNm ||
                                    product.kor_co_nm
                                }}
                            </span>

                            <span v-else-if="product.productType === 'F'">
                                {{
                                    detailedProducts[product.productId]?.companyNm ||
                                    product.companyNm
                                }}
                            </span>

                            <span v-else-if="product.productType === 'B'">
                                {{
                                    detailedProducts[product.productId]?.bondIsurNm ||
                                    product.bondIsurNm
                                }}
                            </span>
                        </span>
                    </div>

                    <!-- 상품명 -->
                    <h5 class="card-title">{{ product.productName }}</h5>

                    <!-- 기타 정보 (기본금리 및 최고금리 또는 기타 정보) -->
                    <div class="rate-info">
                        <div class="rate-item" v-if="product.productType === 'S'">
                            <div class rate-item-a>
                                <strong> 기본금리 </strong><br />
                                {{
                                    detailedProducts[product.productId]?.rates[0]?.intrRate ||
                                    '정보 없음'
                                }}%
                            </div>

                            <div class rate-item-b>
                                <strong> 최고금리 </strong><br />
                                {{
                                    detailedProducts[product.productId]?.rates[0]?.intrRate2 ||
                                    '정보 없음'
                                }}%
                            </div>
                        </div>
                        <div class="rate-item" v-else-if="product.productType === 'B'">
                            <div class rate-item-a>
                                <strong> 채권발행일자 </strong><br />
                                {{
                                    formatDate(
                                        detailedProducts[product.productId]?.bondIssuDt ||
                                            product.bondIssuDt
                                    )
                                }}
                            </div>
                            <div class rate-item-b>
                                <strong> 채권금리 </strong><br />
                                {{
                                    detailedProducts[product.productId]?.bondSrfcInrt ||
                                    product.bondSrfcInrt
                                }}%
                            </div>
                        </div>

                        <div class="rate-item" v-else-if="product.productType === 'F'">
                            <div class rate-item-a>
                                <strong> 펀드유형 </strong><br />
                                {{
                                    detailedProducts[product.productId]?.fundType ||
                                    product.fundType
                                }}
                            </div>

                            <div class rate-item-b>
                                <strong> 12개월 수익률 </strong><br />
                                {{
                                    detailedProducts[product.productId]?.yield12 || product.yield12
                                }}%
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="paginatedProducts.length === 0" class="no-products">
                <p>해당 카테고리에 상품이 없습니다.</p>
            </div>
        </div>

        <div class="text-center" v-if="!loading && totalPages > 1">
            <v-pagination v-model="page" :length="totalPages" :total-visible="4"></v-pagination>
        </div>
    </div>
    <br /><br />
    <!-- 3개 선택 상품 비교 카드 섹션 -->
    <div class="CandidatesCompare-container">
        <h1>비교군 목록</h1>
        <hr />
        <div class="CandidatesCompare-body">
            <v-btn @click="clearAllProducts">일괄 비우기</v-btn>
            <div class="compare-cards">
                <div
                    v-for="(product, index) in compareWithEmptySlots"
                    :key="index"
                    :class="['compare-card', { 'empty-card': product.isEmpty }]"
                    @click="!product.isEmpty && removeFromCompare(index)"
                >
                    <!-- 해당 박스가 비어있다면 빈 슬롯 표시 -->
                    <template v-if="product.isEmpty">
                        <p class="empty-placeholder" @click="scrollToCandidatesPick">빈 슬롯</p>
                    </template>
                    <!-- 비어있지 않다면 내용 표시 -->
                    <template v-else>
                        <!-- 카드 헤더(상품 유형, 제공자) -->
                        <div class="card-header">
                            <!-- 상품 유형 -->
                            <span class="product-type">
                                <span v-if="product.productType === 'S'">{{
                                    product.rsrvType === '' ? '예금' : '적금'
                                }}</span>
                                <span v-else-if="product.productType === 'B'">채권</span>
                                <span v-else-if="product.productType === 'F'">펀드</span>
                            </span>

                            <!-- 제공자 명 -->
                            <span class="korconm">
                                <span v-if="product.productType === 'S'">
                                    {{
                                        detailedProducts[product.productId]?.products[0]?.korCoNm ||
                                        product.kor_co_nm
                                    }}
                                </span>

                                <span v-else-if="product.productType === 'F'">
                                    {{
                                        detailedProducts[product.productId]?.companyNm ||
                                        product.companyNm
                                    }}
                                </span>

                                <span v-else-if="product.productType === 'B'">
                                    {{
                                        detailedProducts[product.productId]?.bondIsurNm ||
                                        product.bondIsurNm
                                    }}
                                </span>
                            </span>
                        </div>

                        <!-- 상품 명 -->
                        <h5 class="card-title">{{ product.productName }}</h5>

                        <!-- 기타 정보 (기본금리 및 최고금리 또는 기타 정보) -->
                        <div class="rate-info">
                            <div class="rate-item" v-if="product.productType === 'S'">
                                <div class rate-item-a>
                                    <strong> 기본금리 </strong><br />
                                    {{
                                        detailedProducts[product.productId]?.rates[0]?.intrRate +
                                            '%' || '정보 없음'
                                    }}
                                </div>

                                <div class rate-item-b>
                                    <strong> 최고금리 </strong><br />
                                    {{
                                        detailedProducts[product.productId]?.rates[0]?.intrRate2 +
                                            '%' || '정보 없음'
                                    }}
                                </div>
                            </div>
                            <div class="rate-item" v-else-if="product.productType === 'B'">
                                <div class rate-item-a>
                                    <strong> 채권발행일자 </strong><br />
                                    {{
                                        formatDate(
                                            detailedProducts[product.productId]?.bondIssuDt ||
                                                product.bondIssuDt
                                        )
                                    }}
                                </div>
                                <div class rate-item-b>
                                    <strong> 채권금리 </strong><br />
                                    {{
                                        detailedProducts[product.productId]?.bondSrfcInrt + '%' ||
                                        product.bondSrfcInrt
                                    }}
                                </div>
                            </div>

                            <div class="rate-item" v-else-if="product.productType === 'F'">
                                <div class rate-item-a>
                                    <strong> 펀드유형 </strong><br />
                                    {{
                                        detailedProducts[product.productId]?.fundType ||
                                        product.fundType
                                    }}
                                </div>

                                <div class rate-item-b>
                                    <strong> 12개월 수익률 </strong><br />
                                    {{
                                        detailedProducts[product.productId]?.yield12 + '%' ||
                                        product.yield12
                                    }}
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
        <br /><br />

        <!-- 그래프 위치  -->
        <div class="CandidatesCompare-desc">
            <h2>막대 그래프 비교</h2>
            <hr />
            <br />
            <div id="chart">
                <VueApexCharts
                    type="bar"
                    height="350"
                    :options="updatedChartOptions"
                    :series="series"
                ></VueApexCharts>
            </div>

            <!-- 비교한 상품들의 상세 정보 카드 -->
            <h2>비교한 상품 상세 정보</h2>
            <hr />
            <div class="product-details-container">
                <div class="card-container">
                    <v-card
                        v-for="(product, index) in descWithEmptySlots"
                        :key="index"
                        :class="[{ 'empty-card': product.isEmpty }, 'desc-card']"
                        elevation="3"
                    >
                        <!-- 빈 슬롯인 경우 -->
                        <template v-if="product.isEmpty">
                            <v-card-title @click="scrollToCandidatesPick">빈 슬롯</v-card-title>
                        </template>

                        <!-- 상품 정보가 있는 경우 -->
                        <template v-else>
                            <v-card-title>
                                {{ product.productName }} (ID: {{ product.productId }})
                            </v-card-title>
                            <v-card-text>
                                <p>
                                    상품 종류:
                                    {{
                                        product.productType === 'S'
                                            ? product.rsrvType === ''
                                                ? '예금'
                                                : '적금'
                                            : product.productType === 'B'
                                            ? '채권'
                                            : product.productType === 'F'
                                            ? '펀드'
                                            : '기타'
                                    }}
                                </p>

                                <!-- 기본 정보 테이블 -->
                                <table
                                    v-if="
                                        product.productType === 'S' ||
                                        product.productType === 'B' ||
                                        product.productType === 'F'
                                    "
                                    class="details-table"
                                >
                                    <thead>
                                        <tr>
                                            <th>항목</th>
                                            <th>내용</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <!-- 예/적금 -->
                                        <template v-if="product.productType === 'S'">
                                            <tr>
                                                <td>금융사명</td>
                                                <td>
                                                    {{
                                                        detailedProducts[product.productId]
                                                            ?.products[0]?.korCoNm || '정보 없음'
                                                    }}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>상품명</td>
                                                <td>{{ product.productName || '정보 없음' }}</td>
                                            </tr>
                                            <tr>
                                                <td>가입 방법</td>
                                                <td>
                                                    {{
                                                        detailedProducts[product.productId]
                                                            ?.products[0]?.joinWay || '정보 없음'
                                                    }}
                                                </td>
                                            </tr>
                                            <tr class rate-item-a>
                                                <td>기본금리</td>
                                                <td>
                                                    {{
                                                        detailedProducts[product.productId]
                                                            ?.rates[0]?.intrRate + '%' ||
                                                        '정보 없음'
                                                    }}
                                                </td>
                                            </tr>

                                            <tr class rate-item-b>
                                                <td>최고금리</td>
                                                <td>
                                                    {{
                                                        detailedProducts[product.productId]
                                                            ?.rates[0]?.intrRate2 + '%' ||
                                                        '정보 없음'
                                                    }}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>만기 후 이자율</td>
                                                <td>
                                                    {{
                                                        detailedProducts[product.productId]
                                                            ?.rates[0]?.mtrtInt
                                                            ? detailedProducts[product.productId]
                                                                  ?.rates[0]?.mtrtInt + '%'
                                                            : '정보 없음'
                                                    }}
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>최대 한도</td>
                                                <td>
                                                    {{
                                                        detailedProducts[product.productId]
                                                            ?.products[0]?.maxLimit
                                                            ? formatCurrency(
                                                                  detailedProducts[
                                                                      product.productId
                                                                  ]?.products[0]?.maxLimit
                                                              ) + '원'
                                                            : '정보 없음'
                                                    }}
                                                </td>
                                            </tr>
                                            <br />
                                            <div class="gotoDetailPage">
                                                <a :href="productDetailUrl(product)" target="_blank"
                                                    >자세히 보기</a
                                                >
                                            </div>
                                        </template>

                                        <!-- 채권 -->
                                        <template v-else-if="product.productType === 'B'">
                                            <tr>
                                                <td>채권명</td>
                                                <td>{{ product.isinCdNm || '정보 없음' }}</td>
                                            </tr>
                                            <tr>
                                                <td>채권 발행자</td>
                                                <td>
                                                    {{
                                                        detailedProducts[product.productId]
                                                            ?.bondIsurNm || '정보 없음'
                                                    }}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>발행일</td>
                                                <td>
                                                    {{
                                                        formatDate(
                                                            detailedProducts[product.productId]
                                                                ?.bondIssuDt
                                                        ) || '정보 없음'
                                                    }}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>만기 일자</td>
                                                <td>
                                                    {{
                                                        formatDate(
                                                            detailedProducts[product.productId]
                                                                ?.bondExprDt
                                                        ) || '정보 없음'
                                                    }}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>발행 금액</td>
                                                <td>
                                                    {{
                                                        detailedProducts[product.productId]
                                                            ?.bondIssuAmt
                                                            ? formatCurrency(
                                                                  detailedProducts[
                                                                      product.productId
                                                                  ]?.bondIssuAmt
                                                              ) + '원'
                                                            : '정보 없음'
                                                    }}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>채권 금리</td>
                                                <td>
                                                    {{
                                                        detailedProducts[product.productId]
                                                            ?.bondSrfcInrt
                                                            ? detailedProducts[product.productId]
                                                                  ?.bondSrfcInrt + '%'
                                                            : '정보 없음'
                                                    }}
                                                </td>
                                            </tr>
                                            <br />
                                            <div class="gotoDetailPage">
                                                <a :href="productDetailUrl(product)" target="_blank"
                                                    >자세히 보기</a
                                                >
                                            </div>
                                        </template>

                                        <!-- 펀드 -->
                                        <template v-else-if="product.productType === 'F'">
                                            <tr>
                                                <td>운용사</td>
                                                <td>
                                                    {{
                                                        detailedProducts[product.productId]
                                                            ?.companyNm || '정보 없음'
                                                    }}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>상품명</td>
                                                <td>{{ product.productName || '정보 없음' }}</td>
                                            </tr>
                                            <tr>
                                                <td>펀드 유형</td>
                                                <td>
                                                    {{
                                                        detailedProducts[product.productId]
                                                            ?.fundType || '정보 없음'
                                                    }}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>위험도</td>
                                                <td>
                                                    {{
                                                        detailedProducts[product.productId]
                                                            ?.riskLevel || '정보 없음'
                                                    }}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>1개월 수익률</td>
                                                <td>
                                                    {{
                                                        detailedProducts[product.productId]?.yield1
                                                            ? detailedProducts[product.productId]
                                                                  ?.yield1 + '%'
                                                            : '정보 없음'
                                                    }}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>3개월 수익률</td>
                                                <td>
                                                    {{
                                                        detailedProducts[product.productId]?.yield3
                                                            ? detailedProducts[product.productId]
                                                                  ?.yield3 + '%'
                                                            : '정보 없음'
                                                    }}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>6개월 수익률</td>
                                                <td>
                                                    {{
                                                        detailedProducts[product.productId]?.yield6
                                                            ? detailedProducts[product.productId]
                                                                  ?.yield6 + '%'
                                                            : '정보 없음'
                                                    }}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>12개월 수익률</td>
                                                <td>
                                                    {{
                                                        detailedProducts[product.productId]?.yield12
                                                            ? detailedProducts[product.productId]
                                                                  ?.yield12 + '%'
                                                            : '정보 없음'
                                                    }}
                                                </td>
                                            </tr>
                                            <br />
                                            <div class="gotoDetailPage">
                                                <a :href="productDetailUrl(product)" target="_blank"
                                                    >자세히 보기</a
                                                >
                                            </div>
                                        </template>
                                    </tbody>
                                </table>

                                <p v-else>수익률 정보 없음</p>
                            </v-card-text>
                        </template>
                    </v-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import { useCartStore } from '@/store/modules/cart';
import {
    getDepositProductDetail,
    getSavingProductDetail,
    getBondProductDetail,
    getFundProductDetail,
} from '@/api/financeApi.js';

// 상태 변수 선언
const searchQuery = ref('');
const selectedCategory = ref('S'); // 초기 값을 'S'로 변경
const compare = ref([]);
const currentProductType = ref(null); // 현재 선택된 상품의 타입 저장
const page = ref(1);
const itemsPerPage = ref(8); // 페이지당 아이템 수
const warningMessage = ref('');
const confirmMessage = ref('');
const normalMessage = ref('각 카드를 클릭하여 비교해 볼 수 있습니다.');
const loading = ref(true); // 로딩 상태

// 상세 정보 저장을 위한 상태 변수
const detailedProducts = ref({});

// Pinia 스토어 사용
const cartStore = useCartStore();

// 카테고리 정의 가변
const displayedCategories = computed(() => {
    switch (selectedCategory.value) {
        case 'S':
            return ['기본 금리', '최고 금리'];
        case 'B':
            return ['채권 금리'];
        case 'F':
            return ['1개월 수익률', '3개월 수익률', '6개월 수익률', '12개월 수익률'];
        default:
            return [];
    }
});

// 장바구니 아이템을 가져오는 메서드 호출 및 상세 정보 요청
onMounted(async () => {
    try {
        await cartStore.getCartItems(); // 데이터 가져오기
        console.log('Cart Items:', cartStore.cartItems); // 데이터 로드 후 출력

        // 상세 정보 요청을 위한 배열 생성
        const detailPromises = cartStore.cartItems.map(async (product) => {
            try {
                let detailData = null;
                if (product.productType === 'S') {
                    // 예금/적금 타입에 따라 데이터 요청
                    if (product.rsrvType !== null) {
                        detailData = await getSavingProductDetail(product.productId);
                    } else {
                        detailData = await getDepositProductDetail(product.productId);
                    }
                } else if (product.productType === 'B') {
                    // 채권 타입
                    detailData = await getBondProductDetail(product.productId);
                } else if (product.productType === 'F') {
                    // 펀드 타입
                    detailData = await getFundProductDetail(product.productId);
                }

                // 예금/적금 상품의 경우 products와 rates 데이터를 포함하는 구조로 저장
                if (detailData) {
                    if (product.productType === 'S') {
                        detailedProducts.value[product.productId] = {
                            products: detailData.products || [], // 기본 정보
                            rates: detailData.rates || [], // 금리 정보
                        };
                    } else {
                        detailedProducts.value[product.productId] = detailData;
                    }
                }
            } catch (error) {
                console.error(`Error fetching details for productId ${product.productId}:`, error);
            }
        });

        // 모든 상세 정보 요청 완료 대기
        await Promise.all(detailPromises);
        console.log('Detailed Products:', detailedProducts.value);
    } catch (error) {
        console.error('Error fetching cart items:', error);
    } finally {
        loading.value = false; // 로딩 상태 업데이트
    }
});

// 차트 옵션 설정
const chartOptions = ref({
    chart: {
        type: 'bar',
        height: 350,
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '55%',
        },
    },
    xaxis: {
        categories: displayedCategories,
    },
    dataLabels: {
        enabled: false,
    },
    yaxis: {
        title: {
            text: '수익률 / 금리 (%)',
        },
    },
    tooltip: {
        y: {
            formatter: function (val) {
                return val + '%';
            },
        },
    },
});

// 차트 옵션에 고정된 카테고리 반영
const updatedChartOptions = computed(() => ({
    ...chartOptions.value,
    xaxis: {
        categories: displayedCategories.value,
    },
}));

// 비교한 상품의 수익률 데이터를 차트에 표시
const series = computed(() => {
    return compare.value.map((product) => {
        let dataPoints = new Array(displayedCategories.value.length).fill(0);
        let seriesName = product.productName || '상품명 없음';

        if (product.productType === 'S') {
            // 예금/적금: 기본 금리와 최고 금리
            const basicRate = product.rates?.[0]?.intrRate || 0;
            const highestRate = product.rates?.[0]?.intrRate2 || 0;
            const basicIndex = displayedCategories.value.indexOf('기본 금리');
            const highestIndex = displayedCategories.value.indexOf('최고 금리');
            if (basicIndex !== -1) dataPoints[basicIndex] = basicRate;
            if (highestIndex !== -1) dataPoints[highestIndex] = highestRate;
        } else if (product.productType === 'B') {
            // 채권: 채권 금리
            const bondRate = product.bondSrfcInrt || 0;
            const bondRateIndex = displayedCategories.value.indexOf('채권 금리');
            if (bondRateIndex !== -1) dataPoints[bondRateIndex] = bondRate;
        } else if (product.productType === 'F') {
            // 펀드: 1, 3, 6, 12개월 수익률
            const yield1 = product.yield1 || 0;
            const yield3 = product.yield3 || 0;
            const yield6 = product.yield6 || 0;
            const yield12 = product.yield12 || 0;

            const yield1Index = displayedCategories.value.indexOf('1개월 수익률');
            const yield3Index = displayedCategories.value.indexOf('3개월 수익률');
            const yield6Index = displayedCategories.value.indexOf('6개월 수익률');
            const yield12Index = displayedCategories.value.indexOf('12개월 수익률');

            if (yield1Index !== -1) dataPoints[yield1Index] = yield1;
            if (yield3Index !== -1) dataPoints[yield3Index] = yield3;
            if (yield6Index !== -1) dataPoints[yield6Index] = yield6;
            if (yield12Index !== -1) dataPoints[yield12Index] = yield12;
        }

        return {
            name: seriesName,
            data: dataPoints,
        };
    });
});

// 필터링된 제품 목록
const filteredProducts = computed(() => {
    return cartStore.cartItems.filter((product) => {
        let matchesCategory = true;
        if (selectedCategory.value === 'S') {
            matchesCategory = ['S'].includes(product.productType);
        } else {
            matchesCategory = product.productType === selectedCategory.value;
        }

        const matchesSearch = searchQuery.value
            ? product.productName.toLowerCase().includes(searchQuery.value.toLowerCase())
            : true;

        return matchesCategory && matchesSearch;
    });
});

// 디버깅을 위해 필터링된 결과 출력
filteredProducts.value.forEach((product) => {
    console.log('Filtered Product:', product);
});

// 카테고리 선택
const selectCategory = (category) => {
    selectedCategory.value = category;
    page.value = 1; // 페이지 초기화
};

// 페이지네이션된 제품 목록
const paginatedProducts = computed(() => {
    const start = (page.value - 1) * itemsPerPage.value;
    const paginated = filteredProducts.value.slice(start, start + itemsPerPage.value);
    console.log('Paginated Products:', paginated); // 디버깅용
    return paginated;
});

// 전체 페이지 수
const totalPages = computed(() => {
    return Math.ceil(filteredProducts.value.length / itemsPerPage.value);
});

// 비교 리스트에 상품을 추가하는 함수
// 비교 리스트에 상품을 추가하거나 제거하는 함수
const addToCompare = (product) => {
    const existingIndex = compare.value.findIndex((item) => item.productId === product.productId);

    if (existingIndex !== -1) {
        // 상품이 이미 비교 리스트에 있을 경우 제거
        removeFromCompare(existingIndex);
    } else {
        // 비교 리스트가 가득 찬 경우 경고 메시지 표시
        if (compare.value.length >= 3) {
            warningMessage.value = '비교 리스트가 가득 찼습니다.(최대 3 상품)';
            confirmMessage.value = '';
            return;
        }

        // 다른 카테고리의 상품을 추가하려 할 경우 경고 메시지 표시
        const productCategory = product.productType === 'S' ? 'S' : product.productType;
        if (compare.value.length === 0) {
            currentProductType.value = productCategory;
        }
        if (productCategory !== currentProductType.value) {
            warningMessage.value = '같은 종류의 상품만 비교할 수 있습니다.';
            confirmMessage.value = '';
            return;
        }

        // 상세 정보 통합 후 추가
        const detailedData = detailedProducts.value[product.productId] || {};
        const compareProduct = {
            ...product,
            ...detailedData,
        };

        compare.value.push(compareProduct);
        warningMessage.value = '';
        confirmMessage.value = `${compareProduct.productName}이(가) 비교 리스트에 추가되었습니다.`;
    }
};

// 비교 리스트에서 상품을 제거하는 함수
const removeFromCompare = (index) => {
    const removedProduct = compare.value[index];
    compare.value.splice(index, 1);
    confirmMessage.value = `${removedProduct.productName}이(가) 비교 목록에서 제거되었습니다.`;
    warningMessage.value = '';

    if (compare.value.length === 0) {
        currentProductType.value = null;
    }
};

// 비교 리스트 비우기
const clearAllProducts = () => {
    compare.value = [];
    currentProductType.value = null;
    warningMessage.value = '';
    confirmMessage.value = '';
};

// 빈 슬롯을 포함한 compare 리스트
const compareWithEmptySlots = computed(() => {
    const emptySlotsCount = 3 - compare.value.length;
    return [...compare.value, ...Array(emptySlotsCount).fill({ isEmpty: true })];
});

// 빈 슬롯을 포함한 상세 정보 리스트
const descWithEmptySlots = computed(() => {
    const emptySlotsCount = 3 - compare.value.length;
    return [...compare.value, ...Array(emptySlotsCount).fill({ isEmpty: true })];
});

// 비교 리스트에 있는지 확인하는 메서드
const isProductInCompare = (product) => {
    return compare.value.some((item) => item.productId === product.productId);
};

// 화면 이동을 위한 스크롤 메서드
const scrollToCandidatesPick = () => {
    const container = document.querySelector('.CandidatesPick-container');
    if (container) {
        container.scrollIntoView({ behavior: 'smooth' });
    }
};

// 받아온 일자 데이터 표시형식 메서드
const formatDate = (dateStr) => {
    if (typeof dateStr !== 'string' || dateStr.length !== 8) {
        return dateStr; // 형식이 맞지 않으면 원래 문자열 반환
    }
    const year = dateStr.slice(0, 4);
    const month = dateStr.slice(4, 6);
    const day = dateStr.slice(6, 8);
    return `${year}-${month}-${day}`;
};

// 통화 형식으로 변환하는 함수
const formatCurrency = (value) => {
    if (!value || isNaN(value)) return '0';

    if (value < 1_000_000) {
        // 백만 단위 이하의 경우 원래 값 반환
        return Number(value).toLocaleString();
    }

    const units = [
        { limit: 1_000_000_000_000_000, label: '경' }, // 조 위 단위는 경
        { limit: 1_000_000_000_000, label: '조' },
        { limit: 10_000_000, label: '억' },
        { limit: 1_000_000, label: '백만' },
    ];

    for (const unit of units) {
        if (value >= unit.limit) {
            const formattedValue = (value / unit.limit).toFixed(1);
            return `${Number(formattedValue)}${unit.label}`;
        }
    }

    // 1백만 이상인 경우 소수점 포함 없이 전체 숫자 반환
    return Number(value).toLocaleString();
};

// 상품 상세 URL 생성
const productDetailUrl = (product) => {
    const productId = product.productId;
    const productType =
        product.productType === 'S'
            ? 'deposit'
            : product.productType === 'B'
            ? 'bond'
            : product.productType === 'F'
            ? 'fund'
            : '';
    return `http://localhost:5173/list/${productId}?productType=${productType}`;
};
</script>

<style scoped>
.CandidatesPick-container {
    width: 100%;
    padding: 20px;
    background-color: #f4f6f8;
}

.search-filter {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    padding: 10px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.button-group .v-btn {
    padding: 10px 20px;
    font-weight: bold;
    transition: background-color 0.3s, color 0.3s;
}

.button-group .v-btn.active {
    background-color: #3961e4;
    color: white;
}

.button-group .v-btn:hover {
    background-color: #3961e4;
    color: white;
}

.alert-container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

.alert-warning {
    color: #856404;
    background-color: #fff3cd;
    border: 1px solid #ffeeba;
    font-size: 14px;
    padding: 10px 15px;
    border-radius: 4px;
    margin: 0 5px;
}

.alert-confirm {
    color: #155724;
    background-color: #d4edda;
    border: 1px solid #c3e6cb;
    font-size: 14px;
    padding: 10px 15px;
    border-radius: 4px;
    margin: 0 5px;
}

.loading {
    text-align: center;
    font-size: 18px;
    color: #555;
}

.product-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    grid-template-columns: repeat(4, 1fr);
}

.card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
}

.product-card,
.compare-card,
.empty-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 200px;
    height: 250px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    transition: box-shadow 0.3s, transform 0.3s;
    padding: 10px;
    cursor: pointer;
}

.card-body {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.card-header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0;
    flex: 1;
}

.card-title {
    width: 100%;
    flex: 2;
    font-size: 18px;
    font-weight: bold;
    color: #333;
    text-align: center;
    flex: 2;
}

.rate-info {
    width: 85%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: space-between;
    flex: 3;
    color: #000000;
}

.rate-item {
    display: flex;
    text-align: center;
    justify-content: space-between;
    width: 100%;
    margin-top: 20px;
}

.rate-item-a,
.rate-item-b {
    font-size: 14px;
}

.compare-cards {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    align-items: stretch;
}

.product-card:active {
    transform: scale(0.9);
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.15);
}

.compare-card:active {
    transform: scale(0.95);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
}

.product-card .card-body {
    transition: background-color 0.3s;
}

.compare-card .card-body {
    transition: background-color 0.3s;
}

.product-card.card:hover {
    background-color: #f7f9fc;
}

.compare-card:hover {
    background-color: #f7f9fc;
}

.empty-card:hover {
    background-color: #f7f9fc;
}

.product-detail {
    margin-top: 10px;
    font-size: 14px;
    color: #777;
}

.empty-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #777;
    font-size: 10px;
    font-style: italic;
}

.product-detail strong {
    color: #333;
}

.no-products {
    text-align: center;
    color: #777;
    font-style: italic;
}

.product-details-container {
    margin-top: 40px;
    padding: 20px;
    width: 100%;
    display: flex;
    justify-content: space-between; /* 카드를 균등 간격으로 배치 */
    gap: 20px;
}

.desc-card {
    flex: 1; /* 카드가 균등하게 공간을 차지하도록 설정 */
    min-width: 30%; /* 최소 너비 설정 */
    padding: 15px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.details-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
}

.details-table th {
    background-color: #f2f2f2;
    color: #3961e4;
    border: 1px solid #ddd;
    padding: 10px;
    font-size: 14px;
    text-align: left;
}

.details-table td {
    border: 1px solid #ddd;
    padding: 10px;
    font-size: 14px;
    text-align: left;
}

.alert-normal {
    font-size: 14px;
    padding: 10px 15px;
    color: #31708f;
    background-color: #d9edf7;
    border: 1px solid #bce8f1;
    border-radius: 4px;
}

.isInCompare {
    background-color: #e0f7fa; /* 강조 표시 색상 */
    border: 2px solid #00796b; /* 테두리 색상 */
    color: #00796b; /* 텍스트 색상 */
}

.product-card .card-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px; /* 요소 간격 */
}

.product-type {
    font-size: 12px;
    font-weight: bold;
    color: #3961e4;
}

.korconm {
    font-size: 10px;
    font-weight: bold;
    text-align: right;
    flex: 1;
}
</style>
