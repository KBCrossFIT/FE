<template>
  <footer>
    <div class="footer-content">
      <div class="footer-info">
        <span>&copy; 2024 ProPortFolio. All rights reserved.</span>
        <span>고객센터 000-000-0000</span>
      </div>
      <div class="investment-notice">
        <h4>투자 유의사항</h4>
        <ul>
          <li>1.집합투자증권은 운용결과에 따라 투자원금의 손실이 발생할 수 있으며, 그 손실은 투자자에게 귀속됩니다.</li>
          <li>2.증권거래비용, 기타비용이 추가로 발생할 수 있습니다.</li>
          <li>3.과거의 운용실적이 미래의 수익률을 보장하는 것은 아닙니다.</li>
        </ul>
        <h4>예상 수익률 및 위험도 관련안내</h4>
        <p>본 서비스에서 제공하는 포트폴리오의 예상 수익률과 위험도는 자체 분석과 시뮬레이션을 기반으로 산출된 수치입니다.</p>
        <p>다만, 이는 참고용 수치에 불과하며, 실제 결과는 시장 상황에 따라 변동될 수 있습니다.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style scoped>
footer {
  background-color: #e9f5e9;
  padding: 40px 20px;
  z-index: 100;
  margin-top: 80px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  font-size: 14px;
  color: #2d6a4f;
}

.investment-notice {
  border-top: 1px solid #b7e4c7;
  padding-top: 20px;
}

.investment-notice h4 {
  color: #2d6a4f;
  margin-bottom: 10px;
  font-size: 16px;
}

.investment-notice ul {
  list-style-type: none;
  padding-left: 0;
  margin-bottom: 20px;
}

.investment-notice li {
  margin-bottom: 8px;
  font-size: 14px;
  color: #40916c;
  line-height: 1.4;
}

.investment-notice p {
  font-size: 14px;
  color: #40916c;
  line-height: 1.4;
}

@media (max-width: 768px) {
  .footer-info {
    flex-direction: column;
    align-items: center;
  }

  .footer-info span {
    margin-bottom: 10px;
  }
}
</style>
