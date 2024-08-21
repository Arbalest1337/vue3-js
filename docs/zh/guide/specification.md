# 风格指南

### Clean Code

Clean Code是指代码本身很清楚，而且相关的资讯、概念、规则及程序是直觉上容易理解的，也就是在合理的时间，不用花非常多的心力即可以理解的程度。Clean code的好处是其本身是稳定、有效率的程式，在后续机能强化以及错误修正时，可以花比较少的时间。软件生命周期中，有80%都是维护期，因此这方面的影响很大。

以上是wiki百科对于Clean Code的解释，对自己有要求的开发者应将此作为长期的实践目标

## 命名规范

vue官方 [风格指南][风格指南]

代码可读性（包括且远不限于驼峰，英文命名，命名语义完整等）

```js
// 常量 统一大写
const NUM = 1

// 其余方法或变量都以小驼峰命名
const doSomething = () =>{
    console.log('do something')
}

// 业务代码尽量不出现下划线命名
const do_something=()=>{
    console.log('do not do this')
}

```

/utils 内已有驼峰下划线递归互转函数，并已集成进 api/request 封装默认开启，请求拦截时驼峰转下划线，响应拦截时下划线转为驼峰，以保证项目整体风格统一

```
requestToSnake: true
responseToCamel: true
```

### 解耦与可读性

vue3在options api的基础上推出了composition api（组合式api），options api虽然易用，但是一旦项目或者单一组件规模达到一定级别，你将无法很好的解耦，逻辑复用基于mixin也会有很多问题，但是现在可以基于组合式api十分方便的提取一些复用逻辑去写一些hooks，关于为什么要有组合式api以及它的优点可以阅读官方文档，此处只对于代码解耦，及可读性方面，结合组合式api给与一些建议。

试想一个非常常见的后台列表页，有着一些用弹框实现的CRUD Feature

```vue
// 不是很建议的做法

<template>
    <form>
       balabala含有数个筛选参数的表单
    </form>

    <table>
       balabala上百行column
    </table?
   
    // 新增弹框
    <dialog>
        balabala上百行
    </dialog>

    // 修改弹框
    <dialog>
        balabala上百行
    </dialog>

    // 详情弹框
    <dialog>
        balabala上百行
    </dialog>

<template>

<script setup>
// 筛选表单相关
const name = ref('')
const birthday= ref('')
//...此处省略数个筛选参数

// 表格相关 
const tableData = ref([])
const tableLoading = ref(false)

// 各弹框可见
const addDialogVisible = ref(false)
const editDialogVisible = ref(false)
const detailDialogVisible = ref(false)

// 以下全部省略
// 筛选表单的逻辑
// 表格相关的逻辑
// 新增与创建弹窗内部的数个表单参数
// 新增创建表单的提交验证逻辑
// 新增创建详情的接口逻辑

</script>
<style scope>
// 筛选，表格，三个弹框的全部样式
</style>

```

试想这样下去，即使对筛选，表格，弹框有一些很好的封装，这个单页面组件的代码行数也很容易就会突破四位数，一些需要命名的参数变量少说也有数十个，一些相似同名参数还要添加一些前缀来区别，这对于开发以及后续的维护体验是很十分差的，这还是建立在假设开发人员已经具备了一定的代码规范性，逻辑清晰明了的前提下，如果毫无规范，命名随意chinglish，乱码数字加拼音，逻辑冗余，再掺杂大量调试log，注释代码不及时清除，那么对于后续维护人员来说可谓是地狱般的存在

```vue

// 推荐的做法
<template>
    // 通用的查询筛选组件
   <Filter :settings="filter.settings"  v-model="filter.data"/>

    // 通用的展示表格组件
   <Table :data="table.data" :columns="table.columns" :loading="table.loading"/>

    // 业务专属的新增弹框组件
   <AddDialog :visible="add.visible" />

    // 业务专属的编辑弹框组件
   <EditDialog :visible="edit.visible" :id="edit.id"/>

   // 业务专属的详情弹框组件
   <DetailDialog :visible="detail.visible" :id="detail.id" />
</template>

<script setup>
import Filter from '@/components/Filter/index.vue'  // 与业务无关的通用组件
import Table from '@/components/Table/index.vue  // 与业务无关的通用组件
import AddDialog from './AddDialog.vue'  // 与业务相关的业务组件
import EditDialog from './EditDialog.vue'  // 与业务相关的业务组件
import DetailDialog from './DetailDialog'  // 与业务相关的业务组件

const filter = reactive({
    data:{},
    settings:[] 
})
// 省略筛选器相关函数

const table = reactive({
    data:[],
    columns:[], 
    loading:false
})
// 省略数据查询相关函数

const add = reactive({
    visible:false
})
// 新增作为一个独立的弹框组件，只需控制显示与否，逻辑内部自行维护

const edit = reactive({
    id:null,
    visible:false
})
// 编辑作为一个独立的弹框组件，需控制显示，以及编辑项id，逻辑内部自行维护

const add = reactive({
    id:null
    visible:false
})
// 查看作为一个独立的弹框组件，需控制显示，及查看项id，逻辑内部自行维护

</script>
```

以上所示只是一个非常简单的例子，实际情况要复杂更多。

# Git

## branch

多人协作时，为避免多人对同一分支的修改提交产生冲突，当针对一个阶段性新需求开发时，新建特性分支并在之上开发。

目前开发基本都在dev分支，那么开发新需求时可以从dev分支创建一个对应的新分支进行独立开发，开发完成后再merge到dev分支

```cmd
// 拉取dev分支最新代码
git pull origin dev

// 创建新分支
git checkout -b feat/update-userinfo

// 此处省略add、commit步骤

// 开发完成后将此分支push到git库 执行对应分支到dev分支的merge request 确认分支无用后自行删除
git push origin feat/update-userinfo

```

## commit

commit message 应该针对本次提交内容进行清晰明了的概要

git commit HEAD 规范遵循 `<type>(<scope>): <subject>`

全部类型可自行查阅，以下仅为常用示例：

```cmd
// 开发一个新需求时
feat: 用户模块 用户信息修改功能

// 修复bug时
fix: 用户模块 用户名显示错误

// 重构部分代码时
refactor: 用户模块重构

// 项目依赖的变更
chore: echarts 安装新图表依赖 echarts

// 文档的更改
docs: 更新 README.md 文档

// CI/CD的配置
ci: 更新CICD配置

```

[风格指南]: https://cn.vuejs.org/style-guide/rules-essential.html
