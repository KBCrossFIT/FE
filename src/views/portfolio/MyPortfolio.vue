<template>
    <div class="my-portfolio-container">
        <div v-if="!isAuthenticated" class="empty-my-portfolio">
            <h1>만든 포트폴리오가 없습니다.</h1>
            <p>로그인하고 포트폴리오를 만들어보세요.</p>
            <router-link to="/login" class="btn btn-primary">
                <i class="fas fa-sign-in-alt icon"></i>
                <span class="menu-text">로그인하러 가기</span>
            </router-link>
        </div>
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
const loading = ref(true);
const isAuthenticated = computed(() => authStore.isAuthenticated);

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
    allSelected.value = selected.value.length === portfolioList.value.length; // 전체 선택 여부 업데이트
};

// 포트폴리오 상세 페이지로 이동
const goToPortfolioDetail = (id) => {
    router.push({ name: 'Portfolio', params: { id } });
};

// 포트폴리오 생성 페이지로 이동
const goToCreatePortfolio = () => {
    router.push({ name: 'MakePortfolio' });
};

// 선택된 포트폴리오 데이터를 사이드패널로 전달
const openPortfolioInSidePanel = (portfolio) => {
    emit('openSidePanel', {
        title: '포트폴리오 상세',
        section: 'PortfolioSection',
        data: [portfolio], // 선택된 포트폴리오 데이터 전달
    });
};

// 선택된 포트폴리오 삭제
const deleteSelectedPortfolios = async () => {
    for (const portfolioId of selected.value) {
        try {
            await deletePortfolioAction(portfolioId); // 비동기 요청 대기
        } catch (error) {
            console.error('Error deleting portfolio:', error.response?.data || error.message);
        }
    }
    selected.value = []; // 선택 해제
    window.location.reload();
};

// 정렬 기준과 방향 변경 함수
const sortBy = (key) => {
    if (sortKey.value === key) {
        // 동일한 키를 클릭했을 때 방향 변경
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
    } else {
        sortKey.value = key;
        sortOrder.value = 'asc'; // 기본은 오름차순
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

// 컴포넌트가 마운트될 때와 라우트가 변경될 때 포트폴리오 리스트를 불러옴
onMounted(async () => {
    await authStore.checkAuth();
    await portfolioStore.fetchPortfolioListAction(true); // 강제로 새로고침
});

watch(() => router.currentRoute.value, async () => {
    await portfolioStore.fetchPortfolioListAction(true); // 강제로 새로고침
}, { immediate: true });

// 정렬 아이콘 클래스 계산
const sortIconClass = computed(() => {
    return sortOrder.value === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down';
});
</script>

<style scoped>
.my-portfolio-container {
    padding: 20px;
    max-width: 80%;
    margin: 0 auto;
}

.empty-my-portfolio {
    text-align: center;
    padding: 40px;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.empty-my-portfolio h1 {
    margin-bottom: 20px;
    color: #343a40;
}

.empty-my-portfolio p {
    margin-bottom: 20px;
    color: #6c757d;
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

/* 반응형 디자인을 위한 미디어 쿼리 */
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
