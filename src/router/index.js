import { createRouter, createWebHistory } from 'vue-router';
import Home from '../home/Home.vue';
import About from '../views/About.vue';
import Login from '../views/Login.vue';  // Import the Login component
import SignUp from '../views/SignUp.vue'; // Import the SignUp component
import MyPage from '../views/MyPage.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/login', name: 'Login', component: Login },  // Route for login
  { path: '/signup', name: 'SignUp', component: SignUp }, // Route for sign up
  { path: '/mypage', name: 'MyPage', component: MyPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
