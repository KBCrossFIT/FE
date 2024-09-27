import { createStore } from "vuex";
import bondModule from "./modules/bond";
import fundModule from "./modules/fund";
import savingModule from "./modules/saving";
import depositModule from "./modules/deposit";

const store = createStore({
  modules: {
    bond: bondModule,
    fund: fundModule,
    saving: savingModule,
    deposit: depositModule,
  },
});

export default store;