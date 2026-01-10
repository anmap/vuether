<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import type { MapboxFeature } from '@/types/mapbox';

const apiKey = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN as string;

const searchQuery = ref('');
const queryTimeout = ref<ReturnType<typeof setTimeout> | null>(null);
const mapboxSearchResults = ref<MapboxFeature[] | null>(null);

const getSearchResults = () => {
  if (queryTimeout.value !== null) {
    clearTimeout(queryTimeout.value);
  }
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== '') {
      const res = await axios.get(`https://api.mapbox.com/search/geocode/v6/forward?q=${searchQuery.value}&types=place&access_token=${apiKey}`);
      mapboxSearchResults.value = res.data.features;
      console.log(mapboxSearchResults.value);
      return;
    }
    mapboxSearchResults.value = null;
  }, 300);
}
</script>

<template>
  <main class="container text-white">
    <div class="relative pt-4 mb-8">
      <input type="text" v-model="searchQuery" @input="getSearchResults" placeholder="Search for a city or state"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]" />
      <ul class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]">
        <li v-for="result in mapboxSearchResults" :key="result.id" class="p-2 cursor-pointer">
          {{ result.properties.full_address }}
        </li>
      </ul>
    </div>
  </main>
</template>
