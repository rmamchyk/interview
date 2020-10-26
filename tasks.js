// 1 - Reference  vs Value types

var arr = [1, 2];
var brr = arr;
brr = [42, 43];

// Question: arr[0] ???
// Answer: 1

// 2 - Hoisting
function ololo() {
	function f() { return 10; }
	return f();
	function f() { return 7; }
}

ololo();

// Answer: 7

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
    this.name = 'Alex';
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
function Person(name) {
    this.name = name;
}
Person.prototype.name = 'anonymous';

var alex = new Person('Alex');

delete alex.name;
console.log(alex.name);

delete alex.name;
console.log(alex.name);

// Answer
// 1) anonymous (prototype value)
// 2) anonymous (prototype value, because prototype chain is read-only; it doesn not work in write way; it cannot delete 'name' because it does not exist on 'alex' object)



//5 - this; function-constructor

// Question
const obj = {
    first: 'Dylan',
    last: 'Israel',
    full: () => {
        return `${this.first} ${this.last}`;
    }
};
  
console.log(obj.full()); // 'undefined undefined'


// Question
const obj = {
    first: 'Dylan',
    last: 'Israel',
    full() {
        return `${this.first} ${this.last}`;
    }
};
  
console.log(obj.full()); // 'Dylan Israel'


// Question
function f() {
    console.log(this);
}

f();
// Answer: window


// Question
'use strict';

function f() {
    console.log(this);
}

f();
// Answer: undefined


//Question
function f() {
    console.log(this);
  }
  
new f();
//Answer: {}


// Question
function f() {
    console.log(this);
}

f.call({});
// Answer: { yo: function f; }


// Question
function f() {
    console.log(this);
}
var obj = {
    yo: f
};

obj.yo();
// Answer: { yo: function f; }

