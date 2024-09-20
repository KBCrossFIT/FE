import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Vuetify 플러그인 가져오기
import vuetify from './plugins/vuetify';
import '@fortawesome/fontawesome-free/css/all.min.css'; // 아이콘 설정

const app = createApp(App);

app.use(router);     // 라우터 사용
app.use(vuetify);    // Vuetify 사용

app.mount('#app');
