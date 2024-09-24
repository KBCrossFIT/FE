<template>
    <div class="MyPortfolio-container">
        <h1>내 포트폴리오 리스트 페이지</h1>
        <div class="MyPortfolio-DataTable">
            <v-data-table
                v-model="selected"
                :items="filteredPortfolios"
                item-value="PortfolioName"
                show-select
                :headers="headers"
            >
                <!-- 데이터 레이블이 있는 전체 선택 체크박스 행 -->
                <!-- 레이블 표시 안됨 -->
                <template #column.header="{ column }">
                    <tr>
                        <th>
                            <!-- 전체 선택 체크박스 -->
                            <v-checkbox v-model="allSelected" @change="toggleSelectAll" label="" />
                        </th>
                        <th>포트폴리오 이름</th>
                        <th>예상 수익률</th>
                        <th>위험도</th>
                    </tr>
                </template>
                <template #item="{ item }">
                    <tr>
                        <td>
                            <v-checkbox v-model="selected" :value="item.PortfolioName" />
                        </td>
                        <td class="NameCursor" @click="goToPortfolioDetail(item.id)">
                            {{ item.PortfolioName }}
                        </td>
                        <td>{{ item.ExpectedReturn }}%</td>
                        <td>{{ item.RiskLevel }}</td>
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
            {
                id: 1,
                CreationDate: '2024-09-01',
                Total: 1000000,
                ExpectedReturn: 8.5,
                RiskLevel: '중간',
                PortfolioName: '포트폴리오 1',
                Username: 'user123',
            },
            {
                id: 2,
                CreationDate: '2024-09-10',
                Total: 2000000,
                ExpectedReturn: 12.5,
                RiskLevel: '높음',
                PortfolioName: '포트폴리오 2',
                Username: 'user123',
            },
            {
                id: 3,
                CreationDate: '2024-08-20',
                Total: 500000,
                ExpectedReturn: 4.2,
                RiskLevel: '낮음',
                PortfolioName: '포트폴리오 3',
                Username: 'user456',
            },
        ]);

        const currentUsername = 'user123'; // 현재 사용자의 고유번호 (동적으로 설정 가능)

        const selected = ref([]);
        const allSelected = ref(false);

        // 현재 사용자 고유번호에 해당하는 포트폴리오만 필터링
        const filteredPortfolios = computed(() => {
            return portfolios.value.filter((portfolio) => portfolio.Username === currentUsername);
        });

        const headers = [
            { text: '', value: 'checkbox', align: 'start' }, // 전체 선택 체크박스 자리
            { text: '포트폴리오 이름', value: 'PortfolioName' },
            { text: '예상 수익률', value: 'ExpectedReturn' },
            { text: '위험도', value: 'RiskLevel' },
        ];

        // 전체 선택 / 해제 기능
        const toggleSelectAll = () => {
            if (allSelected.value) {
                selected.value = filteredPortfolios.value.map((item) => item.PortfolioName);
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
            filteredPortfolios,
            headers,
            toggleSelectAll,
            goToCreatePortfolio,
            deleteSelectedPortfolios,
            goToPortfolioDetail,
        };
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
