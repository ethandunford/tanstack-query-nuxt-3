
<template>
  <section class="grid grid-cols-4 gap-4 w-full">
    <div><span class="font-bold">TimeStamp:</span> {{ timestamp }}</div>
    <div><span class="font-bold">Previous TimeStamp:</span> {{ previousTimeStamp }}</div>
    <div><span class="font-bold">Matches:</span> {{ compTimeMatches }} </div>
    <div>
      <button
          type="button"
          class="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-800 rounded-md text-center mr-4"
          @click="handleRefresh(false)"
      >
        Refresh
      </button>
      <button
          type="button"
          class="px-5 py-2.5 text-sm font-medium text-white rounded-md text-center"
          :disabled="disableInvalidateBtn"
          :class="[ disableInvalidateBtn ? 'bg-gray-200 text-black cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-800']"
          @click="handleRefresh(true)"
      >Invalidate
      </button>
    </div>
  </section>
</template>
<script setup lang="ts">

import {computed} from "vue";

const props = defineProps<{ timestamp: string | undefined; disableInvalidateBtn: boolean, }>()
const emit = defineEmits<{ (e: "refresh", value: boolean): void; }>()

const previousTimeStamp = ref<string | undefined>(undefined)

const compTimeMatches = computed(() => {
  if (previousTimeStamp.value === undefined) return
  return props.timestamp === previousTimeStamp.value ? "✔️" : "❌"
});

const handleRefresh = (invalidate: boolean) => {
    previousTimeStamp.value = props.timestamp
    emit('refresh', invalidate)
}

</script>