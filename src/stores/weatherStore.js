import { defineStore } from "pinia";
const APIkey = "83066a7babc02d04e934fe54a19e1ab9";
export const useWeatherStore = defineStore("weather", {
  state: () => ({
    geolocationList: [],
    weatherList: [],
  }),
  getters: {},
  actions: {
    getGeolocation(query) {
      if (query) {
        fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${query}&appid=${APIkey}`
        )
          .then((item) => item.json())
          .then((i) => (this.geolocationList = i));
      }
    },
    getWeather([lat, lon]) {
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=83066a7babc02d04e934fe54a19e1ab9&units=metric`
      )
        .then((r) => r.json())
        .then((i) => {
          this.weatherList = i.list;
        });
    },
  },
});
