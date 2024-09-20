import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import DefaultLayout from './components/DefaultLayout.vue';

import '@fortawesome/fontawesome-free/css/all.min.css';

const app = createApp(App);

app.component('DefaultLayout', DefaultLayout);
app.use(router);
app.use(vuetify);

app.mount('#app');
