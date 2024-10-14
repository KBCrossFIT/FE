<template>
    <div class="product-desc-wrapper">
        <div class="product-desc-container">
            <!-- 상품명 표시 -->
            <h1 class="product-title">
                {{ productDetails ? getProductName(productDetails) : 'Loading...' }}
            </h1>

            <!-- 로딩 중 메시지 -->
            <div v-if="isLoading" class="loading-message">
                <p>상품 정보를 불러오는 중입니다...</p>
            </div>

            <!-- 예금/적금 상세 정보 표시 -->
            <div v-else-if="isDepositOrSaving" class="product-detail-layout deposit-saving-layout">
                <div class="info-section">
                    <h2>상품 기본 정보</h2>

                    <!-- 상품 기본 정보 상단 -->
                    <div class="default-info-header">
                        <p>
                            <strong>{{ getLabel('korCoNm') }} </strong>
                            {{ productDetails.products[0].korCoNm }}
                        </p>
                        <p>
                            <strong>{{ getLabel('finPrdtNm') }} </strong>
                            {{ productDetails.products[0].finPrdtNm }}
                        </p>
                    </div>

                    <!-- 상품 기본 정보 중앙 -->
                    <hr />
                    <div class="default-info-body">
                        <p>
                            <strong>{{ getLabel('finPrdtCd') }} </strong>
                            {{ productDetails.products[0].finPrdtCd }}
                        </p>
                        <p>
                            <strong>{{ getLabel('dclsMonth') }} </strong>
                            {{ formatMonth(productDetails.products[0].dclsMonth) }}
                        </p>
                        <p>
                            <strong>{{ getLabel('finCoNo') }} </strong>
                            {{ productDetails.products[0].finCoNo }}
                        </p>

                        <p>
                            <strong>{{ getLabel('joinWay') }} </strong>
                            {{ productDetails.products[0].joinWay }}
                        </p>
                    </div>

                    <!-- 상품 기본 정보 하단 -->
                    <hr />
                    <div class="default-info-footer">
                        <p>
                            <strong>{{ getLabel('joinMember') }} </strong>
                            {{ productDetails.products[0].joinMember }}
                        </p>
                        <p>
                            <strong>{{ getLabel('maxLimit') }} </strong>
                            {{
                                productDetails.products[0].maxLimit
                                    ? formatCurrency(productDetails.products[0].maxLimit)
                                    : '한도 없음'
                            }}
                        </p>
                        <p>
                            <strong>{{ getLabel('dclsStrtDay') }} </strong>
                            {{ formatDate(productDetails.products[0].dclsStrtDay) }}
                        </p>
                        <p>
                            <strong>{{ getLabel('dclsEndDay') }} </strong>
                            {{
                                productDetails.products[0].dclsEndDay
                                    ? formatDate(productDetails.products[0].dclsEndDay)
                                    : '미종료'
                            }}
                        </p>
                        <p>
                            <strong>{{ getLabel('spclCnd') }} </strong>
                            {{ productDetails.products[0].spclCnd }}
                        </p>
                        <p>
                            <strong>{{ getLabel('mtrtInt') }} </strong>
                            {{ productDetails.products[0].mtrtInt }}%
                        </p>
                        <p>
                            <strong>{{ getLabel('etcNote') }} </strong>
                            {{ productDetails.products[0].etcNote }}
                        </p>
                    </div>
                </div>

                <div
                    class="rate-section"
                    v-if="productDetails.rates && productDetails.rates.length > 0"
                >
                    <h2>금리 정보</h2>
                    <table class="rates-table">
                        <thead>
                            <tr>
                                <th>저축 기간 (개월)</th>
                                <th>기본 금리</th>
                                <th>최고 금리</th>
                                <th>이율 타입</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="rate in productDetails.rates"
                                :key="rate.productId + rate.saveTrm"
                            >
                                <td>{{ rate.saveTrm }}개월</td>
                                <td>{{ rate.intrRate }}%</td>
                                <td>{{ rate.intrRate2 }}%</td>
                                <td>{{ rate.intrRateTypeNm }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- 채권 상세 정보 표시 -->
            <div v-else-if="isBond" class="product-detail-layout bond-layout">
                <!-- 기본 정보 섹션 (좌측) -->
                <div class="info-section">
                    <h2>채권 정보</h2>
                    <div class="default-info-header">
                        <p>
                            <strong>{{ getLabel('bondIsurNm') }} </strong>
                            {{ productDetails.bondIsurNm }}
                        </p>
                        <p>
                            <strong>{{ getLabel('isinCdNm') }} </strong>
                            {{ productDetails.isinCdNm }}
                        </p>
                    </div>

                    <!-- 상품 기본 정보 중앙 -->
                    <div class="default-info-body">
                        <p>
                            <strong>{{ getLabel('basDt') }} </strong>
                            {{ formatDate(productDetails.basDt) }}
                        </p>
                        <p v-if="productDetails.crno">
                            <strong>{{ getLabel('crno') }} </strong>
                            {{ productDetails.crno }}
                        </p>
                        <p>
                            <strong>{{ getLabel('isinCd') }} </strong>
                            {{ productDetails.isinCd }}
                        </p>
                        <p>
                            <strong>{{ getLabel('bondIssuDt') }} </strong>
                            {{ formatDate(productDetails.bondIssuDt) }}
                        </p>
                        <p>
                            <strong>{{ getLabel('bondIssuAmt') }} </strong>
                            {{ formatCurrency(productDetails.bondIssuAmt) }}
                        </p>
                        <p>
                            <strong>{{ getLabel('bondIssuCurCd') }}:</strong>
                            {{ productDetails.bondIssuCurCd }}
                        </p>
                    </div>

                    <!-- 상품 기본 정보 하단 -->
                    <div class="default-info-footer">
                        <p>
                            <strong>{{ getLabel('bondPymtAmt') }} </strong>
                            {{ formatCurrency(productDetails.bondPymtAmt) }}
                        </p>
                        <p>
                            <strong>{{ getLabel('intPayCyclCtt') }}:</strong>
                            {{ productDetails.intPayCyclCtt }}
                        </p>
                        <p>
                            <strong>{{ getLabel('nxtmCopnDt') }} </strong>
                            {{ formatDate(productDetails.nxtmCopnDt) }}
                        </p>
                    </div>
                </div>

                <!-- 추가 정보 섹션 (우측) -->
                <div class="rate-section">
                    <h2>추가 정보</h2>
                    <table class="rates-table">
                        <thead>
                            <tr>
                                <th>항목</th>
                                <th>값</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{{ getLabel('bondSrfcInrt') }}</td>
                                <td>{{ productDetails.bondSrfcInrt }}%</td>
                            </tr>
                            <tr>
                                <td>{{ getLabel('bondExprDt') }}</td>
                                <td>{{ formatDate(productDetails.bondExprDt) }}</td>
                            </tr>
                            <tr>
                                <td>{{ getLabel('irtChngDcdNm') }}</td>
                                <td>{{ productDetails.irtChngDcdNm }}</td>
                            </tr>
                            <tr>
                                <td>{{ getLabel('bondIntTcdNm') }}</td>
                                <td>{{ productDetails.bondIntTcdNm }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- 펀드 상세 정보 표시 -->
            <div v-else-if="isFund" class="product-detail-layout fund-layout">
                <div class="info-section">
                    <h2>펀드 기본 정보</h2>
                    <!-- 상품 기본 정보 상단 -->
                    <div class="default-info-header">
                        <p>
                            <strong>{{ getLabel('productNm') }} </strong>
                            {{ productDetails.productNm }}
                        </p>
                    </div>
                    <hr />
                    <!-- 상품 기본 정보 중앙 -->
                    <div class="default-info-body">
                        <p>
                            <strong>{{ getLabel('companyNm') }} </strong>
                            {{ productDetails.companyNm }}
                        </p>
                        <p>
                            <strong>{{ getLabel('fundType') }} </strong>
                            {{ productDetails.fundType }}
                        </p>
                        <p>
                            <strong>{{ getLabel('advancedFee') }} </strong>
                            {{ productDetails.advancedFee }}%
                        </p>
                        <p>
                            <strong>{{ getLabel('totalPayoffRate') }} </strong>
                            {{ productDetails.totalPayoffRate }}%
                        </p>
                    </div>
                </div>
                <!-- 상품 기본 정보 하단 -->
                <div class="rate-section">
                    <h2>수익 및 수수료 정보</h2>
                    <table class="rates-table">
                        <thead>
                            <tr>
                                <th>항목</th>
                                <th>값</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{{ getLabel('yield1') }}</td>
                                <td>{{ productDetails.yield1 }}%</td>
                            </tr>
                            <tr>
                                <td>{{ getLabel('yield3') }}</td>
                                <td>{{ productDetails.yield3 }}%</td>
                            </tr>
                            <tr>
                                <td>{{ getLabel('yield6') }}</td>
                                <td>{{ productDetails.yield6 }}%</td>
                            </tr>
                            <tr>
                                <td>{{ getLabel('yield12') }}</td>
                                <td>{{ productDetails.yield12 }}%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- 상품이 없을 때 메시지 -->
            <div v-else class="no-product-message">
                <p>해당 상품을 찾을 수 없습니다.</p>
            </div>

            <v-btn class="back-button" @click="goBack">뒤로가기</v-btn>
        </div>
    </div>
</template>

<script>
import { productLabelMapping } from '@/ProductLabel.js';
import {
    getDepositProductDetail,
    getSavingProductDetail,
    getBondProductDetail,
    getFundProductDetail,
} from '@/api/financeApi.js';
import { useRecentViewStore } from '@/store/modules/recentView.js';

export default {
    name: 'ProductDetail',
    data() {
        return {
            productDetails: null,
            productType: '', // 상품 유형 ('deposit', 'saving', 'fund', 'bond')
            productId: '', // 상품 ID
            isLoading: true,
            isDepositOrSaving: false, // 예/적금 여부
            isBond: false, // 채권 여부
            isFund: false, // 펀드 여부
            newRecentViewItem: {
                productId: null,
                productType: null,
                productName: null,
                rsrvType: null,
            },
        };
    },
    created() {
        const productIdParam = this.$route.params.productId;
        const productTypeParam = this.$route.query.productType;

        this.productId = productIdParam;
        this.productType = productTypeParam;

        if (!this.productId || !this.productType) {
            console.error('상품 ID 또는 상품 유형이 올바르지 않습니다.');
            this.isLoading = false;
            return;
        }

        this.checkProductType();
        this.fetchProductDetails();
    },
    methods: {
        checkProductType() {
            if (this.productType === 'deposit' || this.productType === 'saving') {
                this.isDepositOrSaving = true;
            } else if (this.productType === 'fund') {
                this.isFund = true;
            } else if (this.productType === 'bond') {
                this.isBond = true;
            }
        },

        addRecentViewItem(newRecentViewItem) {
            newRecentViewItem.productId = this.productId;
            newRecentViewItem.productType = this.productType;
            newRecentViewItem.productName = this.getProductName(this.productDetails);

            try {
                useRecentViewStore().addRecentViewItem(newRecentViewItem);
            } catch (error) {
                console.error('최근 본 상품 추가 중 에러 발생', error);
            }
            this.newRecentViewItem.productId = null;
            this.newRecentViewItem.productName = null;
            this.newRecentViewItem.productType = null;
        },

        async fetchProductDetails() {
            this.isLoading = true;
            try {
                let data = null;

                if (this.isDepositOrSaving) {
                    if (this.productType === 'deposit') {
                        data = await getDepositProductDetail(this.productId);
                    } else if (this.productType === 'saving') {
                        data = await getSavingProductDetail(this.productId);
                    }
                } else if (this.isBond) {
                    data = await getBondProductDetail(this.productId);
                } else if (this.isFund) {
                    data = await getFundProductDetail(this.productId);
                }

                if (data) {
                    this.productDetails = data;
                    this.addRecentViewItem(this.newRecentViewItem);
                } else {
                    this.productDetails = null;
                }
            } catch (error) {
                console.error('상품 정보를 불러오는 중 오류 발생:', error);
                this.productDetails = null;
            } finally {
                this.isLoading = false;
            }
        },
        goBack() {
            this.$router.go(-1); // 이전 페이지로 돌아가기
        },
        getProductName(product) {
            if (this.isDepositOrSaving) {
                return product.products[0]?.finPrdtNm || '상품명 없음';
            } else if (this.isBond) {
                return product.isinCdNm || '채권 상품';
            } else if (this.isFund) {
                return product.productNm || '펀드 상품';
            }
            return '상품명 없음';
        },
        getLabel(key) {
            if (this.isDepositOrSaving) {
                return productLabelMapping[this.productType][key] || '';
            } else if (this.isBond) {
                return productLabelMapping.bond[key] || '';
            } else if (this.isFund) {
                return productLabelMapping.fund[key] || '';
            }
            return '';
        },

        formatDate(dateStr) {
            if (typeof dateStr !== 'string' || dateStr.length !== 8) {
                return dateStr; // 형식이 맞지 않으면 원래 문자열 반환
            }
            const year = dateStr.slice(0, 4);
            const month = dateStr.slice(4, 6);
            const day = dateStr.slice(6, 8);
            return `${year}-${month}-${day}`;
        },

        formatMonth(dateStr) {
            if (typeof dateStr !== 'string' || dateStr.length !== 6) {
                return dateStr; // 형식이 맞지 않으면 원래 문자열 반환
            }
            const year = dateStr.slice(0, 4);
            const month = dateStr.slice(4, 6);
            return `${year}-${month}`;
        },

        formatCurrency(value) {
            if (value === null || value === undefined || isNaN(value)) return '0';

            const numValue = Number(value);

            if (numValue < 1_000_000) {
                // 백만 단위 이하의 경우 원래 값 반환
                return numValue.toLocaleString() + '원';
            }

            const units = [
                { limit: 1_000_000_000_000_000, label: '경 원' }, // 조 위 단위는 경
                { limit: 1_000_000_000_000, label: '조 원' },
                { limit: 100_000_000_000, label: '천 억 원' },
                { limit: 1_000_000_000, label: '백 억 원' },
                { limit: 100_000_000, label: '십 억 원' },
                { limit: 10_000_000, label: '억 원' },
                { limit: 1_000_000, label: '백만 원' },
            ];

            for (const unit of units) {
                if (numValue >= unit.limit) {
                    const formattedValue = (numValue / unit.limit).toFixed(1);
                    return `${Number(formattedValue)}${unit.label}`;
                }
            }

            // 1백만 이상인 경우 소수점 포함 없이 전체 숫자 반환
            return numValue.toLocaleString();
        },
    },
};
</script>

<style scoped>
/* 전체 래퍼 스타일 */
.product-desc-wrapper {
    padding: 20px;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* 컨테이너 스타일 */
.product-desc-container {
    width: 70%;
    max-width: 1200px;
    margin: auto;
    border: 1px solid #ddd;
    border-radius: 12px;
    padding: 30px;
    background-color: #ffffff;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    position: relative;
}

/* 상품명 스타일 */
.product-title {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 25px;
    text-align: center;
    color: #333333;
    word-wrap: break-word;
}

/* 로딩 및 에러 메시지 스타일 */
.loading-message,
.no-product-message {
    font-size: 20px;
    color: #666666;
    text-align: center;
    margin-top: 50px;
}

/* 상세 정보 레이아웃 스타일 */
.product-detail-layout {
    display: flex; /* Flex 컨테이너로 설정 */
    flex-direction: row; /* 기본 방향을 가로로 설정 */
    gap: 20px; /* Flex 아이템 간의 간격 설정 */
    width: 100%;
    margin-top: 20px;
    flex-wrap: wrap; /* 아이템이 넘칠 경우 다음 줄로 감싸기 */
}

/* 공통 정보 섹션 스타일 */
.info-section,
.fund-layout .info-section {
    background-color: #fafafa; /* 배경색 변경 */
    padding: 25px;
    border-radius: 8px;
    border: 1px solid #e0e0e0;
    flex: 1 1 45%; /* Flex 아이템으로 설정, 기본 너비 45% */
    box-sizing: border-box; /* 패딩과 보더를 포함하여 너비 계산 */
    display: flex;
    flex-direction: column;
    transition: box-shadow 0.3s ease;
}

/* 채권 섹션의 기본 정보 헤더, 바디, 푸터 스타일 */
.bond-layout .default-info-header,
.bond-layout .default-info-body,
.bond-layout .default-info-footer {
    background-color: #fafafa; /* 배경색 변경 */
    padding: 15px 20px;
    border-radius: 8px;
    border: 1px solid #e0e0e0;
    box-sizing: border-box; /* 패딩과 보더를 포함하여 너비 계산 */
    display: flex;
    flex-direction: column;
    margin-bottom: 20px; /* 섹션 간 간격 추가 */
    transition: box-shadow 0.3s ease;
}

/* 펀드 섹션의 rate-section 스타일 */
.rate-section {
    background-color: #fafafa; /* 배경색 변경 */
    padding: 25px;
    border-radius: 8px;
    border: 1px solid #e0e0e0;
    flex: 1 1 45%; /* Flex 아이템으로 설정, 기본 너비 45% */
    box-sizing: border-box; /* 패딩과 보더를 포함하여 너비 계산 */
    display: flex;
    flex-direction: column;
    transition: box-shadow 0.3s ease;
}

/* 헤더 스타일 */
.info-section h2,
.bond-layout h2,
.fund-layout h2,
.rate-section h2 {
    font-size: 24px;
    margin-bottom: 20px;
    color: #7bd5c3; /* 색상 조정 */
    border-bottom: 2px solid #7bd5c3; /* 색상 조정 */
    padding-bottom: 8px;
}

/* 상품 기본 정보 섹션 (상단, 중앙, 하단) */
.default-info-header,
.default-info-body,
.default-info-footer {
    margin-bottom: 15px;
}

/* 상품 기본 정보 섹션 (상단, 중앙, 하단) */
.default-info-header p,
.default-info-body p,
.default-info-footer p {
    display: grid; /* Flex 대신 Grid 사용 */
    grid-template-columns: 180px 1fr; /* 레이블과 데이터의 컬럼 크기 설정 */
    align-items: center; /* 수직 정렬 */
    font-size: 16px;
    color: #555555; /* 텍스트 색상 조정 */
    margin-bottom: 10px;
    padding: 8px 0; /* 패딩 추가 */
    border-bottom: 1px solid #e0e0e0; /* 하단 선 추가 */
}

.default-info-header p:last-child,
.default-info-body p:last-child,
.default-info-footer p:last-child {
    border-bottom: none; /* 마지막 행은 선 제거 */
}

.default-info-header p strong,
.default-info-body p strong,
.default-info-footer p strong {
    width: 180px;
    text-align: left; /* 라벨 정렬 */
    padding-right: 10px;
    font-weight: 600;
    color: #333333;
    flex-shrink: 0;
}

/* 금리 정보 테이블 스타일 */
.rates-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 15px;
}

.rates-table th,
.rates-table td {
    padding: 12px 15px;
    text-align: center;
    border-bottom: 1px solid #ddd;
    font-size: 16px;
    color: #333333;
}

.rates-table th {
    background-color: #7bd5c3; /* 배경색 변경 */
    font-weight: bold;
    color: rgb(0, 0, 0); /* 텍스트 색상 변경 */
}

.rates-table tr:nth-child(even) {
    background-color: #f9f9f9; /* 짝수 행 배경색 변경 */
}

.rates-table tr:hover {
    background-color: #f1f1f1;
}

/* 뒤로가기 버튼 스타일 */
.back-button {
    margin-top: 30px;
    background-color: #7bd5c3; /* 색상 변경 */
    color: #000000;
    border: none;
    border-radius: 6px;
    padding: 12px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    width: 100%;
    text-align: center;
}

.back-button:hover {
    background-color: #3dd4b6;
    transform: translateY(-2px);
}

.back-button:active {
    transform: translateY(0);
}

/* 반응형 디자인 */
@media (max-width: 1200px) {
    .info-section,
    .rate-section,
    .bond-layout .default-info-header,
    .bond-layout .default-info-body,
    .bond-layout .default-info-footer {
        flex: 1 1 48%; /* 너비 조정 */
    }
}

@media (max-width: 992px) {
    .info-section,
    .rate-section,
    .bond-layout .default-info-header,
    .bond-layout .default-info-body,
    .bond-layout .default-info-footer {
        flex: 1 1 100%; /* 한 줄에 하나씩 배치 */
    }

    /* 채권 섹션의 Grid 레이아웃을 Flex로 변경 */
    .bond-layout {
        display: flex;
        flex-direction: column;
    }

    .data-table-section {
        margin-top: 20px; /* 추가 정보 섹션과 기본 정보 섹션 간 간격 */
    }
}

@media (max-width: 768px) {
    .product-title {
        font-size: 28px;
    }

    .info-section,
    .rate-section,
    .bond-layout .default-info-header,
    .bond-layout .default-info-body,
    .bond-layout .default-info-footer {
        padding: 20px;
    }

    .rates-table th,
    .rates-table td {
        padding: 10px 12px;
        font-size: 14px;
    }

    .back-button {
        padding: 10px 16px;
        font-size: 14px;
    }

    /* 강제 1열 그리드로 전환 */
    .default-info-header p strong,
    .default-info-body p strong,
    .default-info-footer p strong {
        width: 140px;
    }
}
</style>
