# 资源管理

资源统一放置于 src/assets/ 目录下，按文件类别建立对应文件夹

## SVG

这里着重说一下SVG，之前有看到部分项目使用的阿里字体图标，每次更新一个图标，都要去重新生成整个字体文件目录再替换，合并冲突时也会有人误覆盖。使用时也要对应每个图标的类名，整体体验并不是很友好。

其实基础组件库本身都会带有一定量的[图标][图标]，参照设计，如果有能直接用的是最好不过了。

现在的做法是阿里图标导出时，文件类型选择svg，然后重命名svg文件放置于src/assets/svg目录下，然后使用SvgIcon组件，定义name为对应的svg文件名即可，内部已处理自动导出相关svg文件，具体实现可查看components/SvgIcon

SvgIcon使用

```vue
<template>
   <SvgIcon name="index" />  
</template>
```

## public

一般来说99%的情况下，项目使用的静态资源都应放置于assets目录内，经由打包编译器内部[优化处理][优化处理]，

但也会有极少情况下，比如一些体积较大的资源文件，音视频文件，或是一些古早项目需要使用的依赖，基于jq时代的产物等，因其并没有对应相关esm的npm依赖包，这些东西是完全不需要经由构建编译器去打包优化的，需要的仅是原封不动的静态引用，这些资源就应该放在根目录的public目录内。

[优化处理]: https://cn.vitejs.dev/guide/assets.html
[图标]: https://www.antdv.com/components/icon-cn