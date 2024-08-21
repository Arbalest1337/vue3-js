import { defineConfig } from 'vitepress'

export default defineConfig({
    title: '架构实现及规范文档',
    i18nRouting: true,
    locales: {
        root: {
            label: 'English',
            lang: 'en'
        },
        zh: {
            label: '中文'
        }
    },
    themeConfig: {
        home: { text: '', link: '/' },
        nav: [
            { text: '文档', link: '/zh/guide/total' },
            { text: '开发工具', link: '/zh/dev/node' }
        ],
        sidebar: [
            {
                text: '文档',
                items: [
                    { text: '总览', link: '/' },
                    { text: '组件', link: '/zh/guide/components' },
                    { text: '样式', link: '/zh/guide/style' },
                    { text: '资源管理', link: '/zh/guide/assets' },
                    { text: '布局', link: '/zh/guide/layout' },
                    { text: '路由', link: '/zh/guide/router' },
                    { text: '请求', link: '/zh/guide/request' },
                    { text: '状态管理', link: '/zh/guide/state' },
                    { text: 'typescript', link: '/zh/guide/typescript' },
                    { text: 'hooks', link: '/zh/guide/hooks' },
                    { text: '风格规范', link: '/zh/guide/specification' },
                    { text: '本地开发', link: '/zh/guide/develop' }
                ]
            },
            {
                text: '开发工具',
                items: [
                    { text: 'node版本控制', link: '/zh/dev/node' },
                    { text: 'chrome插件', link: '/zh/dev/chrome' },
                    { text: 'vscode插件', link: '/zh/dev/vscode' }
                ]
            },
            {
                text: '其它',
                items: [{ text: '关于本文档', link: '/zh/other/about' }]
            }
        ],
        lastUpdated: {
            text: 'Updated at',
            formatOptions: {
                dateStyle: 'full',
                timeStyle: 'medium'
            }
        }
    },
    vite: {
        server: {
            host: '0.0.0.0',
            open: true
        }
    }
})
