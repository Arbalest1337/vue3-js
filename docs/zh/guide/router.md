# 路由

路由采用官方的[vue-router][vue-router]进行管理

为了便于权限管理，一般会将路由分为两类：

* 固定路由：从始至终不需要做权限判断，如login ，404等

  ```js
  // src/router/index/js
  const constantRoutes = [
      {
          path: '/login',
          name: '登录',
          meta: { hidden: true },
          component: () => import('@/views/Login/index.vue')
      }
  ]
  ```
* 权限路由：需要去做权限管理的业务功能模块，比如需要登陆后才可访问，或者特定用户才可访问

  权限路由应全部定义在src/route/modules/目录下，按照功能模块创建对应文件，因为它们是需要获取用户信息后异步加推至路由系统的，故需要与固定路由区分，且已由src/router/asyncRoutes.js统一导出

  ```js
  // src/router/modules/example.js
  export default [
      {
          path: '/example',
          component: () => import('@/layout/index.vue'),
          redirect: '/example/index',
          meta: { title: 'Example', icon: 'crawler' },
          children: [
              {
                  path: 'index',
                  name: 'Example',
                  component: () => import('@/views/Example/index.vue'),
                  meta: {
                      title: 'Example',
                      hidden: false,
                      breadcrumb: false
                  }
              }
          ]
      }
  ]
  ```

## 流程

现今前后端分离应用的主流用户凭证标准都是基于[JWT][JWT]（JSON WEB TOKEN）

落实到本项目采用的策略是：

* 用户打开浏览器进入本应用，此时全局的路由守卫处理用户的跳转请求：

1. 如果用户跳转的是白名单页，如login，则直接放行，无需判断用户是否登陆
2. 如果用户跳转非白名单页，则判断本地localStorage是否存有token，有则继续判断全局store是否已获取过用户信息，有用户信息则放行，无则使用现有token获取用户信息，并在获取用户信息后，根据后端约定将此用户权限可访问的路由数据维护起来存入store，便于后续跳转404的判断以及导航菜单的渲染。若本地localStorage并无token则重定向到login

* 用户进入login页面后，输入账号密码登录调取登录接口，获取接口返回的token，将token持久存储到本地浏览器的localStorage，后续所有请求headers携带token给后端，调取用户信息接口获取用户信息，维护并渲染可访问路由
* 由于每个请求都已携带token给后端，故当token失效或者过期时，只需与后端约定统一的错误码，即执行类似登录失效过期，引导用户重新登陆功能，这可以在请求封装的统一错误处理内实现

### 关键文件

src/store/user.js 用户信息状态管理

src/store/permission.js 用户权限可访问路由管理

src/router/guard.js  全局路由守卫

```js
const whiteList = ['/login']
router.beforeEach(async (to, from) => {
    const permissionStore = usePermissionStore()
    const userStore = useUserStore()

    // 如果白名单，直接放行
    if (whiteList.includes(to.path)) return

    // 本地有token
    if (userStore.token) {
        // 已有用户信息放行
        if (userStore.userInfo.id) return
        // 无用户信息时，拉取用户信息，并生成权限路由
        await userStore.getUserInfo()
        if (userStore.userInfo.id) {
            permissionStore.generateRoutes()
            return to.fullPath
        }
    }

    return '/login'
})
```

src/api/request.js   请求封装

[JWT]: https://jwt.io/
[vue-router]: https://router.vuejs.org/zh/
