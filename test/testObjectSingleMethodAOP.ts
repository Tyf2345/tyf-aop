import inject from "../lib/index";

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
