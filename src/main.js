import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import DefaultLayout from './components/DefaultLayout.vue';

// Vuetify와 함께 사용할 아이콘 세트
import '@mdi/font/css/materialdesignicons.css'; // MDI 아이콘
import '@fortawesome/fontawesome-free/css/all.min.css'; // FontAwesome 아이콘

// 앱 인스턴스 생성
const app = createApp(App);

// 글로벌 컴포넌트 등록
app.component('DefaultLayout', DefaultLayout);

// Vue 라우터 및 Vuetify 플러그인 사용
app.use(router);
app.use(store);
app.use(vuetify);

// 애플리케이션을 #app 엘리먼트에 마운트
app.mount('#app');
