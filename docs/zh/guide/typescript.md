# Typescript

[typescript ][typescript]对于ts的诸多信息官方文档已经说的够详细了，此处不再赘述。

很多人都偏向处于一个舒适区，因此ts对于很多js开发者来说是抗拒的，但如果不实际亲身尝试下也不会发现它的诸多好处。

结合以往的使用经验，以及对于ts的理解，个人认为一般的业务场景并不适合ts，ts更适合去编写一些类库，或是制作某些工具类的产品，它们都有一些相似的点：

* 它们是作为一些功能或者实现的提供者，有义务让使用者知悉如何使用，有哪些参数，参数类型是什么，保证使用时的入参出参统一，确保代码的健壮性。
* 它们都具有一定的稳定性，都是为了解决一种特定方向的问题而存在，也就意味着它们不会有非常频繁的迭代，也不会有种类繁多的需求

而一般的业务场景需求千变万化，并不具有太多的重叠性，写出来的代码也仅仅只是为了当前业务而消费，所以没有必要徒增一份心智负担去维护ts类型。如果只是为了用而用，并不知道为什么要用，那么最后写出来的也只能是一堆毫无意义可言的anyscript。

### TS枚举

但是ts的枚举是极力推荐的，也是本项目使用到ts的部分，试想一下以下场景

```js
// 情形一：某些逻辑分别处理时  假设 usertype 1：个人用户 2：企业用户
if(userType === 1){
    ...balabala
} else if (userType === 2){
    ...balabala
}

// 情形二：后端接口返回也是枚举，前端回显时需处理
<template>
     <div clasee="user-type">{{ userType===1?'个人用户':'企业用户' }}</div>
</template>
```

以上场景十分常见，这里仅仅只是假设了2个类型，当类型多达数种时，你是否有考虑过如果不写注释这些01234代表的含义过了段时间你是否还能记住，后端接口不做枚举处理时回显有多麻烦，再者当多个地方都有类似逻辑，这时却要改成2是个人用户，1代表企业用户，你是不是还得一个个更改。

首先定义枚举

```ts
// src/enum/modules/user.ts
export enum Type {
    个人用户 = 1,
    企业用户 = 2
}
```

然后使用时

```ts
import Enum from '@/src/enum'

// 情形一
if(userType === Enum.user.Type['个人用户']){
    ...balabala
} else if(userType === Enum.user.Type['企业用户']){
    ...balabala
}

// 情形二
<template>
    <div class="user-type">{{ Enum.user.Type[userType] }}</div>
</template>
```

我相信只要是有一定经验的开发，一眼就能看出ts枚举带来的各种益处：

* 首先是代码量，回显你不再需要额外的处理
* 然后是代码可读性，更加符合人类自然语言，如果配合支持ts的ide你只需要鼠标放在枚举上，便能知悉全貌
* 最后就是可配置灵活性，就如之前枚举值交换的场景，你只需要更改ts枚举，其余部分的判断逻辑及回显都不用修改了

  ```typescript
  // src/enum/user.ts
  export enum Type {
      企业用户 = 1,
      个人用户 = 2
  }
  ```

[typescript]: https://www.typescriptlang.org/
