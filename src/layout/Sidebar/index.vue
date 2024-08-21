<template>
    <el-menu
        v-if="menu.length"
        :default-active="route.path"
        mode="vertical"
        :collapse="!appStore.sidebarOpened"
        class="el-menu-vertical"
        @select="onSelect"
    >
        <SidebarItem v-for="item in menu" :key="item.path" :item="item" :base-path="rootPath" />
    </el-menu>
</template>
<script setup name="Sidebar">
import SidebarItem from './SidebarItem.vue'
import { usePermissionStore } from '@/store/permission'
import { useAppStore } from '@/store/app'

const appStore = useAppStore()
const permissionStore = usePermissionStore()
const headerMenu = computed(() => permissionStore.headerMenu)
const headerMenuObject = computed(() =>
    Object.fromEntries(headerMenu.value.map(item => [item.path, item]))
)
const route = useRoute()
const rootPath = computed(() => route.matched[0].path)
const menu = computed(() => headerMenuObject.value[rootPath.value]?.children ?? [])

const router = useRouter()
const onSelect = path => {
    router.push(path)
}
</script>
<style lang="scss" scoped>
.el-menu-vertical:not(.el-menu--collapse) {
    width: 200px;
}
</style>
