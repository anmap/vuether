<script setup lang="ts">
import type { SavedCity } from '@/types/savedCity';
import { formatTemperature } from '@/utils/temperature';

defineProps<{
  city: SavedCity;
}>();
</script>

<template>
  <div class="flex py-6 px-3 bg-weather-secondary rounded-md shadow-md cursor-pointer">
    <div class="flex flex-col flex-1">
      <h2 class="text-3xl">{{ city.city }}</h2>
      <h3>{{ city.state }}</h3>
    </div>
    <div class="flex flex-col gap-2">
      <p class="text-3xl self-end">{{ formatTemperature(city.weather?.current.temp) }}</p>
      <div class="flex gap-2">
        <span class="text-xs">{{ $t('cityView.high') }} {{ formatTemperature(city.weather?.daily[0]?.temp.max) }}</span>
        <span class="text-xs">{{ $t('cityView.low') }} {{ formatTemperature(city.weather?.daily[0]?.temp.min) }}</span>
      </div>
    </div>
  </div>
</template>
