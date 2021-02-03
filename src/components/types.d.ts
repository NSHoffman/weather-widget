import { 
  WeatherData, 
  WeatherSearchItemNormalized, 
  WeatherLocation 
} from "../weather-api/types";

export interface HTMLEvent<T extends HTMLElement = HTMLElement> extends Event {
  target: T;
}

export interface WeatherSettingsData {
  selectResultOpen: boolean;
  searchResults: WeatherSearchItemNormalized[] | null;
  searchQuery: string;
  error: string | null;
}

export interface WeatherWidgetData {
  locations: WeatherLocation[];
  settingsOpen: boolean;
}

export interface WeatherItemData {
  weather: WeatherData | null;
  isLoading: boolean;
  error: string | null;
}

export interface SearchPaneClassNames {
  "search-pane_is-active": boolean;
}