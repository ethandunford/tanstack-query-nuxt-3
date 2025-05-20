<template>
  <div class="container mx-auto px-6 py-8">
    <h1 class="text-4xl font-bold mb-6">TanStack Query & Pinia Colada Demo</h1>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-2">TanStack</h2>
      <p class="text-base text-gray-700 mb-4">
        Toss out that granular state management, manual refetching and endless bowls of async-spaghetti code.
      </p>

      <h3 class="text-lg font-semibold mb-2">Key Features</h3>
      <ul class="list-disc list-inside text-gray-800 space-y-1">
        <li>Auto caching + refetching (stale-while-revalidate, window refocus, polling/realtime)</li>
        <li>Parallel + dependent queries</li>
        <li>Mutations + reactive query refetching</li>
        <li>Small bundle size: 14kb (minified + gzipped)</li>
      </ul>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-2">PiniaColada</h2>
      <p class="text-base text-gray-700 mb-4">
        PiniaColada is a developer tool that enhances the experience of using Pinia, the official state management library for Vue.js.
      </p>

      <h3 class="text-lg font-semibold mb-2">Key Features</h3>
      <ul class="list-disc list-inside text-gray-800 space-y-1">
        <li>Debugging and visualizing state</li>
        <li>Tracking actions and mutations</li>
        <li>Time-travel debugging (like Vue DevTools but focused on Pinia)</li>
      </ul>
    </section>
  </div>
</template>
<script lang="ts" setup>

</script>