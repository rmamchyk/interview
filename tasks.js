// 1 - Reference  vs Value types

var arr = [1, 2];
var brr = arr;
brr = [42, 43];

// Question: arr[0] ???
// Answer: 1

// 2 - Closure

for(var i = 0; i < 10; i++) {
    setTimeout(function() {
        console.log(i);
    }, i*1000);
}

// Question 1: what would be in console?
// Answer 1: 10, 10, 10, 10, 10, 10, 10, 10, 10, 10 (ten 10 with interval in 1 sec)
// setTimeout will be called after the 'for' loop has finished, when 'i' would equal 10;
// async action will be called when call stack will be empty;
// fistly all sync code will run and only after that the async code will start running

// Question 2: how to print 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 (with interval in 1 sec)
// Answer 2.1 (ES6): use 'let' instead of 'var'
for(let i = 0; i < 10; i++) {
    setTimeout(function() {
        console.log(i);
    }, i*1000);
}

// Answer 2.2 (ES5): self-invoking function IFII (first way)
for(var i = 0; i < 10; i++) {
    setTimeout((function(i) {
        return function() {
            console.log(i)
        };
    })(i), i*1000);
}

// Answer 2.3 (ES5): self-invoking function IFII (second way)
for(var i = 0; i < 10; i++) {
    (function(i) {
        setTimeout(function() {
            console.log(i);
        }, i*1000);
    })(i);
}

// Answer 2.4 (ES5): using 'bind'
for(var i = 0; i < 10; i++) {
    setTimeout(function(i) {
        console.log(i);
    }.bind(null, i), i*1000);
}


// 3 - function-contructor; 'new' keyword; object creation
function Person() {
    this.name = 'yura';
}

new Person();

// Question: what will happen in this case when we call function-constructor with 'new' keyword?
// Answer: 
// 1 step: new object is creating;
// 2 step: it becomes 'this' in the function;
// 3 step: this newly created object will be returned by the function implicitly (return this - by default); 
// 4 step: prototype is set.


// 4 - prototype vs __proto__
// Answer:
// prototype -  is a property of function-constructor;
// __proto__  - is a property of object which is references 'prototype'


// 4 - chain of prototypes
var obj = {
    a: 5,
    b: {
        c: 10
    }
  };
  
  obj.__proto__ = {
    a: 10,
    b: {
        c: 20
    }
  };
  
  delete obj.a;
  console.log(obj.a);
  
  delete obj.a;
  console.log(obj.a);
  
  delete obj.b;
  console.log(obj.b.c);
  
  delete obj.b.c;
  console.log(obj.b.c);
  
  // Answer
  // 1) 10 (prototype value)
  // 2) 10 (prototype chain is read-only; it doesn not work in write way; it cannot delete 'a' because it does not exists in 'obje')
  // 3) 20 (prototype value)
  // 4) undefined ()