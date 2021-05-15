<template>
  <div v-if="thisPokemon" class="flex flex-col justify-items-center w-64">
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
        class="rounded-full text-white font-bold border-2 border-white shadow-md"
        :style="{ backgroundColor: typesColors[type.name] }"
      >
        {{ type.name }}
      </li>
    </ul>
    <ul>
      <li
        v-for="{ base_stat, effort, stat } in thisPokemon.stats"
        :key="stat.name"
      >
        {{ `${stat.name}: ${base_stat} ${effort}` }}
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive, toRefs, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default {
  setup() {
    const router = useRoute();
    const store = useStore();

    const state = reactive({
      thisPokemon: null,
      typesColors: store.state.pokemon.typesColors,
    });

    watchEffect(async () => {
      state.thisPokemon = await store.dispatch(
        "pokemon/getPokemon",
        router.params.id
      );
    });

    return { ...toRefs(state) };
  },
};
</script>
