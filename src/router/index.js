import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import PokemonList from "../views/PokemonList.vue";
import PokemonDetails from "../views/PokemonDetails.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/pokemon",
    name: "PokemonList",
    component: PokemonList,
    props: true,
  },
  {
    path: "/pokemon/:id",
    name: "PokemonDetails",
    component: PokemonDetails,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
