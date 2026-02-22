import type { GeolocationItem, WeatherResponse } from "@/types/weather";

const APIkey = "83066a7babc02d04e934fe54a19e1ab9";

export const fetchGeolocation = async (
  query: string
): Promise<GeolocationItem[]> => {
  if (!query) return [];

  const resp = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${APIkey}`
  );

  if (!resp.ok) {
    throw new Error("Failed to fetch geolocation");
  }

  return await resp.json();
};

export const fetchWeatherForecast = async (
  lat: number,
  lon: number
): Promise<WeatherResponse> => {
  const resp = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric&lang=ua`
  );

  if (!resp.ok) {
    throw new Error("Failed to fetch weather");
  }

  return await resp.json();
};
