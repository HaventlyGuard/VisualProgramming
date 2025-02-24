function orderBy(arr, method){
    testObject(arr, method);
    const copyArr = arr.slice();
    copyArr.sort((a,b) => {
        for (let property of method)
        {
            if (a[property] < b[property]){
                return -1;
            }

            if (a[property] > b[property]){
                return 1;
            }

            if(!(property in a) || !(property in b)){
                throw Error("Все элементы должны содержать имя и возраст");
            }
        }
        return 0;
    });
    return copyArr;
}

export function testObject(arr, method){
    for (let item of arr)
        {
            if(typeof item !== 'object' || typeof item === null){
                throw new Error("В массиве должны быть все объекты");
            }
        }
}

