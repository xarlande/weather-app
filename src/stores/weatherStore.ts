import { defineStore } from "pinia";
import { ref } from "vue";

const APIkey = "83066a7babc02d04e934fe54a19e1ab9";

export interface GeolocationItem {
  name: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export interface WeatherForecastItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  rain?: {
    "3h": number;
  };
  snow?: {
    "3h": number;
  };
  sys: {
    pod: string;
  };
  dt_txt: string;
}

interface WeatherResponse {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherForecastItem[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export const useWeatherStore = defineStore("weather", () => {
  const geolocationList = ref<GeolocationItem[]>([]);
  const weatherList = ref<WeatherForecastItem[]>([]);
  const currentCity = ref<string>("");
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const getGeolocation = async (query: string) => {
    if (!query) return;
    isLoading.value = true;
    error.value = null;
    try {
      const resp = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${APIkey}`
      );
      if (!resp.ok) throw new Error("Failed to fetch geolocation");
      const data: GeolocationItem[] = await resp.json();
      geolocationList.value = data;
    } catch (e: any) {
      error.value = e.message;
      geolocationList.value = [];
    } finally {
      isLoading.value = false;
    }
  };

  const getWeather = async (lat: number, lon: number, cityName: string) => {
    isLoading.value = true;
    error.value = null;
    currentCity.value = cityName;
    try {
      const resp = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric&lang=ua`
      );
      if (!resp.ok) throw new Error("Failed to fetch weather");
      const data: WeatherResponse = await resp.json();
      weatherList.value = data.list;
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
