import type { LocationQueryValue } from 'vue-router';
import type { OpenWeatherMapResult } from './openweathermap';

export interface SavedCity {
  id: string;
  state: string | string[] | undefined;
  city: string | string[] | undefined;
  coords: {
    lat: LocationQueryValue | LocationQueryValue[] | undefined;
    lng: LocationQueryValue | LocationQueryValue[] | undefined;
  };
  weather?: OpenWeatherMapResult;
}
