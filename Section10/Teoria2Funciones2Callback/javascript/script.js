'use strict';
//ABRIMOS TERMINAL Y PONEMOS live-server para lanzar el node live server
//los emojis se ponen con cmd+ctrl+space

const oneWord = function (str) {
  //esta funcion devuelve la misma cadena que recibe, pero sin espacios en blanco
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [firstWord, ...resto] = str.split(' ');
  return [firstWord.toUpperCase(), ...resto].join(' ');
};

//Higher-Order function
const transformer = function (str, fn) {
  console.log(str);
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`);
};

transformer('javascript is the best!', upperFirstWord);
console.log('');
transformer('javascript is the best!', oneWord);

const high5 = function () {
  //console.log('👋');
};

document.body.addEventListener('click', high5);

['Juan', 'Pablo', 'Patricia'].forEach(high5); //llamaría a la función tantas veces, como largo es el array

console.log('------------------- FUNCION LLAMA FUNCION ------------------');

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('Hey');

greeterHey('Jonas');
greeterHey('Steven');

greet('Hola')('Jonas');

console.log(
  '------------------- FUNCION LLAMA FUNCION ARROW------------------'
);
//  llamamos a la funcion y le pasamos greeting como argumento, que a su vez pasa name como argumento, y por último pinta
const greetArr = greeting => name => console.log(`${greeting} ${name}`);

greetArr('Yo')('Jonas');

const lufthansa = {
  airlane: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    // => esto es lo mismo que poner "book: function(){}"
    console.log(
      `${name} booked a seat on ${this.airlane}, flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, 'Pablo Fernández');
lufthansa.book(635, 'John Smith');

const eurowings = {
  airlane: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book; //Guardamos en la variable book, el método book del objeto lufthansa

// book(23, 'Sarah Wiliams'); //así explota ya que el this. de dentro del metodo no apunta a nada (Al hacer la llamada desde fuera del objeto)

//ESTO SE SOLUCIONA USANDO LOS FABULOSOS MÉTODOS:
console.log('---------------- CALL, APPLY Y BIND ------------------');
//call(): EL primer argumento es el this.. Y después el los argumentos que ide la funcion (flightNum, name)
book.call(eurowings, 23, 'Sara Williams'); //Es como si esta funcióne stuviera dentro del objeto eurowings
console.log(eurowings);

book.call(lufthansa, 239, 'Mary Cooper'); //Podemos usarlo desde fuera el método, aunq esté dentro del objeto
console.log(lufthansa);

const swiss = {
  airlane: 'Swiss Air Line',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 583, 'Mary Cooper');
console.log(swiss);

//apply(). No recibe los argumentos después del this. sino un array con los argumentos
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData); // este método apenas se usa, está desfasado hoy día se usa: book.call(swiss, ...flightData);
console.log(swiss);

//bind()
//mucho más importante que los dos anteriores
const bookEW = book.bind(eurowings); //Es como que metemos la funcion book dentro del objeto que le pasamos por parámetro ('eurowings')
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(23, 'Steven Williams');

console.log(
  '------------------- APLICACION PARCIAL DE UNA FUNCION -------------------------'
);
//Podemos usar bind() para crear una funcion para una específica aerolinea y un vuelo específico
const bookEW23 = book.bind(eurowings, 23); // le pasamos el objeto this. y su primer parámetro
bookEW23('Pablo Sato'); //Ya solo necesitamos pasar el nombre (segundo parámetro).
bookEW23('Sara Palin');

console.log(
  '------------------- OBJETOS CON EVENT LISTENER -------------------------'
);
//Usamos los btns del index.html
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);

  this.planes++;
  console.log(this.planes);
};
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));
//tenemos que meter el .bind(lufthansa), para especificar el this. exacto. Si no lo pasamos el this. será el btn, no el objeto

console.log(
  '------------------- APLICACION PARCIAL DE UNA FUNCION II -------------------------'
);
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23); // => addVAT = value => value + value * 0.23;

console.log(addVAT(100));
console.log(addVAT(23));

console.log(
  '------------------- APLICACION PARCIAL DE UNA FUNCION II - CHALLENGE -------------------------'
);

const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));
