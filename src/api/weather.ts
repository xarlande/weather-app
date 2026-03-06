import { api } from "#api/client";
import { WeatherResponse } from "@/types/weather";

export async function fetchWeatherForecast(
  lat: number,
  lon: number
): Promise<WeatherResponse> {
  return await api<WeatherResponse>("/data/2.5/forecast", {
    query: {
      lat,
      lon,
      units: "metric",
      lang: "ua",
    },
  });
}
