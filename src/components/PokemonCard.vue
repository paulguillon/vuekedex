<template>
  <router-link
    v-if="thisPokemon"
    :to="{ name: 'PokemonDetails', params: { id: thisPokemon.id } }"
  >
    <p class="text-sm text-gray-500">{{ thisPokemon.id }}</p>
    <p class="text-lg">{{ thisPokemon.name }}</p>
    <img
      :src="
        thisPokemon.sprites.other.dream_world.front_default ??
        thisPokemon.sprites.other['official-artwork'].front_default
      "
      :alt="'sprite ' + thisPokemon.name"
      class="h-48"
      loading="lazy"
    />
    <ul>
      <li
        v-for="{ index, type } in thisPokemon.types"
        :key="index"
        class="
          rounded-full
          text-white
          font-bold
          border-2 border-white
          shadow-md
        "
        :style="{ backgroundColor: typesColors[type.name] }"
      >
        {{ type.name }}
      </li>
    </ul>
  </router-link>
</template>

<script>
import { reactive, toRefs, watchEffect } from "vue";

export default {
  props: ["pokemon"],

  setup(props) {
    const state = reactive({
      thisPokemon: null,
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
    });

    watchEffect(async () => {
      const response = await fetch(props.pokemon.url);
      const data = await response.json();
      state.thisPokemon = data;
      state.thisPokemon.name =
        state.thisPokemon.name.charAt(0).toUpperCase() +
        state.thisPokemon.name.substring(1);
    });

    return { ...toRefs(state) };
  },
};
</script>
