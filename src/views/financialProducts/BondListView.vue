<template>
  <div>
    <h1>Bond List</h1>
    <ul>
      <li v-for="bond in bondList" :key="bond.productId">{{ bond.basDt }} - {{ bond.bondIsurNm }}</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'BondListView',
  computed: {
    ...mapGetters(['getBondList']),  // Vuex에서 채권 리스트 상태 가져오기
    bondList() {
      return this.getBondList;  // getter를 통해 채권 리스트 반환
    },
  },
  created() {
    console.log('created')
    // 컴포넌트가 생성될 때 채권 리스트 데이터 가져오기
    this.fetchBondList();
  },
  methods: {
    ...mapActions(['fetchBondList']),  // Vuex에서 API 호출 액션 매핑
  },
};
</script>