<template>
  <div class="w-full">
    <el-form
        ref="noteFormRef"
        :model="noteForm"
        :rules="rules"
        label-width="100px"
    >
      <el-form-item label="分类">
        <el-cascader
            v-model="cateIds"
            :options="cates"
            :props="{value: 'id', label: 'title'}"
            @change="cateIdsChange"
        />
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="noteForm.title" class="w-400px"/>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <Toolbar
            :defaultConfig="toolbarConfig"
            :editor="editorRef"
            style="border-bottom: 1px solid #ccc"
        />
        <Editor
            v-model="noteForm.content"
            :defaultConfig="editorConfig"
            class="w-full !h-500px "
            style="overflow-y: hidden; "
            @onCreated="handleCreated"/>
      </el-form-item>
      <el-form-item>
        <el-button
            type="primary"
            @click="noteSubmit(noteFormRef)">
          Create
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import {onBeforeMount, onBeforeUnmount, onMounted, reactive, ref, shallowRef, watch} from 'vue'
// @ts-ignore
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'
import {getCate, storeNote} from '@/apis';
import {Cate, Note} from '@/types';
import {CascaderValue, ElMessage, type FormInstance, type FormRules} from 'element-plus';
import _ from 'lodash'

// 栏目
const cates = ref<Cate[]>()
getCate().then(res => cates.value = res.data.data)

// 表单
const noteFormRef = ref<FormInstance>();
const noteForm = reactive<Note>({
  cate_id: 0,
  title: '',
  content: '',
});
const rules = reactive<FormRules<Note>>({
  title: [
    {required: true, message: 'Please input Activity name', trigger: 'blur'},
    {min: 3, max: 64, message: 'Length should be 3 to 64', trigger: 'blur'},
  ],
})
const cateIds = ref<number[]>([]);
const cateIdsChange = (value: number[]) => {
  if (value.length) {
    // @ts-ignore
    noteForm.cate_id = _.last(value)
  }
}
const noteSubmit = async (form: FormInstance | undefined) => {
  if (!form) return
  await form?.validate((valid) => {
    if (!valid) return;
    storeNote(noteForm).then(res => {
      if (res.data.code != 0) {
        ElMessage({
          message: '添加失败',
          type: 'error',
        });
      }
      ElMessage({
        message: '添加成功',
        type: 'success',
      });
      setInterval(() => {
        form.resetFields();
        toggle.value = 'list';
      }, 1000)
    })
  })
}

const editorRef = shallowRef()
const valueHtml = ref('<p>hello</p>')
onMounted(() => {
  setTimeout(() => {
    valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
  }, 1500)
})
const toolbarConfig = {}
const editorConfig = {placeholder: '请输入内容...'}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

// @ts-ignore
const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
</script>

<style scoped></style>