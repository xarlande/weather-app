<template>
  <div>
    <WeatherItem v-for="item in weatherList" :key="item.dt" :weather="item" />
  </div>
</template>

<script setup lang="ts">
import WeatherItem from "@/components/weatherBody/weatherItem.vue";
import { useWeatherStore } from "@/stores/weatherStore";
import { storeToRefs } from "pinia";

const store = useWeatherStore();
const { weatherList } = storeToRefs(store);
</script>
