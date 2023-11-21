<template>
    <iframe class="w-full" style="height: calc(100vh - 48px)" :src="`/${state.name}`" frameborder="0"></iframe>
</template>

<script lang="ts" setup>
import { reactive, onBeforeMount, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const state = reactive({
  name: route.params.name
});
    console.log(route);

onBeforeMount(() => {
  watch(() => route.params.name, (newName) => {
    console.log(route, newName);
    
    state.name = newName;
  });
});
</script>

<style scoped>

</style>