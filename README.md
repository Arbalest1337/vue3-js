# PC Baseline

基于vite5 vue3为核心构建的PC前端基线版本，开发人员建议手动查阅docs目录下碎片文档，或使用命令 npm run docs 启动本地文档服务以完整阅读

需要node版本>=20

```cmd
// 安装依赖
npm install

// 启动文档服务
npm run docs

// 本地开发启动本地服务
npm run dev

// 构建打包
npm run build 
```

# Node版本控制

由于公司既存项目基于早期node版本，众多开源依赖早已不再维护，无法适配新版本node，并且截至2024.6.3，除node 18 及 20 以上版本外，其余node版本已不再维护，本框架也是基于目前node长期维护版本20集成。

简单来说就是旧依赖无法适配新node版本，新依赖无法适配旧node版本，所以在平日工作中，需要针对新老项目方便迅速地切换本地node版本。

### 先卸载本地node 后下载安装 [nvm-windows ][nvm-windows]

```cmd
// 安装 node 20 版本
nvm install 20

// 安装 node 14 版本
nvm install 14

// 查看目前本机nvm可用node副本
nvm list

// 切换node版本20
nvm use 20

// 切换node版本14
nvm use 14

```

[nvm-windows]: https://github.com/coreybutler/nvm-windows/releases
