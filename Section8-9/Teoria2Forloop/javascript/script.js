'use strict';
//ABRIMOS TERMINAL Y PONEMOS live-server para lanzar el node live server
/*
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Sala'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0,
      close: 24,
    },
  },

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({ starterIndex, mainIndex, time, address }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  //HACEMOS UNA FUNCION PARA PEDIR PASTA. DEBE DE TENER SIEMPRE 3 INGREDIENTES
  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },

  orderPizza: function (mainIngrediente, ...otherIngrediente) {
    console.log(mainIngrediente);
    console.log(otherIngrediente);
  },
};

const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

//EL BUCLE FOR-OF
for (const item of menu) {
  //es como un foreach pero para JavaScript!!
  console.log(item);
}
//ENTRIES() ES un iterador de array
for (const item of menu.entries()) {
  console.log(`${item[0] + 1}: ${item[1]}`);
}

console.log([...menu.entries()]);

*/

//OBJETOS LITERALES --> como el restaurante de arriba

//Existen otras formas de hacer objetos literales

const weekDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const openingHours = {
  [weekDays[3]]: {
    open: 12,
    close: 22,
  },
  [weekDays[4]]: {
    open: 11,
    close: 23,
  },
  [weekDays[5]]: {
    open: 0,
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Sala'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  //Como la variable se va a llamar igual que el objeto que guarda (openingHours), no hace falta porner opeingHours: openingHours
  openingHours,

  //ESTA ES LA ANTIGUA FORMA DE CREAR FUNCIONES DENTRO DE LOS OBJETOS, ya no hace falta hacerlo así
  /*
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
*/
  //AHORA PODEMOS HACER ESTO SIMPLEMNTE
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  orderDelivery({ starterIndex, mainIndex, time, address }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  //HACEMOS UNA FUNCION PARA PEDIR PASTA. DEBE DE TENER SIEMPRE 3 INGREDIENTES
  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },

  orderPizza(mainIngrediente, ...otherIngrediente) {
    console.log(mainIngrediente);
    console.log(otherIngrediente);
  },
};

if (restaurant.openingHours.mon) console.log(restaurant.openingHours.mon.open); //si existe la pregunta (horario de apertura los lunes) pintalos

//CON OPTIONAL CHAINING
console.log(restaurant.openingHours?.mon?.open);

//Ejemplo

const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? 'closed'; //Si el dia seleccionado tiene horario de apertura, dame el horario, sino que ponga 'closed'. Usamos ?? para que acepte 0 como valor
  console.log(`On ${day}, we open at ${open}`);
}

//OPTIONAL CHAINING para la llamada de METODOS
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist');

//OPTIONAL CHAINING para comprobar si los ARRAYS ESTÁN VACÍOS
const users = [{ name: 'Jonas', email: 'hello@jonas.io' }];

console.log(users[0]?.name ?? 'User array empty');

//BUCLES LOOP SOBRE OBJETOS NO ITERABLES
console.log(
  '---------------BUCLES LOOP SOBRE OBJETOS NO ITERABLES--------------------'
);

//Propiedades NAMES
const propiedades = Object.keys(openingHours);
console.log(propiedades);

let openStr = `We are opening on ${propiedades.length} days at week: `;

for (const day of Object.keys(openingHours)) {
  openStr += `${day}, `;
}
console.log(openStr);

//Propiedades VALUES
const values = Object.values(openingHours);
console.log(values);

//Objeto entries
const entries = Object.entries(openingHours);
//console.log(entries);

for (const [key, { open, close }] of entries) {
  //Podemos destructurar la variable del for para que nos dé sus dos valores [key, value]
  //Como sabemos que value es un objeto, podemos destructurarlo a su vez para que nos de sus dos valores {open, close}
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}
