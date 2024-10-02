portfolios
<template>
  <div class="MyPortfolio-container">
    <h1>내 포트폴리오 리스트 페이지</h1>
    <div class="MyPortfolio-DataTable">
      <v-data-table
        v-model="selected"
        :items="portfolioList"
        item-value="PortfolioName"
        show-select
        :headers="headers"
        item-key="id"
      >
        <!-- 전체 선택 체크박스 -->
        <template v-slot:header>
          <tr>
            <th>
              <v-checkbox v-model="allSelected" @change="toggleSelectAll" />
            </th>
            <th
              v-for="header in headers"
              :key="header.value"
              :align="header.align"
            >
              {{ header.text }}
            </th>
          </tr>
        </template>

        <!-- 데이터 항목 -->
        <template v-slot:item="{ item }">
          <tr>
            <td>
              <v-checkbox v-model="selected" :value="item.PortfolioName" />
            </td>
            <td class="NameCursor" @click="goToPortfolioDetail(item.id)">
              {{ item.portfolioName }}
            </td>
            <td>{{ item.expectedReturn }}%</td>
            <td>{{ item.riskLevel }}</td>
          </tr>
        </template>
      </v-data-table>
    </div>
    <div class="MyPortfolio-btn">
      <v-btn @click="goToCreatePortfolio">포트폴리오 만들러 가기</v-btn>
      <v-btn @click="deleteSelectedPortfolios">삭제하기</v-btn>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'MyPortfolio',
  setup() {
    const portfolios = ref([
      // 포트폴리오 내용
    ]);

    const currentUsername = 'user123'; // 현재 사용자의 고유번호 (동적으로 설정 가능)

    const selected = ref([]);
    const allSelected = ref(false);

    // // 현재 사용자 고유번호에 해당하는 포트폴리오만 필터링
    // const filteredPortfolios = computed(() => {
    //   return portfolios.value.filter(
    //     (portfolio) => portfolio.Username === currentUsername
    //   );
    // });

    const headers = [
      { text: '', value: 'checkbox', align: 'start' },
      { text: '포트폴리오 이름', value: 'PortfolioName' },
      { text: '예상 수익률', value: 'ExpectedReturn' },
      { text: '위험도', value: 'RiskLevel' },
    ];

    // 전체 선택 / 해제 기능
    const toggleSelectAll = () => {
      if (allSelected.value) {
        selected.value = filteredPortfolios.value.map(
          (item) => item.PortfolioName
        );
      } else {
        selected.value = [];
      }
    };

    const router = useRouter();

    const goToCreatePortfolio = () => {
      console.log('포트폴리오 만들러 가기 버튼 클릭됨');
      router.push('/make-portfolio');
    };

    const deleteSelectedPortfolios = () => {
      if (selected.value.length === 0) {
        console.log('선택된 포트폴리오가 없습니다.');
        return;
      }

      portfolios.value = portfolios.value.filter(
        (portfolio) => !selected.value.includes(portfolio.PortfolioName)
      );
      selected.value = [];
      console.log('선택된 포트폴리오 삭제됨');
    };

    const goToPortfolioDetail = (id) => {
      console.log(`포트폴리오 세부 정보 페이지로 이동: ${id}`);
      router.push(`/portfolio/${id}`);
    };
    return {
      selected,
      allSelected,
      headers,
      toggleSelectAll,
      goToCreatePortfolio,
      deleteSelectedPortfolios,
      goToPortfolioDetail,
    };
  },
  data() {
    return {
      portfolioList: [], // 장바구니 리스트
    };
  },
  methods: {
    // 장바구니 리스트 가져오기
    fetchPortfolio() {
      fetch('/api/portfolio')
        .then((response) => response.json())
        .then((data) => {
          this.portfolioList = data;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    // 장바구니에 상품 추가 (POST 요청)
    addCartItem() {
      fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.newProduct), // 새로운 상품 정보 전송
      })
        .then((response) => {
          // 응답이 JSON 형식인지 확인
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          // 응답이 비어 있지 않으면 JSON 파싱
          return response.text().then((text) => (text ? JSON.parse(text) : {}));
        })
        .then((data) => {
          this.clearNewProduct(); // 입력 필드 초기화
        })
        .catch((error) => {
          console.error('Error adding cart item:', error);
        });
    },

    // 입력 필드 초기화

    // 장바구니에서 상품 삭제 (DELETE 요청)
    deleteCartItem(cartId) {
      fetch(`/api/cart/${cartId}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          this.fetchCart();
        })
        .catch((error) => {
          console.error('Error deleting cart item:', error);
        });
    },
  },
  created() {
    this.fetchPortfolio(); // 컴포넌트 생성 시 장바구니 데이터 가져오기
  },
};
</script>

<style scoped>
.MyPortfolio-container {
  padding: 20px;
}

.MyPortfolio-DataTable {
  margin-top: 20px;
}

.MyPortfolio-btn {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

.NameCursor:hover {
  cursor: pointer;
  text-decoration: underline;
  color: blue;
}
</style>
