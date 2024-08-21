<template>
    <el-menu
        :ellipsis-icon="ArrowRight"
        :default-active="rootPath"
        class="nav"
        mode="horizontal"
        @select="handleSelect"
    >
        <template v-for="item in menu">
            <el-menu-item :index="item.path">{{ item.meta.title }}</el-menu-item>
        </template>
    </el-menu>
</template>
<script setup name="Navbar">
import { usePermissionStore } from '@/store/permission'
import { ArrowRight } from '@element-plus/icons-vue'

const permissionStore = usePermissionStore()
const menu = computed(() => permissionStore.headerMenu)
const router = useRouter()

const route = useRoute()
const rootPath = computed(() => route.matched[0].path)

const handleSelect = path => {
    router.push(path)
}
</script>
<style lang="scss" scoped>
.nav {
    flex: 1 0;
}
</style>
