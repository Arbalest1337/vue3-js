<template>
    <div class="title" :class="{ hasTitle: title }">
        <span class="text">{{ title }}</span>
        <div class="actions">
            <slot name="titleActions" />
        </div>
    </div>
</template>
<script setup name="Title">
const props = defineProps({
    title: {
        type: String,
        default: ''
    }
})
</script>
<style lang="scss" scoped>
.title {
    padding: 16px 0 20px 0;
    box-sizing: border-box;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: space-between;

    &.hasTitle::before {
        content: '';
        position: absolute;
        left: -20px;
        top: 50%;
        transform: translateY(-50%);
        width: 3px;
        height: 14px;
        background: $primary-color;
    }
    .text {
        font-size: 16px;
        line-height: 16px;
        font-weight: bold;
        color: $font-color;
    }
    .actions {
        margin-left: auto;
        display: flex;
        justify-content: right;
        align-items: center;
        gap: 20px;
        ::v-deep(.el-button) {
            margin: 0;
        }
    }
}
</style>
