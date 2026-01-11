<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import type { MapboxFeature } from '@/types/mapbox';
import CityList from '@/components/CityList.vue';
import CityCardSkeleton from '@/components/CityCardSkeleton.vue';

const apiKey = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN as string;

const router = useRouter();
const searchQuery = ref('');
const queryTimeout = ref<ReturnType<typeof setTimeout> | null>(null);
const mapboxSearchResults = ref<MapboxFeature[]>([]);
const searchError = ref(false);

const getSearchResults = () => {
  if (queryTimeout.value !== null) {
    clearTimeout(queryTimeout.value);
  }
  queryTimeout.value = setTimeout(async () => {
    searchError.value = false;
    if (searchQuery.value !== '') {
      try {
        const res = await axios.get(`https://api.mapbox.com/search/geocode/v6/forward?q=${searchQuery.value}&types=place&access_token=${apiKey}`);
        mapboxSearchResults.value = res.data.features;
        return;
      } catch (error) {
        console.error(error);
        searchError.value = true;
      }
    }
    mapboxSearchResults.value = [];
  }, 300);
}

const handleSelectResult = (result: MapboxFeature) => {
  const [city, state] = result.properties.full_address.split(',');
  router.push({
    name: 'city',
    params: { state: state?.trim() ?? '', city: city?.trim() ?? '' },
    query: {
      lat: result.geometry.coordinates[1].toString(),
      lng: result.geometry.coordinates[0].toString(),
      preview: 'true',
    },
  });
}
</script>

<template>
  <main class="container text-white">
    <div class="relative pt-4 mb-8">
      <input type="text" v-model="searchQuery" @input="getSearchResults" placeholder="Search for a city or state"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]" />
      <ul v-if="searchQuery !== ''"
        class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]">
        <p v-if="searchError" class="text-red-500 p-2">
          Sorry, something went wrong. Please try again.
        </p>
        <p v-if="!searchError && mapboxSearchResults.length === 0" class="p-2">
          No results match for your search.
        </p>
        <template v-else>
          <li v-for="result in mapboxSearchResults" :key="result.id" class="p-2 cursor-pointer"
            @click="handleSelectResult(result)">
            {{ result.properties.full_address }}
          </li>
        </template>
      </ul>
    </div>
    <div class="flex flex-col gap-4">
      <Suspense>
        <CityList />
        <template #fallback>
          <div class="text-white text-2xl font-bold text-center">
            <CityCardSkeleton />
          </div>
        </template>
      </Suspense>
    </div>
  </main>
</template>
