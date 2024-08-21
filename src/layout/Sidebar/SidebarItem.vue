<template>
    <template v-if="item?.children?.length">
        <el-sub-menu :index="basePath" :isActive="true">
            <template #title>
                <el-icon><SvgIcon :name="item.meta.icon" v-if="item?.meta?.icon" /></el-icon>
                <span>{{ item.meta.title }}</span>
            </template>
            <SidebarItem
                v-for="child in item.children"
                :key="child.path"
                :item="child"
                :base-path="resolvePath(item.path)"
            />
        </el-sub-menu>
    </template>

    <el-menu-item v-else :index="resolvePath(item.path)">
        <el-icon v-if="item?.meta?.icon"><SvgIcon :name="item.meta.icon" /></el-icon>
        {{ item.meta.title }}
    </el-menu-item>
</template>
<script setup name="SidebarItem">
const props = defineProps({
    item: {
        type: Object,
        required: true
    },
    basePath: {
        type: String,
        required: true
    }
})

const resolvePath = path => `${props.basePath}/${path}`.replace(/\/+/g, '/')
</script>
<style lang="scss" scoped></style>
