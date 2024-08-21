# 布局组件Layout

一般后台项目都会有一个固定的整体布局，有侧边栏、头部导航、内容区、面包屑等等。布局一般来说与业务是无关的，且是针对项目定制的，故将布局组件提出并维护在src/layout目录内，便于更改定制。

内部实现使用了一些vue的过渡效果组件，同时在Main组件内还设置了keep-alive方案以缓存页面状态，sidebar根据用户权限动态渲染可访问菜单等等，具体实现可自行翻阅

```
├─layout        整体布局组件
│  ├─Breadcrumb 面包屑
│  ├─Main       内容区
│  ├─Navbar     头部导航栏
│  └─Sidebar    侧边导航栏
```

## Main

因为使用了transition过渡效果组件，所以src/views/ 目录下所有的页面组件都应有且只有一个根节点（react里这甚至是硬性要求），否则无法正常过渡渲染。

而对于页面状态的缓存，可以根据实际项目需要制定，最简单的做法就是直接在缓存列表内列出需要缓存的页面，更高级或是需要动态配置的场景，可以将此缓存数组提升为store做状态管理

```vue
<template>
    <div class="main">
        <router-view v-slot="{ Component, route }">
            <transition :name="`${route.meta.transition ?? 'layout'}`" mode="out-in">
                <keep-alive :include="keepAlive">
                    <component
                        :is="Component"
                        :key="route.meta.usePathKey ? route.path : undefined"
                    />
                </keep-alive>
            </transition>
        </router-view>
    </div>
</template>

<script setup name="Main">
const keepAlive = ref(['Home'])
</script>
```
