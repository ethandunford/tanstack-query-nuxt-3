<script setup lang="ts">
const remountFetch = ref(false);
const remountTanStackQuery = ref(false);

const displayTanStackComponent = ref(true);
const displayFetchComponent = ref(true);

const handleRemount = (componentName: string) => {
  if (componentName === "tanStack") {
    displayTanStackComponent.value = false;
  } else {
    displayFetchComponent.value = false;
  }

  setTimeout(() => {
    if (componentName === "tanStack") {
      remountTanStackQuery.value = !remountTanStackQuery.value;
      displayTanStackComponent.value = true;
    } else {
      remountFetch.value = !remountFetch.value;
      displayFetchComponent.value = true;
    }
  }, 500);
};

onMounted(() => {
  remountFetch.value = !remountFetch.value;
  remountTanStackQuery.value = !remountTanStackQuery.value;
});
</script>

<template>
  <div class="container mx-auto px-4 py-4">
    <section class="py-4">
      <h1 class="text-4xl text-bold mb-2">
        Fetch, Cache, and Update Data Effortlessly
      </h1>
      <p>
        Toss out that granular state management, manual refetching and endless
        bowls of async-spaghetti code. TanStack Query gives you declarative,
        always-up-to-date auto-managed queries and mutations that directly
        improve both your developer and user experiences.
        <a
          href="https://tanstack.com/query/latest/docs/vue/guides"
          target="_blank"
          class="underline"
          >Take me to the docs </a
        >🔎
      </p>
      <ul class="list-disc ml-4 mt-4">
        <li>Bundle size: 14kb (Minified + Gzipped)</li>
        <li>Bundle size: 45.3kb (Minified)</li>
      </ul>
      <a
        href="https://bestofjs.org/projects/tanstack-query"
        target="_blank"
        class="underline"
        >https://bestofjs.org/projects/tanstack-query</a
      >
    </section>

    <ExampleCode />

    <h2 class="text-2xl mb-2">useQuery</h2>
    <section class="my-4 min-h-[80px]">
      <h3 class="text-xl mb-2">Http Request using Fetch and Tanstack Query</h3>
      <div class="flex" v-if="displayTanStackComponent">
        <UseQueryExample :key="String(remountTanStackQuery)" type="tanStack" />
        <button
          @click="handleRemount('tanStack')"
          type="button"
          class="px-5 py-2.5 text-sm font-medium text-white bg-red-700 rounded-md text-center"
        >
          Remount
        </button>
      </div>
    </section>
    <section class="my-4 min-h-[80px]">
      <h3 class="text-xl mb-2">Http Request using Fetch</h3>
      <div class="flex" v-if="displayFetchComponent">
        <UseQueryExample :key="String(remountFetch)" type="fetch" />
        <button
          @click="handleRemount('fetch')"
          type="button"
          class="px-5 py-2.5 text-sm font-medium text-white bg-red-700 rounded-md text-center"
        >
          Remount
        </button>
      </div>
    </section>

    <h2 class="text-2xl mb-2">useMutation</h2>
    <UseMutationExample />
  </div>
</template>

<style></style>
