console.log('Exporting module');

//Blocking code => bloqueariamos el código hasta que no termine el fetch
//Tanto en este archivo como en el archivo donde se importa el modulo
// console.log('Start fetching users');
// await fetch('https://jsonplaceholder.typicode.com/users');
// console.log('Finish fetching users');

const shippingCost = 10;
export const cart = [];

export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity as tq };

// Export by default. NO ES RECOMENDABLE MEZCLARLO CON LA EXPORTACIÓN ANTERIOR (by name)
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
}
