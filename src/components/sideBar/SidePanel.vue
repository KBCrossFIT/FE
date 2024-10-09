<template>
    <div v-if="isVisible" class="side-panel">
      <button @click="closePanel" class="close-button">Close</button>
      <h2>{{ panelTitle }}</h2>
  
      <!-- Render portfolio data -->
      <div v-if="section === 'PortfolioSection'">
        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" v-model="allSelected" @change="toggleSelectAll" />
              </th>
              <th @click="sortBy('portfolioName')">
                포트폴리오 이름
                <span v-if="sortKey === 'portfolioName'">
                  {{ sortOrder === 'asc' ? '▲' : '▼' }}
                </span>
              </th>
              <th @click="sortBy('total')">
                투자 총액
                <span v-if="sortKey === 'total'">
                  {{ sortOrder === 'asc' ? '▲' : '▼' }}
                </span>
              </th>
              <th @click="sortBy('expectedReturn')">
                기대 수익률
                <span v-if="sortKey === 'expectedReturn'">
                  {{ sortOrder === 'asc' ? '▲' : '▼' }}
                </span>
              </th>
              <th @click="sortBy('riskLevel')">
                위험도
                <span v-if="sortKey === 'riskLevel'">
                  {{ sortOrder === 'asc' ? '▲' : '▼' }}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in sortedPortfolioList" :key="item.portfolioId">
              <td>
                <input type="checkbox" v-model="selected" :value="item.portfolioId" @change="updateSelectAllState" />
              </td>
              <td class="NameCursor" @click="goToPortfolioDetail(item.portfolioId)">
                {{ item.portfolioName }}
              </td>
              <td>{{ item.total }}원</td>
              <td>{{ item.expectedReturn }}%</td>
              <td>{{ item.riskLevel }}등급</td>
            </tr>
          </tbody>
        </table>
        <div class="sidepanel-buttons">
          <button @click="goToCreatePortfolio">포트폴리오 만들기</button>
          <button @click="deleteSelectedPortfolios">삭제하기</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  
  // Props passed from the parent component
  const props = defineProps({
    isVisible: Boolean,
    panelTitle: String,
    section: String,
    data: Array, // This will contain the portfolio data
  });
  
  // State variables
  const selected = ref([]);
  const allSelected = ref(false);
  const sortKey = ref('portfolioName');
  const sortOrder = ref('asc');
  
  // Sorting logic
  const sortBy = (key) => {
    if (sortKey.value === key) {
      sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
    } else {
      sortKey.value = key;
      sortOrder.value = 'asc';
    }
  };
  
  // Compute sorted portfolio list
  const sortedPortfolioList = computed(() => {
    return props.data.slice().sort((a, b) => {
      let result = 0;
      if (a[sortKey.value] < b[sortKey.value]) {
        result = -1;
      } else if (a[sortKey.value] > b[sortKey.value]) {
        result = 1;
      }
      return sortOrder.value === 'asc' ? result : -result;
    });
  });
  
  // Router navigation for portfolio actions
  const router = useRouter();
  
  const goToPortfolioDetail = (id) => {
    router.push({ name: 'PortfolioDetail', params: { id } });
  };
  
  const goToCreatePortfolio = () => {
    router.push({ name: 'MakePortfolio' });
  };
  
  const deleteSelectedPortfolios = () => {
    // Handle portfolio deletion logic
    console.log('Deleting portfolios', selected.value);
  };
  
  // Select All and Update Select All State
  const toggleSelectAll = () => {
    allSelected.value = !allSelected.value;
    selected.value = allSelected.value ? props.data.map(p => p.portfolioId) : [];
  };
  
  const updateSelectAllState = () => {
    allSelected.value = selected.value.length === props.data.length;
  };
  
  // Closing the side panel
  const closePanel = () => {
    emit('close'); // Emit an event to close the panel
  };
  </script>
  
  <style scoped>
  .side-panel {
    position: fixed;
    right: 0;
    top: 0;
    width: 450px;
    height: 100vh;
    background-color: white;
    padding: 20px;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    overflow-y: auto;
  }
  
  .close-button {
    margin-bottom: 20px;
  }
  
  .NameCursor {
    cursor: pointer;
    text-decoration: underline;
  }
  
  .sidepanel-buttons {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }
  </style>
  