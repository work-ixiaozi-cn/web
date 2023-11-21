<template>
    <el-menu
        class="h-48px !border-none"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        ellipsis="true"
        router
    >
        <el-menu-item index="/">我的手机</el-menu-item>
        <el-sub-menu index="/php">
            <template #title>PHP</template>
            <el-menu-item index="/php/phpinfo.php">phpinfo</el-menu-item>
            <el-menu-item index="/php/prober.php">prober</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="/mysql">
            <template #title>MySQL</template>
            <el-menu-item index="/mysql/phpmyadmin/">phpmyadmin</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="/tool">
            <template #title>站长工具</template>
            <el-menu-item index="/tool/ip/">ip</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="/develop">
            <template #title>开发工具</template>
            <el-menu-item index="/develop/json/">json</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/note">笔记</el-menu-item>
        <!-- <el-menu-item index="3" disabled>Info</el-menu-item> -->
    </el-menu>
</template>

<script setup lang="ts">
    // const open = (url: string) => window.open(url);

</script>

<style scoped>
    
</style>
  