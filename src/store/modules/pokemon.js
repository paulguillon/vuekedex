import axios from "axios";

export default {
  namespaced: true,
  state: () => ({
    typesColors: {
      normal: "silver",
      fighting: "sienna",
      flying: "#79a4ff",
      poison: "palevioletred",
      ground: "sandybrown",
      rock: "darkkhaki",
      bug: "#c1d120",
      ghost: "mediumpurple",
      steel: "lightsteelblue",
      fire: "tomato",
      water: "#56aeff",
      grass: "#8dd851",
      electric: "gold",
      psychic: "hotpink",
      ice: "paleturquoise",
      dragon: "mediumslateblue",
      dark: "dimgray",
      fairy: "plum",
    },
  }),
  mutations: {},
  actions: {
    async getPokemon(state, id) {
      const { data } = await axios.get(
        "https://pokeapi.co/api/v2/pokemon/" + id
      );
      const pokemon = data;
      pokemon.name =
        pokemon.name.charAt(0).toUpperCase() + pokemon.name.substring(1);
      return pokemon;
    },
  },
};
