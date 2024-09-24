import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/home/Home.vue';
import About from '../views/About.vue';

import Login from '../views/account/auth/Login.vue';
import SignUp from '../views/account/auth/SignUp.vue';
import FindId from '../views/account/auth/Find.vue';

import MyPage from '../views/account/profile/MyPage.vue';
import MyPageEdit from '../views/account/profile/MyPageEdit.vue';
import ChangePW from '../views/account/profile/ChangePW.vue';
import DeleteAccount from '../views/account/profile/DeleteAccount.vue';

import FinancialProducts from '../views/financialProducts/FinancialProducts.vue';
import Cart from '../views/financialProducts/Cart.vue';
import RecentlyViewed from '../views/financialProducts/RecentlyViewed.vue';

import Influencer from '../views/insight/Influencer.vue';
import News from '../views/insight/News.vue';
import Youtube from '../views/insight/Youtube.vue';

import InvestmentTest from '../views/investmentTest/InvestmentTest.vue';
import InvestmentTestEnd from '../views/investmentTest/InvestmentTestEnd.vue';
import InvestmentTestStart from '../views/investmentTest/InvestmentTestStart.vue';
import MyInvestmentAnalyze from '../views/investmentTest/MyInvestmentAnalyze.vue';

import Portfolio from '../views/portfolio/Portfolio.vue';
import MakePortfolio from '../views/portfolio/MakePortfolio.vue';
import MyPortfolio from '../views/portfolio/MyPortfolio.vue';
import ProductComparison from '../views/portfolio/ProductComparison.vue';

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/find', name: 'Find', component: FindId },
    { path: '/about', name: 'About', component: About },
    { path: '/login', name: 'Login', component: Login },
    { path: '/signup', name: 'SignUp', component: SignUp },
    { path: '/mypage', name: 'MyPage', component: MyPage },
    { path: '/mypageEdit', name: 'MyPageEdit', component: MyPageEdit },
    { path: '/changePW', name: 'ChangePW', component: ChangePW },
    { path: '/deleteAccount', name: 'DeleteAccount', component: DeleteAccount },
    { path: '/financial-products', name: 'FinancialProducts', component: FinancialProducts },
    { path: '/cart', name: 'Cart', component: Cart },
    { path: '/recently-viewed', name: 'RecentlyViewed', component: RecentlyViewed },
    { path: '/influencer', name: 'Influencer', component: Influencer },
    { path: '/news', name: 'News', component: News },
    { path: '/youtube', name: 'Youtube', component: Youtube },
    { path: '/investment-test', name: 'InvestmentTest', component: InvestmentTest },
    { path: '/investment-test-end', name: 'InvestmentTestEnd', component: InvestmentTestEnd },
    { path: '/investment-test-start', name: 'InvestmentTestStart', component: InvestmentTestStart },
    { path: '/my-investment-analyze', name: 'MyInvestmentAnalyze', component: MyInvestmentAnalyze },
    { path: '/portfolio', name: 'Portfolio', component: Portfolio },
    { path: '/make-portfolio', name: 'MakePortfolio', component: MakePortfolio },
    { path: '/my-portfolio', name: 'MyPortfolio', component: MyPortfolio },
    { path: '/product-comparison', name: 'ProductComparison', component: ProductComparison },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
