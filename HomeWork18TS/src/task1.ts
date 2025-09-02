//Задание 1

type Admin = { name: string; permissions: string[] }
type User = { name: string; email: string }
type AdminUser = Admin & User

const adminUserObject: AdminUser = {
  name: 'string',
  permissions: ['string'],
  email: 'string',
}

//Задание 2

// interface Car {
//   make: string
//   model: string
//   engine: { type: string; horsepower: number }
//   year?: number
// }

// const myCar: Car = {
//   make: 'BMW',
//   model: 'M5',
//   engine: { type: 'petrol', horsepower: 286 },
//   year: 2022,
// }

// function printCar(car: Car): void {
//   const {
//     make,
//     model,
//     engine: { type, horsepower },
//     year,
//   } = car
//   const yearText = year ?? 'не указан'
//   console.log(
//     `make:${make}, model:${model}, engine:${type} (${horsepower}hp),year:${yearText}`
//   )
// }
// printCar(myCar)

//Задание 3

// interface Product {
//   name: string
//   price: number
// }

// interface CalculateDiscount {
//   (product: Product, discount: number): number
// }

// const calculateDiscount: CalculateDiscount = (product, discount) => {
//   return product.price - discount
// }
// const product: Product = {
//   name: 'Auto',
//   price: 3000,
// }
// console.log(calculateDiscount(product, 500))

//Задание 4

// interface Employee {
//   name: string
//   salary: number
// };

// const employees: Employee[] = [
//   { name: 'Alice', salary: 3000 },
//   { name: 'Bob', salary: 4500 },
//   { name: 'Charlie', salary: 5000 },
//   { name: 'Diana', salary: 4000 },
// ];

// function employeesSalary(employees: Employee[]): number[] {
//   return employees.map((emp) => emp.salary)
// }
// console.log(employeesSalary(employees));


//Задание 5
// interface Person {
//     firstName:string;
//     lastName:string;
// }
// interface Student extends Person{
//     grade:number;
// }

// const student:Student={firstName:'Alice', lastName:'Foks',grade: 5}

// function studenInfo(student:Student):void{
//   const fullName=`${student.firstName} ${student.lastName}`
//   console.log(`Student:${fullName}, Grade:${student.grade}`)
// };

// studenInfo(student)

//Задание 6

// interface Product{
//   str1:string;
//   str2:string;
// }
// const orange:Product={
//   str1: 'fresh',
//   str2: 'tasty',
// }

// function concatStrings(product:Product):string{
//   // return (product.str1 + ' ' + product.str2)
//    return `${product.str1} ${product.str2}`
// }
// console.log(concatStrings(orange))