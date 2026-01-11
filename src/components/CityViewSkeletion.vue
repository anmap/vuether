<script setup lang="ts">
import AnimatedPlaceholder from './AnimatedPlaceholder.vue';

</script>

<template>
  <div class="flex flex-col flex-1">
    <!-- Overview -->
    <div class="flex flex-col py-12 items-center">
      <AnimatedPlaceholder class="max-w-75 w-full mb-2" />
      <AnimatedPlaceholder class="max-w-75 w-full mb-12" />
      <AnimatedPlaceholder class="max-w-75 h-25 w-full mb-12" />
      <AnimatedPlaceholder class="max-w-75 w-full mb-8" />
      <AnimatedPlaceholder class="max-w-75 h-19 w-full" />
    </div>
    <hr class="border-white border-opacity-10 border w-full" />
    <!-- Hourly -->
    <div class="flex flex-col py-12 items-center">
      <AnimatedPlaceholder class="max-w-screen-md h-25 w-full mb-12" />
    </div>
    <hr class="border-white border-opacity-10 border w-full" />
    <!-- Weekly -->
    <div class="flex flex-col py-12 items-center">
      <AnimatedPlaceholder class="max-w-screen-md h-25 w-full mb-12" />
    </div>
  </div>
</template>
