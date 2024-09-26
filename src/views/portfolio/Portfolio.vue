<template>
    <div class="portfolio-container">
        <header class="portfolio-header">
            <h1>나의 포트폴리오(상세정보)</h1>
            <h2>포트폴리오 이름 {{ portfolio.PortfolioName }}</h2>
        </header>
        <main class="portfolio-main">
            <section class="portfolio-summary">
                <h2>포트폴리오 요약</h2>

                <h4>포트폴리오 투자 경과</h4>
                <!-- 투자 비중 선 그래프 -->
                <v-card class="mt-8 mx-auto overflow-visible" max-width="400">
                    <v-sheet
                        class="v-sheet--offset mx-auto"
                        color="cyan"
                        elevation="12"
                        max-width="calc(100% - 32px)"
                        rounded="lg"
                    >
                        <v-sparkline
                            :labels="labels"
                            :model-value="investmentProgress"
                            color="white"
                            line-width="2"
                            padding="16"
                        ></v-sparkline>
                    </v-sheet>
                </v-card>

                <h4>포트폴리오 투자 비중</h4>
                <!-- 투자비중 파이 차트 -->
                <apexchart
                    type="pie"
                    width="380"
                    :options="chartOptions"
                    :series="series"
                ></apexchart>
            </section>

            <section class="portfolio-details">
                <h2>상세 정보</h2>

                <h4>종합 예상 투자 결과</h4>
                <p>Expected return: {{ portfolio.expectedReturn }}</p>
                <p>Investment duration: {{ portfolio.investmentDuration }} months</p>
                <p>Investment type: {{ portfolio.investmentType }}</p>
            </section>
            <section class="portfolio-actions">
                <v-btn color="primary" @click="editPortfolio(portfolioId)">수정하기</v-btn>
                <v-btn color="red" @click="deletePortfolio(portfolioId)">삭제하기</v-btn>
            </section>
        </main>
        <footer class="portfolio-footer">
            <!-- Footer content goes here -->
            <p>Footer content here</p>
        </footer>
    </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts';
import { useRoute, useRouter } from 'vue-router';
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

export default {
    name: 'Portfolio',
    components: {
        apexchart: VueApexCharts,
    },
    setup() {
        const route = useRoute();
        const router = useRouter();

        const portfolioId = route.params.id;

        // Replace this with your method to fetch the portfolio data based on the ID
        const fetchPortfolioData = (id) => {
            // Dummy data for demonstration; replace with actual fetch logic
            const portfolios = [
                {
                    id: '1',
                    InvestmentStartDate: '2024-09-01',
                    PortfolioName: 'Growth Portfolio',
                    expectedReturn: '8%',
                    investmentDuration: '12',
                    investmentType: 'Long-term',
                    // Other data...
                },
                {
                    id: '2',
                    InvestmentStartDate: '2024-06-01',
                    PortfolioName: 'Income Portfolio',
                    expectedReturn: '5%',
                    investmentDuration: '24',
                    investmentType: 'Short-term',
                    // Other data...
                },
            ];

            return portfolios.find((portfolio) => portfolio.id === id) || {};
        };

        const portfolio = ref(fetchPortfolioData(portfolioId));

        const labels = ref([]);
        const investmentProgress = ref([]);

        // Simulate investment progress data based on start date
        const calculateInvestmentProgress = () => {
            const startDate = new Date(portfolio.value.InvestmentStartDate); // Access portfolio.value
            const today = new Date();
            const daysDifference = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
            labels.value = Array.from({ length: daysDifference }, (_, i) => `Day ${i + 1}`);
            investmentProgress.value = Array.from(
                { length: daysDifference },
                () => Math.random() * 100 // Random investment values
            );
        };

        // Update graph every 24 hours (86400000 ms) 2628000000
        let intervalId;

        onMounted(() => {
            calculateInvestmentProgress();
            intervalId = setInterval(calculateInvestmentProgress, 86400000); // Update daily
        });

        onBeforeUnmount(() => {
            clearInterval(intervalId);
        });

        const chartOptions = computed(() => ({
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
        }));

        const series = computed(() => {
            // 파이 차트 임시값
            return [30, 40, 20, 10]; // Example data
        });

        const editPortfolio = (id) => {
            // Logic to edit portfolio
            router.push('/make-portfolio');
            console.log(`Editing portfolio with ID: ${id}`);
        };

        const deletePortfolio = (id) => {
            // Logic to delete portfolio
            router.push('/my-Portfolio');
            console.log(`Deleting portfolio with ID: ${id}`);
        };

        return {
            portfolio,
            chartOptions,
            series,
            editPortfolio,
            deletePortfolio,
            investmentProgress,
            labels,
        };
    },
};
</script>
