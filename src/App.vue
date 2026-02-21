<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-400 to-indigo-600 text-white p-4"
  >
    <div
      class="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden border border-white/20"
    >
      <header
        class="p-6 border-b border-white/10 flex items-center justify-between"
      >
        <h1 class="text-2xl font-bold tracking-tight">Погода</h1>
        <div class="text-sm opacity-75">
          {{
            new Date().toLocaleDateString("uk-UA", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          }}
        </div>
      </header>

      <div class="p-6 space-y-6">
        <WeatherSearch />

        <div v-if="store.isLoading" class="flex justify-center py-10">
          <div
            class="animate-spin rounded-full h-12 w-12 border-b-2 border-white"
          ></div>
        </div>

        <div
          v-else-if="store.error"
          class="bg-red-500/20 text-red-100 p-4 rounded-lg border border-red-500/30 text-center"
        >
          {{ store.error }}
        </div>

        <WeatherBody v-else />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import WeatherBody from "@/components/weatherBody.vue";
import WeatherSearch from "@/components/weatherSearch.vue";
import { useWeatherStore } from "@/stores/weatherStore";

const store = useWeatherStore();
</script>
