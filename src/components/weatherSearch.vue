<template>
  Введіть назву міста:
  <input
    class="border"
    type="text"
    v-model.trim="searchGeolocation"
    @keyup.enter="getGeolocation(searchGeolocation)"
    maxlength="20"
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
</template>

<script setup>
import { useWeatherStore } from "@/stores/weatherStore";
import { ref, toRefs, watch } from "vue";

const store = useWeatherStore();
const { getGeolocation, getWeather } = store;
const { geolocationList, weatherList } = toRefs(store);

const searchGeolocation = ref("");

watch(geolocationList, () => {
  searchGeolocation.value = "";
});
watch(weatherList, () => {
  geolocationList.value = "";
});
</script>

<style scoped></style>
