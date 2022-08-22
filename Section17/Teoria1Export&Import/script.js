// //Importing module

// // ---- 1 FORMA
// // import { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// // console.log('Importing module');
// // addToCart('bread', 5);
// // console.log(price, tq);

// // ---- 2 FORMA
// // import * as ShoppingCart from './shoppingCart.js';
// // ShoppingCart.addToCart('bread', 5);
// // console.log(ShoppingCart.totalPrice);

// // ---- 3 FORMA
// //Importa la exportación por default
// // le podemos dar el nombre que queramos (add o jijijijiJUJUJUjojoj, tb valdría)
// //Podemos mezclar las importaciones pero NO ES RECOMENDABLE
// // import add, { cart } from './shoppingCart.js';
// // add('pizza', 2);
// // add('bread', 5);
// // add('apples', 4);

// // console.log(cart); // => tendremos cargados los 3 productos anteriores

// // --------- AWAIT IN MODULES -----------
// //En modulos podemos usar await sin especificar una función async
// // SOLO FUNCIONA EN MODULOS (type='module' en HTML)
// //OJO QUE BLOQUEA TODO EL CODIGO HASTA FULLFIL
// // const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// // const data = await res.json();

// // console.log(data);

// // const getLastPost = async function () {
// //   const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// //   const data = await res.json();
// //   console.log(data);

// //   //Con .at(-1) cogemos el último elemento del array
// //   return { title: data.at(-1).title, text: data.at(-1).body };
// // };

// // //ESta es la forma de sacar el return de la función.
// // //Como devuelve una promise, tebemos que usar el then()
// // //No es muy limpia por eso no se usa
// // // const lastPost = getLastPost();

// // // lastPost.then(last => console.log(last));

// // //Con await => esperamos el resultado y luego lo pintamos
// // const lastPost2 = await getLastPost();
// // console.log(lastPost2);

// // ---------- MODULE PATTERN -----------
// //Usamos IFEII => la envolvemos en () y la llamamos inmediatemente después
// //De esta forma nos aseguramos que se llama y que se llama solo una vez
// const ShoppingCart2 = (function () {
//   const cart = [];
//   const shippingCost = 10;
//   const totalPrice = 237;
//   const totalQuantity = 23;

//   const addToCart = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(`${quantity} ${product} added to cart`);
//   };

//   const orderStock = function (product, quantity) {
//     console.log(`${quantity} ${product} ordered from supplier`);
//   };
//   //ESto es lo único que tendrá acceso desde el exterior, el resto es privado
//   return {
//     addToCart,
//     cart,
//     totalPrice,
//     totalQuantity,
//   };
// })();

// ShoppingCart2.addToCart('apple', 4);
// ShoppingCart2.addToCart('pizza', 2);

// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
import add, { cart } from './shoppingCart.js';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 2 },
  ],
  user: { logeedIn: true },
};

const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);
console.log(stateClone);
state.user.logeedIn = false;
console.log(stateClone);

console.log(stateDeepClone);

if (module.hot) {
  module.hot.accept();
}
