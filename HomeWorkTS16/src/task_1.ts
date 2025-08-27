//1 задание

function greetUser(name: string): void {
  console.log(`Hello, ${name}`)
}
greetUser('Anna');

//2 задание

interface Person {
  name: string;
  age: number;
  city: string;
};

function printPersonInfo(personInfo: Person): void {
  console.log(
    `Name:${personInfo.name}, Age:${personInfo.age}, City:${personInfo.city}`
  );
};

//задание 3

function squareNumber(num:number):number{
   return num*num
}
console.log(squareNumber(5));

//задание 4

function isEven(num:number):boolean{
return num % 2 === 0;
}
console.log(isEven(6));

//задание 5

interface Student {
  name: string;
  grade: number;
}

function printStudentInfo(studentInfo: Student): void {
  console.log(`Student:${studentInfo.name}, Grade:${studentInfo.grade}`)
}

printStudentInfo({ name: 'Anna', grade: 5 })

//задание 6

function logMessage(stringMessage: string): void {
  console.log(stringMessage)
}
logMessage('Hello!');
