<template>
  <section class="product-container">
    <table class="product-table">
      <thead>
        <tr>
          <th class="mc">연령별 금융상품 추천</th>
          <th>투자 성향별 금융상품 추천</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="product-list">
            <!-- 연령별 금융상품 추천 버튼 및 카드 -->
            <div class="age-tabs">
              <v-btn
                :class="{
                  active: state.activeAge === '20대',
                  hovered: state.hoverAge === '20대',
                }"
                @mouseover="setHoverAge('20대')"
                @mouseleave="resetHoverAge"
                @click="setActiveAge('20대')"
              >
                20대
              </v-btn>
              <v-btn
                :class="{
                  active: state.activeAge === '30대',
                  hovered: state.hoverAge === '30대',
                }"
                @mouseover="setHoverAge('30대')"
                @mouseleave="resetHoverAge"
                @click="setActiveAge('30대')"
              >
                30대
              </v-btn>
              <v-btn
                :class="{
                  active: state.activeAge === '40대',
                  hovered: state.hoverAge === '40대',
                }"
                @mouseover="setHoverAge('40대')"
                @mouseleave="resetHoverAge"
                @click="setActiveAge('40대')"
              >
                40대
              </v-btn>
              <v-btn
                :class="{
                  active: state.activeAge === '50대',
                  hovered: state.hoverAge === '50대',
                }"
                @mouseover="setHoverAge('50대')"
                @mouseleave="resetHoverAge"
                @click="setActiveAge('50대')"
              >
                50대
              </v-btn>
              <v-btn
                :class="{
                  active: state.activeAge === '60대',
                  hovered: state.hoverAge === '60대',
                }"
                @mouseover="setHoverAge('60대')"
                @mouseleave="resetHoverAge"
                @click="setActiveAge('60대')"
              >
                60대 이상
              </v-btn>
            </div>

            <div class="product-grid">
              <div
                class="product-card"
                v-for="(product, index) in state.ageGroupProducts"
                :key="index"
                @click="handleProductClick(product)"
              >
                <div v-if="product.isinCdNm && product.bondIsurNm">
                  <h3>{{ product.isinCdNm }}</h3>
                  <p>{{ product.bondIsurNm }}</p>
                </div>
                <div v-else-if="product.productNm && product.companyNm">
                  <h3>{{ product.productNm }}</h3>
                  <p>{{ product.companyNm }}</p>
                </div>
                <div
                  v-else-if="
                    product.savingProduct &&
                    product.savingProduct.finPrdtNm &&
                    product.savingProduct.korCoNm
                  "
                >
                  <h3>{{ product.savingProduct.finPrdtNm }}</h3>
                  <p>{{ product.savingProduct.korCoNm }}</p>
                </div>
                <div v-else>
                  <h3>알 수 없는 상품</h3>
                  <p>상품 데이터를 확인해주세요.</p>
                </div>
              </div>
            </div>
          </td>
          <td class="investment-section">
            <!-- 투자 성향별 금융상품 추천 버튼 및 카드 -->
            <div class="investment-types">
              <v-btn
                :class="{
                  active: state.activeInvestment === '공격투자형',
                  hovered: state.hoverInvestment === '공격투자형',
                }"
                @mouseover="setHoverInvestment('공격투자형')"
                @mouseleave="resetHoverInvestment"
                @click="setActiveInvestment('공격투자형')"
              >
                공격투자형
              </v-btn>
              <v-btn
                :class="{
                  active: state.activeInvestment === '적극투자형',
                  hovered: state.hoverInvestment === '적극투자형',
                }"
                @mouseover="setHoverInvestment('적극투자형')"
                @mouseleave="resetHoverInvestment"
                @click="setActiveInvestment('적극투자형')"
              >
                적극투자형
              </v-btn>
              <v-btn
                :class="{
                  active: state.activeInvestment === '위험중립형',
                  hovered: state.hoverInvestment === '위험중립형',
                }"
                @mouseover="setHoverInvestment('위험중립형')"
                @mouseleave="resetHoverInvestment"
                @click="setActiveInvestment('위험중립형')"
              >
                위험중립형
              </v-btn>
              <v-btn
                :class="{
                  active: state.activeInvestment === '안전추구형',
                  hovered: state.hoverInvestment === '안전추구형',
                }"
                @mouseover="setHoverInvestment('안전추구형')"
                @mouseleave="resetHoverInvestment"
                @click="setActiveInvestment('안전추구형')"
              >
                안전추구형
              </v-btn>
              <v-btn
                :class="{
                  active: state.activeInvestment === '안전형',
                  hovered: state.hoverInvestment === '안전형',
                }"
                @mouseover="setHoverInvestment('안전형')"
                @mouseleave="resetHoverInvestment"
                @click="setActiveInvestment('안전형')"
              >
                안전형
              </v-btn>
            </div>

            <div class="investment-grid">
              <div
                class="product-card"
                v-for="(product, index) in state.investmentProducts"
                :key="index"
                @click="handleProductClick(product)"
              >
                <div v-if="product.isinCdNm && product.bondIsurNm">
                  <h3>{{ product.bondIsurNm }}</h3>
                  <p>{{ product.isinCdNm }}</p>
                </div>
                <div v-else-if="product.productNm && product.companyNm">
                  <h3>{{ product.productNm }}</h3>
                  <p>{{ product.companyNm }}</p>
                </div>
                <div
                  v-else-if="
                    product.savingProduct &&
                    product.savingProduct.finPrdtNm &&
                    product.savingProduct.korCoNm
                  "
                >
                  <h3>{{ product.savingProduct.finPrdtNm }}</h3>
                  <p>{{ product.savingProduct.korCoNm }}</p>
                </div>
                <div v-else>
                  <h3>알 수 없는 상품</h3>
                  <p>상품 데이터를 확인해주세요.</p>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
<script>
import { ref, reactive, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/authStore';
import {
  getTopProductsByAgeGroup,
  getTopProductsByPreference,
  getTopProductsBySelectedAgeGroup,
  getTopProductsBySelectedPreference,
} from '@/api/hit';

export default {
  name: 'ProductListSection',
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();

    // isLoggedIn 계산된 속성 수정
    const isLoggedIn = computed(() => authStore.isAuthenticated);
    const isTested = computed(() => authStore.isTested);

    // 상태 정의
    const state = reactive({
      activeAge: '20대',
      hoverAge: null,
      activeInvestment: '공격투자형',
      hoverInvestment: null,
      ageGroupProducts: [],
      investmentProducts: [],
    });

    // 메서드 정의
    const handleProductClick = (product) => {
      let productId = '';

      if (product.productId) {
        productId = product.productId;
      } else if (product.savingProduct.productId) {
        productId = product.savingProduct.productId;
      }
      let productType = '';

      if (product.isinCdNm) {
        // 채권
        productType = 'bond';
      } else if (product.savingProduct && product.savingProductRates.rsrvType) {
        // 적금
        productType = 'saving';
      } else if (product.productNm) {
        // 펀드
        productType = 'fund';
      } else {
        // 예금
        productType = 'deposit';
      }

      // 라우터로 이동하면서 productId와 productType을 전달
      router.push({
        name: 'ProductDetail',
        params: { productId },
        query: { productType },
      });
    };

    const setActiveAge = (age) => {
      state.activeAge = age;
      state.hoverAge = null;
      const ageGroup = convertAgeToNumber(age);
      fetchAgeGroupProducts(ageGroup, true);
    };

    const setHoverAge = (age) => {
      if (state.activeAge !== age) {
        state.hoverAge = age;
      }
    };

    const resetHoverAge = () => {
      state.hoverAge = null;
    };

    const setActiveInvestment = (investment) => {
      state.activeInvestment = investment;
      state.hoverInvestment = null;
      const preference = convertInvestmentToNumber(investment);
      fetchInvestmentProducts(preference, true);
    };

    const setHoverInvestment = (investment) => {
      if (state.activeInvestment !== investment) {
        state.hoverInvestment = investment;
      }
    };

    const resetHoverInvestment = () => {
      state.hoverInvestment = null;
    };

    const fetchAgeGroupProducts = async (ageGroup, skipAuth = true) => {
      try {
        const response = await getTopProductsBySelectedAgeGroup(
          ageGroup,
          skipAuth
        );
        state.ageGroupProducts = response.slice(0, 3); // 최대 3개까지만 가져오기
      } catch (error) {
        console.error('Error fetching top products for age group:', error);
      }
    };

    const fetchInvestmentProducts = async (preference, skipAuth = true) => {
      try {
        const response = await getTopProductsBySelectedPreference(
          preference,
          skipAuth
        );
        state.investmentProducts = response.slice(0, 3);
      } catch (error) {
        console.error('Error fetching top products for preference:', error);
      }
    };

    const convertAgeToNumber = (age) => {
      const ageMapping = {
        '20대': 20,
        '30대': 30,
        '40대': 40,
        '50대': 50,
        '60대': 60,
      };
      return ageMapping[age] || 20;
    };

    const convertInvestmentToNumber = (investment) => {
      const investmentMapping = {
        안전형: 1,
        안전추구형: 2,
        위험중립형: 3,
        적극투자형: 4,
        공격투자형: 5,
      };
      return investmentMapping[investment] || 5;
    };

    onMounted(async () => {
      await authStore.checkAuth();
      if (isLoggedIn.value) {
        if (isTested.value) {
          // 기본 연령대와 투자 성향에 맞는 데이터를 가져옴
          try {
            const ageResponse = await getTopProductsByAgeGroup();
            const investmentResponse = await getTopProductsByPreference();
            state.activeAge = `${ageResponse[ageResponse.length - 1]}대`;

            if (investmentResponse[investmentResponse.length - 1] === 1) {
              state.activeInvestment = '안전형';
            } else if (
              investmentResponse[investmentResponse.length - 1] === 2
            ) {
              state.activeInvestment = '안전추구형';
            } else if (
              investmentResponse[investmentResponse.length - 1] === 3
            ) {
              state.activeInvestment = '위험중립형';
            } else if (
              investmentResponse[investmentResponse.length - 1] === 4
            ) {
              state.activeInvestment = '적극투자형';
            } else {
              state.activeInvestment = '공격투자형';
            }

            if (ageResponse) {
              state.ageGroupProducts = ageResponse.slice(0, 3);
            }
            if (investmentResponse) {
              state.investmentProducts = investmentResponse.slice(0, 3);
            }
          } catch (error) {
            console.error('Error during initial load:', error);
          }
        } else {
          // 투자성향 분석이 완료되지 않은 경우
          setDefaultValues();
        }
      } else {
        setDefaultValues();
      }
    });

    const setDefaultValues = async () => {
      state.activeAge = '20대';
      state.activeInvestment = '공격투자형';
      await fetchAgeGroupProducts(20, true);
      await fetchInvestmentProducts(5, true);
    };

    return {
      state,
      isLoggedIn,
      handleProductClick,
      setActiveAge,
      setHoverAge,
      resetHoverAge,
      setActiveInvestment,
      setHoverInvestment,
      resetHoverInvestment,
      fetchAgeGroupProducts,
      fetchInvestmentProducts,
    };
  },
};
</script>

<style scoped>
.product-container {
  /* 배경색 설정 (필요 시) */
  /* background-color: #f9fafb; */
  margin-top: 30px;
}

.product-table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
}

.product-table th,
.product-table td {
  padding: 20px;
  /* border: 1px solid #ddd; */
  vertical-align: top;
  font-size: 25px;
}

/* 타이틀 스타일 */
.title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

/* 버튼 스타일 */
.age-tabs,
.investment-types {
  display: flex;
  margin-bottom: 20px;
}

.age-tabs button,
.investment-types button {
  text-align: center;
  width: 20%;
  margin: 0;
}

.age-tabs .active,
.investment-types .active {
  background-color: #7bd5c3 !important;
  color: white !important;
}

.age-tabs .hovered,
.investment-types .hovered {
  transform: scale(0.95);
}

/* 상품 카드 스타일 */
.product-grid,
.investment-grid {
  display: flex; /* flex로 변경하여 세로 배치 설정 */
  flex-direction: column; /* 세로 방향으로 아이템 배치 */
  gap: 20px; /* 카드 간의 간격 설정 */
}

.product-card {
  background-color: white;
  padding: 5%;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.product-card:hover {
  transform: translateY(-0.5rem);
  cursor: pointer; /* 클릭 커서로 변경 */
}

.product-card h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: blackslider-controls;
}

/* 반응형 설정 */
@media (max-width: 768px) {
  .product-grid,
  .investment-grid {
    flex-direction: column; /* 작은 화면에서는 세로 배치 유지 */
  }
}

@media (max-width: 576px) {
  .age-tabs button,
  .investment-types button {
    width: 100%;
    margin-bottom: 0.5rem;
  }
}

.mc {
  font-size: 20px;
}
</style>
