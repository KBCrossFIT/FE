import { createStore } from "vuex";
import bondModule from "./modules/bond";
import fundModule from "./modules/fund";
import savingModule from "./modules/saving";
import depositModule from "./modules/deposit";
import portfolioModule from "./modules/portfolio";

const store = createStore({
  modules: {
    bond: bondModule,
    fund: fundModule,
    saving: savingModule,
    deposit: depositModule,
    portfolio: portfolioModule,
  },
});

export default store;