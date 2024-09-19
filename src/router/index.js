import { createRouter, createWebHistory } from 'vue-router';

// Import your components
import Home from '../home/Home.vue';
import About from '../views/About.vue';
import Login from '../views/Login.vue';
import SignUp from '../views/SignUp.vue';
import MyPage from '../views/MyPage.vue';
import FinancialProducts from '../views/FinancialProducts.vue';  // Component for Financial Products
import Cart from '../views/Cart.vue';  // Component for Cart
import Portfolio from '../views/Portfolio.vue';  // Component for Portfolio
import RecentlyViewed from '../views/RecentlyViewed.vue';  // Component for Recently Viewed
import FindId from '../views/Find.vue';


const routes = [
  { path: '/find', name: 'Find', component: FindId },
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/login', name: 'Login', component: Login },
  { path: '/signup', name: 'SignUp', component: SignUp },
  { path: '/mypage', name: 'MyPage', component: MyPage },
  { path: '/financial-products', name: 'FinancialProducts', component: FinancialProducts },
  { path: '/cart', name: 'Cart', component: Cart },
  { path: '/portfolio', name: 'Portfolio', component: Portfolio },
  { path: '/recently-viewed', name: 'RecentlyViewed', component: RecentlyViewed },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
