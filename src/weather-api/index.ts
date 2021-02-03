import { 
  GeoPosition, 
  WeatherSearchItem, 
  WeatherLocation, 
  WeatherSearchResponse,
  WeatherDataResponse,
} from "./types";
import { 
  getNormalizedResult,
  extractWeatherData,
} from "./utils";
const API_KEY = "319ada2fc9efd9a06e5ca66d1c9e8a23";

export const OpenWeatherAPI = {
  getLocationPointer(wsi: WeatherSearchItem): WeatherLocation {
    return {
      id: wsi.id,
      name: `${wsi.name}, ${wsi.sys.country}`,
      lat: wsi.coord.lat,
      lon: wsi.coord.lon,
    }
  },

  async getDefaultLocation() {
    const position: GeoPosition = await new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(res as PositionCallback, rej);
    });

    if (!position.coords) {
      return null;
    }
    const {coords: {latitude, longitude}} = position;

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
    });

    const result = await response.json();
    return this.getLocationPointer(result);
  },

  async getLocation(query: string) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/find?q=${query}&units=metric&appid=${API_KEY}`, {
      method: "GET",  
      headers: {
        "Accept": "application/json",
      },
    });

    const result: WeatherSearchResponse = await response.json();
    if (!result.count) {
      return null;
    }
    else if (result.count === 1) {
      return this.getLocationPointer(result.list[0]);
    }
    else {
      return result.list.map(wi => 
        getNormalizedResult(wi)
      );
    }
  },

  async getWeatherByCoords(loc: WeatherLocation) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${loc.lat}&lon=${loc.lon}&units=metric&exclude=minutely,hourly,daily,alerts&appid=${API_KEY}`, 
      {
        method: "GET",
        headers: {
          "Accept": "application/json",
        },
      });

      const result: WeatherDataResponse = await response.json();
      return extractWeatherData(result);
    }

    catch {
      return null;
    }
  },
}