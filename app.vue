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
import { getTimeStampFetch } from "~/services/fetch"
import { useApi } from "~/services/api"
import { useQueryClient } from "@tanstack/vue-query";

const queryClient = useQueryClient();
const { getTimeStamp } = useApi();
const { data } = getTimeStamp;

const tanStackData = ref<string | undefined>("")
const getTanStackData = async(invalidate?: boolean) => {

  console.log("==> getting data with tanstack")

  if(invalidate) {
    console.log("==> invalidating cache")
    await queryClient.invalidateQueries({ queryKey: ["getTimeStamp"] });
  }

  console.log("==> data",  data.value?.date)

  tanStackData.value = data.value?.date
}

const fetchData = ref<string | undefined>("")
const getFetchData = async() => {

  console.log("=> getting data with fetch");

  const res = await getTimeStampFetch();

  console.log("==> data",  res)

  fetchData.value =  res;
}

onMounted(async() => {
  await getTanStackData()
  await getFetchData()
})

</script>
<style></style>
