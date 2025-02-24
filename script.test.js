const { orderBy, validateArray } = require('./script.js');

const data = [
    { name: "Gunzenov", age: 88 },
    { name: "Oleg", age: 25 },
    { name: "Igor", age: 20 },
    { name: "Lev", age: 14 }
];

const sortedData = [
    { name: "Gunzenov", age: 88 },
    { name: "Igor", age: 20 },
    { name: "Lev", age: 14 },
    { name: "Oleg", age: 25 }
];

test('Проверка сортировки массива', () => {
    expect(orderBy(data, ["name", "age"])).toEqual(sortedData);
});

test('Тест на не массив объектов', () => {
    expect(() => orderBy("not an array", ["name", "age"])).toThrow("Входные данные должны быть массивом");
});

test('Тест на отсутствие свойств', () => {
    const invalidData = [
        { name: "Gunzenov", age: 88 },
        { name: "Oleg" }, 
        { name: "Igor", age: 20 },
        { name: "Lev", age: 14 }
    ];
    expect(() => orderBy(invalidData, ["name", "age"])).toThrow("Все элементы должны содержать имя и возраст");
});