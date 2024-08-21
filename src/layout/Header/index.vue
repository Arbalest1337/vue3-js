<template>
    <div class="header">
        <Logo />
        <Navbar />
        <Dropdown class="dropdown" />
    </div>
</template>
<script setup name="Header">
import Logo from './Logo/index.vue'
import Navbar from './Navbar/index.vue'
import Dropdown from './Dropdown/index.vue'
</script>
<style lang="scss" scoped>
.header {
    display: flex;
    align-items: center;
    gap: 80px;
}
.dropdown {
    margin-left: auto;
}
</style>
