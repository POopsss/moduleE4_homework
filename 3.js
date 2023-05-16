// Написать функцию, которая создает пустой объект, но без прототипа.
function getNullPrototype(){
  const obj = {};
  obj.__proto__ = null;
  return obj
}

const obj = getNullPrototype();

console.log(obj);
console.log(obj.__proto__);
console.log(Object.getPrototypeOf(obj));
