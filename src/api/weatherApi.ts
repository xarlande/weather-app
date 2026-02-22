import type { GeolocationItem, WeatherResponse } from "@/types/weather";
import { ofetch } from "ofetch";

const APIkey = "83066a7babc02d04e934fe54a19e1ab9";

export const fetchGeolocation = async (
  query: string
): Promise<GeolocationItem[]> => {
  if (!query) return [];

  return await ofetch<GeolocationItem[]>(
    "https://api.openweathermap.org/geo/1.0/direct",
    {
      query: {
        q: query,
        limit: 5,
        appid: APIkey,
      },
    }
  );
};

export const fetchWeatherForecast = async (
  lat: number,
  lon: number
): Promise<WeatherResponse> => {
  return await ofetch<WeatherResponse>(
    "https://api.openweathermap.org/data/2.5/forecast",
    {
      query: {
        lat,
        lon,
        appid: APIkey,
        units: "metric",
        lang: "ua",
      },
    }
  );
};
