<template>
  <div>
    <h1 class="text-6xl mb-20">All Pokemons</h1>
    <div v-if="pokemons" class="grid grid-cols-9 gap-4 justify-items-center">
      <PokemonCard
        v-for="pokemon in pokemons"
        :key="pokemon.name"
        :pokemon="pokemon"
        class="
          bg-red-200
          p-5
          cursor-pointer
          shadow-md
          hover:shadow-lg
          rounded-lg
        "
      />
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, watchEffect } from "vue";
import PokemonCard from "@/components/PokemonCard";

export default {
  name: "PokemonList",
  components: {
    PokemonCard,
  },
  setup() {
    const state = reactive({
      pokemons: [],
    });

    watchEffect(async () => {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=151"
      );
      const data = await response.json();
      state.pokemons = data.results;
    });

    return { ...toRefs(state) };
  },
};
</script>
