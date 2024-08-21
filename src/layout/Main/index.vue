<template>
    <div class="main">
        <router-view v-slot="{ Component, route }">
            <transition :name="'layout'" mode="out-in">
                <keep-alive :include="keepAlive">
                    <component :is="Component" :key="route.path ?? undefined" />
                </keep-alive>
            </transition>
        </router-view>
    </div>
</template>
<script setup name="Main">
const keepAlive = ref([])
</script>
<style lang="scss" scoped></style>
