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