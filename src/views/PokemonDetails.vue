<template>
  <section class="pokemonDetails flex justify-center">
    <div
      v-if="thisPokemon"
      class="
        flex flex-col
        items-center
        w-full
        md:w-3/4
        md:flex-row
        bg-red-200
        p-3
        rounded-xl
      "
    >
      <img
        :src="
          thisPokemon.sprites.other.dream_world.front_default ??
          thisPokemon.sprites.other['official-artwork'].front_default
        "
        :alt="'sprite ' + thisPokemon.name"
        class="w-92"
        loading="lazy"
      />
      <section class="flex flex-col w-full p-3 bg-red-100 rounded-xl">
        <p class="text-7xl capitalize">{{ thisPokemon.name }}</p>
        <table class="pokemonInfo text-left">
          <tr>
            <th>National</th>
            <td class="text-sm text-gray-500">#{{ thisPokemon.id }}</td>
          </tr>
          <tr>
            <th>Types</th>
            <td>
              <ul class="flex flex-row">
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
                    px-3
                    py-1
                  "
                  :style="{ backgroundColor: typesColors[type.name] }"
                >
                  {{ type.name }}
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <th>Base stats</th>
            <td>
              <table class="baseStats">
                <thead>
                  <tr>
                    <th>Stat</th>
                    <th>Base</th>
                    <th>Effort Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="{ base_stat, effort, stat } in thisPokemon.stats"
                    :key="stat.name"
                    class="capitalize"
                  >
                    <td>{{ stat.name }}</td>
                    <td>{{ base_stat }}</td>
                    <td>{{ effort }}</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <th>Abilities</th>
            <td>
              <ul>
                <li
                  v-for="{ ability } in thisPokemon.abilities"
                  :key="ability.name"
                  class="capitalize"
                >
                  {{ ability.name }}
                </li>
              </ul>
            </td>
          </tr>
        </table>
      </section>
    </div>
  </section>
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
      console.log(state.thisPokemon);
    });

    return { ...toRefs(state) };
  },
};
</script>

<style lang="scss" scoped>
.pokemonInfo > tr th {
  text-align: center;
  background-color: rgb(254, 202, 202);
}
.baseStats {
  td {
    padding: 5px 20px;
  }
}
</style>
