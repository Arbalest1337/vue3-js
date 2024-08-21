<template>
    <div class="dropdown">
        <el-dropdown>
            <span class="dropdown-link">
                <SvgIcon style="font-size:32px; margin-right:12px;" name="user-avatar" />
                <span> {{ userStore.userInfo.username }} </span>
                <el-icon class="icon-right">
                    <arrow-down />
                </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>

        <el-icon class="message"><Bell /></el-icon>
    </div>
</template>
<script setup name="Dropdown">
import { ArrowDown, Bell, UserFilled } from '@element-plus/icons-vue'
import { useUserStore } from '@/store/user'
const userStore = useUserStore()
const router = useRouter()
const logout = () => {
    userStore.logout()
    router.push('/login')
}
</script>

<style lang="scss" scoped>
.dropdown {
    display: flex;
    align-items: center;
    gap: 24px;
    box-sizing: border-box;
    padding-right: 10px;
}
.dropdown-link {
    display: flex;
    cursor: pointer;
    align-items: center;
    .icon-user {
        color: #57b1e8;
        font-size: 18px;
        margin-right: 10px;
    }
    .icon-right {
        margin-left: 5px;
    }
}
.message {
    cursor: pointer;
    font-size: 18px;
}
</style>
