import { defineStore } from "pinia";
import { ref } from "vue";
const APIkey = "83066a7babc02d04e934fe54a19e1ab9";
export const useWeatherStore = defineStore("weather", () => {
  const geolocationList = ref([]);
  const weatherList = ref([]);

  const getGeolocation = (query) => {
    if (query) {
      fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${APIkey}`
      )
        .then((resp) => resp.json())
        .then((data) => {
          geolocationList.value = data;
        });
    }
  };
  const getWeather = ([lat, lon]) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=83066a7babc02d04e934fe54a19e1ab9&units=metric`
    )
      .then((resp) => resp.json())
      .then((data) => {
        weatherList.value = data.list;
        console.log(data);
      });
  };

  return { weatherList, geolocationList, getWeather, getGeolocation };
});
