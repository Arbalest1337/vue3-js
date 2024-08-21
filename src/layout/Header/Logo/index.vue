<template>
    <div class="logo" @click="toggleSidebar">
        <img class="logo-icon" src="@/assets/images/logo_icon.png" />
        <img class="logo-text" src="@/assets/images/logo.png" />
    </div>
</template>
<script setup name="Logo">
import { useAppStore } from '@/store/app'
const { toggleSidebar } = useAppStore()
</script>
<style lang="scss" scoped>
.logo {
    flex: 0 0 240px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding-left: 16px;
    gap: 12px;
    .logo-icon {
        width: 24px;
    }
    .logo-text {
        width: 240px;
    }
}
</style>
