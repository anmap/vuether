<script setup lang="ts">
import { ref } from 'vue';
import type { SavedCity } from '@/types/savedCity';
import axios, { type AxiosResponse } from 'axios';
import type { OpenWeatherMapResult } from '@/types/openweathermap';
import CityCard from './CityCard.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const savedCities = ref<SavedCity[]>([]);
const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

const getSavedCities = async () => {
  if (localStorage.getItem('savedCities')) {
    try {
      const raw = localStorage.getItem('savedCities');
      savedCities.value = raw ? JSON.parse(raw) as SavedCity[] : [];
      console.log(savedCities.value);
    }
    catch (e) {
      console.error('Failed to parse savedCities from localStorage', e);
      savedCities.value = [];
    }
    const requests: Promise<AxiosResponse<OpenWeatherMapResult>>[] = [];
    savedCities.value.forEach(city => {
      requests.push(
        axios.get(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${city.coords.lat}&lon=${city.coords.lng}&units=metric&appid=${apiKey}`
        )
      );
    });
    const weatherData = await Promise.all(requests);

    weatherData.forEach((value, i) => {
      if (savedCities.value[i]) {
        savedCities.value[i].weather = value.data;
      }
    })
  }
}

await getSavedCities();

const goToCityView = (chosenCity: SavedCity) => {
  const { state, city, coords: { lat, lng } } = chosenCity;
  router.push({
    name: 'city',
    params: { state, city },
    query: { lat, lng },
  });
}
</script>

<template>
  <div v-for="city in savedCities" :key="city.id">
    <CityCard :city="city" @click="goToCityView(city)" />
  </div>

  <p v-if="savedCities.length === 0" class="text-white py-4 text-xl mt-10">
    No locations added. To start tracking a location, search in the field above.
  </p>
</template>
