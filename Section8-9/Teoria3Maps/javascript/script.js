'use strict';
//ABRIMOS TERMINAL Y PONEMOS live-server para lanzar el node live server

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

  openingHours,

  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  orderDelivery({ starterIndex, mainIndex, time, address }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

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

console.log(
  '******************************* SET *****************************'
);

const orderSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
]);
console.log(orderSet); //Desaparecen los valores repetidos

//con SIZE se obtiene la longitud del array, pero solo cuenta los valores no repetidos
console.log(orderSet.size); // daría 3, 3 valores distintos

//Con has comprobamos (true/false) si un valor está dentro del Set
console.log(orderSet.has('Pizza'));
console.log(orderSet.has('Bread'));

//Con add añadimos al set nuevos valores
orderSet.add('Garlic Bread');
orderSet.add('Garlic Bread'); //Solo se añade una vez, el segundo es ignorado al ser igual
console.log(orderSet);

//Con delete se elimina el valor del Set
orderSet.delete('Pizza');
console.log(orderSet);

//Con clear() se eliminan TODOS los valores del set
// orderSet.clear();
// console.log(orderSet);

//console.log(orderSet[0]); //Esto devuelve undefinido, en un Set no importa el orden de los valores dentro. No hay forma de extraer un valor concreto del set

for (const order of orderSet) {
  console.log(order);
}

//EJEMPLO
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter']; //Este array es todo nuestro personal
const staffUnique = new Set(staff); //Este Set contiene los puestos de trabajo (uno de cada)
console.log(staffUnique);
const staffUniqueArray = [...new Set(staff)]; //Convertimos en array el Set
console.log(staffUniqueArray);
console.log(
  new Set(['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter']).size //Nos devuelve cuantos puestos distintos hay. No necesitaríamos crear el array anterior
);

//Podemos calcular cualquier cosa que sea iterable, como un string
console.log(new Set('paaaablochimpum').size); //Cuantas letras distinas hay en el string

console.log(
  '******************************* MAP *****************************'
);

const rest = new Map(); //Creamos un Map vacio
rest.set('name', 'Classico Italiano'); //Añadimos valores al Map con .set(), primer valor es el key, el segundo es el value. set() También devueve el propio mapa. Podemos pintarlo
rest.set(1, 'Firenze, Italy'); //Podemos usar cualquier tipo de valores
console.log(rest.set(2, 'Lisbon, Portugal')); //Añadimos un valor y pintamos el Map completo

//El echo de que con set nos devuelva el propio mapa completo, nos permite actualizarlo de esta forma
rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic']) //Podemos añadir arrays dentro del map
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open')
  .set(false, 'We are closed');
//Podemos ir concatenando nuevos keys y values
console.log(rest);

console.log(rest.get('name')); //con get(key) obtenemos el value correspondiente al key
console.log(rest.get(true));

const time = 21;

console.log(rest.get(time > rest.get('open') && time < rest.get('close'))); // es time entre open y close = true, por lo que qda es rest.get(true), por ñlo que pinta 'We are open'

//METODOS DEL MAP aparte del set (Muy parecido al SET)
console.log(rest.has('categories'));
rest.delete(2); // Pasamos el key para borrar
console.log(rest);
console.log(rest.size); //Devuelve el tamaño
// rest.clear(); //Vacia el map comletamente
// console.log(rest);

//rest.set([1, 2], 'Test'); //Podemos añadir un array como key de un map

//Aunque la forma correcta de hacerlo es asi
const arr = [1, 2];

rest.set(arr, 'Test');
console.log(rest.get(arr)); //Para así obtener el value del key

rest.set(document.querySelector('h1'), 'Heading');
console.log(rest);

//NUEVAS FORMAS DE CREAR UN MAP
console.log('----------------------------------17 - NOV');
const question = new Map([
  ['question', '¿Cual es el mejor lenguaje de programación del mundo?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correcto', 3],
  [true, 'Correcto!'],
  [false, 'Try Again!'],
]);

console.log(question); //LA estructura de esta forma de hacer Maps es igual al Object.entries. Lo que significa que podemos
//CONVERTIR de OBJETOS a MAPAS facilmente

console.log(Object.entries(openingHours));

console.log('------------------CONVERSION OBJETO_MAPA------------------');

const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

console.log('------------------ ITERACION DE MAPAS ------------------');

//Vamos a iterar el Mapa question, destructurando (sacando variables) por key y valor, y solo queremos aquellos que su key sea un número (por ejemplo)
//Obtenemos la pregunta que está almacenada como value con la key 'question'
console.log(question.get('question')); //Esto pinta : '¿Cual es el mejor lenguaje de programación de mundo?
for (const [key, value] of question) {
  if (typeof key === 'number') {
    console.log(`Answer - ${key}: ${value}`);
  }
}
//const answer = Number(prompt('Your answer?')); //Con prompt pedimos al usuario que introduzca datos (como un alert), parseamos su respuesta a number (ya q siempre es String)
//Pintamos la respuesta del usuario por consola
//console.log(answer);

//Comprobamos con los últimos valores del Map, si la respuesta es correcta o no
// if (answer === question.get('correcto')) {
//   console.log(question.get(true));
// } else {
//   console.log(question.get(false));
// }

console.log('------------------CONVERSION MAPA - ARRAY------------------');

//Simplemente valdría con destructurarlo
console.log([...question]);
// console.log(question.entries());//Este sería exactamente igual que el anterior
console.log([...question.keys()]); //Sacamos  con SOLO los KEYS
console.log([...question.values()]); //Sacamos un array con SOLO los VALUES
