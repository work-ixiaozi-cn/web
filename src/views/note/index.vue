<template>
  <div class="w-full">
    <el-table :data="noteList?.data" class="w-full mb-10px" stripe>
      <el-table-column type="index" width="60" align="right"/>
      <el-table-column>
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <router-link :to="`/note/${scope.row.id}`">{{ scope.row.title }}</router-link>
            <span style="margin-left: 10px">{{ scope.row.created_at }}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="flex">
<!--      <el-cascader-->
<!--          v-model="cateIds"-->
<!--          :options="cates"-->
<!--          :props="{value: 'id', label: 'title'}"-->
<!--          @change="cateIdsChange"-->
<!--      />-->
      <el-pagination
          :page-sizes="[10, 20, 30, 50]"
          :total="noteList?.total"
          background
          layout="total, sizes, prev, pager, next, jumper"
      />
    </div>

  </div>
</template>

<script lang="ts" setup>
import {onBeforeMount, ref, watch} from 'vue'
import {getCate, getNoteList} from '@/apis';
import {Cate, Note, PageParams, Paginate} from '@/types';
import {useRoute} from "vue-router";
import _ from "lodash";

const route = useRoute();
const noteList = ref<Paginate<Note>>()

const fetchNoteList = (params: PageParams) => {
  getNoteList(params).then(res => noteList.value = res.data.data)
}
fetchNoteList({page: parseInt(route.params.id as string)})
onBeforeMount(() => {
  watch(() => route.params.id, (newId) => fetchNoteList({page:parseInt(newId as string)}));
});

// 栏目
const cates = ref<Cate[]>()
getCate().then(res => cates.value = res.data.data)
// const cateIdsChange = (value: number[]) => {
//   if (value.length) {
//     // @ts-ignore
//     noteForm.cate_id = _.last(value)
//   }
// }
</script>

<style scoped></style>