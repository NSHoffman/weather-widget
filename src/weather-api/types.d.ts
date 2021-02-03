export type GeoPosition = GeolocationPosition & GeolocationPositionError;

// Weather Search API types
export interface WeatherSearchResponse {
  message: string;
  count: number;
  cod: number;
  list: Array<WeatherItem>;
}

export interface WeatherSearchItem {
  // Geographical Data
  id: number;               // City ID
  name: string;             // City Name
  coord: WeatherCoord;      // Coordinates

  // Weather
  weather: Array<Weather>;  // Description
  main: WeatherMain;        // Main indicators
  visibility: number;
  wind: WeatherWind;
  clouds: WeatherClouds;
  rain: WeatherRain | null;
  snow: WeatherRain | null;
  
  // Internal Parameters
  dt: number;               // Date of calculation/ms
  sys: WeatherSys;
  timezone: number;
  base: string;
}

export interface WeatherSearchItemNormalized {
  id: number;
  name: string;
  country: string;
  lat: number;
  lon: number;
  temp: number;
  tempMin: number;
  tempMax: number;
  feelsLike: number;
  pressure: number;
  humidity: number;
  clouds: number;
  wind: number;
  description: string;
  icon: string;
}

// Weather Request API
export interface WeatherDataResponse {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: -21600;
  current: {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    weather: Array<Weather>;
  };
}

export interface WeatherData {
  temp: number;
  feelsLike: number;
  pressure: number;
  humidity: number;
  dewPoint: number;
  uvi: number;
  visibility: number;
  wind: Wind;
  description: string;
  icon: string;
}

export interface WeatherLocation {
  id: number;
  name: string;
  lat: number;
  lon: number;
}

interface Wind {
  formatted: string;
  description: string;
}

interface WeatherCoord {
  lon: number;
  lat: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface WeatherMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

interface WeatherWind {
  speed: number;
  deg: number;
  gust: number;
}

interface WeatherClouds {
  all: number;
}

interface WeatherRain {
  "1h": number;
  "3h": number;
}

interface WeatherSys {
  type: number;
  id: number;
  country: string;
  message: number;
  sunrise: number;
  sunset: number;
}