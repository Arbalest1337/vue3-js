const env = import.meta.env.MODE

const config = {
    development: {
        baseUrl: '/api'
    },
    production: {
        baseUrl: ''
    }
}

export default {
    ...config[env]
}
