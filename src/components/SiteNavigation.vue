<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import BaseModal from './BaseModal.vue';
import { uid } from 'uid';
import type { SavedCity } from '@/types/savedCity';

const route = useRoute();
const router = useRouter();

const modelActive = ref(false);
const toggleModal = () => {
  modelActive.value = !modelActive.value;
}

const savedCities = ref<SavedCity[]>([]);
const addCity = () => {
  if (localStorage.getItem('savedCities')) {
    try {
      const raw = localStorage.getItem('savedCities');
      savedCities.value = raw ? JSON.parse(raw) as SavedCity[] : [];
    } catch (e) {
      console.error('Failed to parse savedCities from localStorage', e);
      savedCities.value = [];
    }
  }

  const cityObj = {
    id: uid(),
    state: route.params.state,
    city: route.params.city,
    coords: {
      lat: route.query.lat,
      lng: route.query.lng,
    },
  }

  savedCities.value.push(cityObj);
  localStorage.setItem('savedCities', JSON.stringify(savedCities.value));

  const query = Object.assign({}, route.query);
  delete query.preview;
  query.id = cityObj.id;
  router.replace({ query });
}
</script>

<template>
  <header class="sticky top-0 bg-weather-primary shadow-lg">
    <nav class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6 ">
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-3">
          <i class="fa-solid fa-sun text-2xl"></i>
          <p class="text-2xl">{{ $t('appName') }}</p>
        </div>
      </RouterLink>

      <div class="flex gap-3 flex-1 justify-end items-center">
        <i class="fa-solid fa-question-circle text-xl hover:text-weather-secondary duration-150 cursor-pointer block"
          @click="toggleModal"></i>
        <i class="fa-solid fa-plus text-xl hover:text-weather-secondary duration-150 cursor-pointer block"
          @click="addCity" v-if="route.query.preview"></i>
      </div>

      <BaseModal :modelActive="modelActive" @close-modal="toggleModal">
        <div class="text-black">
          <h1 class="text-2xl mb-1">{{ $t('about.title') }}</h1>
          <p class="mb-4">
            {{ $t('about.description') }}
          </p>
          <h2 class="text-2xl">{{ $t('about.howItWorks') }}</h2>
          <ol class="list-decimal list-inside mb-4">
            <li>
              {{ $t('about.step1') }}
            </li>
            <li>
              {{ $t('about.step2') }}
            </li>
            <li>
              {{ $t('about.step3') }}
            </li>
          </ol>

          <h2 class="text-2xl">{{ $t('about.removingCity') }}</h2>
          <p>
            {{ $t('about.removingCityDescription') }}
          </p>
        </div>
      </BaseModal>
    </nav>
  </header>
</template>

<style lang="scss" scoped></style>
