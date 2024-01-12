<script setup lang="ts">
import { computed } from "vue";
import { useApi } from "../services/api";
const remountFetch = ref(false);
const remountTanStackQuery = ref(false);

const { isEven } = useApi();
const { status, mutate, reset } = isEven;

const inputValue = ref("");

const submitIsEven = () => {
  mutate({ number: inputValue.value });
  inputValue.value = "";

  console.log("submit is even");
};

const getIcon = computed(() => {
  if (status.value === "error") {
    return "❌";
  } else if (status.value === "success") {
    return "✔️";
  }
  return "";
});

const getMessage = computed(() => {
  if (status.value === "error") {
    return "Value is invalid or a odd number";
  } else if (status.value === "success") {
    return "Value is a even number";
  }
  return "";
});

const disable = computed(() => {
  return status.value === "pending";
});

onMounted(() => {
  remountFetch.value = !remountFetch.value;
  remountTanStackQuery.value = !remountTanStackQuery.value;
});
</script>

<template>
  <section class="my-4">
    <div>
      <label class="block mb-2 text-sm font-medium text-gray-900"
        >Check if a number is even</label
      >
      <div class="flex flex-row items-center">
        <input
          :disabled="disable"
          v-model="inputValue"
          type="text"
          class="w-44 mr-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
        />
        <div>
          <button
            @click="submitIsEven"
            :disabled="disable"
            type="button"
            class="mr-4 px-5 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-md text-center"
          >
            Submit
          </button>
          <button
            @click="reset"
            :disabled="disable"
            type="button"
            class="mr-4 px-5 py-2.5 text-sm font-medium text-white bg-red-700 rounded-md text-center"
          >
            Clear
          </button>
        </div>
        <span class="text-xl" v-if="status === 'success' || status === 'error'"
          >{{ getMessage }} {{ getIcon }}</span
        >
      </div>
    </div>
  </section>
</template>

<style></style>
