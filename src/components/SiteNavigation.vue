<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import BaseModal from './BaseModal.vue';
import { uid } from 'uid';
import type { SavedCity } from '@/types/savedCity';
import { useI18n } from 'vue-i18n';

const route = useRoute();
const router = useRouter();
const { locale } = useI18n();

const modelActive = ref(false);
const toggleModal = () => {
  modelActive.value = !modelActive.value;
}

const savedCities = ref<SavedCity[]>([]);

const availableLanguages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fi', name: 'Suomi', flag: '🇫🇮' },
];

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

const changeLanguage = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  locale.value = target.value;
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
        <div
          class="flex items-center gap-1 px-2 py-1 border border-white/30 rounded hover:bg-white/10 duration-150 cursor-pointer">
          <select v-model="locale"
            class="bg-transparent text-white border-none outline-none cursor-pointer text-sm appearance-none pr-4"
            @change="changeLanguage">
            <option v-for="lang in availableLanguages" :key="lang.code" :value="lang.code"
              class="bg-weather-primary text-white">
              <div class="flex items-center gap-2">
                {{ lang.flag }}&nbsp;&nbsp;{{ lang.name }}
              </div>
            </option>
          </select>
          <i class="fa-solid fa-chevron-down text-lg"></i>
        </div>
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
