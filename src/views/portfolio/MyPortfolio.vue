<template>
    <div class="my-portfolio-container">
        <!-- 로그인하지 않은 상태 -->
        <div v-if="!isAuthenticated" class="empty_login_data">
            <h1>로그인 정보 없음.</h1>
            <p>로그인하고 금융상품을 담아보세요.</p>
            <router-link to="/login" class="btn">
                <i class="fas fa-sign-in-alt icon"></i>
                <span class="menu-text"> 로그인하러 가기</span>
            </router-link>
        </div>

        <!-- 로그인한 상태에서 포트폴리오 카드 표시 -->
        <v-card v-else class="portfolio-card">
            <h1 class="card-title">나의 포트폴리오</h1>
            <div class="table-responsive">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th class="checkbox-column">
                                <input
                                    type="checkbox"
                                    v-model="allSelected"
                                    @change="toggleSelectAll"
                                />
                            </th>
                            <th @click="sortBy('portfolioName')" class="sortable-header text-left">
                                포트폴리오
                                <i v-if="sortKey === 'portfolioName'" :class="sortIconClass"></i>
                            </th>
                            <th @click="sortBy('total')" class="sortable-header text-right">
                                투자 금액
                                <i v-if="sortKey === 'total'" :class="sortIconClass"></i>
                            </th>
                            <th
                                @click="sortBy('expectedReturn')"
                                class="sortable-header text-right"
                            >
                                기대 수익률
                                <i v-if="sortKey === 'expectedReturn'" :class="sortIconClass"></i>
                            </th>
                            <th @click="sortBy('riskLevel')" class="sortable-header text-center">
                                위험도
                                <i v-if="sortKey === 'riskLevel'" :class="sortIconClass"></i>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in sortedPortfolioList" :key="item.id">
                            <td class="checkbox-column">
                                <input
                                    type="checkbox"
                                    v-model="selected"
                                    :value="item.portfolioId"
                                    @change="updateSelectAllState"
                                />
                            </td>
                            <td
                                class="portfolio-name text-left"
                                @click="goToPortfolioDetail(item.portfolioId)"
                            >
                                {{ item.portfolioName }}
                            </td>
                            <td class="text-right">{{ item.total.toLocaleString() }}원</td>
                            <td class="text-right">{{ item.expectedReturn }}%</td>
                            <td class="text-center">{{ item.riskLevel }}등급</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="button-group">
                <button @click="goToCreatePortfolio" class="btn btn-primary">
                    <i class="fas fa-plus"></i> 포트폴리오 만들기
                </button>
                <button @click="deleteSelectedPortfolios" class="btn btn-danger">
                    <i class="fas fa-trash"></i> 삭제하기
                </button>
            </div>
        </v-card>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { usePortfolioStore } from '@/store/modules/portfolio';
import { ref, onMounted, computed, watch } from 'vue';
import { useAuthStore } from '@/store/authStore.js';

const router = useRouter();
const portfolioStore = usePortfolioStore();

const portfolioList = computed(() => portfolioStore.portfolioList);
const { fetchPortfolioListAction, deletePortfolioAction } = portfolioStore;

const selected = ref([]); // 선택된 포트폴리오
const allSelected = ref(false); // 전체 선택 체크박스 상태
const sortKey = ref('portfolioName'); // 정렬할 컬럼
const sortOrder = ref('asc'); // 오름차순('asc') 또는 내림차순('desc')
const authStore = useAuthStore(); //로그인 정보
const isAuthenticated = computed(() => authStore.isAuthenticated); // computed 사용

// 전체 선택 처리
const toggleSelectAll = () => {
    if (allSelected.value) {
        selected.value = portfolioList.value.map(
            (portfolio) => portfolio.portfolioId // 포트폴리오 이름으로 설정
        );
    } else {
        selected.value = [];
    }
};

// 체크박스 상태 변경 시 전체 선택 체크박스 상태 업데이트
const updateSelectAllState = () => {
    allSelected.value = selected.value.length === portfolioList.value.length;
};

// 포트폴리오 상세 페이지로 이동
const goToPortfolioDetail = (id) => {
    router.push({ name: 'Portfolio', params: { id } });
};

// 포트폴리오 생성 페이지로 이동
const goToCreatePortfolio = () => {
    router.push({ name: 'MakePortfolio' });
};

// 선택된 포트폴리오 삭제
const deleteSelectedPortfolios = async () => {
    for (const portfolioId of selected.value) {
        try {
            await deletePortfolioAction(portfolioId);
        } catch (error) {
            console.error('Error deleting portfolio:', error.response?.data || error.message);
        }
    }
    selected.value = [];
    await portfolioStore.fetchPortfolioListAction(true); // 포트폴리오 목록 새로 고침
};

// 정렬 기준과 방향 변경 함수
const sortBy = (key) => {
    if (sortKey.value === key) {
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
    } else {
        sortKey.value = key;
        sortOrder.value = 'asc';
    }
};

// 정렬된 포트폴리오 리스트 계산
const sortedPortfolioList = computed(() => {
    return portfolioList.value.slice().sort((a, b) => {
        let result = 0;
        if (a[sortKey.value] < b[sortKey.value]) {
            result = -1;
        } else if (a[sortKey.value] > b[sortKey.value]) {
            result = 1;
        }
        return sortOrder.value === 'asc' ? result : -result;
    });
});

// 컴포넌트가 마운트될 때 포트폴리오 리스트를 불러옴
onMounted(async () => {
    await authStore.checkAuth();
    if (isAuthenticated.value) {
        await portfolioStore.fetchPortfolioListAction(true);
    }
});

// 정렬 아이콘 클래스 계산
const sortIconClass = computed(() => {
    return sortOrder.value === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down';
});
</script>

<style scoped>
.my-portfolio-container {
    padding: 20px;
    max-width: 90%;
    margin: 0 auto;
}

.portfolio-card {
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-title {
    margin-bottom: 40px;
    color: #343a40;
    font-size: 32px;
    font-weight: bold;
}

.table {
    margin-bottom: 30px;
    border-collapse: separate;
    border-spacing: 0 15px;
    width: 100%;
}

.table th,
.table td {
    padding: 20px;
    vertical-align: middle;
}

.table thead th {
    background-color: #f8f9fa;
    border-bottom: 2px solid #dee2e6;
    font-size: 18px;
}

.sortable-header {
    cursor: pointer;
}

.sortable-header i {
    margin-left: 10px;
}

.checkbox-column {
    width: 60px;
    text-align: center;
}

.portfolio-name {
    color: #007bff;
    cursor: pointer;
    font-weight: bold;
    font-size: 18px;
}

.portfolio-name:hover {
    text-decoration: underline;
}

.text-left {
    text-align: left;
}

.text-right {
    text-align: right;
}

.text-center {
    text-align: center;
}

.button-group {
    margin-top: 40px;
    display: flex;
    justify-content: flex-end;
    gap: 20px;
}

.btn-primary:hover,
.btn-danger:hover {
    scale: 1.3;
}

.btn {
    padding: 15px 30px;
    font-size: 18px;
    border-radius: 8px;
}

.btn i {
    margin-right: 10px;
}

/* empty_login_data 스타일 묶음 */
.empty_login_data {
    position: absolute;
    top: 40%; /* 중앙에서 약간 위로 */
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    padding: 50px; /* 여백을 늘림 */
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 350px; /* 필요에 따라 너비 조정 */
}

.empty_login_data h1 {
    margin-bottom: 20px;
    color: #343a40;
    font-size: 1.8rem; /* 큰 제목 글꼴 크기 */
    font-weight: bold;
}

.empty_login_data p {
    margin-bottom: 20px;
    color: #6c757d;
    font-size: 1.2rem; /* 본문 글꼴 크기 */
}

.empty_login_data .btn {
    font-size: 1.1rem; /* 버튼 글꼴 크기 */
    padding: 10px 20px;
}

.empty_login_data .icon {
    margin-right: 10px; /* 아이콘과 텍스트 사이 간격 */
}

/* 반응형 디자인 */
@media (max-width: 1200px) {
    .portfolio-card {
        padding: 30px;
    }

    .table th,
    .table td {
        padding: 15px;
    }

    .btn {
        padding: 12px 24px;
        font-size: 16px;
    }
}

@media (max-width: 768px) {
    .portfolio-card {
        padding: 20px;
    }

    .table th,
    .table td {
        padding: 10px;
    }

    .btn {
        padding: 10px 20px;
        font-size: 14px;
    }
}
</style>
