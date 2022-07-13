'use strict';
//ABRIMOS TERMINAL Y PONEMOS live-server para lanzar el node live server

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

restaurant.orderDelivery({
  time: '22:30',
  address: 'Calle',
  mainIndex: 2,
  starterIndex: 2,
});

console.log('----------------OR--------------');
console.log(3 || 'Jonas');
console.log('' || 'Jonas');
console.log(true || 0);
console.log(undefined || null);

restaurant.numGuests = 23;
const guest = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guest);

const guest2 = restaurant.numGuests || 10;
console.log(guest2);

console.log('----------------AND--------------');

console.log(0 && 'Jonas');
console.log(7 && 'Jonas');
console.log(true && 0);

if (restaurant.orderPizza) {
  restaurant.orderPizza('champis', 'bacon');
}

restaurant.orderPizza && restaurant.orderPizza('york', 'bacon');

console.log('-------------------OR  valor 0------------');
restaurant.numGuests = 0;
const guest3 = restaurant.numGuests || 10;
console.log(guest3); // da 10, porque no funciona con el 0

const guesstCorrect = restaurant.numGuests ?? 10; //Este operador solo considera falsos valores a null y undefined
console.log(guesstCorrect); // ahora si que da 0

/*
//1º Destructuring
const arr = [1, 2, ...[3, 4]];
console.log(arr);
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a);
console.log(b);
console.log(others);

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza);
console.log(risotto);
console.log(otherFood);

const { sat, ...weekDays } = restaurant.openingHours;
console.log(weekDays);

//2º Functions
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(sum);
};
add(2, 3);
add(5, 3, 7, 2);
add(8, 2, 5, 3, 2, 1, 4);

const x = [23, 5, 7];
add(...x); //añadimos todos los valores del array a la funcion add. Es lo mismo que hacer add(23,5,7)

//ORDENAMOS UNA PIZZA

restaurant.orderPizza('york', 'bacon', 'champiñon');

//VAMOS A HACER UNA PROMPT WINDOW PARA METER DINÁMICAMENTE LOS INGREDIENTES DE LA PASTA
// const ingredientes = [
//   prompt("Let's make pasta! Ingrediet 1?"),
//   prompt("Let's make pasta! Ingredient 2?"),
//   prompt("Let's make pasta! Ingredient 3?"),
//  ];
// console.log(ingredientes);
// restaurant.orderPasta(...ingredientes);

//CREAMOS UN NUEVO RESTAURANTE A PARTIR DEL QUE YA TENEMOS
/*
const newRes = { foundedIn: 1998, ...restaurant, founder: 'Jose Carlos' };
console.log(newRes);

const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy.name);
console.log(restaurant.name);
/*
const { name, openingHours, categories } = restaurant; //Extraemos info del 'objeto'
console.log(name, openingHours, categories);

//Extraemos la info igual pero cambiando los nombres de las variables (para que sean distintas a las que tienen el objeto)
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

//Creamos un nuevo array a partir de uno anterior al que añadimos más elementos al menu
const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);


//Establecemos nombres de variables predeterminados
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters); //menu nos devuelve un array vacio ya que no existe en el objeto

//Mutamos variables
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };

({ a, b } = obj);
console.log(a, b);

//Objetos Anidados reestructurados
const {
  fri: { open: o, close: c },
} = openingHours;
console.log(o, c);


//DESTRUCTURANDO ARRAYS
const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

const [x, y, z] = arr; //Podemos declarar un variables deconstruyendo un array
console.log(x, y, z);
console.log(arr);

//Extraemos los dos primeros platos de las categorias del restaurante
let [main, second] = restaurant.categories;

console.log(main, second);

//Extraemos el primer elemento y el TERCER elemento del mismo array
const [prim, , sec] = restaurant.categories;
console.log(prim, sec);

//Tambien podemos CAMBIAR EL ORDEN de los elementos dentro del array (parecido a la burbuja vaya)
// const temp = main;
// main = second;
// second = temp;
// console.log(main, second);

//otra forma de cambiar sin usar una variable intermedia. Reasignando los valores
[main, second] = [second, main];
console.log(main, second);

//Devolvemos 2 valores de una funcion
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

//Si tuviesemos un array anidado dentro de otro, podemos destructurar anidando
const nested = [2, 4, [5, 6]];
// const [i, , j] = nested;
// console.log(i, j);
const [i, , [j, k]] = nested;
console.log(i, j, k); //así sacamos cada valor separado

//EXPANDS ARRAYs
//Como podemos añadir nuevos elementos al principio a un array
const arr = [7, 8, 9];
const newArr = [1, 2, ...arr]; //...array extrae todos los valores individuales del array y los añade al nuevo array en el mismo orden
console.log(newArr);
console.log(...newArr); //pintamos los valores del array individualmente!!
*/
//Hacer una copia de un array
/*
const mainMenuCopy = [...restaurant.mainMenu];
console.log(mainMenuCopy);

//Unir dos arrays
const menuTotal = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menuTotal);

//tb podemos hacer el extend sonre strings
const str = 'Pablo';
const letters = [...str, '', 's'];
console.log(letters);
*/
