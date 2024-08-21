<template>
    <el-container class="layout">
        <el-header class="el-header"><Header /></el-header>
        <el-container class="layout-content">
            <el-aside class="el-aside"><Sidebar /></el-aside>
            <el-main class="el-main">
                <Breadcrumb class="breadcrumb" />
                <Main class="main" />
            </el-main>
        </el-container>
    </el-container>
</template>
<script setup name="Layout">
import Header from './Header/index.vue'
import Sidebar from './Sidebar/index.vue'
import Main from './Main/index.vue'
import Breadcrumb from './Breadcrumb/index.vue'
</script>
<style lang="scss" scoped>
.layout {
    height: 100vh;
    overflow: hidden;
}

.el-header {
    background: $layout-bg;
}

.layout-content {
    height: calc(100% - 60px);
}

.el-aside {
    width: auto;
    background: $layout-bg;
}

.el-main {
    box-sizing: border-box;
    background: $main-bg;
    padding: 0;
}

.breadcrumb {
    margin: 13px 20px;
    height: 14px;
}

.main {
    margin: 0 20px 20px;
    height: calc(100% - 40px - 20px);
    overflow-y: scroll;
}
</style>
