## AOP

AOP面向切面编程 - js实现

## 安装

```js
 npm i tyf-aop
```

## 快速开始

### 注入一个类 - 拦截所有方法

```ts
class TestClass {
  constructor(public name: string, public age: number) {}
  print() {
    console.log("This name is:" + this.name + " and age: " + this.age);
  }
  sayHi() {
    console.log("🎤");
  }
}
const testClass = new TestClass("张三", 23);
inject(testClass, before, "before", "methods");
inject(testClass, after, "after", "methods");
inject(testClass, around, "around", "methods");
inject(testClass, afterReturning, "afterReturning", "methods");

function before() {
  console.log("sayHi before");
}

function around() {
  console.log("sayHi around");
}

function after() {
  console.log("sayHi after");
}

function afterReturning() {
  console.log("sayHi afterReturning");
}

testClass.print();
```

### 注入一个类 - 拦截指定方法

```ts
class TestClass {
  constructor(public name: string, public age: number) {}
  print() {
    console.log("This name is:" + this.name + " and age: " + this.age);
  }
  sayHi() {
    console.log("🎤");
  }
}
const testClass = new TestClass("张三", 23);
inject(testClass, before, "before", "method", "print");
inject(testClass, after, "after", "method", "print");
inject(testClass, around, "around", "method", "print");
inject(testClass, afterReturning, "afterReturning", "method", "print");

function before() {
  console.log("method before");
}

function around() {
  console.log("method around");
}

function after() {
  console.log("method after");
}

function afterReturning() {
  console.log("method afterReturning");
}

testClass.print();
```

### 注入一个对象 - 拦截所有方法

```ts
const TestObj = {
  print() {
    console.log("print");
  },
  sayHi() {
    console.log("🎤");
  },
};

inject(TestObj, before, "before", "methods");
inject(TestObj, after, "after", "methods");
inject(TestObj, around, "around", "methods");
inject(TestObj, afterReturning, "afterReturning", "methods");

function before() {
  console.log("sayHi before");
}

function around() {
  console.log("sayHi around");
}

function after() {
  console.log("sayHi after");
}

function afterReturning() {
  console.log("sayHi afterReturning");
}

TestObj.print();
```

### 注入一个对象 - 拦截指定方法

```ts

const testObj = {
  print() {
    console.log("print");
  },
  sayHi() {
    console.log("🎤");
  },
};

inject(testObj, before, "before", "method", 'print');
inject(testObj, after, "after", "method", "print");
inject(testObj, around, "around", "method", "print");
inject(testObj, afterReturning, "afterReturning", "method", "print");

function before() {
  console.log("method before");
}

function around() {
  console.log("method around");
}

function after() {
  console.log("method after");
}

function afterReturning() {
  console.log("method afterReturning");
}

testObj.print();
```

## 参数说明

```ts
/**
 *
 * @param target 目标对象
 *  * 要监听那个对象或者实例化对象
 * @param aspect 切面
 *  * 自定义处理函数
 *  * 可以是一个promise
 *  * 允许有返回值
 *  * 根据通知类型不同，返回值格式也不同
 *    * after 返回数组 即(arguments)
 *    * 返回值将自动注入到原始方法中
 * @param advice 通知类型
 *  * after 执行前通知（允许返回值 值为 数组类型）
 *  * around 环绕通知
 *  * before 执行后通知
 *  * afterReturning 执行后返回前通知 （允许返回值 值为 自定义类型）
 * @param pointCut 切入点
 *  * methods 监听 target 所有方法
 *  * method 监听单个方法，需要在 method中自定义方法名
 * @param method 自定义方法
 *  * pointCut 为 method 时 需要传入
 */
export default function inject<T extends Function | { [K in keyof T]: T[K] }>(
  target: T,
  aspect: Function,
  advice: AdviceType,
  pointCut: PointCutType,
  // @ts-ignore
  method?: keyof T | keyof T["prototype"]
): void;

```
