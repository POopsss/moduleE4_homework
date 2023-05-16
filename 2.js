/* Написать функцию, которая принимает в качестве аргументов строку и объект, а затем проверяет
есть ли у переданного объекта свойство с данным именем. Функция должна возвращать true или false. */
checkKey = function (obj, str) {
  for (let key in obj) {
    if (key == str){ // Возможно (key === str) тогда typeof str обязательно должен быть string.
      return true
    }
  }
  return false
}

const obj = {
  1: 1,
  2: 2,
  'key': 'value'
}

let str = '1';
console.log(checkKey(obj, str));

str = 2;
console.log(checkKey(obj, str));

str = '3';
console.log(checkKey(obj, str));

str = 'key';
console.log(checkKey(obj, str));