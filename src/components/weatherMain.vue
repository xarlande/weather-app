<template>
  Введіть назву міста:
  <input
    class="border"
    type="text"
    v-model.trim="searchGeolocation"
    @keyup.enter="this.getGeolocation(searchGeolocation)"
  />
  <div
    v-for="(item, idx) in geolocationList"
    :key="idx"
    @click="getWeather([item.lat, item.lon])"
    class="hover:bg-amber-200 cursor-pointer"
  >
    {{ item.local_names.uk }}
    {{ item.country }}
    {{ item.state }}
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
  data: () => ({
    searchGeolocation: "",
  }),
  watch: {
    geolocationList() {
      this.searchGeolocation = "";
    },
    weatherList() {
      this.geolocationList = {};
    },
  },
};
</script>

<style scoped></style>
