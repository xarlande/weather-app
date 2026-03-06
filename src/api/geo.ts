import { api } from "#api/client";
import { GeolocationItem } from "@/types/weather";

export async function fetchGeolocation(
  query: string
): Promise<GeolocationItem[]> {
  if (!query) return [];

  return await api<GeolocationItem[]>("/geo/1.0/direct", {
    query: {
      q: query,
      limit: 5,
    },
  });
}
