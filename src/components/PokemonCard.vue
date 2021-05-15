<template>
  <router-link
    v-if="thisPokemon"
    :to="{ name: 'PokemonDetails', params: { id: thisPokemon.id } }"
  >
    <img
      :src="
        thisPokemon.sprites.other.dream_world.front_default ??
        thisPokemon.sprites.other['official-artwork'].front_default
      "
      :alt="'sprite ' + thisPokemon.name"
      class="w-48 justify-center"
      loading="lazy"
    />
    <div class="flex flex-col justify-center">
      <p class="text-sm text-gray-500">{{ thisPokemon.id }}</p>
      <p class="text-lg capitalize">{{ thisPokemon.name }}</p>
      <ul class="flex flex-row justify-center">
        <li
          v-for="{ index, type } in thisPokemon.types"
          :key="index"
          class="
            rounded-full
            text-white
            font-bold
            border-2 border-white
            shadow-md
            capitalize
            px-2
          "
          :style="{ backgroundColor: typesColors[type.name] }"
        >
          {{ type.name }}
        </li>
      </ul>
    </div>
  </router-link>
</template>

<script>
import { reactive, toRefs, watchEffect } from "vue";
import { useStore } from "vuex";

export default {
  props: ["pokemon"],

  setup(props) {
    const store = useStore();
    const state = reactive({
      thisPokemon: null,
      typesColors: store.state.pokemon.typesColors,
    });

    watchEffect(async () => {
      const pokemonId = props.pokemon.url.split("/").slice(-2, -1)[0];
      const data = await store.dispatch("pokemon/getPokemon", pokemonId);
      state.thisPokemon = data;
    });

    return { ...toRefs(state) };
  },
};
</script>
