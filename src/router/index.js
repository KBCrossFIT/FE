import { createRouter, createWebHistory } from 'vue-router';

// Import your components
import Home from '../home/Home.vue';
import About from '../views/About.vue';
import Login from '../views/Login.vue';
import SignUp from '../views/SignUp.vue';
import MyPage from '../views/MyPage.vue';
import MyPageEdit from '../views/MyPageEdit.vue';
import FinancialProducts from '../views/FinancialProducts.vue'; // Component for Financial Products
import Cart from '../views/Cart.vue'; // Component for Cart
import Portfolio from '../views/Portfolio.vue'; // Component for Portfolio
import RecentlyViewed from '../views/RecentlyViewed.vue'; // Component for Recently Viewed

import FindId from '../views/Find.vue';
import changePW from '../views/ChangePW.vue';


const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/find', name: 'Find', component: FindId },
    { path: '/about', name: 'About', component: About },
    { path: '/login', name: 'Login', component: Login },
    { path: '/signup', name: 'SignUp', component: SignUp },
    { path: '/mypage', name: 'MyPage', component: MyPage },
    {
        path: '/mypageEdit',
        name: 'MyPageEdit',
        component: MyPageEdit,
    },
    {
        path: '/financial-products',
        name: 'FinancialProducts',
        component: FinancialProducts,
    },
    { path: '/cart', name: 'Cart', component: Cart },
    {
        path: '/portfolio',
        name: 'Portfolio',
        component: Portfolio,
    }, // 경로 수정: 대소문자 구분
    {
        path: '/recently-viewed',
        name: 'RecentlyViewed',
        component: RecentlyViewed,
    },
    {
        path: '/changePW',
        name: 'ChangePW',
        component: changePW,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
