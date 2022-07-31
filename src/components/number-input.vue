<template>
  <div class="mb-2">
    <p class="text-c-yellow text-lg">{{ props.title }}</p>
    <input
      type="number"
      :placeholder="props.placeholder"
      v-model.lazy="fillNumber"
      class="border-c-yellow border-solid rounded bg-gray-500 border-2 text-white py-1 px-2"
    />
  </div>
</template>
<script setup>
import { computed } from "vue";
const emit = defineEmits(["update:value"]);
const props = defineProps({
  title: String,
  placeholder: String,
  value: Number,
});

const fillNumber = computed({
  get: () => props.value,
  set: (val) => {
    emit("update:value", val);
  },
});
</script>
