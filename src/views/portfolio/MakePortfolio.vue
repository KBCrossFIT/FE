<template>
    <div class="Make-Header">
        <h1>포트폴리오 구성페이지</h1>
    </div>
    <hr />
    <div class="recommendProportion">
        <h3>유형 별 추천 포트폴리오 구성 비율</h3>
        <div class="PortfolioChart">
            <div class="SelectionChar">
                <label>유형 선택 체크박스 버튼</label>
                <div class="CharCheck-radio">
                    <label
                        ><input type="radio" name="InvestChar" value="char1" v-model="chart" />
                        공격투자형</label
                    >
                    <label
                        ><input type="radio" name="InvestChar" value="char2" v-model="chart" />
                        적극투자형</label
                    >
                    <label
                        ><input type="radio" name="InvestChar" value="char3" v-model="chart" />
                        위험중립형</label
                    >
                    <label
                        ><input type="radio" name="InvestChar" value="char4" v-model="chart" />
                        위험회피형</label
                    >
                    <label
                        ><input type="radio" name="InvestChar" value="char5" v-model="chart" />
                        안정형</label
                    >
                </div>
            </div>
            <div class="ProportionChart">
                파이 차트
                <div id="chart">
                    <apexchart
                        type="pie"
                        width="380"
                        :options="chartOptions"
                        :series="series"
                    ></apexchart>
                </div>
            </div>
        </div>
    </div>

    <br />

    <div class="ProductSelection">
        <h1>상품종류</h1>
        <h4>(현재 장바구니가 아닌 dummyfinancial에서 불러옴)</h4>
        <hr />
        <!-- 일반 상품 페이지 -->
        <div class="Product-filter">
            <input
                v-model="searchQuery"
                type="text"
                class="form-control"
                placeholder="상품명 검색..."
            />
            <select v-model="selectedCategory" class="form-select">
                <option value="">모든 카테고리</option>
                <option value="savings">예/적금</option>
                <option value="bonds">채권</option>
                <option value="funds">펀드</option>
            </select>
        </div>
        <v-data-table
            v-model="selected"
            :items="filteredProducts"
            item-value="name"
            show-select
        ></v-data-table>
        <br />

        <!-- 주식 상품 페이지 -->
        <h1>주식 종류</h1>
        <h4>(현재 주식검색창이 아닌 dummyStock에서 불러옴)</h4>
        <div class="MakePortfolio-btn">
            <v-btn @click="openModal">주식 추가하기</v-btn>
        </div>
        <hr />
        <div class="Stock-filter">
            <input
                v-model="searchQuery"
                type="text"
                class="form-control"
                placeholder="상품명 검색..."
            />
        </div>
        <v-data-table
            v-model="selected"
            :items="filteredProducts"
            item-value="id"
            show-select
        ></v-data-table>

        <Modal
            v-if="isModalOpen"
            :isOpen="isModalOpen"
            @close="isModalOpen = false"
            @finished="InvestMentTest = true"
            @investMentTestStarted="InvestMentTest = true"
        />
    </div>
</template>

<script>
import { ref, computed } from 'vue';
import VueApexCharts from 'vue3-apexcharts'; // apexcharts 파이 차트 사용.
import { dummyProducts } from '@/dummyfinancial.js'; // 더미 데이터 가져오기
import Modal from '@/components/Modal/ModalStock.vue'; // 모달 컴포넌트 import

export default {
    name: 'MakePortfolio',
    components: {
        apexchart: VueApexCharts,
        Modal,
    },
    setup() {
        const searchQuery = ref('');
        const selectedCategory = ref('');
        const selected = ref([]);
        const products = ref(dummyProducts); // 더미 데이터 사용
        const chart = ref('char1'); // 기본 선택 값
        const isModalOpen = ref(false); // 모달 상태 관리

        const chartOptions = computed(() => {
            return {
                chart: {
                    width: 380,
                    type: 'pie',
                },
                labels: ['예/적금', '채권', '펀드', '주식'], // 필요에 따라 수정
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
            };
        });

        const series = computed(() => {
            switch (chart.value) {
                case 'char1':
                    return [60, 20, 10, 10]; // 공격투자형 비율
                case 'char2':
                    return [50, 30, 15, 5]; // 적극투자형 비율
                case 'char3':
                    return [40, 45, 10, 5]; // 위험중립형 비율
                case 'char4':
                    return [35, 50, 10, 5]; // 위험회피형 비율
                case 'char5':
                    return [20, 65, 10, 5]; // 안정형 비율
                default:
                    return [0, 0, 0, 0, 0];
            }
        });

        const filteredProducts = computed(() => {
            return products.value.filter((product) => {
                const matchesCategory = selectedCategory.value
                    ? product.type === selectedCategory.value
                    : true;
                const matchesSearch = product.name
                    .toLowerCase()
                    .includes(searchQuery.value.toLowerCase());
                return matchesCategory && matchesSearch;
            });
        });

        const openModal = () => {
            isModalOpen.value = true; // 모달 열기
        };

        return {
            searchQuery,
            selectedCategory,
            selected,
            filteredProducts,
            chart,
            chartOptions,
            series,
            isModalOpen,
            openModal,
        };
    },
};
</script>

<style scoped>
.v-btn {
    background-color: #4db6ac;
}
</style>
