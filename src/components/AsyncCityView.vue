<script setup lang="ts">
import type { OpenWeatherMapResult } from '@/types/openweathermap';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { timestampToDate, formatFullDate, formatShortTime, formatHour } from '@/utils/datetime';
import { formatTemperature } from '@/utils/temperature';
import type { SavedCity } from '@/types/savedCity';
import { useI18n } from 'vue-i18n';

const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY as string;

const route = useRoute();
const { locale, t } = useI18n();

const translateWeatherDescription = (description: string | undefined): string => {
  if (!description) return '';
  const key = `weatherConditions.${description}`;
  const translation = t(key);
  // If translation doesn't exist (returns the key), fallback to original description
  return translation !== key ? translation : description;
};

const getWeatherData = async () => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${route.query.lat}&lon=${route.query.lng}&units=metric&appid=${apiKey}`);

    const weatherData = response.data as OpenWeatherMapResult;

    // Calculate current data and time (store as timestamp in milliseconds)
    const currentDate = timestampToDate(weatherData.current.dt, weatherData.timezone_offset);
    weatherData.currentTime = currentDate.getTime().toString();

    // Calculate hourly weather offset (store as timestamp in milliseconds)
    weatherData.hourly.forEach((hour) => {
      const hourDate = timestampToDate(hour.dt, weatherData.timezone_offset);
      hour.currentTime = hourDate.getTime();
    });

    return weatherData;
  } catch (error) {
    console.error(error);
  }
}

const weatherData = await getWeatherData();

const router = useRouter();
const removeCity = () => {
  const cities = JSON.parse(localStorage.getItem('savedCities') || '[]');
  const updatedCities = cities.filter((city: SavedCity) => city.id !== route.query.id);
  localStorage.setItem('savedCities', JSON.stringify(updatedCities));
  router.push({ name: 'home' });
}
</script>

<template>
  <div class="flex flex-col flex-1 items-center">
    <!-- Banner -->
    <div v-if="route.query.preview" class="text-white p-4 bg-weather-secondary w-full text-center">
      <p>
        {{ $t('cityView.previewBannerPrefix') }} <i class="fa-solid fa-plus"></i> {{ $t('cityView.previewBanner') }}
      </p>
    </div>
    <!-- Weather Overview -->
    <div class="flex flex-col items-center text-white py-12">
      <h1 class="text-4xl mb-2">{{ route.params.city }}</h1>
      <p class="text-sm mb-12">
        {{ weatherData?.currentTime && formatFullDate(Number(weatherData.currentTime), locale) }}
        {{ weatherData?.currentTime && formatShortTime(Number(weatherData.currentTime), locale) }}
      </p>
      <p class="text-8xl mb-8">{{ formatTemperature(weatherData?.current.temp) }}</p>
      <div class="text-center">
        <p>{{ $t('cityView.feelsLike') }} {{ formatTemperature(weatherData?.current.feels_like) }}</p>
        <p>{{ translateWeatherDescription(weatherData?.current.weather[0]?.description) }}</p>
      </div>
      <img :src="`https://openweathermap.org/img/wn/${weatherData?.current.weather[0]?.icon}@4x.png`"
        :alt="translateWeatherDescription(weatherData?.current.weather[0]?.description)" class="w-32 mb-8" />
    </div>

    <hr class="border-white border-opacity-10 border w-full" />

    <!-- Hourly Weather -->
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4 font-bold uppercase">{{ $t('cityView.hourlyWeather') }}</h2>
        <div class="flex gap-10 overflow-x-scroll">
          <div v-for="hour in weatherData?.hourly" :key="hour.dt" class="min-w-12 flex flex-col gap-4 items-center">
            <p class="whitespace-nowrap text-md">
              {{ hour.currentTime && formatHour(hour.currentTime, locale) }}
            </p>
            <img :src="`https://openweathermap.org/img/wn/${hour.weather[0]?.icon}@2x.png`"
              :alt="translateWeatherDescription(hour.weather[0]?.description)" class="w-12 h-12" />
            <p class="text-xl">{{ formatTemperature(hour.temp) }}</p>
          </div>
        </div>
      </div>
    </div>

    <hr class="border-white border-opacity-10 border w-full" />

    <!-- Weekly Weather -->
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4 font-bold uppercase">{{ $t('cityView.sevenDayForecast') }}</h2>
        <div v-for="day in weatherData?.daily" :key="day.dt" class="min-w-12 flex gap-4 items-center justify-between">
          <p class="flex-1">
            {{ formatFullDate(day.dt * 1000, locale) }}
          </p>
          <img :src="`https://openweathermap.org/img/wn/${day.weather[0]?.icon}@2x.png`"
            :alt="translateWeatherDescription(day.weather[0]?.description)" class="w-12 h-12 object-cover" />
          <div class="flex gap-2 justify-end flex-1 text-md">
            <p>{{ $t('cityView.high') }} {{ formatTemperature(day.temp.max) }}</p>
            <p>{{ $t('cityView.low') }} {{ formatTemperature(day.temp.min) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Remove from saved cities -->
    <div class="flex items-center gap-2 py-12 text-white cursor-pointer duration-150 hover:text-red-500"
      @click="removeCity">
      <i class="fa-solid fa-trash"></i>
      <p>{{ $t('cityView.removeCity') }}</p>
    </div>
  </div>
</template>
