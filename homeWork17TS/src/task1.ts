//1 задание

function calculateTotal(
  price: number,
  quantity: number,
  discount: number = 0
): number {
  const subTotal = price * quantity
  const total = subTotal * (1 - discount)
  return total
}
console.log(calculateTotal(100, 2));

//Задание 2

let id: string | number = 'abc'

function displayId(id: string | number): void {
  if (typeof id === 'string') {
    console.log(id.toUpperCase())
  } else if (typeof id === 'number') {
    console.log(id * 10)
  }
}
displayId('abf');

//Задание 3

interface Order {
  orderId: string;
  amount: number;
  status: 'pending' | 'shipped' | 'delivered';
}

const orders: Order[] = [
  { orderId: 'A-1001', amount: 149.99, status: 'pending' },
  { orderId: 'A-1002', amount: 49.5, status: 'shipped'},
  { orderId: 'A-1003', amount: 230, status: 'delivered' },
];


function filterOrdersByStatus(arr:Order[],status:Order['status']):Order[]{
    return arr.filter(orders=>orders.status===status);
}
  console.log(filterOrdersByStatus(orders, 'pending'))

  
//Задание 4

let productInfo:[string, number, number]=["banana", 15, 30];//пробовала другие варианты

let inventory:{
  [key:string]:number}={
    apple:20,
    orange:40,
  }

function updateStock(
inventory:{[key:string]:number},
productInfo:[string, number, number]
):{[key:string]:number}{
const name = productInfo[0];
const quantity = productInfo[2];

inventory[name] = quantity;

return inventory;
}
console.log("Before:", inventory);
inventory = updateStock(inventory, productInfo);
console.log("After:", inventory);