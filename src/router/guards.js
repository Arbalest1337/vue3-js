import router from '@/router'
import { usePermissionStore } from '@/store/permission'
import { useUserStore } from '@/store/user'

const whiteList = ['/login']
router.beforeEach(async (to, from) => {
    const permissionStore = usePermissionStore()
    const userStore = useUserStore()

    // 如果白名单，直接放行
    if (whiteList.includes(to.path)) return

    // 本地有token
    if (userStore.token) {
        // 已有用户信息放行
        if (userStore.userInfo.id) return
        // 无用户信息时，拉取用户信息，并生成权限路由
        await userStore.getUserInfo()
        if (userStore.userInfo.id) {
            permissionStore.generateRoutes()
            return to.fullPath
        }
    }

    return '/login'
})
