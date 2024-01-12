<script setup lang="ts">
import { useQueryClient } from "@tanstack/vue-query";
import { useApi } from "../services/api";

const props = defineProps<{ type: string }>();

const queryClient = useQueryClient();
const { getTimeStamp } = useApi();
const { data, isFetching } = getTimeStamp;

const hasRendered = ref(false);
const oldDate = ref("");
const fetchData = ref();

const getDataFetch = async () => {
  const response = await useFetch("/api/get-time-stamp");
  return await response.data.value?.date;
};

const setOldData = (hasRendered: boolean, oData: string) => {
  if (hasRendered) {
    oldDate.value = oData;
  }
};

const disable = ref(false);
const getData = async (hasRendered: boolean) => {
  disable.value = true;
  setOldData(hasRendered, fetchData.value);
  if (props.type === "tanStack") {
    console.log("=> getting data with tan stack query", data.value.date);
    fetchData.value = data.value.date;
    disable.value = false;
    return;
  }

  const res = await getDataFetch();
  console.log("=> getting data with fetch", res);
  fetchData.value = res;
  disable.value = false;
};

const invalidateQuery = async () => {
  setOldData(hasRendered.value, fetchData.value);
  await queryClient.invalidateQueries({ queryKey: ["getTimeStamp"] });
  fetchData.value = data.value?.date;
};

onMounted(async () => {
  getData(hasRendered.value);
  hasRendered.value = true;
});
</script>

<template>
  <section class="grid grid-cols-4 gap-4 w-full">
    <div>Date: {{ fetchData }}</div>
    <div>Old Date: {{ oldDate }}</div>
    <div>Matches: {{ oldDate === fetchData ? "✔️" : "❌" }}</div>
    <div>
      <button
        @click="getData"
        :disabled="(type === 'tanstack' && isFetching) || disable"
        type="button"
        class="px-5 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-md text-center mr-4"
      >
        Refresh
      </button>
      <button
        :disabled="type === 'fetch' || isFetching"
        @click="invalidateQuery"
        type="button"
        class="px-5 py-2.5 text-sm font-medium text-white rounded-md text-center"
        :class="[
          type === 'fetch' || oldDate === '' ? 'bg-gray-700' : 'bg-red-700',
        ]"
      >
        {{ type === "fetch" ? "Disabled" : "Invalidate" }}
      </button>
    </div>
  </section>
</template>
