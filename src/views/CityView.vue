<script setup lang="ts">
import AsyncCityView from '@/components/AsyncCityView.vue';
</script>

<template>
  <div>
    <Suspense>
      <AsyncCityView />
      <template #fallback>
        <div class="text-white text-2xl font-bold text-center">Loading...</div>
      </template>
    </Suspense>
  </div>
</template>
