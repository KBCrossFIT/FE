<template>
    <div class="ProportionChart">
        <!-- Single line title with preference info in smaller text -->
        <h3 class="chart-title">추천 투자비율</h3>
        <div id="chart">
            <apexchart type="pie" width="360" :options="chartOptions" :series="series"></apexchart>
        </div>
    </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts';

export default {
    name: 'PersonaChart',
    components: {
        apexchart: VueApexCharts,
    },
    props: {
        persona: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            series: [0, 0, 0, 0],
            chartOptions: {
                chart: {
                    type: 'pie',
                },
                labels: ['예/적금', '펀드', '채권', '주식'],
                legend: {
                    position: 'right',
                    formatter: (seriesName, opts) => {
                        const percentage = opts.w.globals.series[opts.seriesIndex];
                        return seriesName + ' ' + percentage.toFixed(1) + '%';
                    },
                },
                responsive: [
                    {
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: '40vw',
                            },
                            legend: {
                                position: 'bottom',
                            },
                        },
                    },
                ],
            },
        };
    },
    mounted() {
        this.setChartData();
    },
    methods: {
        setChartData() {
            this.series = [
                this.persona.savingsRate,
                this.persona.fundRate,
                this.persona.bondRate,
                this.persona.stockRate,
            ];
        },
    },
};
</script>

<style scoped>
.ProportionChart {
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* Aligns content to the left */
    width: 100%; /* Ensures the container takes full width */
    padding-left: 1vw;
}

.chart-title {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 1rem;
    text-align: left; /* Aligns the title text to the left */
    display: flex;
    flex-direction: column;
}

.preference-inline {
    font-size: 0.8rem;
    color: #666;
    font-weight: normal;
    margin-left: 8px;
}

#chart {
    width: 20vw;
    height: 20vw;
    max-width: 150px;
    max-height: 150px;
    min-width: 100px;
    min-height: 100px;
    margin-left: 0; /* Removes any centering */
}
</style>
