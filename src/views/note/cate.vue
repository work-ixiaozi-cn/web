<template>
  <div>
    <section class="container mx-auto">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(cate, index) in note?.cates" :key="index"><a href="/">{{ cate.name }}</a></el-breadcrumb-item>
        <el-breadcrumb-item>{{ note?.title }}</el-breadcrumb-item>
      </el-breadcrumb>
    </section>
    <section class="container mx-auto">
      <h1 class="text-center">{{ note?.title }}</h1>
      <article v-html="note?.content" />
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount, watch } from 'vue';
import { useRoute } from 'vue-router';
import { getNote } from '@/apis';
import { Note } from '@/types';

const route = useRoute();
const note = ref<Note>();

const fetchNote = (id: number) => {
  getNote(id).then((res) => note.value = res.data.data)
}
fetchNote(parseInt(route.params.id as string))

onBeforeMount(() => {
  watch(() => route.params.id, (newId) => fetchNote(parseInt(newId as string)));
});
</script>

<style scoped></style>