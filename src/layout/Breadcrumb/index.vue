<template>
    <el-breadcrumb :separator-icon="ArrowRight">
        <TransitionGroup name="breadcrumb">
            <el-breadcrumb-item :key="item.path" v-for="item in routes">{{
                item.meta.title
            }}</el-breadcrumb-item>
        </TransitionGroup>
    </el-breadcrumb>
</template>
<script setup name="Breadcrumb">
import { ArrowRight } from '@element-plus/icons-vue'

const route = useRoute()
const routes = computed(() =>
    route.matched.filter(item => item.meta?.title && item.meta.breadcrumb !== false)
)
</script>
<style lang="scss" scoped>
$breadcrumb-color: #8f959e;

::v-deep(.el-breadcrumb__inner) {
    color: $breadcrumb-color !important;
}
::v-deep(.el-breadcrumb__separator) {
    color: $breadcrumb-color !important;
}
</style>
