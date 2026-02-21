<template>
  <div class="relative z-50">
    <label class="block text-sm font-medium mb-2 text-white/80"
      >Пошук міста</label
    >
    <div class="relative">
      <input
        type="text"
        v-model.trim="searchQuery"
        @keyup.enter="handleSearch"
        placeholder="Введіть назву міста (напр. Київ)..."
        class="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm transition-all"
        :class="{ 'rounded-b-none border-b-0': geolocationList.length > 0 }"
      />
      <button
        @click="handleSearch"
        class="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-full transition-colors"
        :disabled="store.isLoading"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>

      <!-- Dropdown Results -->
      <div
        v-if="geolocationList.length > 0"
        class="absolute w-full bg-white/90 backdrop-blur-md text-gray-800 rounded-b-lg shadow-xl overflow-hidden border border-t-0 border-white/20 max-h-60 overflow-y-auto"
      >
        <div
          v-for="(item, idx) in geolocationList"
          :key="`${item.lat}-${item.lon}-${idx}`"
          @click="selectCity(item)"
          class="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-0 transition-colors flex justify-between items-center group"
        >
          <div>
            <span class="font-medium text-gray-900">{{
              item.local_names?.uk || item.name
            }}</span>
            <span class="text-xs text-gray-500 ml-2 block sm:inline sm:ml-2">
              {{ item.state ? `${item.state}, ` : "" }}{{ item.country }}
            </span>
          </div>
          <span
            class="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity text-sm"
            >Вибрати</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWeatherStore, type GeolocationItem } from "@/stores/weatherStore";
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";

const store = useWeatherStore();
const { getGeolocation, getWeather } = store;
const { geolocationList } = storeToRefs(store);

const searchQuery = ref("");

const handleSearch = () => {
  if (searchQuery.value.length > 1) {
    getGeolocation(searchQuery.value);
  }
};

const selectCity = (item: GeolocationItem) => {
  const cityName = item.local_names?.uk || item.name;
  getWeather(item.lat, item.lon, cityName);
  searchQuery.value = "";
  store.geolocationList = []; // Clear dropdown manually
};

// Clear dropdown if query is empty
watch(searchQuery, (newVal) => {
  if (!newVal) {
    store.geolocationList = [];
  }
});
</script>
