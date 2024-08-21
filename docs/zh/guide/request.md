# 请求

请求基于[axios][axios]封装  具体实现见src/api/request.js

这里列出几个主要的封装点：

* 请求拦截器
* 响应拦截器
* 统一错误处理
* 请求取消令牌

## 请求拦截器

```js
service.interceptors.request.use(
        config => {
            config.cancelToken = createCanceler(config) // 注册请求的取消令牌
            if (extendedCfg.needToken) { // 携带JWT
                config.headers = {
                    ...config.headers,
                    ['Authorization']: useUserStore().token
                }
            }
            if (extendedCfg.requestToSnake) { // 请求参数驼峰转下划线
                config.data = camelToSnake(config.data)
                config.params = camelToSnake(config.params)
            }
            return config
        },
        error => {
            return Promise.reject(error)
        }
    )
```

## 响应拦截器

```js
service.interceptors.response.use(
        response => {
            const { 'content-type': contentType } = response.headers
            if (contentType.includes('json')) { // 是json响应
                const { code, data, msg: message } = response.data
                if (code !== 200) { // 请求物理成功，但是基于后端逻辑上失败
                    errorHandle(code, message)
                    return Promise.reject(response.data)
                }
                // 成功处理 响应数据下划线转驼峰
                return Promise.resolve(extendedCfg.responseToCamel ? snakeToCamel(data) : data)
            }
            return Promise.resolve({ // 不是json响应不做处理原样返回
                message: 'other response',
                data: response.data
            })
        },
        error => {
            // 请求物理失败处理
            if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
                errorHandle(408, '请求超时')
            } else if (error?.response) {
                const { status, data } = error.response
                errorHandle(status, data?.message)
            }
            return Promise.reject(error)
        }
    )
```

## 请求取消令牌

试想下用户很久没有使用系统，此时登陆凭证过期失效，用户打开一个页面，在此页面上你同时调取数个后端接口，如果你不做处理，是不是也会跳出数个请求错误或是登陆失效的提示弹框，这也许会造成不多的资源浪费，但对用户体验来说是极其不好的，所以就需要一种机制，在第一个请求知悉用户登陆失效后，拦截并取消剩余已发出的请求。

```js
const cancelerMap = new Map()
const createCanceler = config => {
    return new axios.CancelToken(cancel => {
        const flag = `${config.method}&${config.url}&${new Date().getTime()}`
        cancelerMap.set(flag, cancel)
    })
}
const removeAllCanceler = () => {
    cancelerMap.forEach(item => item())
    cancelerMap.clear()
}
```


## 统一错误处理

```js
const errorHandle = (code, message) => {
    if ([401].includes(code)) { 
        removeAllCanceler 
        useUserStore().logout()
        AntdvModal.warning({
            title: '登录失效',
            content: '登陆失效，请重新登录',
            onOk: () => {
                if (router.currentRoute.value.path !== '/login') {
                    router.replace('/login')
                }
            }
        })
    } else {
        AntdvMessage.error(message || '请求失败，请检查网络')
    }
}
```

## 接口调用

接口统一定义在src/api/modules/目录下，按功能模块自建对应文件，内部已处理自动导出

```js
// src/api/modules/user.js
import request from '@/api/request'
export default {
    login: (data) =>
        request({
            url: '/login',
            method: 'post',
            data,
            needToken: false
        }),

    info: () =>
        request({
            url: '/info',
            method: 'get'
        })
}

```

使用

```js
import apiBus from '@/api'

const getUserInfo = async ()=>{
    const res = await apiBus.user.info()
}
```

[axios]: https://axios-http.com/
