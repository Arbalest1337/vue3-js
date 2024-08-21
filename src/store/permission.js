import { defineStore } from 'pinia'
import { constantRoutes, NotFound } from '@/router'
import asyncRoutesMap from '@/router/asyncRoutes'

export const usePermissionStore = defineStore('permission', () => {
    const routes = ref([])
    const dynamicRoutes = ref([])
    const headerMenu = computed(() => filterOutHiddenRoute(dynamicRoutes.value))
    const sideMenu = ref([])

    const filterOutHiddenRoute = routes => {
        let result = routes.filter(item => !item?.meta?.hidden === true)
        result = result.map(item => ({
            ...item,
            children: item?.children?.length ? filterOutHiddenRoute(item.children) : []
        }))
        return result
    }

    const router = useRouter()
    const generateRoutes = () => {
        const addRoutes = Object.values(asyncRoutesMap).flat()
        dynamicRoutes.value = addRoutes
        routes.value = [...constantRoutes, ...addRoutes, NotFound]
        routes.value.forEach(route => router.addRoute(route))
    }

    return {
        routes,
        dynamicRoutes,
        headerMenu,
        sideMenu,
        generateRoutes
    }
})
