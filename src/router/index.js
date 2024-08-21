import { createRouter, createWebHashHistory } from 'vue-router'

export const constantRoutes = [
    {
        path: '/login',
        name: 'Login',
        meta: { hidden: true },
        component: () => import('@/views/Login/index.vue')
    }
]

export const NotFound = {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    meta: { hidden: true },
    component: () => import('@/views/404/index.vue')
}

export const resetRouter = () =>
    createRouter({
        history: createWebHashHistory(),
        routes: constantRoutes
    })

const router = resetRouter()

export default router
