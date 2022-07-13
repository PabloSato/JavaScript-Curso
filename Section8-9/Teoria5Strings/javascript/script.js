'use strict';
//ABRIMOS TERMINAL Y PONEMOS live-server para lanzar el node live server

const airline = 'TAP Air Portugal';
const plane = 'A320';

console.log(plane[0]); //Es como un array, cogemos la primera letra
console.log('B737'[0]); //Lo podemos aplicar tb directamente sobre el propio String
console.log(airline.length); //Cuantos caracteres tiene el String (contando los espacios en blanco entre letras)
console.log('B737'.length); //tb lo podemos aplicar directamente sobre el String

console.log(
  '------------------------------------------------------------------------------------------------------------------------------------ METODOS DEL STRING ---------------'
);
//IndexOf()
console.log(airline.indexOf('r')); //Devuelve la posicion de la primera letra que coincida con la letra pasada
console.log(airline.lastIndexOf('r')); //Devuelve la posición de la última leta que coincida con la letra pasada
console.log(airline.indexOf('Portugal')); //Devuelve la posición de la primera letra que coincida con la primera letra (case sensitive) de la palabra pasada
console.log(airline.indexOf('portugal')); //Devuelve -1 que es el valor que devuelve cuando no hay coincidencias

//Slice()
//slice() sirve para extraer cadenas de texto de otras cadenas. Pasamos dos parámetros:
// 1ª - Posición en la que comienza a extraer la cadena
// 2ª - Posición del último caracter que extrae
//Si solo ponemos un parámetro, extraerá desde esa posición hasta el final de la cadena
console.log(airline.slice(4)); //Coge toda la cadena desde este parámetro
console.log(airline.slice(4, 7)); //Coge la cadena entre esos dos índices

console.log(airline.slice(0, airline.indexOf(' '))); //Extraemos la primera palabra de la cadena. Desde la posición 0 hasta el primer espacio en blanco
console.log(airline.slice(airline.lastIndexOf(' ') + 1)); //Extraemos la última palabra de la cadena. Desde el último espacio en blanco hasta el final de la cadena. Con el +1 movemos el caracter uno a la derecha ibrandonos del espacio en blanco

console.log(airline.slice(-2)); //Con números negativos comenzamos a cortar por el final
console.log(airline.slice(1, -1)); //Cortamos desde el segundo caracter hasta el penúltimo caracter

//------------------------------------------------------------ MÁS METODOS -----------------------------

//toLowerCase() & toUpperCase()

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

//Arreglar la capitalización en nombres
const passenger = 'jOnas';
const passengerLower = passenger.toLowerCase(); //Pasamos todo a minusculas
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1); //Cogemos la primera letra y a hacemos mayusculas, y le pegamos la cadena que queda a partir de la 2º letra
console.log(passengerCorrect);

//Comparar los emails
const email = 'hello@pab.com';
const loginEmail = '   Hello@Pab.Com \n';

//Lo convertimos en minusculas
const lowerEmail = loginEmail.toLowerCase();
//Le quitamos los espacios en blanco por delante y por detrás
const trimmedEmail = lowerEmail.trim();
console.log(trimmedEmail);

//Hacemos todo lo anterior en un solo paso
const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);

console.log(email === normalizedEmail); //comprobamos que son iguales

//Reemplazar: con replace podemos reemplazar cadenas de texto por otras. Pasamos dos parámetros, el primero es la cadena a reemplazar y el segundo por la que será reemplazada
//Solo reemplaza la primera coincidencia que encuentre
const priceGB = '288,97€';
const priceUS = priceGB.replace('€', '$').replace(',', '.');
console.log(priceUS);

const announcemet = 'All passangers come to boarding door 23. Boarding door 23';

console.log(announcemet.replace('door', 'gate')); // cambia el primer door por gate, pero mantiene el segundo

//Para que nos reemplace todas las ocurrencias que haya tenemos que usar EXPRESIONES REGULARES ---> MUY IMPORTANTE
console.log(announcemet.replace(/door/g, 'gate')); //la 'g' significa 'global'

//MÉTODOS BOOLEAN

//include() devuelve true si el parámetro pasado está en la cadena a la que se le aplica el método. ES CASE SENSITIVE
const plane1 = 'Airbus A320neo';
console.log(plane1.includes('A320')); // devuelve true
console.log(plane1.includes('Boeing')); // devuelve false

//startWith() && endsWith() devueve true si la cadena comienza/termina con el parámetro pasado, puedes ser una cadena  o un caracter. ES CASE SENSITIVE
console.log(plane1.startsWith('A')); //devuelve true
console.log(plane1.startsWith('a')); // devuelve false

if (plane1.startsWith('Airbus') && plane1.endsWith('neo')) {
  console.log('Part of the NEW Airbus Family');
}

//PRACTICA
const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('You are NOT allowed on board');
  } else {
    console.log('Welcome aboard');
  }
};

checkBaggage('I have a laptop, some Food and a pocket Knife');
checkBaggage('Socks and camera');
checkBaggage('Got some snacks and a gun for protection');

//------------------------------------------------------------ MÁS METODOS -----------------------------

//split(): devuelve un array de elementos de dividir la cadena por el parámetro que se pasa

console.log('a+very+nice+string'.split('+'));
console.log('pablo fernández'.split(' '));

const [firstName, lastName] = 'pablo fernández'.split(' ');
console.log(firstName);
console.log(lastName);

//join(): devuevle un string uniendo los elementos de un array por el parámetro pasado. Es lo contrario que el split()

const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);

//PRACTICA. CAPITALIZAR UN NOMBRE. segunda forma
const capitalizeName = function (name) {
  const names = name.split(' '); //creamos un array a partir de los nombres separados por el espacio
  const nameUpper = []; //creamos un array vacio

  for (const word of names) {
    // nameUpper.push(word[0].toUpperCase() + word.slice(1)); //añadimos al array vacio las cadenas tratadas
    nameUpper.push(word.replace(word[0], word[0].toUpperCase())); //otra forma, más rara, de hacer lo mismo
  }
  console.log(nameUpper.join(' ')); //lo convertimos en String uniendo los elementos con un espacio
};
capitalizeName('jessica ann smith davis');
capitalizeName('pablo fernandez sato');

//Padding: sirve para añadir caracteres a un string hasta q este tenga la dimensión deseada
//padStar() --> añade los caracteres al principio del string. 2 parámetros, el primero la longitud deseada, y el segundo la cadena que se añade
//padEnd () --> lo mismo pero desde el final

const message = 'Go to gate 23';
console.log(message.padStart(25, '+'));
console.log('pablo'.padStart(25, '+'));
console.log(message.padEnd(35, '-'));

//Ejemplo del mundo real para pad

const maskCreditCard = function (number) {
  const str = number + ''; // al añadir una string vacia, convirtes todo en String (si hay un string, todo es un String)
  //   const str = String(number); //Esto es lo mismo que lo anterior, mas cuqui
  const last = str.slice(-4); //Cogemos los últimos 4 caracteres

  return last.padStart(str.length, '*'); //devolvemos los últimos 4 números con el resto "convertido en *""
};

console.log(maskCreditCard(176764679));
console.log(maskCreditCard(4337844638646474));
console.log(maskCreditCard('3589482888632524668656'));

//los podemos unir
console.log(message.padStart(25, '+').padEnd(35, '-'));

//REPEAT: nos permite repetir la misma string muchas veces
const message2 = 'Bad Weather... All Departures Delayed....';
console.log(message2.repeat(5));

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${'🛩'.repeat(n)}`); //los emojis son con cmd+ctrl+space
};

planesInLine(5);
planesInLine(3);
planesInLine(12);

//MDN--> para buscar todos los metodos de String, que son un huevo
//------------------------------------------------------------------------------------------------------------------------ FUNCIONES!!!

console.log(
  '----------------------------------------------------------------------- FUNCONES STRING ---------------'
);
const checkMiddleSeat = function (seat) {
  //Los asientos B y E son los asientos de enmedio
  const s = seat.slice(-1);
  if (s === 'B' || s === 'E') {
    console.log('Tienes el asiento de en medio');
  } else {
    console.log('Has tenido suerte');
  }
};

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

//LOS STRINGS, como en casi todos los lenguajes de programación, SON OBJETOS
console.log(typeof new String('jonas'));
