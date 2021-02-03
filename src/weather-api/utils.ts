import { 
  WeatherSearchItem,
  WeatherSearchItemNormalized,
  WeatherData,
  WeatherDataResponse,
} from "./types";

export function getWindDescription(speed: number): string {
  if (speed < 0.5) {
    return "Calm";
  }
  else if (speed >= 0.5 && speed < 2) {
    return "Light Air";
  }
  else if (speed >= 2 && speed < 3.5) {
    return "Light Breeze";
  }
  else if (speed >= 3.5 && speed < 5.5) {
    return "Gentle Breeze";
  }
  else if (speed >= 5.5 && speed < 8.5) {
    return "Moderate Breeze";
  }
  else if (speed >= 8.5 && speed < 11) {
    return "Fresh Breeze";   
  }
  else if (speed >= 11 && speed < 14) {
    return "Strong Breeze"; 
  }
  else if (speed >= 14 && speed < 17) {
    return "Moderate Gale";
  }
  else if (speed >= 17 && speed < 20.5) {
    return "Fresh Gale";   
  }
  else if (speed >= 20.5 && speed < 24) {
    return "Strong Gale";    
  }
  else if (speed >= 24 && speed < 28) {
    return "Whole Gale";    
  }
  else if (speed >= 28 && speed < 32) {
    return "Storm";    
  }
  else {
    return "Hurricane";
  }
}

export function getWindDirection(speed: number, deg: number): string {
  const formatted = `${speed}m/s`;
  if (deg >= 11.25 && deg < 33.75) {
    return `${formatted} NNE`;
  }
  else if (deg >= 33.75 && deg < 56.25) {
    return `${formatted} NE`;
  }
  else if (deg >= 56.25 && deg < 78.75) {
    return `${formatted} ENE`;
  }
  else if (deg >= 78.75 && deg < 101.25) {
    return `${formatted} E`;
  }
  else if (deg >= 101.25 && deg < 123.75) {
    return `${formatted} ESE`;
  }
  else if (deg >= 123.75 && deg < 146.25) {
    return `${formatted} SE`;
  }
  else if (deg >= 146.25 && deg < 168.75) {
    return `${formatted} SSE`;
  }
  else if (deg >= 168.75 && deg < 191.25) {
    return `${formatted} S`;
  }
  else if (deg >= 191.25 && deg < 213.75) {
    return `${formatted} SSW`;
  }
  else if (deg >= 213.75 && deg < 236.25) {
    return `${formatted} SW`;
  }
  else if (deg >= 236.25 && deg < 258.75) {
    return `${formatted} WSW`;
  }
  else if (deg >= 258.75 && deg < 281.25) {
    return `${formatted} W`;
  }
  else if (deg >= 281.25 && deg < 303.75) {
    return `${formatted} WNW`;
  }
  else if (deg >= 303.75 && deg < 326.25) {
    return `${formatted} NW`;
  }
  else if (deg >= 326.25 && deg < 348.75) {
    return `${formatted} NNW`;
  }
  else {
    return `${formatted} N`;
  }
}

export function getNormalizedResult(wsi: WeatherSearchItem): WeatherSearchItemNormalized {
  return {
    id: wsi.id,
    name: wsi.name,
    country: wsi.sys.country,
    lat: wsi.coord.lat,
    lon: wsi.coord.lon,
    temp: wsi.main.temp,
    tempMin: wsi.main.temp_min,
    tempMax: wsi.main.temp_max,
    feelsLike: wsi.main.feels_like,
    humidity: wsi.main.humidity,
    pressure: wsi.main.pressure,
    clouds: wsi.clouds.all,
    wind: wsi.wind.speed,
    description: wsi.weather[0].description,
    icon: wsi.weather[0].icon,
  };
}

export function extractWeatherData({ current }: WeatherDataResponse): WeatherData {
  return {
    temp: current.temp,
    feelsLike: current.feels_like,
    pressure: current.pressure,
    humidity: current.humidity,
    dewPoint: current.dew_point,
    uvi: current.uvi,
    visibility: current.visibility,
    wind: {
      formatted: getWindDirection(current.wind_speed, current.wind_deg),
      description: getWindDescription(current.wind_speed),
    },
    description: current.weather[0].description,
    icon: current.weather[0].icon,
  };
}