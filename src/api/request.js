import config from '@/config'
import { camelToSnake, snakeToCamel } from '@/utils/convert'
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from 'axios'
import router from '@/router'
import { useUserStore } from '@/store/user'

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

const errorHandle = (code, message) => {
    if ([401].includes(code)) {
        removeAllCanceler
        useUserStore().logout()
        ElMessageBox.confirm('登陆失效，请重新登录', '登录失效', {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'warning'
        }).finally(() => {
            if (router.currentRoute.value.path !== '/login') {
                router.replace('/login')
            }
        })
    } else {
        ElMessage.error(message || '请求失败，请检查网络')
    }
}

const request = cfg => {
    const extendedCfg = {
        needToken: true,
        requestToSnake: true,
        responseToCamel: true,
        ...cfg
    }

    const service = axios.create({
        baseURL: config.baseUrl,
        timeout: 15 * 1000
    })

    service.interceptors.request.use(
        config => {
            config.cancelToken = createCanceler(config)
            if (extendedCfg.needToken) {
                config.headers = {
                    ...config.headers,
                    ['Authorization']: useUserStore().token
                }
            }
            if (extendedCfg.requestToSnake) {
                config.data = camelToSnake(config.data)
                config.params = camelToSnake(config.params)
            }
            return config
        },
        error => {
            return Promise.reject(error)
        }
    )

    service.interceptors.response.use(
        response => {
            const { 'content-type': contentType } = response.headers
            if (contentType.includes('json')) {
                const { code, data, msg: message } = response.data
                if (code !== 200) {
                    errorHandle(code, message)
                    return Promise.reject(response.data)
                }
                return Promise.resolve(extendedCfg.responseToCamel ? snakeToCamel(data) : data)
            }
            return Promise.resolve({
                message: 'other response',
                data: response.data
            })
        },
        error => {
            if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
                errorHandle(408, '请求超时')
            } else if (error?.response) {
                const { status, data } = error.response
                errorHandle(status, data?.message)
            }
            return Promise.reject(error)
        }
    )
    return service(cfg)
}

export default request
