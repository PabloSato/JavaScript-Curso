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

// //Class Declaration
// class PersonCl {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }
//   //Si podemos declarar los métodos en la declaración de las clases
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   }

//   greet() {
//     console.log(`Hey, ${this.firstName}!!`);
//   }

//   get age() {
//     return 2037 - this.birthYear;
//   }

//   set fullName(name) {
//     if (name.includes(' ')) {
//       this._fullName = name;
//     } else {
//       alert(`${name} is not a full name!`);
//     }
//   }
//   get fullName() {
//     return this._fullName;
//   }

//   static hey() {
//     console.log('Hey!!');
//   }
// }

// const jessica = new PersonCl('Jessica Davis', 1990);
// console.log(jessica);
// jessica.calcAge();
// console.log(jessica.age);
// jessica.greet();

// const walter = new PersonCl('Walter White', 1991);

// // SETTER & GETTER
// const account = {
//   owner: 'Jonas',
//   movements: [200, 300, 400, 550],

//   get latest() {
//     return this.movements.slice(-1).pop();
//   },

//   set latest(mov) {
//     this.movements.push(mov);
//   },
// };

// console.log(account.latest);
// account.latest = 50;
// console.log(account.latest);
// console.log(account.movements);

// // ---------------- OBJECT INHERITANCE ------------
// const Person = function (firstName, birthYear) {
//   this.firstName = firstName;
//   this.birthYear = birthYear;
// };

// Person.prototype.calcAge = function () {
//   console.log(2037 - this.birthYear);
// };

// const Student = function (firstName, birthYear, course) {
//   Person.call(this, firstName, birthYear); // Utilizamos la función call() para poder dar la this keyword al llamamiendo del objeto Persona, el this siempre será el primer parámetro
//   this.course = course;
// };

// Student.prototype = Object.create(Person.prototype);

// Student.prototype.introduce = function () {
//   console.log(`My name is ${this.firstName} and I study ${this.course}`);
// };

// const mike = new Student('Mike', 2020, 'Computer Science');
// console.log(mike);
// mike.introduce();
// mike.calcAge();

// ------------- CLASS INHERITANCE -----------
// //Class Declaration
// class PersonCl {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }
//   //Si podemos declarar los métodos en la declaración de las clases
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   }

//   greet() {
//     console.log(`Hey, ${this.firstName}!!`);
//   }

//   get age() {
//     return 2037 - this.birthYear;
//   }

//   set fullName(name) {
//     if (name.includes(' ')) {
//       this._fullName = name;
//     } else {
//       alert(`${name} is not a full name!`);
//     }
//   }
//   get fullName() {
//     return this._fullName;
//   }

//   static hey() {
//     console.log('Hey!!');
//   }
// }

// class StudentCl extends PersonCl {
//   constructor(fullName, birthYear, course) {
//     super(fullName, birthYear);
//     this.course = course;
//   }

//   introduce() {
//     console.log(`My Name is ${this.fullName} and I study ${this.course}`);
//   }

//   calcAge() {
//     console.log(`I'm ${2037 - this.birthYear} yers old`);
//   }
// }

// const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');
// console.log(martha);
// martha.introduce();
// martha.calcAge();

// const PersonProto = {
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   },
//   init(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   },
// };

// const steven = Object.create(PersonProto);

// const StudentProto = Object.create(PersonProto);
// StudentProto.init = function (firstName, birthYear, course) {
//   PersonProto.init.call(this.firstName, this.birthYear);
//   this.course = course;
// };
// const jay = Object.create(StudentProto);
// jay.init('Jay', 2010, 'Computer Science');
// console.log(jay);

class Account {
  // 1 - Public field (se crean con la instancia)
  local = navigator.language;

  // 2 - Private fields (con # lo marcamos como privado)
  #movements = [];
  #pin; // La declaramos undefined privada al principio y en el constructor la redefine al darle un valor

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    // this._movements = [];
    // this.local = navigator.language;
  }

  // 3 - PUBLIC METHODS
  //Public Interface
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this;
  }
  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log('Loan approved');
      return this;
    }
  }

  // 4 - PRIVATE METHODS
  #approveLoan(val) {
    // No está implementado en los browser correctamente
    // A día de hoy los convierte en propiedades y no en métodos
    return true;
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);

acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);

console.log(acc1);
// console.log(acc1.#movements);//Da error al ser privada
console.log(acc1.getMovements()); // Así si que tenemos acceso

// ------- CHAINING ----------
acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);
console.log(acc1.getMovements());
