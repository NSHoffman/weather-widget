import { 
  GeoPosition, 
  WeatherSearchItem, 
  WeatherLocation, 
  WeatherSearchResponse,
  WeatherDataResponse,
  WeatherData,
  WeatherSearchItemNormalized
} from "./types";
import { 
  getNormalizedResult,
  extractWeatherData,
} from "./utils";
const API_KEY = "319ada2fc9efd9a06e5ca66d1c9e8a23";

export const OpenWeatherAPI = {
  /**
   * getLocationPointer()
   * @param {WeatherSearchItem} wsi - Raw weather data received from API
   * @returns {WeatherLocation} - an object reference to the specified locaton.
   * This object will be stored in the local storage as a reference to the location
   */
  getLocationPointer(wsi: WeatherSearchItem): WeatherLocation {
    return {
      id: wsi.id,
      name: `${wsi.name}, ${wsi.sys.country}`,
      lat: wsi.coord.lat,
      lon: wsi.coord.lon,
    }
  },

  /**
   * getDefaultLocation()
   * @returns {WeatherLocation} - reference to the default location
   * Default location = user's geolocation
   */
  async getDefaultLocation(): Promise<WeatherLocation | null> {
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

  /**
   * getLocation()
   * @param {string} query - user's query string
   * If the result is single: @returns {WeatherLocation} - A reference to chosen location
   * In case of ambiguity: @returns {WeatherSearchItemNormalized[]} - An array of locations with the corresponding weather data
   */
  async getLocation(query: string): Promise<WeatherLocation | WeatherSearchItemNormalized[] | null> {
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

  /**
   * getWeatherByCoords()
   * @param {WeatherLocation} loc - Location reference object
   * @returns {WeatherData} - Weather data object used by widget to display information
   */
  async getWeatherByCoords(loc: WeatherLocation): Promise<WeatherData | null> {
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