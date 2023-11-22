<template>
    <div>
        <header class="bg-nav">
            <Header class="container mx-auto" />
        </header>
        <main>
                <router-view />
            <!-- <el-watermark
                :width="130"
                :height="30"
                :zIndex="-1"
                image="https://element-plus.org/images/element-plus-logo.svg"
            > -->
            <!-- </el-watermark> -->
        </main>
    </div>
</template>

<script setup lang="ts">
    import Header from "./header.vue"
</script>

<style scoped>

</style>
  