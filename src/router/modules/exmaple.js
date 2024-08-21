export default [
    {
        path: '/example',
        name: 'Example',
        component: () => import('@/layout/index.vue'),
        meta: { title: '示例' },
        children: [
            {
                path: 'components',
                meta: {
                    title: '组件',
                    icon: 'crawler'
                },
                children: [
                    {
                        path: 'page',
                        name: 'Page',
                        component: () => import('@/views/Example/Page/index.vue'),
                        meta: {
                            title: '列表页封装'
                        }
                    }
                ]
            }
        ]
    }
]
