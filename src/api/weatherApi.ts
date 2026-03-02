import type { GeolocationItem, WeatherResponse } from "@/types/weather";
import { ofetch } from "ofetch";

const APIkey = "83066a7babc02d04e934fe54a19e1ab9";

const api = ofetch.create({
  query: {
    appid: APIkey,
  },
});

export async function fetchGeolocation(
  query: string
): Promise<GeolocationItem[]> {
  if (!query) return [];

  return await api<GeolocationItem[]>(
    "https://api.openweathermap.org/geo/1.0/direct",
    {
      query: {
        q: query,
        limit: 5,
      },
    }
  );
}

export async function fetchWeatherForecast(
  lat: number,
  lon: number
): Promise<WeatherResponse> {
  return await api<WeatherResponse>(
    "https://api.openweathermap.org/data/2.5/forecast",
    {
      query: {
        lat,
        lon,
        units: "metric",
        lang: "ua",
      },
    }
  );
}
