# 总览

## 技术栈

### 主要生产依赖

[vue][vue] 前端框架

[pinia][pinia]  状态管理

[vue-router][vue]  路由管理

[vueuse][vueuse]  vue常用hooks

[lodash][lodash]  js常用工具函数集

[axios][axios]  请求库

[ant-design-vue][ant-design-vue] 基础组件库

### 主要开发依赖

[vite][vite] 项目本地开发与构建工具

[typescript][typescript] Javascript的超集，提供了非运行时的静态类型检测

## src目录结构

```
├─api          请求封装（modules 目录下文件名对应功能或模块）
│  └─modules
├─assets       svg 图标，图片等资源文件
│  └─svg
├─components   公共组件
│  └─SvgIcon
├─config       全局配置，接口地址，常量字典等
├─directives   自定义指令
├─enum         ts枚举（modules 目录下文件名对应功能或模块）
│  └─modules
├─hooks        可抽象提取出的多处通用逻辑 (命名规范文件名前缀加 use)
├─layout       整体布局组件
│  ├─Breadcrumb
│  ├─Main
│  ├─Navbar
│  └─Sidebar
├─router       路由配置
│  └─modules
├─store        需要维护的全局状态
├─style        需要全局使用或覆盖的样式
├─theme        主题样式定制
├─utils        无关业务的工具纯函数
└─views        路由需匹配的页面组件（按路由层级划分）
    ├─404
    ├─Home
    └─Login
```

[vite]: https://cn.vitejs.dev/
[vue]: https://v3.cn.vuejs.org/
[ant-design-vue]: https://antdv.com/components/overview
[pinia]: https://pinia.vuejs.org/
[vue-router]: https://router.vuejs.org/zh/
[vueuse]: https://vueuse.org/
[lodash]: https://lodash.com/docs/4.17.15
[axios]: https://axios-http.com/
[vite]: https://cn.vitejs.dev/
[typescript]: https://www.typescriptlang.org/
