<template>
  <div class="container mx-auto px-4 py-8">
    <Intro />
    <ExampleCode />

    <h2 class="text-2xl mb-2">useQuery</h2>
    <FetchExample :timestamp="tanStackData" :disableInvalidateBtn="false" @refresh="getTanStackData($event)" class="mb-4"/>

    <h2 class="text-2xl mb-2">Fetch</h2>
    <FetchExample :timestamp="fetchData" :disableInvalidateBtn="true" @refresh="getFetchData" />

    <h2 class="text-2xl mb-2">useMutation</h2>
    <MutationExample />
  </div>
</template>
<script setup lang="ts">
import { getTimeStampFetch } from "~/data/fetch"
import { useApi } from "~/data/tanStackQuery"
import { useQueryClient } from "@tanstack/vue-query";
import Intro from "~/components/tanstackQuery/Intro.vue"
import FetchExample from "~/components/FetchExample.vue";
import ExampleCode from "~/components/tanstackQuery/ExampleCode.vue";
import MutationExample from "~/components/tanstackQuery/MutationExample.vue";
import { timestamp } from "@/libs/utils"

const queryClient = useQueryClient();
const { getTimeStamp } = useApi();
const { data } = getTimeStamp;

const tanStackData = ref<string | undefined>("")
const getTanStackData = async(invalidate?: boolean) => {

  timestamp("getting data with tanstackQuery")

  if(invalidate) {
    timestamp("invalidating cache")
    await queryClient.invalidateQueries({ queryKey: ["getTimeStamp"] });
  }

  timestamp(`data -> ${data.value?.date}`)

  tanStackData.value = data.value?.date
}

const fetchData = ref<string | undefined>("")
const getFetchData = async() => {

  timestamp("getting data with fetch");

  const res = await getTimeStampFetch();

  timestamp(`data ->  ${res}`)

  fetchData.value =  res;
}

onMounted(async() => {
  await getTanStackData()
  await getFetchData()
})

</script>
<style></style>
