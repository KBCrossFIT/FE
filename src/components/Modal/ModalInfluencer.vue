<template>
    <v-dialog :model-value="isOpen" max-width="600px" @update:modelValue="closeModal">
        <v-card v-if="persona" class="modal-card">
            <v-card-title class="headline">{{ persona.personaName || '이름 없음' }}</v-card-title>
            <v-card-subtitle>{{ persona.job || '직업 정보 없음' }}</v-card-subtitle>
            <v-card-text>
                <div class="persona-details">
                    <p>
                        <strong>투자 성향:</strong>
                        <span class="preference">{{
                            getPreferenceText(persona.personaPreference)
                        }}</span>
                        <span class="preference-number">({{ persona.personaPreference }})</span>
                    </p>
                    <h3 class="portfolio-title">
                        {{ persona.personaName }}의 포트폴리오 구성 비율
                    </h3>
                    <div class="portfolio-rates">
                        <p>
                            <strong>주식:</strong>
                            <span class="rate">{{ persona.stockRate || 0 }}%</span>
                        </p>
                        <p>
                            <strong>펀드:</strong>
                            <span class="rate">{{ persona.fundRate || 0 }}%</span>
                        </p>
                        <p>
                            <strong>채권:</strong>
                            <span class="rate">{{ persona.bondRate || 0 }}%</span>
                        </p>
                        <p>
                            <strong>예/적금:</strong>
                            <span class="rate">{{ persona.savingsRate || 0 }}%</span>
                        </p>
                    </div>
                    <div class="portfolio-pie-chart">
                        <div>파이 차트</div>
                        <apexchart
                            type="pie"
                            width="380"
                            :options="chartOptions"
                            :series="series"
                        ></apexchart>
                    </div>
                </div>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" @click="closeModal">닫기</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts';

export default {
    components: {
        apexchart: VueApexCharts,
    },
    props: {
        isOpen: {
            type: Boolean,
            required: true,
        },
        persona: {
            type: Object,
            required: true,
        },
    },
    computed: {
        // Chart series including cash holding
        series() {
            const stockRate = this.persona.stockRate || 0;
            const fundRate = this.persona.fundRate || 0;
            const bondRate = this.persona.bondRate || 0;
            const savingsRate = this.persona.savingsRate || 0;

            // Calculate the sum of all rates
            const totalRate = stockRate + fundRate + bondRate + savingsRate;

            // Cash holding is the remaining percentage
            const cashHolding = 100 - totalRate;

            return [stockRate, fundRate, bondRate, savingsRate, cashHolding];
        },
        chartOptions() {
            return {
                chart: {
                    events: {},
                },
                labels: ['주식', '펀드', '채권', '예/적금', '현금보유'],
                responsive: [
                    {
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 300,
                            },
                            legend: {
                                position: 'bottom',
                            },
                        },
                    },
                ],
            };
        },
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        getPreferenceText(preference) {
            switch (preference) {
                case 1:
                    return '위험 투자';
                case 2:
                    return '적극 투자';
                case 3:
                    return '위험 중립';
                case 4:
                    return '안정 추구';
                case 5:
                    return '안정형';
                default:
                    return '정보 없음';
            }
        },
    },
};
</script>

<style scoped>
.modal-card {
    padding: 24px;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.v-card-title {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 16px;
}

.v-card-subtitle {
    margin-top: 8px;
    color: #757575;
}

.persona-details {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-top: 24px;
}

.persona-details p {
    margin: 0;
    font-size: 1rem;
    color: #424242;
}

.preference {
    font-weight: 600;
    color: #1976d2;
}

.preference-number {
    font-style: italic;
    color: #9e9e9e;
    margin-left: 4px;
}

.portfolio-title {
    margin-top: 16px;
    font-size: 1.25rem;
    color: #424242;
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 8px;
}

.portfolio-rates {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 12px;
    margin-top: 16px;
}

.portfolio-rates p {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f5f5f5;
    padding: 8px 12px;
    border-radius: 8px;
}

.rate {
    font-size: 1rem;
    font-weight: 500;
    color: #424242;
}

.portfolio-pie-chart {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.portfolio-pie-chart div {
    margin-bottom: 16px;
    font-size: 1.1rem;
    color: #424242;
}

.v-card-actions {
    display: flex;
    justify-content: flex-end;
    padding: 16px 24px;
    border-top: 1px solid #e0e0e0;
}

.v-btn {
    padding: 8px 24px;
    font-size: 1rem;
    border-radius: 8px;
}
</style>
