<script setup lang="ts">
const tsqExample = `import { useQuery, useMutation } from "@tanstack/vue-query";

// services/tanStackQuery.ts
export function useApi() {

  // For read requests ( it can take variables )
  // https://tanstack.com/query/latest/docs/vue/reference/useQuery
  const getTimeStamp = useQuery({
    queryKey: ["getTimeStamp"],
    queryFn: async () => {
      const data = await $fetch("/api/get-time-stamp");
      return data;
    },
  });

  // For inserts, updates etc
  // https://tanstack.com/query/latest/docs/vue/reference/useMutation
  const isEven = useMutation({
    mutationFn: async (number: string) => {
      await $fetch("/api/is-even", {
        method: "post",
        body: number,
      });
    },
  });

  return { getTimeStamp, isEven };
}`;

const vueScriptExample = `import { useApi } from "../data/tanStackQuery";

const { getTimeStamp } = useApi();
const { data, error, isFetching, isSuccess, isError, isStale, status, refetch } = getTimeStamp;

const { isEven } = useApi();
const { data, error, isPending, isSuccess, isError, status, mutate, reset } = isEven;

const submitIsEven = () => {
  mutate({ number: inputValue.value });
};

`;
</script>

<template>
  <section class="my-4">
    <h3 class="text-xl mb-2">tanStackQuery.ts</h3>
    <ClientOnly>
      <highlightjs autodetect :code="tsqExample" class="mb-8" />
    </ClientOnly>
    <h3 class="text-xl mb-2">Usage</h3>
    <ClientOnly>
      <highlightjs autodetect :code="vueScriptExample" class="mb-8" />
    </ClientOnly>
  </section>
</template>
