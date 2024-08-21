# 本地开发

## server

提到前后端分离项目就离不开跨域，本地开发时，无论你使用的构建开发工具是webpack，vite或其他，他们的原理其实都是使用express启动了一个本地服务，并设置了代理以此来规避跨域。

一般开发只要按照[配置项][配置项]设置相关代理即可，这里的target无论在任何分支都应该指向测试地址，如果是本地开发临时链接后端的本地地址，那变更也应只存在于你本地分支，不要提交到公共分支

```js
// vite.config.js
const serverConfig = {
    port: 8080,
    open: true,
    proxy: {
        '/api': {
            target: '', 
            changeOrigin: true,
            rewrite: path => path.replace(/^\/api/, '')
        }
    }
}
```

## 环境变量

比如设置完代理后，也要查看占位匹配符是否对应（比如上面为'/api'）

定义环境变量

```js
 // src/config/index.js
const env = import.meta.env.MODE

const config = {
    // 开发环境的变量对象
    development: {
        baseUrl: '/api' // 本地开发服务器跨域代理占位符
    },
    // 生产环境的变量对象
    production: {
        baseUrl: '' // 打包生产环境时运维需要配置于如nginx上的代理占位符 是否需要需与运维沟通
    }
}

export default {
    ...config[env]
}
```

消费环境变量场景（如请求封装的基础路径）

```js
// src/api/request.js
import config from '@/config'

const service = axios.create({
        baseURL: config.baseUrl,
        timeout: 15 * 1000
    })
```

环境变量并没有使用官方提供的各环境后缀文件的形式，因为其使用并不是很方便灵活，且数据格式受到限制。

故统一于config/index.js文件内 使用js 通过对运行时环境的判断导出不同环境所需要使用的变量，可根据实际项目需求自行添加

[配置项]: https://cn.vitejs.dev/config/server-options.html
