/* Написать, функцию, которая принимает в качестве аргумента объект и выводит в консоль все ключи и значения
только собственных свойств. Данная функция не должна возвращать значение. */
outputKeyValue = function (obj) {
  for (let _ in obj){
    if (obj.hasOwnProperty(_)){
      console.log(_, obj[_]);
    }
  }
}


const proto = {
  'key1proto': 'value1proto',
  'key2proto': 'value2proto',
}

const obj = Object.create(proto);
obj.key1obj = 'value1obj';
obj.key2obj = 'value2obj';

outputKeyValue(obj);