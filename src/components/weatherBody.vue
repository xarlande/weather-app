<template>
  <div v-if="weatherList.length > 0" class="animate-fade-in">
    <!-- Current City Header -->
    <div class="text-center mb-8">
      <h2 class="text-3xl font-bold">{{ store.currentCity }}</h2>
      <p class="text-white/70 capitalize">
        {{ currentWeather.weather[0].description }}
      </p>
      <div class="text-6xl font-bold my-4">
        {{ Math.round(currentWeather.main.temp) }}°C
      </div>
      <div class="flex justify-center gap-4 text-sm">
        <span>Макс: {{ Math.round(currentWeather.main.temp_max) }}°</span>
        <span>Мін: {{ Math.round(currentWeather.main.temp_min) }}°</span>
      </div>
    </div>

    <!-- Forecast Grid -->
    <div class="border-t border-white/10 pt-6">
      <h3 class="text-lg font-semibold mb-4">Прогноз на 5 днів</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        <WeatherItem
          v-for="item in dailyForecast"
          :key="item.dt"
          :weather="item"
        />
      </div>
    </div>
  </div>
  <div v-else class="text-center py-10 text-white/50">
    Введіть назву міста, щоб побачити погоду.
  </div>
</template>

<script setup lang="ts">
import WeatherItem from "@/components/weatherBody/weatherItem.vue";
import { useWeatherStore } from "@/stores/weatherStore";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const store = useWeatherStore();
const { weatherList } = storeToRefs(store);

const currentWeather = computed(() => weatherList.value[0]);

const dailyForecast = computed(() => {
  // Filter to get roughly one item per day (every 8th item = 24h)
  // starting from the next day (index 8)
  return weatherList.value.filter((_, index) => index % 8 === 0).slice(1); // skip today (current)
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
