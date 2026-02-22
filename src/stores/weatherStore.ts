import { fetchGeolocation, fetchWeatherForecast } from "@/api/weatherApi";
import type { GeolocationItem, WeatherForecastItem } from "@/types/weather";
import { acceptHMRUpdate, defineStore } from "pinia";
import { ref } from "vue";

export const useWeatherStore = defineStore("weather", () => {
  const geolocationList = ref<GeolocationItem[]>([]);
  const weatherList = ref<WeatherForecastItem[]>([]);
  const currentCity = ref<string>("");
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const getGeolocation = async (query: string) => {
    if (!query) {
      geolocationList.value = [];
      return;
    }
    isLoading.value = true;
    error.value = null;
    try {
      const data = await fetchGeolocation(query);
      geolocationList.value = data;
    } catch (e: any) {
      error.value = e.message;
      geolocationList.value = [];
    } finally {
      isLoading.value = false;
    }
  };

  const getWeather = async (lat: number, lon: number) => {
    isLoading.value = true;
    error.value = null;

    try {
      const data = await fetchWeatherForecast(lat, lon);
      weatherList.value = data.list;
      currentCity.value = data.city.name;
    } catch (e: any) {
      error.value = e.message;
      weatherList.value = [];
    } finally {
      isLoading.value = false;
    }
  };

  return {
    weatherList,
    geolocationList,
    currentCity,
    isLoading,
    error,
    getWeather,
    getGeolocation,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useWeatherStore, import.meta.hot));
}
