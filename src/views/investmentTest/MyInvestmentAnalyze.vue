<template>
  <div class="MyInvestment-container">
    <div class="MyInvestment-header">
      <h1>나의 투자성향</h1>
    </div>

    <div class="MyInvestment-body">
      <div class="body-content">
        <div class="top-left">
          <h2>
            {{ preference_name }}
            <i v-if="preference_name === '공격투자형'" class="fas fa-fire"></i>
            <i v-if="preference_name === '적극투자형'" class="fas fa-bolt"></i>
            <i v-if="preference_name === '위험중립형'" class="fas fa-balance-scale"></i>
            <i v-if="preference_name === '안정추구형'" class="fas fa-shield-alt"></i>
            <i v-if="preference_name === '안정형'" class="fas fa-home"></i>
          </h2>
          <p>
            <strong>위험 회피 성향 점수 :{{ user_preference }}점</strong>
          </p>
          <p>
            {{ preference_text }}
          </p>
        </div>
        <div class="top-right-header">
          <h2>{{ preference_name }} 인플루언서</h2>
          <v-btn class="more-btn" @click="navigateTo('/influencer')">더 찾아보기 👤</v-btn>
        </div>
        <div class="influencer-cards">
          <div
            v-for="(influencer, index) in influencers"
            :key="index"
            class="influencer-card"
            @click="navigateToInfluencer(influencer)"
          >
            <img :src="influencer.image" alt="Influencer Image" class="influencer-image" />
            <h3>{{ influencer.name }}</h3>
            <p>{{ influencer.info }}</p>
          </div>
        </div>

        <div class="bottom-right">
          <h2>{{ preference_name }} 추천 포트폴리오</h2>
          <div class="recommendation-square">
            <div class="ProportionChart">
              <div id="chart">
                <apexchart type="pie" width="500" :options="chartOptions" :series="series"></apexchart>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="investment-risk-table">
      <table>
        <thead>
          <tr>
            <th rowspan="2">고객 투자자성향</th>
            <th colspan="6">상품 위험등급</th>
          </tr>
          <tr>
            <th>1등급<br />(매우높은위험)</th>
            <th>2등급<br />(높은위험)</th>
            <th>3등급<br />(다소높은위험)</th>
            <th>4등급<br />(보통위험)</th>
            <th>5등급<br />(낮은위험)</th>
            <th>6등급<br />(매우낮은위험)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>공격투자형</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td></td>
          </tr>
          <tr>
            <td>적극투자형</td>
            <td></td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td></td>
          </tr>
          <tr>
            <td>위험중립형</td>
            <td></td>
            <td></td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td></td>
          </tr>
          <tr>
            <td>안정추구형</td>
            <td></td>
            <td></td>
            <td></td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
          </tr>
          <tr>
            <td>안정형</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>○</td>
            <td>○</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="MyInvestment-btn-set">
      <v-btn class="MyInvestment-btn" @click="navigateTo('/investment-test-start'), cancel()"> 다시 분석하기 </v-btn>
      <v-btn class="MyInvestment-btn" @click="navigateTo('/make-portfolio'), cancel()"> 포트폴리오 만들기 </v-btn>
    </div>
  </div>
</template>

<script>
import shinhanInvestChart from "@/assets/img/shinhanInvestChart.jpg";
import VueApexCharts from "vue3-apexcharts";
import axios from "axios";
import { useAuthStore } from "@/store/authStore"; // 사용자 인증 상태를 가져오기 위해 사용

export default {
  name: "MyInvestmentAnalyze",
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      user_preference: 0, // 초기 투자 성향 점수
      preference_name: "",
      preference_text: "",
      shinhanInvestChart,
      influencers: [], // influencers 데이터를 비워둠
      series: [], // 차트 데이터: 비율

      chartOptions: {
        chart: {
          type: "pie",
        },
        labels: [], // 초기에는 빈 배열로 설정
        legend: {
          position: "bottom",
          horizontalAlign: "center",
          fontSize: "14px",
          labels: {
            useSeriesColors: true,
          },
          formatter: function (label, seriesIndex, opts) {
            // 두 개씩 줄바꿈 처리: 홀수 인덱스는 그대로, 짝수 인덱스는 줄바꿈 추가
            const isEven = seriesIndex % 2 === 0;
            return isEven ? `${label}, ` : `${label}<br>`;
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val.toFixed(1) + "%";
          },
          style: {
            fontSize: "16px",
            fontWeight: "bold",
            colors: ["#333"],
          },
          dropShadow: {
            enabled: false,
          },
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 400,
              },
              legend: {
                position: "center",
              },
            },
          },
        ],
      },
    };
  },

  async mounted() {
    const authStore = useAuthStore();
    await authStore.checkAuth(); // 사용자 인증 정보 확인

    const memberNum = authStore.memberNum;

    // 백엔드에서 member의 invest_score 값을 가져오기
    axios
      .get(`http://localhost:8080/api/member/${memberNum}/investPreference`)
      .then((response) => {
        const investScore = response.data.investScore || 0;
        this.user_preference = investScore;
        this.distinguish(this.user_preference); // 점수에 맞는 투자 성향 구분

        // 점수에 맞는 personaPreference 설정 후 persona 데이터 필터링
        this.fetchPersonas();
      })
      .catch((error) => {
        console.error("Error fetching invest score:", error);
      });
  },

  computed: {
    computedLabels() {
      // series의 총합 계산 후 값이 숫자형인지 확인
      const total = this.series.reduce((sum, value) => sum + (parseFloat(value) || 0), 0);
      return ["예/적금", "채권", "펀드", "주식"].map((label, index) => {
        const value = parseFloat(this.series[index]) || 0; // 숫자 변환
        const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
        return `${label} (${percentage}%)`;
      });
    },
  },
  watch: {
    series: {
      immediate: true,
      handler() {
        // series 배열 변경 시 labels 업데이트
        this.chartOptions = {
          ...this.chartOptions,
          labels: this.computedLabels,
          legend: {
            position: "right", // Legend를 우측에 배치
            horizontalAlign: "center", // 중앙 정렬
            fontSize: "14px",
            labels: {
              useSeriesColors: true,
            },
            formatter: function (label, seriesIndex) {
              return label; // 레이블 그대로 표시
            },
          },
        };
      },
    },
  },

  methods: {
    navigateTo(path) {
      this.$router.push(path);
    },
    navigateToInfluencer(influencer) {
      this.$router.push({
        path: "/Influencer",
        query: { name: influencer.name },
      });
    },

    // 차트 데이터 시리즈 (예/적금, 채권, 펀드, 주식 순서)
    distinguish(user_preference) {
      if (user_preference >= 81) {
        this.preference_name = "공격투자형";
        this.preference_text =
          "고객님께서는 공격투자형 성향을 보이십니다. 공격투자형은 높은 수익을 추구하는 대신, 위험을 감수할 준비가 되어 있는 투자자입니다. 투자자금의 상당 부분을 주식, 고위험 펀드, 또는 기타 고수익 자산에 투자하며, 장기적인 성장 가능성을 최우선으로 생각하는 경향이 있습니다.";
        this.series = [10, 10, 20, 60].map(Number);
      } else if (user_preference >= 61) {
        this.preference_name = "적극투자형";
        this.preference_text =
          "고객님께서는 적극투자형 성향을 보이십니다. 적극투자형은 수익을 추구하면서도 위험을 일부 감수하는 투자자입니다. 대부분의 자산을 주식이나 주식형 펀드에 투자하지만, 일부는 채권이나 안정적인 자산으로 분산하여 리스크를 관리하려는 성향이 있습니다.";
        this.series = [15, 15, 20, 50].map(Number);
      } else if (user_preference >= 41) {
        this.preference_name = "위험중립형";
        this.preference_text =
          "고객님께서는 위험중립형 성향을 보이십니다. 위험중립형은 안정성과 수익성의 균형을 중요시하는 투자자입니다. 주식과 채권, 그리고 현금성 자산에 고루 투자하며, 장기적인 안정적인 수익을 추구하는 동시에, 시장 변동에 대한 리스크를 적당히 수용하는 성향을 가지고 있습니다.";
        this.series = [25, 25, 20, 30].map(Number);
      } else if (user_preference >= 21) {
        this.preference_name = "안정추구형";
        this.preference_text =
          "고객님께서는 안정추구형 성향을 보이십니다. 안정추구형은 원금 손실을 최소화하면서 적당한 수익을 기대하는 투자자입니다. 자산의 대부분을 채권이나 저위험 펀드에 투자하며, 수익보다는 자산의 안전성을 우선시하는 성향입니다.";
        this.series = [35, 35, 20, 10].map(Number);
      } else {
        this.preference_name = "안정형";
        this.preference_text =
          "고객님께서는 안정형 성향을 보이십니다. 안정형은 자산 보호를 최우선으로 하며, 투자 리스크를 거의 감수하지 않는 투자자입니다. 현금성 자산이나 저위험 채권에 주로 투자하며, 자산의 장기적인 보전을 중요하게 생각하는 성향입니다.";
        this.series = [50, 30, 15, 5].map(Number);
      }
    },

    // Persona 데이터 가져오기
    fetchPersonas() {
      axios
        .get("http://localhost:8080/api/personas/get")
        .then((response) => {
          let personaPreference = null;
          if (this.preference_name === "공격투자형") {
            personaPreference = 5;
          } else if (this.preference_name === "적극투자형") {
            personaPreference = 4;
          } else if (this.preference_name === "위험중립형") {
            personaPreference = 3;
          } else if (this.preference_name === "안정추구형") {
            personaPreference = 2;
          } else if (this.preference_name === "안정형") {
            personaPreference = 1;
          }

          this.influencers = response.data
            .filter((persona) => persona.personaPreference === personaPreference)
            .sort((a, b) => a.personaId - b.personaId)
            .slice(0, 2)
            .map((persona) => ({
              name: persona.personaName,
              info: persona.description,
              image: `http://localhost:8080/api/personas/${persona.imagePath}`, // 이미지 경로 추가
            }));
        })
        .catch((error) => {
          console.error("Error fetching personas:", error);
        });
    },
  },
};
</script>

<style scoped>
.MyInvestment-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2%;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

.MyInvestment-body {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  width: 100%;
  margin-top: 2%;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 2%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.top-left,
.top-right,
.bottom-left,
.bottom-right {
  background-color: #ffffff;
  padding: 2%;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s ease;
}

.top-left {
  margin-bottom: 5%;
  grid-column: 1 / span 2;
  background-color: #f0f9ff;
  color: #007acc;
}

.top-left h2 {
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 1rem;
}

.top-left p {
  font-size: 18px;
  line-height: 1.5;
}

.influencer-cards {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.influencer-card {
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  width: calc(30% - 1rem);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: box-shadow 0.3s ease;
  cursor: pointer;
}

.influencer-card:hover {
  box-shadow: 0 4px 12px rgba(0, 150, 136, 0.1);
}

.influencer-image {
  width: 60%;
  height: auto;
  border-radius: 20%;
  margin-bottom: 1rem;
}

.recommendation-square {
  padding: 10%;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}
.top-right-header {
  display: flex;
  align-items: center;
  justify-content: space-between; /* 버튼을 제목 옆으로 배치 */
  margin-bottom: 1rem;
}

.more-btn {
  background-color: #f0f9ff;
  color: rgb(0, 0, 0);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.more-btn:hover {
  background-color: #005fa3;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.more-btn i {
  margin-left: 0.5rem;
}

.investment-chart {
  width: 100%;
  max-width: 100%;
  height: 20%;
}

.MyInvestment-btn-set {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.MyInvestment-btn-set v-btn {
  background-color: #007acc;
  color: #fff;
  padding: 0.8rem 2rem;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-size: 1rem;
}

.MyInvestment-btn-set v-btn:hover {
  background-color: #005fa3;
}

.fas.fa-fire {
  color: #ff5252;
}

.fas.fa-bolt {
  color: #ff9800;
}

.fas.fa-balance-scale {
  color: #757575;
}

.fas.fa-shield-alt {
  color: #1e88e5;
}

.fas.fa-home {
  color: #4caf50;
}

.investment-risk-table {
  width: 100%;
  margin: 20px 0;
  border-collapse: collapse;
}

.investment-risk-table table {
  width: 100%;
  border: 1px solid #ccc;
  text-align: center;
}

.investment-risk-table th,
.investment-risk-table td {
  border: 1px solid #ddd;
  padding: 10px;
}

.investment-risk-table th {
  background-color: #f5f5f5;
  font-weight: bold;
}

.investment-risk-table td {
  background-color: #fff;
  font-size: 1.2rem;
}

.investment-risk-table thead th {
  background-color: #f0f0f0;
  padding: 20px 10px;
}

.investment-risk-table tbody tr:nth-child(odd) td {
  background-color: #fafafa;
}

.investment-risk-table tbody td {
  font-size: 1.5rem;
}

.investment-risk-table th:nth-child(2) {
  background-color: #ffdddd;
}

.investment-risk-table th:nth-child(3) {
  background-color: #ffd699;
}

.investment-risk-table th:nth-child(4) {
  background-color: #ffff99;
}

.investment-risk-table th:nth-child(5) {
  background-color: #ccff99;
}

.investment-risk-table th:nth-child(6) {
  background-color: #99ccff;
}

.investment-risk-table th:nth-child(7) {
  background-color: #e0e0ff;
}

.investment-risk-table td {
  vertical-align: middle;
}
</style>
