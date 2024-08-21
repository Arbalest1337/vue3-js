<template>
    <div class="pagination">
        <div class="total">共有 {{ pagination.total }} 条内容</div>
        <el-pagination
            size="small"
            :background="true"
            :total="pagination.total"
            :page-sizes="[10, 20, 50, 100]"
            layout="sizes,prev,pager,next"
            v-model:page-size="pagination.pageSize"
            v-model:current-page="pagination.pageNum"
            v-bind="{ ...(pagination ?? {}) }"
            @currentChange="pagination?.onPageChange"
            @sizeChange="pagination?.onSizeChange"
        />
    </div>
</template>
<script setup name="Pagination">
const props = defineProps({
    pagination: {
        type: Object,
        default: () => ({})
    }
})
</script>
<style lang="scss" scoped>
.pagination {
    display: flex;
    justify-content: left;
    padding: 20px 0;
    box-sizing: border-box;
    width: 100%;
    align-items: center;
    .total {
        font-size: 14px !important;
        color: #999;
        margin-right: calc(50% - 250px);
        flex: 0 0 100px;
    }
}

::v-deep(.el-select__placeholder) {
    font-size: 14px !important;
    color: #999;
}
</style>
