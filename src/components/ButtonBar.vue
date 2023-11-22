<template>
  <el-button-group>
    <el-button class="w-120px !cursor-auto justify-end text-right" type="warning" disabled>{{ label }}</el-button>
    <el-tooltip content="点击复制，双击打开" v-if="url">
      <el-button type="primary" :icon="ChromeFilled" @click="click(() => copy(url as string))"
        @dblclick="dblclick(() => open(url as string))">
        <el-text :class="`w-${password ? 1 : 2 }50px text-gray-100 text-left`" truncated>
          {{ url }}
        </el-text>
      </el-button>
    </el-tooltip>
    <el-tooltip content="点击复制" v-if="account">
      <el-button type="primary" :icon="User" @click="copy(account)">
        <el-text class="w-80px text-gray-200 text-left" truncated>
          {{ account }}
        </el-text>
      </el-button>
    </el-tooltip>
    <el-tooltip content="点击复制" v-if="password">
      <el-button type="primary" :icon="Lock" @click="copy(password)">
        点击复制
        </el-button>
    </el-tooltip>
  </el-button-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// @ts-ignore
import { Clipboard } from "v-clipboard";
import {
  ChromeFilled,
  User,
  Lock,
} from '@element-plus/icons-vue'

defineProps<{ msg?: string; label?: string; url?: string; account?: string; password?: string; download?: string; }>()

const clickTimeout = ref<NodeJS.Timeout>();

const copy = (url: string) => {
  Clipboard.copy(url)
};
const open = (url: string) => {
  window.open(url)
};

const click = (fun: () => void) => {
  clickTimeout.value = setTimeout(() => {
    fun()
  }, 250);
};

const dblclick = (fun: () => void) => {
  clearTimeout(clickTimeout.value);
  fun()
};
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
