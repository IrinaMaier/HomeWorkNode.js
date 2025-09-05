//Задача 1

function sumEvenNumbers(numbers: number[]): number {
  return numbers
    .filter((num) => num % 2 === 0)
    .reduce((sum, num) => sum + num, 0);
}

console.log(sumEvenNumbers([2, 5, 4, 8, 6, 7, 5, 4, 3]));

//Задача 2

interface StringToBooleanFunction {
  (input: string): boolean;
}
const booleanFunction: StringToBooleanFunction = (str: string): boolean => {
  return str === '';
};
console.log(booleanFunction(''));
console.log(booleanFunction('fff'));

//Задача 3

type CompareStrings = (str1: string, str2: string) => boolean;
const compare: CompareStrings = (str1, str2) => {
  return str1 === str2;
};
console.log(compare('helo', 'hello')); // будет false

//Задача 4

const getLastElement = <T>(arr: T[]): T => {
  return arr[arr.length - 1];
};
console.log(getLastElement([1, 5, 9, 8]));

//Задача 5

const makeTriple = <T>(a: T, b: T, c: T): T[] => {
  return [a, b, c];
};
console.log(makeTriple(1, 2, 3));
console.log(makeTriple('a', 'b', 'c'));
