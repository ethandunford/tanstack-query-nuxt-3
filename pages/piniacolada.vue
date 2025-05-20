<template>
  <div class="container mx-auto px-4 py-8">
    <Intro />
    <ExampleCode />

    <h2 class="text-2xl mb-2">useQuery</h2>
    <FetchExample :timestamp="responseData" :disableInvalidateBtn="false" @refresh="getData($event)" class="mb-4"/>

    <h2 class="text-2xl mb-2">Fetch</h2>
    <FetchExample :timestamp="fetchData" :disableInvalidateBtn="true" @refresh="getFetchData" />

    <h2 class="text-2xl mb-2">useMutation</h2>
    <MutationExample />
  </div>
</template>
<script setup lang="ts">
import { getTimeStampFetch } from "~/data/fetch"
import { useQueryClient } from "@tanstack/vue-query";
import Intro from "@/components/piniaColada/Intro.vue"
import FetchExample from "~/components/FetchExample.vue";
import ExampleCode from "~/components/piniaColada/ExampleCode.vue";
import MutationExample from "~/components/piniaColada/MutationExample.vue";
import { timestamp } from "~/libs/utils"
import { useQueryCache } from '@pinia/colada'
import { useApi } from "~/data/piniaColada"

const { getTimeStamp } = useApi();
const { data } = getTimeStamp;
const queryCache = useQueryCache()

const responseData = ref<string | undefined>("")
async function getData(invalidate?: boolean){

  timestamp("getting data with pinia colada")

  if(invalidate) {
    timestamp("invalidating cache")
    await queryCache.invalidateQueries({ key: ["getTimeStampPinia"] })
  }

  timestamp(`data -> ${data.value?.date}`)

  responseData.value = data.value?.date
}

const fetchData = ref<string | undefined>("")
async function getFetchData() {

  timestamp("getting data with fetch");

  const res = await getTimeStampFetch();

  timestamp(`data ->  ${res}`)

  fetchData.value =  res;
}

onMounted(async() => {
  await getData()
  await getFetchData()
})

</script>
<style></style>
