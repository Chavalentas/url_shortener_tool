const generateId = function(length){
    if (typeof length !== "number"){
        throw new TypeError("length must be a number!");
    }

    if (length <= 0){
        throw new EvalError("length must be greater than 0!")
    }

    let counter = 0;
    let abcUpper = Array(26).fill().map((element, index) => String.fromCharCode(index + 65));
    let abcLower = Array(26).fill().map((element, index) => String.fromCharCode(index + 97));
    let digits = Array(10).fill().map((element, index) => (index.toString()));
    let result = "";

    while (counter < length){
        let indicator = getRandomElement([0,1,2])
        let toAdd = "";

        switch(indicator){
            case 0:
                toAdd = getRandomElement(abcLower);
                break;
            case 1:
                toAdd = getRandomElement(abcUpper);
                break;
            case 2:
                toAdd = getRandomElement(digits);
                break;
        }

        result += toAdd;
        counter += 1;
    }

    return result;
}

const getRandomElement = function(inputArray){
    let arrayLength = inputArray.length;
    let index = getRandomInt(arrayLength);
    return inputArray[index];
}

const generateIdExcept = function(idsExcept, length){
    if (typeof length !== "number"){
        throw new TypeError("length must be a number!");
    }

    if (length <= 0){
        throw new EvalError("length must be greater than 0!")
    }

    let generatedId = generateId(length);

    while (idsExcept.includes(generatedId)){
        generatedId = generateId(length);
    }

    return generatedId;
}

const getRandomInt = function(max) {
    return Math.floor(Math.random() * max);
}
  

module.exports = {
    generateId,
    generateIdExcept
}
