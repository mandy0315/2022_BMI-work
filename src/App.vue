<template>
  <h1 class="text-center py-[10px] text-[24px]">vue3 + vite</h1>
  <hello-world></hello-world>
</template>
<script>
import { database } from "/src/utils/firebaseConfig";
export default {
  setup() {
    console.log(database);
    return {};
  },
};
</script>
