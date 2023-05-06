<template>
  <div>
    <WeatherItem v-for="item in weatherList" :key="item.dt" :weather="item" />
  </div>
</template>
<script setup>
import { useWeatherStore } from "@/stores/weatherStore";
import { toRefs } from "vue";
import WeatherItem from "@/components/weatherBody/weatherItem.vue";

const store = useWeatherStore();
const { weatherList } = toRefs(store);
</script>
