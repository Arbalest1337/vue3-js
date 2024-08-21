import request from '@/api/request'
export default {
    login: data =>
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
