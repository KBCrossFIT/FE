<template>
  <div class="MyInvestment-container">
    <div class="MyInvestment-header">
      <h1>내 투자성향 페이지</h1>
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
          <p>위험 회피 성향 점수 : {{ user_preference }}점</p>
          <p>{{ preference_text }}</p>
        </div>

        <div class="top-right">
          <div class="influencers-header">
            <span>나와 같은 투자성향 인플루언서</span>
            <v-btn class="view-influencers-btn" @click="navigateTo('/influencer')">더 보러가기</v-btn>
          </div>
          <div class="influencer-cards">
            <div v-for="(influencer, index) in influencers" :key="index" class="influencer-card">
              <img :src="influencer.image" alt="Influencer Image" class="influencer-image" />
              <h4>{{ influencer.persona_name }}</h4>
            </div>
          </div>
        </div>

        <div class="bottom-left">
          투자성향별 적합금융상품 분류표
          <img :src="shinhanInvestChart" class="investment-chart" />
        </div>

        <div class="bottom-right">
          <div class="recommendation-square">
            <div class="ProportionChart">
              {{ preference_name }} 추천 투자 비율
              <div id="chart">
                <apexchart type="pie" width="380" :options="chartOptions" :series="series"></apexchart>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="MyInvestment-btn-set">
      <v-btn class="MyInvestment-btn" @click="navigateTo('/investment-test-start'), cancel()"> 다시 분석하기 </v-btn>
      <v-btn class="MyInvestment-btn" @click="navigateTo('/make-portfolio'), cancel()"> 포트폴리오 작성하기 </v-btn>
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
      influencers: [],
      series: [],
      chartOptions: {
        chart: {
          type: "pie",
        },
        labels: ["예/적금", "채권", "펀드", "주식"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
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

  methods: {
    // 투자 성향 구분 및 personaPreference 설정
    distinguish(user_preference) {
      if (user_preference >= 80) {
        this.preference_name = "공격투자형";
        this.preference_text =
          "고객님께서는 공격투자형 성향을 보이십니다. 공격투자형은 높은 수익을 추구하는 대신, 위험을 감수할 준비가 되어 있는 투자자입니다.";
        this.series = [10, 10, 20, 60];
      } else if (user_preference >= 60) {
        this.preference_name = "적극투자형";
        this.preference_text =
          "고객님께서는 적극투자형 성향을 보이십니다. 적극투자형은 수익을 추구하면서도 위험을 일부 감수하는 투자자입니다.";
        this.series = [15, 15, 20, 50];
      } else if (user_preference >= 40) {
        this.preference_name = "위험중립형";
        this.preference_text =
          "고객님께서는 위험중립형 성향을 보이십니다. 안정성과 수익성의 균형을 중요시하는 투자자입니다.";
        this.series = [25, 25, 20, 30];
      } else if (user_preference >= 20) {
        this.preference_name = "안정추구형";
        this.preference_text =
          "고객님께서는 안정추구형 성향을 보이십니다. 안정추구형은 원금 손실을 최소화하면서 적당한 수익을 기대하는 투자자입니다.";
        this.series = [35, 35, 20, 10];
      } else {
        this.preference_name = "안정형";
        this.preference_text =
          "고객님께서는 안정형 성향을 보이십니다. 자산 보호를 최우선으로 하며, 투자 리스크를 거의 감수하지 않는 투자자입니다.";
        this.series = [50, 30, 15, 5];
      }
    },

    // Persona 데이터 가져오기
    fetchPersonas() {
      axios
        .get("http://localhost:8080/api/personas/get")
        .then((response) => {
          console.log("Received all persona data:", response.data);

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
              persona_name: persona.personaName,
              image: `http://localhost:8080/api/personas/${persona.imagePath}`,
            }));

          console.log("Filtered influencers:", this.influencers);
        })
        .catch((error) => {
          console.error("Error fetching personas:", error);
        });
    },

    navigateTo(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style scoped>
.MyInvestment-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  height: 100%;
  padding: 20px;
}

.MyInvestment-header {
  display: flex;
  align-items: center;
}

.MyInvestment-body {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
  height: 540px;
}

.body-content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 20px;
  width: 100%;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
}

.influencers-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.view-influencers-btn {
  margin-left: 20px;
  height: 40px;
}

.influencer-cards {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  margin-top: 10px;
}

.influencer-card {
  width: 20%;
  padding: 10px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: box-shadow 0.3s ease;
  cursor: pointer;
}

.influencer-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 20%;
  margin-bottom: 5px;
}

.influencer-card:hover {
  box-shadow: 0 4px 15px #7bd5c3;
}

.influencer-card h4 {
  margin-bottom: 10px;
}

.recommendation-square {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
}

.investment-chart {
  width: 700px;
  height: auto;
}

.ProportionChart {
  text-align: center;
}

.MyInvestment-btn-set {
  display: flex;
  justify-content: space-between;
  margin-top: 115px;
  margin-left: auto;
  gap: 20px;
}

.MyInvestment-btn-set v-btn {
  margin: 0 10px;
}

.fas.fa-fire {
  color: red;
}

.fas.fa-bolt {
  color: #ffa500;
}

.fas.fa-balance-scale {
  color: gray;
}

.fas.fa-shield-alt {
  color: #2196f3;
}

.fas.fa-home {
  color: green;
}
</style>
