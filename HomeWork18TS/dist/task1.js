"use strict";
//Задание 1
const adminUserObject = {
    name: 'string',
    permissions: ['string'],
    email: 'string',
};
const myCar = {
    make: 'BMW',
    model: 'M5',
    engine: { type: 'petrol', horsepower: 286 },
    year: 2022,
};
function printCar(car) {
    const { make, model, engine: { type, horsepower }, year } = car;
    const yearText = year ?? 'не указан';
    console.log(`make:${make}, model:${model}, engine:${type} (${horsepower}hp),year:${yearText}`);
}
printCar(myCar);
//# sourceMappingURL=task1.js.map