<script setup lang="ts">
const tsqExample = `import { useQuery, useMutation } from "@tanstack/vue-query";

// data/piniaColada.ts
import { useQuery} from '@pinia/colada'

export function useApi() {

    // https://pinia-colada.esm.dev/guide/queries.html
    const getTimeStamp = useQuery({
        key: () => ["getTimeStampPinia"],
        query: () => $fetch("/api/get-time-stamp")
    })

    const isEven = useMutation({
        // https://pinia-colada.esm.dev/guide/mutations.html
        mutation: async (number: string) => {
            await $fetch("/api/is-even", {
                method: "post",
                body: number,
            });
        },
    });

    return { getTimeStamp, isEven };
}
`;

const vueScriptExample = `import { useApi } from "../data/piniaColada";

// Query
import { useApi } from "~/data/piniaColada"
// import useQueryCache to refresh queries

const { getTimeStamp } = useApi();
const { data, error, isLoading, isPending, refetch, refresh } = getTimeStamp;
const queryCache = useQueryCache()

// Mutation
import { useApi } from "~/data/piniaColada"
const { isEven } = useApi();
const { mutate, status, reset } = isEven;

function submitIsEven() {
  mutate(inputValue.value);
}

`;
</script>

<template>
  <section class="my-4">
    <h3 class="text-xl mb-2">piniaColada.ts</h3>
    <ClientOnly>
      <highlightjs autodetect :code="tsqExample" class="mb-8" />
    </ClientOnly>
    <h3 class="text-xl mb-2">Usage</h3>
    <ClientOnly>
      <highlightjs autodetect :code="vueScriptExample" class="mb-8" />
    </ClientOnly>
  </section>
</template>
