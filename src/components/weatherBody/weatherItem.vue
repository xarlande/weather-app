<template>
  <div
    class="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center justify-between hover:bg-white/20 transition-colors border border-white/5"
  >
    <div class="text-sm font-medium mb-1 opacity-75">
      {{ formatDate(weather.dt) }}
    </div>

    <img
      :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`"
      :alt="weather.weather[0].description"
      class="w-16 h-16 object-contain"
    />

    <div class="text-2xl font-bold my-1">
      {{ Math.round(weather.main.temp) }}°
    </div>

    <div class="text-xs text-center capitalize opacity-80 line-clamp-2">
      {{ weather.weather[0].description }}
    </div>

    <div class="mt-2 w-full flex justify-between text-xs opacity-60">
      <span>H: {{ Math.round(weather.main.temp_max) }}°</span>
      <span>L: {{ Math.round(weather.main.temp_min) }}°</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { WeatherForecastItem } from "@/stores/weatherStore";

defineProps<{
  weather: WeatherForecastItem;
}>();

const formatDate = (dt: number) => {
  const date = new Date(dt * 1000);
  return date.toLocaleDateString("uk-UA", { weekday: "short", day: "numeric" });
};
</script>
