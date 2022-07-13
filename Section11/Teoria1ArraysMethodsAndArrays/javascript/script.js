'use strict';
//////////////////////////////////////////////////////////////////////////////////////////////////

// -------------------------------------------------------------------------- ARRAY METHODS
console.log('-------- ARRAY METHODS ------');

let arr = ['a', 'b', 'c', 'd', 'e'];
// --------------------------------------------------- SLICE METHOD
console.log('--- SLICE ---');
//NO afecta al array, crea un nuevo array con los valores que devuelve
//arr.slice(startIndex, endIndex)
console.log(arr.slice(2)); //si solo pasamos un parámetro, cogerá desde ese indice hasta el final
console.log(arr.slice(2, 4)); // el endIndex NO se incluye en el nuevo array
console.log(arr.slice(-2)); //Un valor negativo le hace empezar por el final (en este caso cogería los dos últimos valores)
console.log(arr.slice(-1)); //Cogemos el último valor del array
console.log(arr.slice(1, -2));
console.log(arr.slice()); // Si no le damos ninguún valor, podremos usar slice() para copiar un array en otro
console.log([...arr]); // Esto haría lo mismo, una copia del array

// --------------------------------------------------- SPLICE METHOD
console.log('--- SPLICE ---');
//Su diferencia con slice() esque esté SI que afecta al array original. Lo mutila
//arr.splice(startIndex, numDeItems) = arr.splice(2, 2) => Empiezas a borrar desde el indice 2, y me borras 2 elementos
console.log(arr.splice(2)); //Extraemos los valores a partir del 2 indice
console.log(arr); // El array ahora solo cuenta con los dos primeros valores
//Se usa normalmente para eliminar el último valor de un array
arr.splice(-1); //Así borramos el último valor del array
console.log(arr);

// --------------------------------------------------- REVERSE METHOD
console.log('--- REVERSE ---');
// Devuelve el array al reves. ACTUA SOBRE EL ARRAY ORIGINAL
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse()); //f, g, h, i, j
console.log(arr2); //El array original es modificado

// --------------------------------------------------- CONCAT METHOD
console.log('--- CONCAT ---');
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]); //Es lo mismo que esto

// --------------------------------------------------- JOIN METHOD
console.log('--- JOIN ---');
//Devuelve un String con todos los valores del array separados por el elemento que se le pasa por parámetro
console.log(letters.join('-'));

////////////////////////////////////////////////////////////////

//THE NEW METHOD
console.log('----------------------- THE NEW METHOD -----------------------');
const ar = [23, 11, 64];
console.log(ar[0]);
console.log(ar.at(0)); //Ambas formas son muy similares

//Es mejor usar el método at() para ciertas funciones, las facilita. Como sacar el último valor de un array cuando no sabemos su tamaño
console.log(ar[ar.length - 1]); //así nos devuelve el último valor de una forma tradicional
console.log(ar.slice(-1)); //Otra forma es crear una copia del array con solo el último valor
console.log(ar.at(-1)); // Así nos devuelve directamente el valor seleccionado (en este caso es el último valor)

//El método at() también vale para los Strings
let nombre = 'Pablo';
console.log(nombre.at(-1)); //Devuelve la 'o'

//////////////////////////////////////////////////////////////////////////////////////////////////

// -------------------------------------------------------------------------- ARRAY LOOPS

console.log('----------------------- ARRAY LOOPS -----------------------');

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300]; //Los numeros positivos son ingresos y los negativos extracciones
console.log('');
console.log('---- FOR ----');
for (const movement of movements) {
  if (movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}`); //Con Math.abs() nos quedamos con el valor, quitando el signo
  }
}
console.log('');
console.log('---- FOREACH ----');
movements.forEach(function (movement) {
  //movement en este momento es el nombre de cada valor por cada iteración, es el 'ele' o la 'i'
  if (movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}`); //Con Math.abs() nos quedamos con el valor, quitando el signo
  }
});

//OTRA FORMA EN QUE SE PUEDE HACER ES CON entries()
console.log('');
console.log('---- FOR WITH ENTRIES() ----');
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`); //Con Math.abs() nos quedamos con el valor, quitando el signo
  }
}

console.log('');
console.log('---- FOREACH WITH ENTRIES() ----');
//NO IMPORTA el NOMBRE, pero si el ORDEN de los parámetros:
// ----------- 1 el elemento (mov)
// ----------- 2 el indice (i)
// ----------- 3 el array entero que estamos loopeando (arr)
movements.forEach(function (mov, i, arr) {
  //mov en este momento es el nombre de cada valor por cada iteración, es el 'ele' o la 'i'
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`); //Con Math.abs() nos quedamos con el valor, quitando el signo
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////

// -------------------------------------------------------------------------- MAPS LOOPS

console.log('----------------------- MAPS LOOPS -----------------------');

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
//NO IMPORTA el NOMBRE, pero si el ORDEN de los parámetros:
// ----------- 1 el valor actual (value)
// ----------- 2 el key actual (key)
// ----------- 3 el map entero que estamos loopeando (map)
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// -------------------------------------------------------------------------- SET LOOPS

console.log('----------------------- SET LOOPS -----------------------');

const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'Euro', 'Euro']);
console.log(currenciesUnique);
//NO IMPORTA el NOMBRE, pero si el ORDEN de los parámetros:
// ----------- 1 el valor actual (value)
// ----------- 2 el key actual (key)
// ----------- 3 el map entero que estamos loopeando (map)
//El key no tiene ningun valor
currenciesUnique.forEach(function (value, _, map) {
  // con un '_'
  console.log(`${value}: ${value}`);
});
