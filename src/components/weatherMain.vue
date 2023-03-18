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
    {{ weatherList }}
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
    this.getGeolocation("London");
  },
  watch: {
    geolocationList() {
      console.log(this.geolocationList);
    },
  },
};
</script>

<style scoped></style>
