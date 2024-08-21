import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import viteArbalest from 'vite-plugin-arbalest'

const serverConfig = {
    host: '0.0.0.0',
    open: true,
    proxy: {
        '/api': {
            target: 'http://10.0.0.164:1003',
            changeOrigin: true,
            rewrite: path => path.replace(/^\/api/, '')
        }
    }
}

export default defineConfig(({ command, mode }) => {
    console.log(`vite env: ${command} ${mode}`)
    return {
        plugins: [
            vue(),

            AutoImport({
                imports: ['vue', 'vue-router', 'pinia'],
                dirs: ['./src/utils', './src/hooks', './src/store'],
                resolvers: [
                    ElementPlusResolver({
                        importStyle: 'sass'
                    })
                ]
            }),
            Components({
                resolvers: [
                    ElementPlusResolver({
                        importStyle: 'sass'
                    })
                ]
            }),
            viteArbalest.default()
        ],
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src')
            }
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@use "@/theme/theme.scss" as *;`
                }
            }
        },
        server: {
            ...serverConfig
        },
        preview: {
            ...serverConfig
        }
    }
})
