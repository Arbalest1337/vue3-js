# Hooks

hooks的概念其实一开始源于react，主要指一些解耦并提取出的多处可复用逻辑，往往还会伴随着一些衍生状态。

vue3之前vue只有options api（选项式api），想要多个组件间复用逻辑，一般会使用mixin，但是mixin的缺点也十分明显，就是它的侵占性，它会覆盖一些原组件的同名属性或方法，使用时需要开发者多一份心智负担，并且也不够灵活。而随着vue3带来的composition api（组合式api）问世，才真正程度上解决了之前逻辑复用的痛点。

现在已经是4202年了，如果你的项目里含有重复的代码块达到三次（两次也许还能有斟酌的余地），那你就真的该好好反思一下了。

所以我们就需要去封装一些复用的东西，减少代码量的同时增加可维护性。

然而不是说所有的封装就应该归类到hooks里，以下是一个对ant-design-vue组件库-分页器的使用所封装的简单hooks

```js
// src/hooks/usePagination.js  文件命名总是以use作为前缀
const usePagination = (callback, extraOptions = {}) => {
    const pageNum = ref(1)
    const pageSize = ref(10)
    const total = ref(0)

    const pagination = reactive({
        total,
        pageNum,
        pageSize,
        pageSizeOptions: ['10', '20', '50', '100'],
        showSizeChanger: true,
        showTotal: total => `共${total}项数据`,
        onChange: (newPageNum, newPageSize) => {
            pageNum.value = newPageNum
            pageSize.value = newPageSize
            callback?.()
        },
        ...extraOptions
    })

    return {
        pageNum,
        pageSize,
        total,
        pagination
    }
}

export default usePagination
```

外部使用时

```js
// antdv table组件内集成了分页器故传入相应配置即可
<template>
    <a-table :pagination="pagination" />
</template>

<script setup>
import usePagination from '@/hooks/usePagination'

const {
    pagination,
    pageNum,
    pageSize
} = usePagination(() => {
    query() // 每当用户更改页码，每页条数时需要触发的回调，一般都是调查询接口的方法
})

</script>
```

分页器基本上每个列表页都会用到，如果你每个页面都自己重复地去创建去维护这些页码，每页多少条，总数的相关状态，那将会出现很多重复冗余的代码。

虽然这个例子其实也没有什么业务逻辑，只是返回了一些相应的默认配置，但也是一个很好的hooks使用场景，即你有一些复用的逻辑同时伴随着一些需要维护的状态。

再举个例子，比如一些大屏项目需要按照用户视口等比缩放适配，那就可以写一个通用的缩放scale hooks，他需要实现的是监听窗口的resize事件，始终返回当前视口相对于目标设计的缩放比例，并在卸载时能自动清除监听事件，同时了防止频繁触发的性能浪费，需要加上防抖处理，综上实现起来差不多就如下所示

```js
import { watchEffect } from 'vue'
import { debounce } from 'lodash-es'

export const useScale = () => {
    const W = 5120
    const H = 2160
    const scale = reactive({
        x: 1,
        y: 1
    })

    const update = debounce(() => {
        const { innerWidth, innerHeight } = window
        scale.x = innerWidth / W
        scale.y = innerHeight / H
    }, 200)

    watchEffect(onCleanup => {
        update()
        window.addEventListener('resize', update)
        onCleanup(() => {
            window.removeEventListener('resize', update)
        })
    })

    return {
        scale
    }
}
```

如果你只有复用逻辑，没有衍生状态或任何副作用，那么你说的应该是归类到utils目录里的工具纯函数（比如一些正则校验等）。

弄清楚hooks还是工具纯函数的区别十分重要。
