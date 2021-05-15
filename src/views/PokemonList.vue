<template>
  <div>
    <h1 class="text-6xl mb-20">All Pokemons</h1>
    <div
      v-if="pokemonList"
      class="flex flex-row flex-wrap gap-4 justify-evenly"
    >
      <PokemonCard
        v-for="pokemon in pokemonList"
        :key="pokemon.name"
        :pokemon="pokemon"
        class="
          bg-red-200
          cursor-pointer
          shadow-md
          hover:shadow-lg
          rounded-lg
          w-1/4
          p-5
          flex flex-row flex-wrap
          justify-evenly
        "
      />
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, watchEffect } from "vue";
import PokemonCard from "@/components/PokemonCard";
import { useStore } from "vuex";

export default {
  name: "PokemonList",
  components: {
    PokemonCard,
  },
  setup() {
    const store = useStore();

    const state = reactive({
      pokemonList: [],
    });

    watchEffect(async () => {
      const { results } = await store.dispatch("pokemon/getPokemonList", {
        limit: 9,
      });
      state.pokemonList = results;
    });

    return { ...toRefs(state) };
  },
};
</script>
