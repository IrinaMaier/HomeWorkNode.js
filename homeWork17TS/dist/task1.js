"use strict";
//1 задание
function calculateTotal(price, quantity, discount = 0) {
    const subTotal = price * quantity;
    const total = subTotal * (1 - discount);
    return total;
}
console.log(calculateTotal(100, 2));
//Задание 2
let id = 'abc';
function displayId(id) {
    if (typeof id === 'string') {
        console.log(id.toUpperCase());
    }
    else if (typeof id === 'number') {
        console.log(id * 10);
    }
}
displayId('abf');
const orders = [
    { orderId: 'A-1001', amount: 149.99, status: 'pending' },
    { orderId: 'A-1002', amount: 49.5, status: 'shipped' },
    { orderId: 'A-1003', amount: 230, status: 'delivered' },
];
function filterOrdersByStatus(arr, status) {
    return arr.filter(orders => orders.status === status);
}
console.log(filterOrdersByStatus(orders, 'pending'));
//Задание 4
let productInfo = ["banana", 15, 30];
let inventory = {
    apple: 20,
    orange: 40,
};
function updateStock(inventory, productInfo) {
    const name = productInfo[0];
    const quantity = productInfo[2];
    inventory[name] = quantity;
    return inventory;
}
console.log("Before:", inventory);
inventory = updateStock(inventory, productInfo);
console.log("After:", inventory);
//# sourceMappingURL=task1.js.map