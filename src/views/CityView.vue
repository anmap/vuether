<script setup lang="ts">
import AsyncCityView from '@/components/AsyncCityView.vue';
import CityViewSkeletion from '@/components/CityViewSkeletion.vue';
</script>

<template>
  <div>
    <Suspense>
      <AsyncCityView />
      <template #fallback>
        <CityViewSkeletion />
      </template>
    </Suspense>
  </div>
</template>
