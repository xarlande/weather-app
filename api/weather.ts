import axios from "axios";

const APIkey = '83066a7babc02d04e934fe54a19e1ab9'

type GeolocationData = {
    "name": string,
    "local_names": {
        [key: string]: [value: string]
    },
    "lat": number,
    "lon": number,
    "country": string,
    "state": string,
}

export const getGeolocation = async (query: string): Promise<GeolocationData> => {
    const resp = await axios.get('https://api.openweathermap.org/geo/1.0/direct', {
        params: {
            q: query,
            limit: 5,
            appid: APIkey
        }
    })
    return resp.data
};

export const getWeather = async (lat: number, lon: number): Promise<any> => {
    const resp = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
        params: {
            lat,
            lon,
            appid: APIkey,
            units: 'metric'
        }
    })
    return resp.data
}
