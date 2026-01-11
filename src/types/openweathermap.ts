// OpenWeatherMap API Types

export interface OpenWeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface OpenWeatherCurrent {
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
  weather: OpenWeatherCondition[];
}

export interface OpenWeatherMinutely {
  dt: number;
  precipitation: number;
}

export interface OpenWeatherHourly {
  dt: number;
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
  wind_gust: number;
  weather: OpenWeatherCondition[];
  pop: number;
  currentTime?: number;
}

export interface OpenWeatherDailyTemp {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

export interface OpenWeatherDailyFeelsLike {
  day: number;
  night: number;
  eve: number;
  morn: number;
}

export interface OpenWeatherDaily {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  summary: string;
  temp: OpenWeatherDailyTemp;
  feels_like: OpenWeatherDailyFeelsLike;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: OpenWeatherCondition[];
  clouds: number;
  pop: number;
  uvi: number;
  snow?: number;
  rain?: number;
}

export interface OpenWeatherAlert {
  sender_name: string;
  event: string;
  start: number;
  end: number;
  description: string;
  tags: string[];
}

export interface OpenWeatherMapResult {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: OpenWeatherCurrent;
  minutely: OpenWeatherMinutely[];
  hourly: OpenWeatherHourly[];
  daily: OpenWeatherDaily[];
  alerts?: OpenWeatherAlert[];
  currentTime?: string;
}
