<script setup lang="ts">
import type { OpenWeatherMapResult } from '@/types/openweathermap';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { timestampToDate, formatFullDate, formatShortTime, formatHour } from '@/utils/datetime';
import { formatTemperature } from '@/utils/temperature';

const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY as string;

const route = useRoute();

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
console.log(weatherData);
</script>

<template>
  <div class="flex flex-col flex-1 items-center">
    <!-- Banner -->
    <div v-if="route.query.preview" class="text-white p-4 bg-weather-secondary w-full text-center">
      <p>
        You are currently previewing this city, click the <i class="fa-solid fa-plus"></i> button to start tracking it.
      </p>
    </div>
    <!-- Weather Overview -->
    <div class="flex flex-col items-center text-white py-12">
      <h1 class="text-4xl mb-2">{{ route.params.city }}</h1>
      <p class="text-sm mb-12">
        {{ weatherData?.currentTime && formatFullDate(Number(weatherData.currentTime)) }}
        {{ weatherData?.currentTime && formatShortTime(Number(weatherData.currentTime)) }}
      </p>
      <p class="text-8xl mb-8">{{ formatTemperature(weatherData?.current.temp) }}</p>
      <div class="text-center">
        <p>Feels like {{ formatTemperature(weatherData?.current.feels_like) }}</p>
        <p class="capitalize">{{ weatherData?.current.weather[0]?.description }}</p>
      </div>
      <img :src="`https://openweathermap.org/img/wn/${weatherData?.current.weather[0]?.icon}@4x.png`"
        :alt="weatherData?.current.weather[0]?.description" class="w-32 mb-8" />
    </div>

    <hr class="border-white border-opacity-10 border w-full" />

    <!-- Hourly Weather -->
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4 font-bold uppercase">Hourly Weather</h2>
        <div class="flex gap-10 overflow-x-scroll">
          <div v-for="hour in weatherData?.hourly" :key="hour.dt" class="min-w-12 flex flex-col gap-4 items-center">
            <p class="whitespace-nowrap text-md">
              {{ hour.currentTime && formatHour(hour.currentTime) }}
            </p>
            <img :src="`https://openweathermap.org/img/wn/${hour.weather[0]?.icon}@2x.png`"
              :alt="hour.weather[0]?.description" class="w-12 h-12" />
            <p class="text-xl">{{ formatTemperature(hour.temp) }}</p>
          </div>
        </div>
      </div>
    </div>

    <hr class="border-white border-opacity-10 border w-full" />

    <!-- Weekly Weather -->
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4 font-bold uppercase">7-Day Forecast</h2>
        <div v-for="day in weatherData?.daily" :key="day.dt" class="min-w-12 flex gap-4 items-center justify-between">
          <p class="flex-1">
            {{ formatFullDate(day.dt * 1000) }}
          </p>
          <img :src="`https://openweathermap.org/img/wn/${day.weather[0]?.icon}@2x.png`"
            :alt="day.weather[0]?.description" class="w-12 h-12 object-cover" />
          <!-- <p class="text-xl">{{ typeof (day.temp.max) === 'number' ?
            `${Math.round(day.temp.max)}°` : '--' }}</p> -->
          <div class="flex gap-2 justify-end flex-1 text-md">
            <p>H: {{ formatTemperature(day.temp.max) }}</p>
            <p>L: {{ formatTemperature(day.temp.min) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
