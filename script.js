function orderBy(arr, methods) {
    validateArray(arr);
    const copyArr = arr.slice();
    for (let item of copyArr) {
        for (let property of methods) {
            if (!(property in item)) {
                throw new Error("Все элементы должны содержать имя и возраст");
            }
        }
    }

    copyArr.sort((a, b) => {
        for (let property of methods) {
            if (a[property] < b[property]) {
                return -1;
            }
            if (a[property] > b[property]) {
                return 1;
            }
        }
        return 0; 
    });

    return copyArr;
}

function validateArray(arr) {
    if (!Array.isArray(arr)) {
        throw new Error("Входные данные должны быть массивом");
    }

    for (let item of arr) {
        if (typeof item !== 'object' || item === null) {
            throw new Error("В массиве должны быть все объекты");
        }
    }
}

module.exports = { validateArray, orderBy };
