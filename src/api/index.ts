import { fetchGeolocation } from "#api/geo";
import { fetchWeatherForecast } from "#api/weather";
import { ofetch } from "ofetch";

const APIkey = "83066a7babc02d04e934fe54a19e1ab9";

export const api = ofetch.create({
  query: {
    appid: APIkey,
  },
  baseURL: "https://api.openweathermap.org",
});

export { fetchGeolocation, fetchWeatherForecast };
