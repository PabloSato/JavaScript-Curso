'use strict';

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

const jonas = new Person('Jonas', 1991);
console.log(jonas);

// ------ PASOS QUE SE PRODUCEN POR DETRAS AL USAR EL NEW --------
// 1 - Se crea un objeto vacio
// 2 - Se llama a la función y la palabra 'this' se asocia al objeto creado
// 3 - El objeto es linkeado a un prototipo (__proto__)
// 4 - El objeto creado es return desde el constructor

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1986);

// console.log(jonas instanceof Person); // TRUE
// console.log(jay instanceof Person); // FALSE

// ------ PROTOTYPE ---------
//Al hacerlo asi, solo se crea una vez la función
//Si la crearamos dentro del objeto, la función se crearia todas
//las veces que se crease un objeto nuevo
//Ahora se crea una sola vez y todos los objetos pueden acceder a ella
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge();
matilda.calcAge();
