const sumNumbers = (numbers: number[]): number => {
    let result: number = 0;

    numbers.forEach(currentNumber => result += currentNumber);

    return result;
}

const subtractNumbers = (numbers: number[]): number => {
    let result: number = numbers[0];
    numbers.shift();
    numbers.forEach(currentNumber => result -= currentNumber);

    return result;
}

const multiplyNumbers = (numbers: number[]): number => {
    let result: number = numbers[0];
    numbers.shift();
    numbers.forEach(currentNumber => {
        result *= currentNumber;
    });
    return result;
}

const divideNumbers = (numbers: number[]): number => {
    if(numbers[0] === 0)
        return 0;
    let result: number = numbers[0];
    numbers.shift();
    if(numbers.every(currentNumber => currentNumber !== 0)){
        numbers.forEach(currentNumber => {
            result /= currentNumber;
        });
    }
    else
        result = 0;
    return result;
}
