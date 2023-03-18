<template>
  <div
    v-for="(item, idx) in geolocationList"
    :key="idx"
    @click="getWeather([item.lat, item.lon])"
  >
    {{ item.local_names.uk }}
    {{ item.country }}
    {{ item.lat }}
    {{ item.lon }}
  </div>
  <div class="border">
    <div class="my-1 mx-1 border" v-for="(item, idx) in weatherList" :key="idx">
      {{ item }}
    </div>
  </div>
</template>

<script>
import { useWeatherStore } from "@/stores/weatherStore";
import { toRefs } from "vue";

export default {
  name: "weatherMain",
  setup() {
    const store = useWeatherStore();
    const { getGeolocation, geolocationList, getWeather, weatherList } =
      toRefs(store);

    return {
      getGeolocation,
      geolocationList,
      getWeather,
      weatherList,
    };
  },
  mounted() {
    this.getGeolocation("Ясенівці");
  },
};
</script>

<style scoped></style>
