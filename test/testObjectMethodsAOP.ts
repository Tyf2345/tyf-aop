import inject from "../lib/index";

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
