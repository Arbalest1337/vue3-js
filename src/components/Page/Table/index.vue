<template>
    <div class="page-table">
        <slot />
        <el-table
            :ref="e => (table.ref = e)"
            v-loading="table?.loading"
            @sort-change="table?.onSortChange"
            @selection-change="table.onSelectionChange"
            :row-key="table?.rowKey"
            :data="table?.data ?? []"
            :header-cell-style="style.header"
            :cell-style="style.cell"
            v-bind="{ ...(table.bind ?? {}) }"
        >
            <template
                v-for="item in table.options.filter(item => item?.hidden !== true)"
                :key="item.prop"
            >
                <el-table-column
                    v-if="(item.type && item.type !== 'expand') || item.formatter"
                    v-bind="item"
                    show-overflow-tooltip
                />
                <el-table-column v-else-if="item.type === 'expand'" v-bind="item">
                    <template #default="scope">
                        <slot name="expand" v-bind="scope" />
                    </template>
                </el-table-column>
                <el-table-column
                    v-else
                    v-bind="item"
                    :show-overflow-tooltip="!['操作'].includes(item.label)"
                >
                    <template #default="scope">
                        <slot name="tableItem" v-bind="scope">
                            {{ scope.row[item.prop] }}
                        </slot>
                    </template>
                </el-table-column>
            </template>
            <template #empty>
                <el-empty description="暂无数据" />
            </template>
        </el-table>
    </div>
</template>
<script setup name="Table">
const props = defineProps({
    table: {
        type: Object,
        default: () => ({
            data: [],
            options: []
        })
    }
})
const style = {
    header: {
        textAlign: 'center',
        color: '#666666',
        background: '#F1F7FC'
    },
    cell: {
        textAlign: 'center',
        color: '#171717'
    }
}
</script>
<style lang="scss" scoped>
.el-table {
    width: 100%;
}
</style>
