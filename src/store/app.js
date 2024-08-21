import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useAppStore = defineStore('app', () => {
    const sidebarOpened = useStorage('sidebarOpened', true)

    const toggleSidebar = () => {
        sidebarOpened.value = !sidebarOpened.value
    }

    return {
        sidebarOpened,
        toggleSidebar
    }
})
