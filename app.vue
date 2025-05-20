<template>
    <div class="bg-red-600">
      <div class="container mx-auto px-4 py-4 text-center text-white">
        <h1> DEMO APPLICATION </h1>
      </div>
    </div>
    <AppNav />
  <RouterView />
</template>
<script setup lang="ts">
import { getTimeStampFetch } from "~/data/fetch"
import { useApi } from "~/data/tanStackQuery"
import { useQueryClient } from "@tanstack/vue-query";
import AppNav from "~/components/AppNav.vue";

const queryClient = useQueryClient();
const { getTimeStamp } = useApi();
const { data } = getTimeStamp;

const tanStackData = ref<string | undefined>("")
const getTanStackData = async(invalidate?: boolean) => {

  console.log("==> getting data with tanstackQuery")

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
