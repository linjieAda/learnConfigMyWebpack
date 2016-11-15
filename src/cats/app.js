const cats = require('./cats.js');

const addMethod = (a,b) => {
  return a + b
}

const obj = {
  a: 1,
  b: 2,
  c: 3,
}


const { a, b } = obj
console.log(a,b)
console.log(addMethod(1,1))
console.log('this is src')