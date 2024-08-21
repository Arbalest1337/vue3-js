import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

const initial = () => ({
    id: null,
    avatar: '',
    username: '',
    nickname: '',
    isAdmin: false
})

export const useUserStore = defineStore('user', () => {
    const token = useStorage('access_token', '')
    const userInfo = ref(initial())

    const login = async formData => {
        token.value = `Bearer ${'this is test Token!'}`
    }

    const getUserInfo = async () => {
        userInfo.value = {
            id: 1,
            avatar: '',
            username: 'admin',
            nickname: 'admin',
            isAdmin: true
        }
    }

    const logout = () => {
        token.value = null
        userInfo.value = initial()
    }

    return {
        token,
        userInfo,
        login,
        logout,
        getUserInfo
    }
})
