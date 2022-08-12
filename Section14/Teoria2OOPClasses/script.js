'use strict';

// const Person = function (firstName, birthYear) {
//   this.firstName = firstName;
//   this.birthYear = birthYear;
// };

// const jonas = new Person('Jonas', 1991);
// console.log(jonas);

// // ------ PASOS QUE SE PRODUCEN POR DETRAS AL USAR EL NEW --------
// // 1 - Se crea un objeto vacio
// // 2 - Se llama a la función y la palabra 'this' se asocia al objeto creado
// // 3 - El objeto es linkeado a un prototipo (__proto__)
// // 4 - El objeto creado es return desde el constructor

// const matilda = new Person('Matilda', 2017);
// const jack = new Person('Jack', 1986);

// // console.log(jonas instanceof Person); // TRUE
// // console.log(jay instanceof Person); // FALSE

// // ------ PROTOTYPE ---------
// //Al hacerlo asi, solo se crea una vez la función
// //Si la crearamos dentro del objeto, la función se crearia todas
// //las veces que se crease un objeto nuevo
// //Ahora se crea una sola vez y todos los objetos pueden acceder a ella
// Person.prototype.calcAge = function () {
//   console.log(2037 - this.birthYear);
// };

// jonas.calcAge();
// matilda.calcAge();

// ------------------- CLASSES ---------------------
//Class expresion
// const PersonCl = class {};

//Class Declaration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  //Si podemos declarar los métodos en la declaración de las clases
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey, ${this.firstName}!!`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(' ')) {
      this._fullName = name;
    } else {
      alert(`${name} is not a full name!`);
    }
  }
  get fullName() {
    return this._fullName;
  }

  static hey() {
    console.log('Hey!!');
  }
}

const jessica = new PersonCl('Jessica Davis', 1990);
console.log(jessica);
jessica.calcAge();
console.log(jessica.age);
jessica.greet();

const walter = new PersonCl('Walter White', 1991);

// SETTER & GETTER
const account = {
  owner: 'Jonas',
  movements: [200, 300, 400, 550],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest);
account.latest = 50;
console.log(account.latest);
console.log(account.movements);

// -------- STATIC METHODS ------------
