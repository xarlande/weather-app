<template>
  <div>
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
      {{ item.local_names?.uk }}
      {{ item.country }}
      {{ item.state }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWeatherStore } from "@/stores/weatherStore";
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";

const store = useWeatherStore();
const { getGeolocation, getWeather } = store;
const { geolocationList, weatherList } = storeToRefs(store);

const searchGeolocation = ref("");

watch(geolocationList, () => {
  searchGeolocation.value = "";
});
watch(weatherList, () => {
  geolocationList.value = []; // Resetting to empty array instead of empty string
});
</script>

<style scoped></style>
