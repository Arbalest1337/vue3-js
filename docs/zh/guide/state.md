# 状态管理

自vue3起，官方的首推状态管理库已不再是vuex，而是[pinia][pinia]

以下是对于布局组件，左侧侧边导航栏打开/关闭状态的管理

```js
// src/store/app.js 
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

```

使用

```vue
<template>
    <a-layout-sider :collapsed="!appStore.sidebarOpened" class="sidebar">
        <Sidebar />
    </a-layout-sider>
</template>

<script setup>
import { useAppStore } from '@/store/app'
const appStore = useAppStore()
</script>
```

你会发现对比vuex，pinia最直观的区别就是没有之前的state，mutation，actions这些诸如组件的options api，而是基本与组合式api一致，其实官方两种方式皆可，只是为了一致的开发体验此处选用了后者。

## 什么时候需要状态管理

笼统而言就是当你存在一些程序运行期间需要提供给全局所使用的状态时。

典型的的例子就是整个应用的一些配置状态，用户信息，以及一些公共字典，并且需要保持它们的来源统一，保持同步。

关联到使用场景就很好理解，你有很多页面需要展示用户的名称或者需要用户其他信息去执行一些逻辑，那么你不应该每次用到的时候都去后端接口独自拉取一次数据，这会造成很多问题，性能资源上的浪费不谈，你的代码肯定会产生重复冗余，并且也无法做到全局的数据状态统一。

另一方面就是可能会存在一些固定的数据字典，你也不应该每次用到时去重复拉取，最好的做法是程序进入时整体拉一次，后续维护状态即可。

[pinia]: https://pinia.vuejs.org/
