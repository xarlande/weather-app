<template>
  <div class="border my-2 p-2">
    <p>Дата і час: {{ weather.dt_txt }}</p>
    <p>Температура: {{ weather.main.temp }} °C</p>
    <p>Мінімальна температура: {{ weather.main.temp_min }} °C</p>
    <p>Максимальна температура: {{ weather.main.temp_max }} °C</p>
  </div>
</template>

<script setup lang="ts">
import type { WeatherForecastItem } from "@/stores/weatherStore";

defineProps<{
  weather: WeatherForecastItem;
}>();
</script>
