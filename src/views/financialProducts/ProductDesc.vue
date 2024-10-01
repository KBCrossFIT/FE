<template>
    <div class="product-desc-wrapper">
        <div class="product-desc-container">
            <h1>{{ productDetails ? productDetails.product : 'Loading...' }}</h1>

            <!-- 채권에 대한 세부 정보 -->
            <div v-if="isBond">
                <p>ISIN 코드명: {{ productDetails.isinCdNm }}</p>
                <p>채권 발행일자: {{ productDetails.bondIssuDt }}</p>
                <p>채권금리: {{ productDetails.bondSrfcInrt }}%</p>
                <p>기본 날짜: {{ productDetails.basDt }}</p>
                <p>채권 만기일: {{ productDetails.bondExprDt }}</p>
                <p>채권 이자 지급 주기: {{ productDetails.intPayCyclCtt }}</p>
                <p>채권 발행 금액: {{ productDetails.bondIssuAmt }}</p>
                <p>채권 발행 통화 코드: {{ productDetails.bondIssuCurCd }}</p>
                <p>채권 발행 통화: {{ productDetails.bondIssuCurCdNm }}</p>
                <p>채권 보험 명: {{ productDetails.bondIsurNm }}</p>
                <p>채권 상환 금액: {{ productDetails.bondPymtAmt }}</p>
                <p>신용 등급 코드: {{ productDetails.scrsItmsKcd }}</p>
                <p>신용 등급 명: {{ productDetails.scrsItmsKcdNm }}</p>
                <p>채권 상태: {{ productDetails.irtChngDcdNm }}</p>
                <p>발행 증권 명: {{ productDetails.fnScrsItmsKcdNm }}</p>
                <p>다음 쿠폰 날짜: {{ productDetails.nxtmCopnDt }}</p>
                <p>히트 수: {{ productDetails.hit }}</p>
                <p>CRNO: {{ productDetails.crno }}</p>
                <p>이자 변경 코드: {{ productDetails.irtChngDcd }}</p>
                <p>위험 수준: {{ productDetails.riskLevel }}</p>
            </div>

            <!-- 예금 및 적금에 대한 세부 정보 -->
            <div v-if="isDepositOrSaving">
                <p>기본금리: {{ productRates?.intr_rate }}%</p>
                <p>최고금리: {{ productRates?.intr_rate2 }}%</p>
                <p>이자율 유형: {{ productRates?.intr_rate_type_nm }}</p>
                <p>예약 유형: {{ productRates?.rsrv_type_nm }}</p>
                <p>저축 기간: {{ productRates?.save_trm }}개월</p>
            </div>

            <!-- 펀드에 대한 세부 정보 -->
            <div v-if="isFund">
                <p>펀드 이름: {{ productDetails.product_nm }}</p>
                <p>펀드 회사명: {{ productDetails.company_nm }}</p>
                <p>펀드 유형: {{ productDetails.fund_type }}</p>
                <p>위험 수준: {{ productDetails.RiskLevel }}</p>
                <p>1개월 수익률: {{ productDetails.yield_1 }}%</p>
                <p>3개월 수익률: {{ productDetails.yield_3 }}%</p>
                <p>6개월 수익률: {{ productDetails.yield_6 }}%</p>
                <p>12개월 수익률: {{ productDetails.yield_12 }}%</p>
                <p>총 수익률: {{ productDetails.total_payoff_rate }}%</p>
                <p>히트 수: {{ productDetails.hit }}</p>
                <p>상품 ID: {{ productDetails.productID }}</p>
                <p>선취 수수료: {{ productDetails.advanced_fee }}%</p>
            </div>

            <!-- 적금에 대한 세부 정보 -->
            <div v-if="isSaving">
                <p>상품 ID: {{ productDetails.productID }}</p>
                <p>상품 이름: {{ productDetails.fin_prdt_nm }}</p>
                <p>금융 회사 번호: {{ productDetails.fin_co_no }}</p>
                <p>최대 한도: {{ productDetails.max_limit }}</p>
                <p>위험 수준: {{ productDetails.RiskLevel }}</p>
                <p>가입 방법: {{ productDetails.join_way }}</p>
                <p>가입 제한: {{ productDetails.join_deny }}</p>
                <p>가입 회원: {{ productDetails.join_member }}</p>
                <p>특별 조건: {{ productDetails.spcl_cnd }}</p>
                <p>신고 시작일: {{ productDetails.dcls_strt_day }}</p>
                <p>신고 종료일: {{ productDetails.dcls_end_day }}</p>
                <p>신고 월: {{ productDetails.dcls_month }}</p>
                <p>비고: {{ productDetails.etc_note }}</p>
                <p>히트 수: {{ productDetails.hit }}</p>
            </div>

            <v-btn @click="addToCart(productDetails.productID)">장바구니에 추가</v-btn>
            <v-btn @click="goBack">뒤로 가기</v-btn>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    data() {
        return {
            productId: this.$route.params.productId, // URL에서 상품 ID 가져오기
            productType: this.$route.params.productType, // URL에서 상품 종류 가져오기
        };
    },
    computed: {
        ...mapGetters('bond', ['getProductDetail']),
        ...mapGetters('deposit', ['getDepositProductDetail']),
        ...mapGetters('saving', ['getSavingProductDetail']),
        ...mapGetters('fund', ['getFundProductDetail']),
        ...mapGetters('savingRates', ['getSavingProductRatesDetail']),

        productDetails() {
            // 상품 종류에 따라 적절한 정보를 가져옴
            if (this.productType === 'B') {
                return this.getProductDetail; // Accessing as property
            } else if (this.productType === 'D') {
                return this.getDepositProductDetail; // Accessing as property
            } else if (this.productType === 'S') {
                return this.getSavingProductDetail; // Accessing as property
            } else if (this.productType === 'F') {
                return this.getFundProductDetail; // Accessing as property
            }
            return null; // 정보가 없을 경우 null 반환
        },

        productRates() {
            return this.getSavingProductRatesDetail(this.productId);
        },

        isDepositOrSaving() {
            return (
                this.productDetails && // Check if productDetails is not null
                (this.productDetails.productType === 'D' || this.productDetails.productType === 'S')
            );
        },

        isBond() {
            return this.productDetails && this.productDetails.productType === 'B'; // Add null check
        },

        isFund() {
            return this.productDetails && this.productDetails.productType === 'F'; // Add null check
        },

        isSaving() {
            return this.productDetails && this.productDetails.productType === 'S'; // Add null check
        },
    },
    methods: {
        ...mapActions('bond', ['fetchBondProductDetail']),
        ...mapActions('deposit', ['fetchDepositProductDetail']),
        ...mapActions('saving', ['fetchSavingProductDetail']),
        ...mapActions('fund', ['fetchFundProductDetail']),
        ...mapActions('savingRates', ['fetchSavingProductRatesDetail']),

        async fetchProductDetails(productId, productType) {
            // 각 상품 종류에 맞는 세부 정보 가져오기
            if (productType === 'B') {
                await this.fetchBondProductDetail(productId);
            } else if (productType === 'D') {
                await this.fetchDepositProductDetail(productId);
            } else if (productType === 'S') {
                await this.fetchSavingProductDetail(productId);
            } else if (productType === 'F') {
                await this.fetchFundProductDetail(productId);
            }
        },

        addToCart(productId) {
            this.$store.dispatch('cart/addToCart', productId); // 장바구니에 추가
        },
        goBack() {
            this.$router.go(-1); // 이전 페이지로 이동
        },
    },
    created() {
        // 컴포넌트 생성 시 상품 세부 정보 가져오기
        this.fetchProductDetails(this.productId, this.productType);
    },
};
</script>

<style scoped>
.product-desc-wrapper {
    padding: 20px;
}

.product-desc-container {
    max-width: 600px;
    margin: auto;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 16px;
    background-color: #f9f9f9;
}
</style>
