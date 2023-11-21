<template>
  <div>
    <el-carousel class="h-300px">
      <el-carousel-item v-for="item in 4" :key="item" class="flex flex-col">
        <el-image :src="`/images/nav${item}.jpg`" />
      </el-carousel-item>
    </el-carousel>
    <section class="w-screen-sm mx-auto my-10px">
      <el-input
          v-model="searchInput"
          placeholder="Please input"
          size="large"
          @keyup.enter.native="searchClick"
          @keydown.tab.prevent="searchTab"
      >
        <template #prepend>
          <el-select
              v-model="searchSelect"
              class="w-130px"
              placeholder="Select"
              size="large">
            <el-option
                v-for="(item,key) in searchSelects"
                :key="key"
                :label="item.label"
                :value="key"/>
          </el-select>
        </template>
        <template #append>
          <el-button :icon="Search" @click="searchClick"/>
        </template>
      </el-input>
    </section>
    <section class="w-screen-xl mx-auto my-10px">
      <el-tabs tab-position="left">
        <el-tab-pane v-for="(items,key) in links" :key="key" :label="tabLabel(key.toString())"
                     class="grid grid-cols-2 justify-around">
          <ButtonBar
              v-for="(item, index) in items"
              :key="index"
              :account="item?.account"
              :label="item?.name"
              :password="item?.password"
              :url="item?.url"
              class=" my-10px block"
          />
        </el-tab-pane>
        <el-tab-pane class="grid grid-cols-2 justify-around">
          <template #label>
            <el-button size="small" type="primary">新增</el-button>
          </template>
          <el-form
              ref="linkFormRef"
              :model="linkForm"
              :rules="rules"
              label-position="right"
              label-width="100px"
              style="max-width: 460px"
          >
            <el-form-item label="Name">
              <el-input v-model="linkForm.name" />
            </el-form-item>
            <el-form-item label="Url">
              <el-input v-model="linkForm.url" />
            </el-form-item>
            <el-form-item label="Account">
              <el-input v-model="linkForm.account" />
            </el-form-item>
            <el-form-item label="Password">
              <el-input v-model="linkForm.password" />
            </el-form-item>
            <el-form-item>
              <el-button
                  type="primary"
                  @click="linkSubmit(linkFormRef)">
                Create
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </section>
  </div>
</template>

<script lang="ts" setup>
import ButtonBar from "@/components/ButtonBar.vue"
import {Search} from '@element-plus/icons-vue'
import {getLinkList, storeLink} from "@/apis"
import {ref, reactive} from "vue"
import {Link, ResponseLinkList} from "@/types";
import {ElMessage, FormInstance, FormRules} from "element-plus";

// 链接
const links = ref<ResponseLinkList[]>()

getLinkList().then(({data}) => links.value = data.data);
const tabLabel = (label: string) => {
  switch (label) {
    case 'account':
      return '账号';
    case 'link':
      return '链接';
    default:
  }
}

// 搜索
const searchSelects = {
  google: {
    label: 'Google',
    url: 'https://www.google.com'
  },
  baidu: {
    label: 'Baidu',
    url: 'https://www.baidu.com/s?wd=%s'
  },
  bing: {
    label: 'Bing',
    url: 'https://www.bing.com/search?q=%s'
  },
  github: {
    label: 'Github',
    url: 'https://github.com/search?q=%s'
  },
}
const searchSelect = ref(Object.keys(searchSelects)[0]);
const searchInput = ref('');
const searchClick = () => {
  // console.log(searchSelects[searchSelect.value].url);

  // @ts-ignore
  window.open(searchSelects[searchSelect.value].url?.replace('%s', searchInput.value))
}
const searchTab = () => {
  let current = Object.keys(searchSelects).indexOf(searchSelect.value)
  searchSelect.value = Object.keys(searchSelects)[current + 1 % Object.keys(searchSelects).length]
}

const linkFormRef = ref<FormInstance>();
const linkForm = reactive<Link>({
  name: '',
  url: '',
  account: '',
  password: '',
});
const rules = reactive<FormRules<Link>>({
  name: [
    {required: true, message: 'Please input Activity name', trigger: 'blur'},
    {min: 3, max: 64, message: 'Length should be 3 to 64', trigger: 'blur'},
  ],
})
const linkSubmit = async (form: FormInstance | undefined) => {
  if (!form) return
  await form?.validate((valid) => {
    if (!valid) return;
    storeLink(linkForm).then(res => {
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
      }, 1000)
    })
  })
}
</script>

<style scoped>

</style>