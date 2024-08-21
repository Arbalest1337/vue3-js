// 工作台
export default [
    {
        path: '/',
        name: 'WorkbenchLayout',
        redirect: '/workbench',
        component: () => import('@/layout/index.vue'),
        meta: { title: '工作台' },
        children: [
            {
                path: 'workbench',
                name: 'Workbench',
                component: () => import('@/views/Workbench/index.vue'),
                meta: { title: '工作台', hidden: true, breadcrumb: false }
            }
        ]
    }
]
