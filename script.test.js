let order = require('./script.js');

let data = [{name: "Gunzenov", age:88},
     {name: "Oleg", age: 25},
     {name: "Igor", age:20}, 
     {name: "Lev", age:14}]
     

let sortData = [{name: "Gunzenov", age:88},
     {name: "Igor", age:20},
     {name: "Oleg", age: 25}, 
     {name: "Lev", age:14}, 
      ]

test('Проверка сортировки массива', ()=> {
     expect(orderBy(data,["name","age"]).toEqual(sortData))
})