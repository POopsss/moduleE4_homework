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