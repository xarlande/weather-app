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
import type { WeatherForecastItem } from "@/types/weather";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const store = useWeatherStore();
const { weatherList } = storeToRefs(store);

const currentWeather = computed(() => weatherList.value[0]);

const dailyForecast = computed(() => {
  if (weatherList.value.length === 0) return [];

  const groups: Record<string, WeatherForecastItem[]> = {};
  weatherList.value.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!groups[date]) groups[date] = [];
    groups[date].push(item);
  });

  const today = new Date().toISOString().split("T")[0];
  const result: WeatherForecastItem[] = [];
  const sortedDates = Object.keys(groups).sort();

  for (const date of sortedDates) {
    if (date === today) continue;

    const dayItems = groups[date];
    let minTemp = dayItems[0].main.temp_min;
    let maxTemp = dayItems[0].main.temp_max;
    let maxPop = dayItems[0].pop;

    dayItems.forEach((item) => {
      if (item.main.temp_min < minTemp) minTemp = item.main.temp_min;
      if (item.main.temp_max > maxTemp) maxTemp = item.main.temp_max;
      if (item.pop > maxPop) maxPop = item.pop;
    });

    const noonItem =
      dayItems.find((item) => item.dt_txt.includes("12:00:00")) ||
      dayItems[Math.floor(dayItems.length / 2)];

    const representative: WeatherForecastItem = {
      ...noonItem,
      main: {
        ...noonItem.main,
        temp_min: minTemp,
        temp_max: maxTemp,
      },
      pop: maxPop,
    };

    result.push(representative);
    if (result.length >= 5) break;
  }

  return result;
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
