<template>
    <div class="page">
        <!-- 页头 -->
        <Title style="margin-left: 20px" v-if="page.title" :title="page.title" />
        <!-- 内页带返回页头 -->
        <BackTitle
            v-if="page.backTitle"
            :title="page.backTitle"
            :onBackTitleClick="page.onBackTitleClick"
        />

        <div class="page-content">
            <slot />

            <!-- 筛选 -->
            <Filterer v-if="page.filterer" :filterer="page.filterer">
                <!-- 筛选项插槽 -->
                <template #filtererItem="item">
                    <slot name="filtererItem" v-bind="item" />
                </template>
                <template #filtererExtraActions>
                    <slot name="filtererExtraActions" />
                </template>
            </Filterer>

            <!-- 数据表格 -->
            <Table v-if="page.table" :table="page.table">
                <!-- 表格头部操作插槽 -->
                <Title
                    v-if="page.table?.title !== false || $slots.tableActions"
                    :title="page.table?.title ?? '数据列表'"
                >
                    <template #titleActions>
                        <slot name="tableActions" />
                    </template>
                </Title>
                <!-- 表格项插槽 -->
                <template #tableItem="scope">
                    <slot name="tableItem" v-bind="scope" />
                </template>
            </Table>
            <!-- 分页器 -->
            <Pagination v-if="page.pagination" :pagination="page.pagination" />
        </div>
        <slot name="footer"> </slot>
    </div>
</template>
<script setup name="Page">
import Title from './Title/index.vue'
import BackTitle from './BackTitle/index.vue'
import Filterer from './Filterer/index.vue'
import Table from './Table/index.vue'
import Pagination from './Pagination/index.vue'
const props = defineProps({
    page: {
        type: Object,
        default: () => ({})
    }
})
</script>
<style lang="scss" scoped>
.page {
    background: #fff;
    border-radius: 6px 6px 6px 6px;
    height: 100%;
}
.page-content {
    padding: 0 20px;
    box-sizing: border-box;
}
</style>
