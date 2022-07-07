import inject from "../lib/index";

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
