import { ofetch } from "ofetch";

export const api = ofetch.create({
  baseURL: "https://api.openweathermap.org",
  query: {
    appid: "83066a7babc02d04e934fe54a19e1ab9",
  },
});
