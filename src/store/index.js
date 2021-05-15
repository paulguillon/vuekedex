import { createStore } from "vuex";

//Modules
import pokemon from "./modules/pokemon";

export default createStore({
  modules: {
    pokemon,
  },
});
