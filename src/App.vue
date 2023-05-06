<template>
  <div class="max-w-5xl mx-auto">
    <div class="my-2">
      <WeatherSearch />
    </div>
    <div>
      <WeatherBody />
    </div>
  </div>
</template>
<script setup>
import WeatherSearch from "@/components/weatherSearch.vue";
import WeatherBody from "@/components/weatherBody.vue";
</script>
