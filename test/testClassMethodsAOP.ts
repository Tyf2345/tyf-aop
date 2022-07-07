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
